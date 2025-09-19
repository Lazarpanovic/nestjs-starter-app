import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
