import { z } from "zod";

const personSchema = z.object({
    id: z.string(),
    name: z.string(),
    personalNumber: z.string(),
    city: z.string(),

  });

  
  type Person = z.infer<typeof personSchema>;