import { z } from "zod";

export const DixaAddTagResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    color: z.string()
  })
});

export const DixaErrorResponseSchema = z.object({
  message: z.string()
}); 