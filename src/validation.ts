import { z } from "zod";

export const personSchema = z.object({
    id: z.string(),
    name: z.string(),
    personalNumber: z.string(),
    city: z.string(),

  });


  export type Person = z.infer<typeof personSchema>;