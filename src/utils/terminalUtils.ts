/**
 * Parses an input string into a command and arguments.
 * - Normalizes spaces
 * - Avoids undefined values
 * - Returns an explicit structure
 */
export function parseCommand(input: string) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string')
  const parts = input.split(/\s+/)
  return {
    raw: input,
    cmdName: parts[0],
    args: parts.slice(1)
  }
}
