import { z } from 'zod';

/**
 * Base error class for Dixa API errors
 */
export class DixaError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseText?: string
  ) {
    super(message);
    this.name = 'DixaError';
  }
}

/**
 * Error thrown when API response validation fails
 */
export class DixaValidationError extends DixaError {
  constructor(
    message: string,
    public zodError: z.ZodError
  ) {
    super(message);
    this.name = 'DixaValidationError';
  }
}

/**
 * Common response type for Dixa API errors
 */
export const DixaErrorResponseSchema = z.object({
  message: z.string()
});

export type DixaErrorResponse = z.infer<typeof DixaErrorResponseSchema>;

/**
 * Helper function to handle API responses
 */
export async function handleDixaResponse<T>(
  response: Response,
  schema: z.ZodType<T>
): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = DixaErrorResponseSchema.parse(JSON.parse(errorText));
      throw new DixaError(errorData.message, response.status, errorText);
    } catch (e) {
      if (e instanceof DixaError) throw e;
      throw new DixaError(
        `API error: ${response.status} ${response.statusText}`,
        response.status,
        errorText
      );
    }
  }

  const data = await response.json();
  try {
    return schema.parse(data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new DixaValidationError('Invalid response format', e);
    }
    throw e;
  }
} 