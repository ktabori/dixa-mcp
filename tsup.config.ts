import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'src/**/*.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  target: 'node22',
  outDir: 'dist',
  skipNodeModulesBundle: true,
  noExternal: [
    '@modelcontextprotocol/sdk',
    'mcp-proxy'
  ]
}); 