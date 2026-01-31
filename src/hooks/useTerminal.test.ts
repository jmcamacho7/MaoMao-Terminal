import { describe, it, expect, vi } from 'vitest'
import { useTerminal, TerminalCommand } from './useTerminal'
import { renderHook, act } from '@testing-library/react'

describe('useTerminal', () => {
  it('initializes with empty history', () => {
    const { result } = renderHook(() => useTerminal([]))
    expect(result.current.history).toEqual([])
  })

  it('executes a known command', async () => {
    const mockResponse = vi.fn().mockReturnValue('Success')
    const commands: TerminalCommand[] = [{ command: 'test', response: mockResponse }]

    const { result } = renderHook(() => useTerminal(commands))

    await act(async () => {
      await result.current.executeCommand('test arg1')
    })

    expect(mockResponse).toHaveBeenCalledWith(['arg1'])
    expect(result.current.history).toContainEqual({ type: 'input', content: 'test arg1' })
    expect(result.current.history).toContainEqual({ type: 'output', content: 'Success' })
  })

  it('handles unknown command', async () => {
    const { result } = renderHook(() => useTerminal([]))

    await act(async () => {
      await result.current.executeCommand('unknown')
    })

    expect(result.current.history).toContainEqual({
      type: 'output',
      content: expect.stringContaining('Command not found: unknown')
    })
  })

  it('clears history', async () => {
    const { result } = renderHook(() => useTerminal([]))

    await act(async () => {
      await result.current.executeCommand('unknown')
    })
    expect(result.current.history.length).toBeGreaterThan(0)

    act(() => {
      result.current.clearHistory()
    })
    expect(result.current.history).toEqual([])
  })
})
