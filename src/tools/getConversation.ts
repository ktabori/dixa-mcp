import { z } from "zod";
import { DixaSingleConversationResponseSchema } from "../schemas/getDixaConversation.js";
import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";

/**
 * Tool for retrieving a specific conversation from Dixa
 * 
 * This tool fetches the details of a conversation by its ID.
 * 
 * @example
 * ```typescript
 * const result = await getDixaConversationTool.execute({ 
 *   conversationId: "123" 
 * }, apiKey);
 * const conversation = JSON.parse(result);
 * console.log(conversation.data); // Conversation details
 * ```
 */
export const getDixaConversationTool = {
  name: "Get Dixa Conversation",
  description: "Get details of a specific conversation",
  parameters: z.object({
    conversationId: z.string().describe("The ID of the conversation to retrieve")
  }),
  execute: async (args: { conversationId: string }, apiKey: string) => {
    const response = await fetch(
      getApiUrl(`conversations/${args.conversationId}`),
      {
        method: "GET",
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await handleDixaResponse(response, DixaSingleConversationResponseSchema);
    return JSON.stringify(data);
  }
}; 