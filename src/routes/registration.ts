import express from "express";
import { PersonDatabase } from "../db/person-database";
import {
  addPerson,
  deletePersonById,
  getPersonById,
  getPersons,
  updatePersonById,
} from "../controllers/registrationController";

export function createRegistrationRouter(db: PersonDatabase) {
  return {
    getRouter() {
      const router = express.Router();

      router.get("/", getPersons(db));

      router.post("/", addPerson(db));

      router.get("/:id", getPersonById(db));

      router.delete("/:id", deletePersonById(db));

      router.put("/:id", updatePersonById(db));

      return router;
    },
  };
}
