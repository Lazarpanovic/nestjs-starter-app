import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/req/register-user.dto';
import { LoginDto } from './dtos/req/login.dto';
import { UserRes } from '../user/dtos/res/user.dto';
import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/user-role.entity';
import { Role, RoleName } from '../../database/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user and assigns the default 'User' role.
   *
   * @param dto - User registration data
   * @returns The created user response
   * @throws UnauthorizedException if email is already taken
   * @throws NotFoundException if the default user role is missing
   */
  @Transactional()
  async register(dto: RegisterUserDto): Promise<UserRes> {
    const exists = await this.userRepository.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const { passwordHash, salt } = await this.hashPassword(dto.password);

    const user = await this.userRepository.save({
      ...dto,
      password: passwordHash,
      salt,
    });

    const userRole = await this.roleRepository.findOne({ where: { name: RoleName.USER } });

    if (!userRole) {
      throw new NotFoundException('Default user role not found');
    }

    try {
      await this.userRoleRepository.save({ userId: user.id, roleId: userRole.id });
    } catch (error) {
      throw new Error(`Error while creating user role: ${error.message}`);
    }

    return new UserRes(user);
  }

  async login(dto: LoginDto): Promise<{ token: string; user: UserRes }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: { userRoles: { role: true } },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await this.validatePassword(dto.password, user.password, user.salt);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.userRoles.map((ur) => (ur.role ? ur.role.name : null)),
    };
    const token = this.jwtService.sign(payload);
    return { token, user: new UserRes(user) };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return {
      passwordHash,
      salt,
    };
  }

  async validatePassword(
    payloadPassword: string,
    userPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(payloadPassword, salt);
    return hash === userPassword;
  }
}
