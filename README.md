# Dixa MCP Server

A FastMCP server implementation for the Dixa API, providing resources and tools for managing conversations and tags.

## Features

- **Resources**
  - Search conversations
  - Get conversation details
  - Get conversation notes
  - Get conversation messages
  - Get available tags

- **Tools**
  - Add tags to conversations
  - Remove tags from conversations

## Project Structure

```
/src
├── dixa.ts              # Main server setup
├── config.ts            # Configuration and environment settings
├── types.ts             # Shared types and error handling
├── resources/           # Resource implementations
├── schemas/            # Zod schemas for validation
└── tools/             # Tool implementations
```

## Configuration

The server requires the following environment variables:

- `DIXA_API_KEY`: Your Dixa API key
- `DIXA_API_BASE_URL` (optional): Override the default API URL (defaults to 'https://dev.dixa.io/v1')

## Usage

1. Set up environment variables:
```bash
   export DIXA_API_KEY='your-api-key'
   ```

2. Start the server:
   ```bash
   npm start
```

## Running Your Server

### Test with `mcp-cli`

The fastest way to test and debug your server is with `fastmcp dev`:

```bash
npx fastmcp dev server.js
npx fastmcp dev server.ts
```

This will run your server with [`mcp-cli`](https://github.com/wong2/mcp-cli) for testing and debugging your MCP server in the terminal.

### Inspect with `MCP Inspector`

Another way is to use the official [`MCP Inspector`](https://modelcontextprotocol.io/docs/tools/inspector) to inspect your server with a Web UI:

```bash
npx fastmcp inspect server.ts
```

## FAQ

### How to use with Claude Desktop?

Follow the guide https://modelcontextprotocol.io/quickstart/user and add the following configuration:

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/src/index.ts"
      ],
      "env": {
        "YOUR_ENV_VAR": "value"
      }
    }
  }
}
```

## Development

### Adding a New Resource

1. Create a schema in `src/schemas/`
2. Create the resource in `src/resources/`
3. Add the resource to `src/dixa.ts`

Example resource:
```typescript
export const myResource = {
  uri: "dixa://my-resource",
  name: "My Resource",
  description: "Description",
  load: async (args: MyArgs, apiKey: string) => {
    // Implementation
  }
};
```

### Adding a New Tool

1. Create the tool in `src/tools/`
2. Add the tool to `src/dixa.ts`

Example tool:
```typescript
export const myTool = {
  name: "My Tool",
  description: "Description",
  execute: async (args: MyArgs, apiKey: string) => {
    // Implementation
  }
};
```

## Error Handling

The project uses custom error classes:
- `DixaError`: Base error class for API errors
- `DixaValidationError`: For response validation failures

## Showcase

> [!NOTE]
>
> If you've developed a server using FastMCP, please [submit a PR](https://github.com/punkpeye/fastmcp) to showcase it here!

- https://github.com/apinetwork/piapi-mcp-server
- https://github.com/Meeting-Baas/meeting-mcp - Meeting BaaS MCP server that enables AI assistants to create meeting bots, search transcripts, and manage recording data

## Acknowledgements

- FastMCP is inspired by the [Python implementation](https://github.com/jlowin/fastmcp) by [Jonathan Lowin](https://github.com/jlowin).
- Parts of codebase were adopted from [LiteMCP](https://github.com/wong2/litemcp).
- Parts of codebase were adopted from [Model Context protocolでSSEをやってみる](https://dev.classmethod.jp/articles/mcp-sse/).

## Contributing

1. Follow the existing patterns for resources and tools
2. Add proper JSDoc documentation
3. Use the shared utilities in `types.ts` and `config.ts`
4. Update the README if adding new features
