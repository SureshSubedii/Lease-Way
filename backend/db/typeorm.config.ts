import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // Database type
  host: process.env.DB_HOST, // Database host
  port: 5432, // Database port
  username: process.env.DB_USER_NAME, // Database username
  password: String(process.env.DB_PASSWORD), // Database password
  database: process.env.DB_NAME, // Database name
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  logging: 'all',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
