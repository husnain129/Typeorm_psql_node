import express from "express";
import { createQueryBuilder } from "typeorm";
import { Client } from "./../entites/Client";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  const client = await createQueryBuilder(
    "client"
    //   .select('client.first_name,client.last_name')
  )
    .select("client")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions")
    .where("client.balance >= :clientBalance", { clientBalance: 400 })
    .getMany();

  // .getOne();
  return res.json(client);
});

export { router as fetchClientRouter };
