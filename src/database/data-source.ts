import { join } from 'path';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const caCertPath = path.resolve(__dirname, '..', '..', 'certs', 'ca.crt');

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],
  ssl: {
    ca: fs.readFileSync(caCertPath, 'utf8'),
    rejectUnauthorized: true,
  },
});
