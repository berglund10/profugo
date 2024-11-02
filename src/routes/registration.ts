import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export function createRegistrationRouter() {
  return {
    getRouter() {
      const router = express.Router();
      router.get("/", (req: Request, res: Response) => {
        res.status(200).json([]);
      });

      router.post("/", (req: Request, res:Response) => {
        const {name, personalNumber, city} = req.body;
        const id = uuidv4();
        const PersonToRegister = {
            id,
            name,
            personalNumber,
            city
        }
        //db.add(PersonToRegister)
        res.status(201).json({id})
      })

      router.get("/:id", (req: Request, res:Response) => {
        const id = req.params.id;
        res.status(200).json("Person from db with id:" + id);
      })

      return router;
    },
  };
}
