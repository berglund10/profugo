import { Person } from "../validation";

export interface PersonDatabase {
  getAll: () => Promise<Person[]>;
  addPerson: (person: Person) => Promise<boolean>;
  getPersonById: (id: string) => Promise<Person | null>;
  deletePersonById: (id: string) => Promise<boolean>;
  putPersonById: (
    id: string,
    updates: { name?: string; city?: string },
  ) => Promise<Person | null>;
}

export const createDb = (): PersonDatabase => {
  const personDatabase: Person[] = [
    {
      id: "1",
      name: "Anton",
      personalNumber: "19921027-0196",
      city: "Södertälje",
    },
  ];

  return {
    getAll: async () => personDatabase,
    addPerson: async (person: Person) => {
      const isPersonInDatabase = personDatabase.some(
        (existingPerson) => existingPerson.personalNumber === person.personalNumber,
      );
      if (isPersonInDatabase) {
        return false;
      }
      personDatabase.push(person);
      return true;
    },
    getPersonById: async (id: string) => {
      const person = personDatabase.find((p) => p.id === id);
      return person || null;
    },
    deletePersonById: async (id: string) => {
      const index = personDatabase.findIndex((p) => p.id === id);
      if (index !== -1) {
        personDatabase.splice(index, 1);
        return true;
      }
      return false;
    },
    putPersonById: async (
      id: string,
      updates: { name?: string; city?: string },
    ) => {
      const index = personDatabase.findIndex((p) => p.id === id);
      if (index !== -1) {
        const currentPerson = personDatabase[index];
        personDatabase[index] = {
          ...currentPerson,
          name: updates.name !== undefined ? updates.name : currentPerson.name,
          city: updates.city !== undefined ? updates.city : currentPerson.city,
        };
        return personDatabase[index];
      }
      return null;
    },
  };
};
