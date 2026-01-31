import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useKeys } from './useKeys'
import React from 'react'

const mockTerminal = {
  history: [],
  commandHistory: [],
  executeCommand: vi.fn(),
  clearHistory: vi.fn()
}

describe('useKeys', () => {
  it('handles input change', () => {
    const { result } = renderHook(() => useKeys(mockTerminal as any))

    act(() => {
      result.current.onChange('test')
    })

    expect(result.current.input).toBe('test')
  })

  it('handles Enter key to submit command', () => {
    const executeMock = vi.fn()
    const terminal = { ...mockTerminal, executeCommand: executeMock }
    const { result } = renderHook(() => useKeys(terminal as any))

    act(() => {
      result.current.onChange(' my command ')
    })

    act(() => {
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as React.KeyboardEvent<HTMLInputElement>
      result.current.onKeyDown(event)
    })

    expect(executeMock).toHaveBeenCalledWith('my command')
    expect(result.current.input).toBe('')
  })

  it('does not submit empty command', () => {
    const executeMock = vi.fn()
    const terminal = { ...mockTerminal, executeCommand: executeMock }
    const { result } = renderHook(() => useKeys(terminal as any))

    act(() => {
      result.current.onChange('   ')
    })

    act(() => {
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as React.KeyboardEvent<HTMLInputElement>
      result.current.onKeyDown(event)
    })

    expect(executeMock).not.toHaveBeenCalled()
  })

  it('navigates history with ArrowUp and ArrowDown', () => {
    const history = ['cmd1', 'cmd2', 'cmd3']
    const terminal = { ...mockTerminal, commandHistory: history }
    const { result } = renderHook(() => useKeys(terminal as any))

    act(() => {
      result.current.onKeyDown({ key: 'ArrowUp', preventDefault: vi.fn() } as any)
    })
    expect(result.current.input).toBe('cmd3')

    act(() => {
      result.current.onKeyDown({ key: 'ArrowUp', preventDefault: vi.fn() } as any)
    })
    expect(result.current.input).toBe('cmd2')

    act(() => {
      result.current.onKeyDown({ key: 'ArrowDown', preventDefault: vi.fn() } as any)
    })
    expect(result.current.input).toBe('cmd3')
    act(() => {
      result.current.onKeyDown({ key: 'ArrowDown', preventDefault: vi.fn() } as any)
    })
    expect(result.current.input).toBe('')
  })
})
