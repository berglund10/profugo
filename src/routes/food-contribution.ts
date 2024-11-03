import express, { Request, Response } from "express";
import { ContributionDatabase } from "../db/contributions-database";
import { contributionSchema } from "../validation";
import { v4 as uuidv4 } from "uuid";

export function createFoodContributionsRouter(db: ContributionDatabase) {
  return {
    getRouter() {
      const router = express.Router();

      router.get("/", async (req: Request, res: Response) => {
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
      });

      router.post("/", async (req: Request, res: Response) => {
        const { name, location } = req.body;
        const id = uuidv4();
        const contributionToRegister = {
          id,
          name,
          location,
        };
        const result = contributionSchema.safeParse(contributionToRegister)
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
      });

      return router;
    },
  };
}
