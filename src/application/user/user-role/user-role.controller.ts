import { Controller, Put, Body, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UpdateUserRoleDto } from './dtos/req/update-user-role.dto';
import { RoleName } from '../../../database/entities/role.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users/:id/user-role')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Put('update')
  @Roles(RoleName.ADMIN)
  async updateUserRole(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() userRoleData: UpdateUserRoleDto,
  ) {
    return this.userRoleService.updateUserRole(userId, userRoleData);
  }
}
