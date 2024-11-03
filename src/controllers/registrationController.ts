import { Request, Response } from "express";
import { PersonDatabase } from "../db/person-database";
import { personSchema, updatePersonSchema } from "../validation";
import { isValidLuhn } from "../logic/luhnLogic";
import { v4 as uuidv4 } from "uuid";

export const createPersonController = (db: PersonDatabase) => ({
  getPersons: async (req: Request, res: Response) => {
    try {
      const persons = await db.getAll();
      res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  },

  addPerson: async (req: Request, res: Response) => {
    const { name, personalNumber, city } = req.body;
    const id = uuidv4();
    const personToRegister = { id, name, personalNumber, city };
    
    const result = personSchema.safeParse(personToRegister);
    if (!result.success || !isValidLuhn(personToRegister.personalNumber)) {
      res.status(400).json({ error: { message: "Invalid input" } });
      return;
    }

    try {
      await db.addPerson(personToRegister);
      res.status(201).json(personToRegister.id);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  },

  getPersonById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const person = await db.getPersonById(id);
      res.status(200).json(person);
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  },

  deletePersonById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await db.deletePersonById(id);
      res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  },

  updatePersonById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const personToUpdate = { name: req.body.name, city: req.body.city };

    const result = updatePersonSchema.safeParse(personToUpdate);
    if (!result.success) {
      res.status(400).json({ error: { message: "Invalid input" } });
      return;
    }

    try {
      const updatedPerson = await db.putPersonById(id, personToUpdate);
      res.status(200).json(updatedPerson);
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  }
});
