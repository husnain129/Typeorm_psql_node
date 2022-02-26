import express from "express";
import { Client } from "./../entites/Client";
const router = express.Router();

router.post("/api/client", async (req, res) => {
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body;
    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });
    await client.save();
    res.json(client);
  } catch (error) {
    res.json({
      msg: "something went wrong",
    });
  }
});

export { router as createClientRouter };
