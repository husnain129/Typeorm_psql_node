import express from "express";
import { Banker } from "./../entites/Banker";
import { Client } from "./../entites/Client";
const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  const client = await Client.findOne(parseInt(clientId));
  const banker = await Banker.findOne(parseInt(bankerId));
  if (!client || !banker) {
    return res.json({
      msg: "Banker or client not found",
    });
  }
  banker.clients = [client];
  console.log("banker = ", banker);
  console.log("client = ", client);
  await banker.save();
  return res.json({
    msg: "Banker connected to client",
  });
});

export { router as createConnectBankerToClient };
