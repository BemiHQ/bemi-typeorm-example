import cors from "cors";
import express from "express";

import { todoRouter } from "./routers/todo";
import { AppDataSource } from "./data-source";
import { BemiDataSource } from "./data-source-bemi";
import { bemiMetadata } from "@bemi-db/typeorm";

const main = async (): Promise<void> => {
  const app = express();
  const port = 4001;

  app.use(express.json());
  app.use(cors());

  app.use(
    bemiMetadata(AppDataSource, (req) => ({
      apiEndpoint: req.url,
      userID: 187234,
      queryParams: req.query,
    }))
  );

  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to Postgres");
    })
    .catch((error) => console.log(error));

  BemiDataSource.initialize()
    .then(() => {
      console.log("Connected to Bemi");
    })
    .catch((error) => {
      console.log(error);
    });
  app.use("/", todoRouter);

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
