'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react'
import { TerminalCommand } from '../hooks/useTerminal'
import { baseCommands } from '../commands/baseCommands'

type TerminalContextType = {
  globalCommands: TerminalCommand[]
  dynamicCommands: TerminalCommand[]
  registerDynamicCommands: (commands: TerminalCommand[]) => void
  unregisterDynamicCommands: (commands: TerminalCommand[]) => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [dynamicCommands, setDynamicCommands] = useState<TerminalCommand[]>([])
  const globalCommands = useMemo(() => baseCommands, [])

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

  return (
    <TerminalContext.Provider
      value={{ globalCommands, dynamicCommands, registerDynamicCommands, unregisterDynamicCommands }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export const useTerminalContext = () => {
  const context = useContext(TerminalContext)
  if (!context) throw new Error('useTerminalContext must be used within TerminalProvider')
  return context
}
