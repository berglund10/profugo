import express from "express";
import { Service } from "./service";

export const createRouter = (service: Service) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const contributions = await service.getContributions();
    res.status(200).json(contributions);
  });

  router.post("/", async (req, res) => {
    await service.addContribution(req.body);
    res.status(201).json();
  });

  router.delete("/:id", async (req, res) => {
    await service.deleteContribution(req.params.id);
    res.status(204).json();
  });

  return router;
};
