import { Request, Response, NextFunction } from "express";
import { ContributionDatabase } from "../features/food-contribution/repository";

export const resetFoodDatabase = (contributionDb: ContributionDatabase) => {
  let lastResetDate: string | null = null;

  return (req: Request, res: Response, next: NextFunction) => {
    const today = new Date().toISOString().split("T")[0];

    if (lastResetDate !== today) {
      contributionDb.resetDb();
      lastResetDate = today;
      console.log("Food donations database cleared.");
    }

    next();
  };
};
