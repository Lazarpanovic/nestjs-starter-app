import { registerAs } from '@nestjs/config';
import { validate } from './env.validation';

export default registerAs('config', () => {
  const config = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: Number(process.env.PORT),
      JWT_SECRET: process.env.JWT_SECRET,
    },
    auth: {
      JWT_SECRET: process.env.JWT_SECRET,
    },
    database: {
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_PORT: Number(process.env.DB_PORT),
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
    },
  };

  validate({
    ...config.env,
    ...config.auth,
    ...config.database,
  });

  return config;
});
