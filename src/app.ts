import express, { Request, Response } from "express";
import { createRegistrationRouter } from "./routes/registration";

export function createApp() {
  const registration = createRegistrationRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });

  app.use("/api/v1/registration", registration.getRouter());

  return app;
}
