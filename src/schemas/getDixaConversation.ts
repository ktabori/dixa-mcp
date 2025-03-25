import { z } from "zod";

export const DixaCustomAttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  identifier: z.string(),
  value: z.string()
});

export const DixaSingleConversationSchema = z.object({
  id: z.number(),
  requesterId: z.string(),
  channel: z.string(),
  createdAt: z.string(),
  direction: z.string(),
  state: z.string(),
  stateUpdatedAt: z.string(),
  assignment: z.object({
    agentId: z.string(),
    assignedAt: z.string()
  }).optional(),
  queue: z.object({
    id: z.string(),
    queuedAt: z.string()
  }).optional(),
  browserInfo: z.object({
    name: z.string(),
    version: z.string(),
    ipAddress: z.string(),
    originatingUrl: z.string()
  }).optional(),
  language: z.string(),
  link: z.object({
    parentId: z.number(),
    _type: z.string()
  }).nullable().optional(),
  customAttributes: z.array(DixaCustomAttributeSchema).optional(),
  _type: z.string()
});

export const DixaSingleConversationResponseSchema = z.object({
  data: DixaSingleConversationSchema
}); 