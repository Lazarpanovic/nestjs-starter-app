import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRes } from './dtos/res/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/req/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/user-role.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        userRoles: {
          role: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<UserRes[]> {
    const users = await this.userRepository.find({
      relations: {
        userRoles: {
          role: true,
        },
      },
    });
    return users.map((user) => new UserRes(user));
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<UserRes> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { userRoles: { role: true } },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.update(id, userData);
    if (updatedUser.affected === 1) {
      Object.assign(user, userData);
    }
    return new UserRes(user);
  }

  @Transactional()
  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.userRoleRepository.delete({ userId: id });
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error while deleting user or user roles: ${error.message}`);
    }
  }
}
