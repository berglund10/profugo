import express, { Request, Response } from "express";
import { createContributionsFeature } from "./features/food-contribution/feature";
import { createPersonFeature } from "./features/registration/feature";
import { createErrorRequestHandler } from "./middleware/error-handler";
import logger from "./logger";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    logger.info("Denna podden svarade");
    console.log(process.env.MOREIFO);
    res.status(200).json({ message: "Are you ready??" });
  });

  app.get("/ok", (req: Request, res: Response) => {
    logger.log("error", "Något gick jävligt fel");
    console.log(process.env.TEST); 
    res.send("ok");
  });

  app.use("/api/v1/registration", createPersonFeature().router);

  app.use("/api/v1/food-contributions", createContributionsFeature().router);

  app.use(createErrorRequestHandler());

  return app;
}
