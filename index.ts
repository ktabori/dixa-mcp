import { createDixaServer } from "./src/dixa.js";

// Create and start the server
createDixaServer().then(server => {
  server.start();

  // Handle process termination
  const cleanup = () => {
    console.error('Shutting down Dixa MCP server...');
    server.stop().then(() => {
      console.error('Dixa MCP server stopped');
      process.exit(0);
    }).catch(error => {
      console.error('Error stopping server:', error);
      process.exit(1);
    });
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}).catch(error => {
  console.error('Failed to start Dixa MCP server:', error);
  process.exit(1);
}); 