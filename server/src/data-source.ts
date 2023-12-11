import { DataSource } from "typeorm";

import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.SOURCE_DB_HOST,
  port: parseInt(process.env.SOURCE_DB_PORT),
  username: process.env.SOURCE_DB_USERNAME,
  password: process.env.SOURCE_DB_PASSWORD,
  database: process.env.SOURCE_DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Todo],
  migrations: [__dirname + "/migrations/**/*.ts"],
});
