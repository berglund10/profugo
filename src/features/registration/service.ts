import { isValidLuhn } from "../../logic/luhnLogic";
import { Person, personSchema, updatePersonSchema } from "../../validation";
import { PersonDatabase } from "./repository";
import { v4 as uuidv4 } from "uuid";

export const createService = (db: PersonDatabase) => {
  return {
    getPersons: async () => {
      try {
        const persons = await db.getAll();
        return persons;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    getPersonById: async (id: string) => {
      try {
        const person = await db.getPersonById(id);
        return person;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    addPerson: async (person: Person) => {
      const { name, personalNumber, city } = person;
      const id = uuidv4();
      const personToRegister = { id, name, personalNumber, city };

      const result = personSchema.safeParse(personToRegister);
      if (!result.success || !isValidLuhn(personToRegister.personalNumber)) {
        throw new Error("Invalid input");
      }

      try {
        await db.addPerson(personToRegister);
        return personToRegister.id;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    updatePersonById: async (person: Person, id: string) => {
      const result = updatePersonSchema.safeParse(person);
      if (!result.success) {
        throw new Error("Invalid input");
      }

      try {
        const updatedPerson = await db.putPersonById(id, person);
        return updatedPerson;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
    deletePersonById: async (id: string) => {
      try {
        await db.deletePersonById(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
  };
};

export type Service = ReturnType<typeof createService>;
