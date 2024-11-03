import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ContributionDatabase } from "../db/contributions-database";
import { contributionSchema } from "../validation";

export const createContributionsController = (db: ContributionDatabase) => ({
  getContributions: async (req: Request, res: Response) => {
    try {
      const contributions = await db.getAll();
      res.status(200).json(contributions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  },
  addContribution: async (req: Request, res: Response) => {
    const { name, location } = req.body;
    const id = uuidv4();
    const contributionToRegister = {
      id,
      name,
      location,
    };
    const result = contributionSchema.safeParse(contributionToRegister);
    if (!result.success) {
      res.status(400).json({ error: { message: "Invalid input" } });
      return;
    }

    try {
      await db.addContribution(contributionToRegister);
      res.status(201).json(contributionToRegister.id);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  },
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
