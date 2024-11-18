import { Contribution, contributionSchema } from "../../validation";
import { ContributionDatabase } from "./repository";
import { v4 as uuidv4 } from "uuid";

export const createService = (db: ContributionDatabase) => {
  return {
    getContributions: async () => {
      try {
        const contributions = await db.getAll();
        return contributions;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    addContribution: async (contribution: Contribution) => {
      const { name, location } = contributionSchema.parse(contribution);
      const id = uuidv4();
      const contributionToRegister = {
        id,
        name,
        location,
      };
      const result = contributionSchema.safeParse(contributionToRegister);
      if (!result.success) {
        throw new Error("Invalid input");
      }
      try {
        await db.addContribution(contributionToRegister);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    deleteContribution: async (id: string) => {
      try {
        await db.deleteContributionById(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
  };
};

export type Service = ReturnType<typeof createService>;
