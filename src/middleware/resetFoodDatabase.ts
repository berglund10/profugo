import express, { Request, Response, NextFunction } from "express";

export const resetFoodDatabase = (foodDb: any[]) => {
  let lastResetDate: string | null = null;

  return (req: Request, res: Response, next: NextFunction) => {
    const today = new Date().toISOString().split("T")[0];
    //2024-11-03T12:34:56.789Z

    if (lastResetDate !== today) {
      foodDb.length = 0;
      lastResetDate = today;
      console.log("Food donations database cleared.");
    }

    next();
  };
};
