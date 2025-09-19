import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_role', { schema: 'public' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user?: User;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role?: Role;
  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updatedAt' })
  updatedAt: Date;
}
