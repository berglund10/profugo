import express, { Request, Response } from "express";
import { createRegisterRouter } from "./routes/register";

export function createApp() {

  const registerRouter = createRegisterRouter();

  const app = express();
  
  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });

  app.use("/api/v1/register", registerRouter.getRouter());



  return app;
}
