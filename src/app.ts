import express, { Request, Response } from "express";

export function createApp() {

  const app = express();
  
  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Ready" });
  });



  return app;
}
