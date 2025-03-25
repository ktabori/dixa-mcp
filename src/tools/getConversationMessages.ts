import { z } from "zod";
import { DixaMessagesResponseSchema } from "../schemas/getDixaConversationMessages.js";
import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";

/**
 * Tool for retrieving messages from a specific conversation in Dixa
 * 
 * This tool fetches all messages in a conversation, including both customer and agent messages.
 * 
 * @example
 * ```typescript
 * const result = await getDixaConversationMessagesTool.execute({ 
 *   conversationId: "123" 
 * }, apiKey);
 * const messages = JSON.parse(result);
 * console.log(messages.data); // Array of messages
 * ```
 */
export const getDixaConversationMessagesTool = {
  name: "Get Dixa Conversation Messages",
  description: "Get all messages from a specific conversation",
  parameters: z.object({
    conversationId: z.string().describe("The ID of the conversation to retrieve messages for")
  }),
  execute: async (args: { conversationId: string }, apiKey: string) => {
    const response = await fetch(
      getApiUrl(`conversations/${args.conversationId}/messages`),
      {
        method: "GET",
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await handleDixaResponse(response, DixaMessagesResponseSchema);
    return JSON.stringify(data);
  }
}; 