import { Person } from "../../validation";

export interface PersonDatabase {
  getAll: () => Promise<Person[]>;
  addPerson: (person: Person) => Promise<void>;
  getPersonById: (id: string) => Promise<Person | null>;
  deletePersonById: (id: string) => Promise<void>;
  putPersonById: (
    id: string,
    updates: { name?: string; city?: string },
  ) => Promise<Person | null>;
}

export const createPersonDb = (): PersonDatabase => {
  const personDatabase: Person[] = [
    {
      id: "1",
      name: "FakePersonValidPersonalNumber",
      personalNumber: "19640823-3234",
      city: "Stockholm",
    },
  ];

  return {
    getAll: async () => personDatabase,
    addPerson: async (person: Person) => {
      const isPersonInDatabase = personDatabase.some(
        (existingPerson) =>
          existingPerson.personalNumber === person.personalNumber,
      );
      if (isPersonInDatabase) {
        throw new Error("Person already in database");
      }
      personDatabase.push(person);
    },
    getPersonById: async (id: string) => {
      const person = personDatabase.find((p) => p.id === id);
      if (!person) {
        throw new Error("Person not found");
      }
      return person;
    },
    deletePersonById: async (id: string) => {
      const index = personDatabase.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error("Person not found");
      }
      personDatabase.splice(index, 1);
    },
    putPersonById: async (
      id: string,
      updates: { name?: string; city?: string },
    ) => {
      const index = personDatabase.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error("Person not found");
      }
      const currentPerson = personDatabase[index];
      personDatabase[index] = {
        ...currentPerson,
        name: updates.name !== undefined ? updates.name : currentPerson.name,
        city: updates.city !== undefined ? updates.city : currentPerson.city,
      };
      return personDatabase[index];
    },
  };
};
