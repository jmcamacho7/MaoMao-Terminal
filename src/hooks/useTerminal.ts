'use client'

import { useState } from 'react'
import { useTerminalContext } from '../context/TerminalProvider'

export interface TerminalCommand {
  command: string
  response: (args: string[]) => string | Promise<string>
}

export function useTerminal() {
  const { globalCommands, dynamicCommands } = useTerminalContext()
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const executeCommand = async (input: string) => {
    if (!input.trim()) return

    const parts = input.trim().split(/\s+/)
    const cmdName = parts[0]
    const args = parts.slice(1)

    // Add to command history for navigation
    setCommandHistory(prev => [...prev, input])

    if (cmdName === 'clear') {
      setHistory([])
      return
    }

    const cmd = [...dynamicCommands, ...globalCommands].find(c => c.command === cmdName)

    let result: string
    if (cmd) result = await cmd.response(args)
    else result = `Command not found: ${cmdName}`

    setHistory(prev => [...prev, `$ ${input}`, result])
    return result
  }

  const clearHistory = () => setHistory([])

  return { history, commandHistory, executeCommand, clearHistory }
}
