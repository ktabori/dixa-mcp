import { z } from "zod";

export const DixaTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string()
});

export const DixaTagsResponseSchema = z.object({
  data: z.array(DixaTagSchema)
}); 