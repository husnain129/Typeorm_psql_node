import express from "express";
import { createConnection } from "typeorm";
import { Banker } from "./entites/Banker";
import { Client } from "./entites/Client";
import { Transaction } from "./entites/Transaction";
import { createConnectBankerToClient } from "./routes/connect_banker_to_client";
import { createBankerRouter } from "./routes/create_banker";
import { createClientRouter } from "./routes/create_client";
import { createTransactionRouter } from "./routes/create_transaction";
require("dotenv").config();
const app = express();

const PORT = 3000;
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DATABASE as string,
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to database");
    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(createConnectBankerToClient);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

main();
