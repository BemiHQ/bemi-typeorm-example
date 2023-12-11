import { DataSource } from "typeorm";
import { Change } from "@bemi-db/typeorm/src/entities/Change";

export const BemiDataSource = new DataSource({
  type: "postgres",
  name: "bemiRead",
  host: process.env.DESTINATION_DB_HOST,
  port: parseInt(process.env.DESTINATION_DB_PORT),
  username: process.env.DESTINATION_DB_USERNAME,
  password: process.env.DESTINATION_DB_PASSWORD,
  database: process.env.DESTINATION_DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Change],
  migrations: [],
});
