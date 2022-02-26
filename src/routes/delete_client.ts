import express from "express";
import { Client } from "./../entites/Client";
const router = express.Router();

router.delete("/api/client/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const client = await Client.delete(parseInt(clientId));
  console.log("client = ", client);
  if (!client) {
    return res.json({
      msg: "something is wrong",
    });
  }
  return res.json({
    msg: "client deleted",
  });
});

export { router as deleteClientRouter };
