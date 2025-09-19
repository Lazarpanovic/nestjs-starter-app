import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Role } from '../../../database/entities/role.entity';
import { UserRole } from '../../../database/entities/user-role.entity';
import { UpdateUserRoleDto } from './dtos/req/update-user-role.dto';
import { UserRoleRes } from './dtos/res/user-role.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  @Transactional()
  async updateUserRole(userId: string, userRoleData: UpdateUserRoleDto): Promise<UserRoleRes> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const role = await this.roleRepository.findOne({ where: { id: userRoleData.roleId } });
    if (!role) throw new NotFoundException('Role not found');

    // Delete existing roles
    try {
      await this.userRoleRepository.delete({ user: { id: user.id } });
    } catch (error) {
      throw new Error(`Error while deleting existing user roles: ${error.message}`);
    }

    const userRole = await this.userRoleRepository.save({
      user,
      role,
    });

    return new UserRoleRes(userRole);
  }
}
