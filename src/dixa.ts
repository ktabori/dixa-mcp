/**
 * This is a complete example of an MCP server for the Dixa API.
 * It provides resources for reading conversations, messages, and notes,
 * as well as tools for managing conversation tags.
 */
import { FastMCP } from "./FastMCP.js";
import { getConfig } from "./config.js";
import { getDixaTags } from "./resources/getDixaTags.js";
import { searchDixaConversationsTool } from "./tools/searchConversations.js";
import { getDixaConversationTool } from "./tools/getConversation.js";
import { getDixaConversationNotesTool } from "./tools/getConversationNotes.js";
import { getDixaConversationMessagesTool } from "./tools/getConversationMessages.js";
import { addDixaConversationTagTool, removeDixaConversationTagTool } from "./tools/conversationTags.js";

// Get configuration
const config = getConfig();

export async function createDixaServer() {
  const server = new FastMCP({
    ...config.server
  });

  // Add simple resource for getting tags (no parameters needed)
  server.addResource({
    ...getDixaTags,
    load: () => getDixaTags.load({}, config.apiKey)
  });

  // Add tools for operations that require parameters
  server.addTool({
    ...searchDixaConversationsTool,
    execute: (args) => searchDixaConversationsTool.execute(args, config.apiKey)
  });
  server.addTool({
    ...getDixaConversationTool,
    execute: (args) => getDixaConversationTool.execute(args, config.apiKey)
  });
  server.addTool({
    ...getDixaConversationNotesTool,
    execute: (args) => getDixaConversationNotesTool.execute(args, config.apiKey)
  });
  server.addTool({
    ...getDixaConversationMessagesTool,
    execute: (args) => getDixaConversationMessagesTool.execute(args, config.apiKey)
  });
  server.addTool({
    ...addDixaConversationTagTool,
    execute: (args) => addDixaConversationTagTool.execute(args, config.apiKey)
  });
  server.addTool({
    ...removeDixaConversationTagTool,
    execute: (args) => removeDixaConversationTagTool.execute(args, config.apiKey)
  });

  return server;
}

// Start the server when this file is run directly
if (process.argv[1] === import.meta.url.substring(7)) {
  createDixaServer().then(server => {
    server.start();
  }).catch(error => {
    console.error('Failed to start Dixa MCP server:', error);
    process.exit(1);
  });
}
