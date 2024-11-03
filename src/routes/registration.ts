import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { personSchema, updatePersonSchema } from "../validation";
import { PersonDatabase } from "../db/person-database";
import { isValidLuhn } from "../logic/luhnLogic";

export function createRegistrationRouter(db: PersonDatabase) {
  return {
    getRouter() {
      const router = express.Router();

      router.get("/", async (req: Request, res: Response) => {
        try {
          const persons = await db.getAll();
          res.status(200).json(persons);
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: { message: "Internal server error" } });
        }
      });

      router.post("/", async (req: Request, res: Response) => {
        const { name, personalNumber, city } = req.body;
        const id = uuidv4();
        const PersonToRegister = {
          id,
          name,
          personalNumber,
          city,
        };
        const result = personSchema.safeParse(PersonToRegister);
        if (!result.success || !isValidLuhn(PersonToRegister.personalNumber)) {
          res.status(400).json({ error: { message: "Invalid input" } });
          return;
        }

        try {
          await db.addPerson(PersonToRegister);
          res.status(201).json(PersonToRegister.id);
        } catch (error) {
          if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: { message: "Internal server error" } });
        }
      });

      router.get("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
          const person = await db.getPersonById(id);
          res.status(200).json(person);
        } catch (error) {
          if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: { message: "Internal server error" } });
        }
      });

      router.delete("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
          await db.deletePersonById(id);
          res.status(200).json({ message: "Person deleted successfully" });
        } catch (error) {
          if (error instanceof Error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: { message: "Internal server error" } });
        }
      });

      router.put("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        const personToUpdate = {
          name: req.body.name,
          city: req.body.city,
        };

        const result = updatePersonSchema.safeParse(personToUpdate);
        if (!result.success) {
          res.status(400).json({ error: { message: "Invalid input" } });
          return;
        }

        try {
          const updatedPerson = await db.putPersonById(id, personToUpdate);
          res.status(200).json(updatedPerson);
        } catch (error) {
          if (error instanceof Error) {
            res.status(404).json({ error: error.message });
            return;
          }
          res.status(500).json({ error: { message: "Internal server error" } });
        }
      });

      return router;
    },
  };
}
