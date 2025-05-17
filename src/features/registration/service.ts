import { Db } from "../../db";
import { isValidLuhn } from "../../logic/luhnLogic";
import { Person, personSchema, updatePersonSchema } from "../../validation";
import { v4 as uuidv4 } from "uuid";
import { registrationTable } from "./schema";
import { eq } from "drizzle-orm";

export const createService = (db: Db) => {
  return {
    getPersons: async () => {
      try {
        const persons = await db.select().from(registrationTable);
        return persons;
      } catch (error) {
        if (error instanceof Error) {
          //throw new Error(error.message);
          console.log("ERROR!!!!");
        }
        //throw new Error("Internal server error");
        console.log("ERROR 2");
      }
    },
    getPersonById: async (id: string) => {
      try {
        const person = await db.select().from(registrationTable).where(eq(registrationTable.id, parseInt(id)));
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
      const personToRegister = { name, personalNumber, city };

      const result = personSchema.safeParse(personToRegister);
      if (!result.success || !isValidLuhn(personToRegister.personalNumber)) {
        throw new Error("Invalid input");
      }

      try {
        await db.insert(registrationTable).values(personToRegister);
        return personToRegister.personalNumber;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Internal server error");
      }
    },
/*     
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
    }, */
  };
};

export type Service = ReturnType<typeof createService>;
