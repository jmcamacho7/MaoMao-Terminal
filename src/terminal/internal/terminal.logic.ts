import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { TerminalCommand, useTerminal } from '../../hooks/useTerminal'
import { baseCommands } from '../../commands/baseCommands'

export type TerminalLogicContextType = {
  globalCommands: TerminalCommand[]
  dynamicCommands: TerminalCommand[]
  registerDynamicCommands: (commands: TerminalCommand[]) => void
  unregisterDynamicCommands: (commands: TerminalCommand[]) => void
  history: string[]
  executeCommand: (input: string) => Promise<string | undefined>
  clearHistory: () => void
}

export const TerminalLogicContext = createContext<TerminalLogicContextType | undefined>(undefined)

export const useTerminalLogic = () => {
  const context = useContext(TerminalLogicContext)
  if (!context) throw new Error('useTerminalLogic must be used within TerminalProvider')
  return context
}

export const useTerminalLogicProvider = () => {
  const [dynamicCommands, setDynamicCommands] = useState<TerminalCommand[]>([])
  const globalCommands = useMemo(() => baseCommands, [])

  const allCommands = useMemo(() => [...dynamicCommands, ...globalCommands], [dynamicCommands, globalCommands])

  const terminal = useTerminal(allCommands)

  const registerDynamicCommands = useCallback((commands: TerminalCommand[]) => {
    setDynamicCommands(prev => {
      const existingCommands = new Set(prev.map(c => c.command))
      const newCommands = commands.filter(c => !existingCommands.has(c.command))
      return [...prev, ...newCommands]
    })
  }, [])

  const unregisterDynamicCommands = useCallback((commands: TerminalCommand[]) => {
    const toRemove = new Set(commands.map(c => c.command))
    setDynamicCommands(prev => prev.filter(c => !toRemove.has(c.command)))
  }, [])

  const logicValue: TerminalLogicContextType = {
    globalCommands,
    dynamicCommands,
    registerDynamicCommands,
    unregisterDynamicCommands,
    history: terminal.history,
    executeCommand: terminal.executeCommand,
    clearHistory: terminal.clearHistory
  }

  return { logicValue, terminal }
}
