import express, { Request, Response } from "express";

export function createFoodContributionsRouter() {
  return {
    getRouter() {
      const router = express.Router();

      router.get("/", async (req: Request, res: Response) => {
        res.status(200).json("GET ALL")
      });

      router.post("/", async (req: Request, res: Response) => {
        res.status(200).json("ADD Contributions to list")
      });


      return router;
    },
  };
}
