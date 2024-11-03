import express, { Request, Response } from "express";
import { createRegistrationRouter } from "./routes/registration";
import { createPersonDb } from "./db/person-database";
import { createFoodContributionsRouter } from "./routes/food-contribution";
import { resetFoodDatabase } from "./middleware/resetFoodDatabase";
import { createContributionsDb } from "./db/contributions-database";

export function createApp() {
  const personDb = createPersonDb();
  const contributionsDb = createContributionsDb();

  const registration = createRegistrationRouter(personDb);
  const foodContribution = createFoodContributionsRouter(contributionsDb);

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });

  app.use("/api/v1/registration", registration.getRouter());

  app.use(resetFoodDatabase(contributionsDb));

  app.use("/api/v1/food-contributions", foodContribution.getRouter());

  return app;
}
