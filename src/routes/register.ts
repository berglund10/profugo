import express, { Request, Response } from "express";

export function createRegisterRouter() {
  return {
    getRouter() {
      const router = express.Router();
      router.get("/", (req: Request, res: Response) => {
        res.status(200).json([]);
      });

      return router;
    },
  };
}
