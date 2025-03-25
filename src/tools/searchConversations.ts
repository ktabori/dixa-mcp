import { z } from "zod";
import { DixaSearchResponseSchema } from "../schemas/searchDixaConversations.js";
import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";

/**
 * Tool for searching conversations in Dixa
 * 
 * This tool allows searching conversations with a query string.
 * 
 * @example
 * ```typescript
 * const result = await searchDixaConversationsTool.execute({ 
 *   query: "customer support"
 * }, apiKey);
 * const conversations = JSON.parse(result);
 * console.log(conversations.data); // Array of conversations
 * ```
 */
export const searchDixaConversationsTool = {
  name: "Search Dixa Conversations",
  description: "Search conversations in Dixa",
  parameters: z.object({
    query: z.string().describe("The search query string")
  }),
  execute: async (args: { query: string }, apiKey: string) => {
    const query = new URLSearchParams({
      exactMatch: 'false',
      query: args.query
    }).toString();

    const response = await fetch(
      getApiUrl(`search/conversations?${query}`),
      {
        method: "GET",
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await handleDixaResponse(response, DixaSearchResponseSchema);
    return JSON.stringify(data);
  }
}; 