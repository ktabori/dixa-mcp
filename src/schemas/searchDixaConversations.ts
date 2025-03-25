import { z } from "zod";

export const DixaInnerHitSchema = z.object({
  id: z.string(),
  highlight: z.object({
    text: z.string()
  })
});

export const DixaConversationSchema = z.object({
  id: z.number(),
  highlights: z.object({
    subject: z.array(z.string())
  }),
  innerHits: z.array(DixaInnerHitSchema),
  _type: z.literal("ConversationSearchHit")
});

export const DixaSearchResponseSchema = z.object({
  data: z.array(DixaConversationSchema),
  meta: z.object({
    previous: z.string().nullable(),
    next: z.string().nullable()
  })
}); 