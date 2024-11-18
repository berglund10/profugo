import express, { Request, Response } from "express";
import { createContributionsFeature } from "./features/food-contribution/feature";
import { createPersonFeature } from "./features/registration/feature";
import { createErrorRequestHandler } from "./middleware/error-handler";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });

  app.use("/api/v1/registration", createPersonFeature().router);

  app.use("/api/v1/food-contributions", createContributionsFeature().router);

  app.use(createErrorRequestHandler());

  return app;
}
