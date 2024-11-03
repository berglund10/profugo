import express from "express";
import { PersonDatabase } from "../db/person-database";
import { createPersonController } from "../controllers/registrationController";

export function createRegistrationRouter(db: PersonDatabase) {
  return {
    getRouter() {
      const personController = createPersonController(db)
      const router = express.Router();

      router.get("/", personController.getPersons);

      router.post("/", personController.addPerson);

      router.get("/:id", personController.getPersonById);

      router.delete("/:id", personController.deletePersonById);

      router.put("/:id", personController.updatePersonById);

      return router;
    },
  };
}
