import { createConnection } from "typeorm";
import { Banker } from "./entites/Banker";
import { Client } from "./entites/Client";
import { Transaction } from "./entites/Transaction";
require("dotenv").config();

const main = async () => {
  try {
    const connection = await createConnection({
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
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

main();
