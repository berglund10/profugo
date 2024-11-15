import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ContributionDatabase } from "../features/food-contribution/repository";
import { contributionSchema } from "../validation";

export const createContributionsController = (db: ContributionDatabase) => ({
  deleteContribution: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await db.deleteContributionById(id);
      res.status(200).json({ message: "Contribution deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  },
});
