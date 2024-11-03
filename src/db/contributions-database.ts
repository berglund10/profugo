import { Contribution } from "../validation";

export interface ContributionDatabase {
  getAll: () => Promise<Contribution[]>;
  addContribution: (contribution: Contribution) => Promise<void>;
  deleteContributionById: (id: string) => Promise<void>;
}

export const createContributionsDb = (): ContributionDatabase => {
  const contributionDatabase: Contribution[] = [
    {
      id: "1",
      name: "McDonald's",
      location: "Sankt Eriksgatan 32, 112 34 Stockholm",
    },
  ];

  return {
    getAll: async () => contributionDatabase,
    addContribution: async (contribution: Contribution) => {
      const isContributionInDatabase = contributionDatabase.some(
        (existingContribution) =>
          existingContribution.id === existingContribution.id,
      );
      if (isContributionInDatabase) {
        throw new Error("Contribution already in database");
      }
      contributionDatabase.push(contribution);
    },
    deleteContributionById: async (id: string) => {
      const index = contributionDatabase.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error("Person not found");
      }
      contributionDatabase.splice(index, 1);
    },
  };
};
