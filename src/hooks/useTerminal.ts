'use client'

import { useState } from 'react'
import { parseCommand } from '../utils/terminalUtils'


export interface TerminalCommand {
  command: string
  response: (args: string[]) => string | Promise<string>
}

export type TerminalHistoryItem = {
  type: 'input' | 'output'
  content: string
}

export function useTerminal(commands: TerminalCommand[]) {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const executeCommand = async (input: string) => {
    if (!input.trim()) return

    const { cmdName, args } = parseCommand(input)
    setCommandHistory(prev => [...prev, input])

    if (cmdName === 'clear') { setHistory([]); return }

    const command = commands.find(c => c.command === cmdName)
    const result: string = command
      ? await command.response(args)
      : `Command not found: ${cmdName}`

    setHistory(prev => [
      ...prev,
      { type: 'input', content: input },
      { type: 'output', content: result }
    ])
    return result
  }

  const clearHistory = () => setHistory([])

  return { history, commandHistory, executeCommand, clearHistory }
}
