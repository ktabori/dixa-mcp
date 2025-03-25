import { handleDixaResponse } from "../types.js";
import { getApiUrl } from "../config.js";
import { DixaTagsResponseSchema } from "../schemas/getDixaTags.js";

/**
 * Resource for retrieving all available tags in Dixa
 * 
 * This resource fetches all tags that can be used to categorize conversations.
 * 
 * @example
 * ```typescript
 * const result = await getDixaTags.load({}, apiKey);
 * const tags = JSON.parse(result.text);
 * console.log(tags.data); // Array of tags
 * ```
 */
export const getDixaTags = {
  uri: "dixa://tags",
  name: "Get Dixa Tags",
  description: "Get all available tags in Dixa",
  load: async (_args: Record<string, never>, apiKey: string) => {
    const response = await fetch(
      getApiUrl("tags"),
      {
        method: "GET",
        headers: {
          Authorization: apiKey
        }
      }
    );

    const data = await handleDixaResponse(response, DixaTagsResponseSchema);
    return {
      text: JSON.stringify(data)
    };
  }
}; 