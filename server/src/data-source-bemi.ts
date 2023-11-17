import { DataSource } from "typeorm";
import { Change } from "@bemi/typeorm";

export const BemiDataSource = new DataSource({
  type: "postgres",
  name: "bemiRead",
  host: "us-west-1-prod-destination-pool.ctbxbtz4ojdc.us-west-1.rds.amazonaws.com",
  port: 5432,
  username: "u_9adb30103a55",
  password: "password",
  database: "db_9adb30103a55",
  synchronize: false,
  logging: true,
  entities: [Change],
  migrations: [],
  ssl: {
    rejectUnauthorized: false,
  },
});
