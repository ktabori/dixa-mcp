/**
 * Configuration for the Dixa MCP server
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const DIXA_API_BASE_URL = process.env.DIXA_API_BASE_URL || 'https://dev.dixa.io/v1';

export function getConfig() {
  const apiKey = process.env.DIXA_API_KEY;
  if (!apiKey) {
    throw new Error('DIXA_API_KEY environment variable is required');
  }
  return { 
    apiKey,
    server: {
      name: 'DixaMCP',
      version: '1.0.0' as const
    }
  };
}

/**
 * Helper to construct API URLs
 */
export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBaseUrl = DIXA_API_BASE_URL.endsWith('/') ? DIXA_API_BASE_URL.slice(0, -1) : DIXA_API_BASE_URL;
  return `${cleanBaseUrl}/${cleanPath}`;
} 