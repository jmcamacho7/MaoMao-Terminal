'use client'

import { ReactNode } from 'react'
import { TerminalCommand } from '../hooks/useTerminal'
import { TerminalLogicContext, useTerminalLogicProvider, useTerminalLogic } from './internal/terminal.logic'
import { TerminalUIContext, useTerminalUIProvider, useTerminalUI } from './internal/terminal.ui'

export type TerminalContextType = {
  globalCommands: TerminalCommand[]
  dynamicCommands: TerminalCommand[]
  registerDynamicCommands: (commands: TerminalCommand[]) => void
  unregisterDynamicCommands: (commands: TerminalCommand[]) => void
}

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const { logicValue, terminal } = useTerminalLogicProvider()
  const { uiValue } = useTerminalUIProvider(terminal)

  return (
    <TerminalLogicContext.Provider value={logicValue}>
      <TerminalUIContext.Provider value={uiValue}>
        {children}
      </TerminalUIContext.Provider>
    </TerminalLogicContext.Provider>
  )
}

export { useTerminalLogic, useTerminalUI }

export const useTerminalContext = (): TerminalContextType => {
  const logic = useTerminalLogic()
  return {
    globalCommands: logic.globalCommands,
    dynamicCommands: logic.dynamicCommands,
    registerDynamicCommands: logic.registerDynamicCommands,
    unregisterDynamicCommands: logic.unregisterDynamicCommands
  }
}
