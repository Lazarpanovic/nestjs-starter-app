import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule } from '@nestjs/config';
import dataSource from './database/data-source';
import { UserModule } from './application/user/user.module';
import { AuthModule } from './application/auth/auth.module';
import { validate } from './config/env.validation';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return dataSource.options;
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
