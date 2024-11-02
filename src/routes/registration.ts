import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { personSchema } from "../validation";
import { PersonDatabase } from "../db/person-database";

export function createRegistrationRouter(db: PersonDatabase) {
  return {
    getRouter() {
      const router = express.Router();

      router.get("/", async (req: Request, res: Response) => {
        try {
          const persons = await db.getAll();
          res.status(200).json(persons);
        } catch (error) {
          res
            .status(500)
            .json({ error: { message: "Failed to fetch persons" } });
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
        if (!result.success) {
          res.status(400).json({ error: { message: "Invalid input" } });
          return;
        }

        try {
          await db.addPerson(PersonToRegister);
          res.status(201).json(PersonToRegister.id);
        } catch (error) {
          res
            .status(500)
            .json({ error: { message: "Failed to register person" } });
        }
      });

      router.get("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
          const person = await db.getPersonById(id);
          if (!person) {
            res.status(404).json({ error: { message: "Person not found" } });
            return;
          }
          res.status(200).json(person);
        } catch (error) {
          console.error("Error fetching person by ID:", error);
          res
            .status(500)
            .json({ error: { message: "Failed to fetch person" } });
        }
      });

      router.delete("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
          if (!(await db.deletePersonById(id))) {
            res.status(404).json({ error: { message: "Person not found" } });
            return;
          }
          res.status(200).json({ message: "Person deleted successfully" });
        } catch (error) {
          res
            .status(500)
            .json({ error: { message: "Failed to delete person" } });
          return;
        }
      });

      router.put("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, city } = req.body;

        try {
          const updatedPerson = await db.putPersonById(id, { name, city });
          if (!updatedPerson) {
            res.status(404).json({ error: { message: "Person not found" } });
            return;
          }
          res.status(200).json(updatedPerson);
        } catch (error) {
          console.error("Error updating person:", error);
          res
            .status(500)
            .json({ error: { message: "Failed to update person" } });
          return;
        }
      });

      return router;
    },
  };
}
