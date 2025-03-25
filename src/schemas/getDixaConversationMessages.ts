import { z } from "zod";

export const DixaEmailContentSchema = z.object({
  value: z.string(),
  _type: z.literal("Text")
});

export const DixaEmailAttributesSchema = z.object({
  emailContent: z.object({
    content: DixaEmailContentSchema,
    _type: z.literal("Regular")
  }),
  from: z.object({
    email: z.string(),
    name: z.string().nullable()
  }),
  to: z.array(z.object({
    email: z.string(),
    name: z.string().nullable()
  })),
  cc: z.array(z.unknown()),
  bcc: z.array(z.unknown()),
  isAutoReply: z.boolean(),
  inlineImages: z.array(z.unknown()),
  attachments: z.array(z.object({
    url: z.string(),
    prettyName: z.string()
  })),
  direction: z.string(),
  originalContentUrl: z.object({
    url: z.string()
  }).nullable(),
  _type: z.literal("EmailAttributes")
});

export const DixaMessageSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  externalId: z.string().nullable(),
  createdAt: z.string(),
  attributes: DixaEmailAttributesSchema
});

export const DixaMessagesResponseSchema = z.object({
  data: z.array(DixaMessageSchema)
}); 