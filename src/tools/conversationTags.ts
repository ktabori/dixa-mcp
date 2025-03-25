import { z } from "zod";
import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";
import { DixaAddTagResponseSchema } from "../schemas/addDixaConversationTag.js";

/**
 * Tool for adding a tag to a conversation in Dixa
 * 
 * This tool adds a tag to a specific conversation.
 * 
 * @example
 * ```typescript
 * const result = await addDixaConversationTagTool.execute({ 
 *   conversationId: "123",
 *   tagId: "456"
 * }, apiKey);
 * const response = JSON.parse(result);
 * console.log(response.data); // Tag details
 * ```
 */
export const addDixaConversationTagTool = {
  name: "Add Dixa Conversation Tag",
  description: "Add a tag to a specific conversation",
  parameters: z.object({
    conversationId: z.string().describe("The ID of the conversation to add the tag to"),
    tagId: z.string().describe("The ID of the tag to add")
  }),
  execute: async (args: { conversationId: string; tagId: string }, apiKey: string) => {
    const response = await fetch(
      getApiUrl(`conversations/${parseInt(args.conversationId, 10)}/tags/${args.tagId}`),
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );

    if (response.status === 204) {
      return JSON.stringify({ success: true });
    }

    const data = await handleDixaResponse(response, DixaAddTagResponseSchema);
    return JSON.stringify(data);
  }
};

/**
 * Tool for removing a tag from a conversation in Dixa
 * 
 * This tool removes a tag from a specific conversation.
 * 
 * @example
 * ```typescript
 * const result = await removeDixaConversationTagTool.execute({ 
 *   conversationId: "123",
 *   tagId: "456"
 * }, apiKey);
 * const response = JSON.parse(result);
 * console.log(response.data); // Tag details
 * ```
 */
export const removeDixaConversationTagTool = {
  name: "Remove Dixa Conversation Tag",
  description: "Remove a tag from a specific conversation",
  parameters: z.object({
    conversationId: z.string().describe("The ID of the conversation to remove the tag from"),
    tagId: z.string().describe("The ID of the tag to remove")
  }),
  execute: async (args: { conversationId: string; tagId: string }, apiKey: string) => {
    const response = await fetch(
      getApiUrl(`conversations/${parseInt(args.conversationId, 10)}/tags/${args.tagId}`),
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );

    if (response.status === 204) {
      return JSON.stringify({ success: true });
    }

    const data = await handleDixaResponse(response, DixaAddTagResponseSchema);
    return JSON.stringify(data);
  }
}; 