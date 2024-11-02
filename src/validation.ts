import { z } from "zod";

export const personSchema = z.object({
  id: z.string(),
  name: z.string(),
  personalNumber: z.string(),
  city: z.string(),
});

const nameSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

const citySchema = z.object({
    city: z.string().min(1, "City is required"),
});

export const updatePersonSchema = z.union([nameSchema, citySchema]);

export type Person = z.infer<typeof personSchema>;
