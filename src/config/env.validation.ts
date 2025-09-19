import { plainToInstance, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsFQDN,
  Max,
  Min,
  ValidateNested,
  validateSync,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(65535)
  PORT: number;
}

class AuthVariables {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;
}

class DatabaseVariables {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DB_USER: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DB_PASS: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(65535)
  DB_PORT: number;

  @IsDefined()
  @IsNotEmpty()
  @IsFQDN()
  DB_HOST: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DB_NAME: string;
}

class ConfigVariables {
  @ValidateNested()
  @Type(() => EnvironmentVariables)
  environment: EnvironmentVariables;

  @ValidateNested()
  @Type(() => AuthVariables)
  auth: AuthVariables;

  @ValidateNested()
  @Type(() => DatabaseVariables)
  database: DatabaseVariables;
}

export function validate(config: Record<string, unknown>) {
  const groupedConfig = {
    environment: {
      NODE_ENV: config.NODE_ENV,
      PORT: config.PORT,
    },
    auth: {
      JWT_SECRET: config.JWT_SECRET,
    },
    database: {
      DB_USER: config.DB_USER,
      DB_PASS: config.DB_PASS,
      DB_PORT: config.DB_PORT,
      DB_HOST: config.DB_HOST,
      DB_NAME: config.DB_NAME,
    },
  };

  const validatedConfig = plainToInstance(ConfigVariables, groupedConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (errors.length > 0) {
    throw new Error(
      JSON.stringify(
        errors.map((error) => error.children?.map((e) => e.constraints)),
        null,
        2,
      ),
    );
  }

  return validatedConfig;
}
