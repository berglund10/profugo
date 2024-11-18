import express from "express";
import { Service } from "./service";

export const createRouter = (service: Service) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const persons = await service.getPersons();
    res.status(200).json(persons);
  });

  router.get("/:id", async (req, res) => {
    const person = await service.getPersonById(req.params.id);
    res.status(200).json(person);
  })

  router.post("/", async (req, res) => {
    const personId = await service.addPerson(req.body);
    res.status(201).json(personId);
  })

  router.put("/:id", async (req, res) => {
    const updatedPerson = await service.updatePersonById(req.body, req.params.id);
    res.status(201).json(updatedPerson);
  })

  router.delete("/:id", async (req, res) => {
    await service.deletePersonById(req.params.id);
    res.status(204).json({ message: "Person deleted successfully" });
  });

  return router;
};
