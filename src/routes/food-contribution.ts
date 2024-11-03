import express from "express";
import { ContributionDatabase } from "../db/contributions-database";
import { createContributionsController } from "../controllers/contributionsController";

export function createFoodContributionsRouter(db: ContributionDatabase) {
  return {
    getRouter() {
      const router = express.Router();
      const contributionController = createContributionsController(db);

      router.get("/", contributionController.getContributions);

      router.post("/", contributionController.addContribution);

      router.delete("/:id", contributionController.deleteContribution);

      return router;
    },
  };
}
