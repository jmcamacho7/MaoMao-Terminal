import { describe, it, expect, vi } from 'vitest'
import { parseCommand } from './terminalUtils'

describe('parseCommand', () => {
  it('splits basic command and args', () => {
    const result = parseCommand('copy src dest')
    expect(result).toEqual({ raw: 'copy src dest', cmdName: 'copy', args: ['src', 'dest'] })
  })

  it('handles no args', () => {
    const result = parseCommand('ls')
    expect(result).toEqual({ raw: 'ls', cmdName: 'ls', args: [] })
  })

  it('handles excessive whitespace', () => {
    const result = parseCommand('  copy   src   dest  ')

    const trimmedResult = parseCommand('copy src dest')
    expect(trimmedResult.cmdName).toBe('copy')
  })

  it('throws error if input is not string', () => {
    expect(() => parseCommand(123 as any)).toThrow(TypeError)
  })
})
