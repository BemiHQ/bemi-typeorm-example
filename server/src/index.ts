import cors from "cors";
import express, { Request } from "express";
import { setContext } from "@bemi-db/typeorm";

import { todoRouter } from "./routers/todo";
import { AppDataSource } from "./data-source";
import { BemiDataSource } from "./data-source-bemi";

const main = async (): Promise<void> => {
  const app = express();
  const port = 4001;

  app.use(express.json());
  app.use(cors());

  app.use(
    setContext(AppDataSource, (req: Request) => ({
      apiEndpoint: req.url,
      userId: (req as any).user?.id || 1,
      params: req.body,
    }))
  );

  AppDataSource.initialize().then(() => { console.log("Connected to Postgres"); })
    .catch((error) => { console.log(error) });
  BemiDataSource.initialize().then(() => { console.log("Connected to Bemi"); })
    .catch((error) => { console.log(error) });

  app.use("/", todoRouter);

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
