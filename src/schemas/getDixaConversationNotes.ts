import { z } from "zod";

export const DixaNoteSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  csid: z.number(),
  message: z.string()
});

export const DixaNotesResponseSchema = z.object({
  data: z.array(DixaNoteSchema)
}); 