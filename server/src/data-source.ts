import "reflect-metadata";
import { DataSource } from "typeorm";

import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "postgres",
  password: undefined,
  database: "bemi_dev_source",
  synchronize: true,
  logging: true,
  entities: [Todo],
  migrations: [__dirname + "/migrations/**/*.ts"],
});
