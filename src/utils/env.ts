/**
 * Retrieves an environment variable from `import.meta.env`.
 *
 * Overloads:
 * - If `required` is true, it returns a `string` and throws an error if the variable is missing.
 * - If `required` is false or not specified, it returns `string | null`.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param required - Whether the variable is required. Defaults to false.
 * @returns The environment variable value as a `string` or `null`, depending on `required`.
 * @throws Error if the variable is required but not set.
 *
 * @example
 * const apiKey = getEnv('VITE_API_KEY', true); // string
 * const optionalValue = getEnv('VITE_OPTIONAL'); // string | null
 */
export function getEnv(key: string, required: true): string;
export function getEnv(key: string, required?: false): string | null;

export function getEnv(key: string, required: boolean = false): string | null {
  const value = import.meta.env[key] as string | undefined;

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? null;
}
