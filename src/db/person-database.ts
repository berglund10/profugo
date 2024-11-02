import { Person } from "../validation";

export interface PersonDatabase {
  getAll: () => Promise<Person[]>;
  addPerson: (person: Person) => Promise<void>;
  getPersonById: (id: string) => Promise<Person | null>;
  deletePersonById: (id: string) => Promise<boolean>;
  putPersonById: (id: string, updatedPerson: Person) => Promise<Person | null>;
}

const createDb = (): PersonDatabase => {
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
      personDatabase.push(person);
    },
    getPersonById: async (id: string) => {
      const person = personDatabase.find((p) => p.id === id);
      return person || null;
    },
    deletePersonById: async (id: string) => {
        const index = personDatabase.findIndex(p => p.id === id);
        if (index !== -1) {
            personDatabase.splice(index, 1);
            return true;
        }
        return false;
    },
    putPersonById: async (id: string, updatedPerson: Person) => {
      const index = personDatabase.findIndex((p) => p.id === id);
      if (index !== -1) {
        personDatabase[index] = { ...updatedPerson, id };
        return personDatabase[index];
      }
      return null;
    },
  };
};
