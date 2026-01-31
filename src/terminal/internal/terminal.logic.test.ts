import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTerminalLogicProvider } from './terminal.logic'
import { TerminalCommand } from '../../hooks/useTerminal'

describe('useTerminalLogicProvider', () => {
  it('registers and unregisters dynamic commands', () => {
    const { result } = renderHook(() => useTerminalLogicProvider())

    const cmd1: TerminalCommand = { command: 'dynamic1', response: () => 'ok' }

    const initialCount = result.current.logicValue.globalCommands.length
    expect(result.current.logicValue.dynamicCommands).toHaveLength(0)

    act(() => {
        result.current.logicValue.registerDynamicCommands([cmd1])
    })

    expect(result.current.logicValue.dynamicCommands).toHaveLength(1)
    expect(result.current.logicValue.dynamicCommands[0].command).toBe('dynamic1')

    act(() => {
        result.current.logicValue.unregisterDynamicCommands([cmd1])
    })

    expect(result.current.logicValue.dynamicCommands).toHaveLength(0)
  })
})
