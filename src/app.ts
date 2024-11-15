import express, { Request, Response } from "express";
import { createRegistrationRouter } from "./routes/registration";
import { createPersonDb } from "./db/person-database";
import { createContributionsFeature } from "./features/food-contribution/feature";

export function createApp() {
  const personDb = createPersonDb();

  const registration = createRegistrationRouter(personDb);

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });

  app.use("/api/v1/registration", registration.getRouter());

  app.use("/api/v1/food-contributions", createContributionsFeature().router);

  return app;
}
