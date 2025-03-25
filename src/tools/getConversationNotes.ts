import { z } from "zod";
import { DixaNotesResponseSchema } from "../schemas/getDixaConversationNotes.js";
import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";

/**
 * Tool for retrieving notes from a specific conversation in Dixa
 * 
 * This tool fetches all internal notes associated with a conversation.
 * 
 * @example
 * ```typescript
 * const result = await getDixaConversationNotesTool.execute({ 
 *   conversationId: "123" 
 * }, apiKey);
 * const notes = JSON.parse(result);
 * console.log(notes.data); // Array of notes
 * ```
 */
export const getDixaConversationNotesTool = {
  name: "Get Dixa Conversation Notes",
  description: "Get internal notes for a specific conversation",
  parameters: z.object({
    conversationId: z.string().describe("The ID of the conversation to retrieve notes for")
  }),
  execute: async (args: { conversationId: string }, apiKey: string) => {
    const response = await fetch(
      getApiUrl(`conversations/${args.conversationId}/notes`),
      {
        method: "GET",
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await handleDixaResponse(response, DixaNotesResponseSchema);
    return JSON.stringify(data);
  }
}; 