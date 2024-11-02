import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { personSchema } from "../validation";
import { PersonDatabase } from "../db/person-database";

export function createRegistrationRouter(db: PersonDatabase) {
  return {
    getRouter() {
      const router = express.Router();
      router.get("/", (req: Request, res: Response) => {
        res.status(200).json([]);
      });

      router.post("/", (req: Request, res: Response) => {
        const { name, personalNumber, city } = req.body;
        const id = uuidv4();
        const PersonToRegister = {
          id,
          name,
          personalNumber,
          city,
        };
        const result = personSchema.safeParse(PersonToRegister);
        if (!result.success) {
          res.status(400).json({ error: { message: "Invalid input" } });
        }

        db.addPerson(PersonToRegister);
        res.status(201).json(result.data!.id);
      });

      router.get("/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        res.status(200).json("Person from db with id:" + id);
      });

      router.delete("/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        res.status(200).json("Delete person by id:" + id);
      });

      router.patch("/:id", (req: Request, res: Response) => {
        const id = req.params.id;
        const { city } = req.body;
        res.status(200).json("Updated city for person" + id);
      });

      return router;
    },
  };
}
