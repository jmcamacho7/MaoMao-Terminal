import { useCallback, useState } from "react"
import { useTerminal } from "./useTerminal"

export function useKeys() {
  const [input, setInput] = useState("")
  const [historyPointer, setHistoryPointer] = useState<number | null>(null)
  const { history, commandHistory, executeCommand } = useTerminal()

  const handleEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = input.trim()
    if (!value) return

    executeCommand(value)
    setInput("")
    setHistoryPointer(null)
  }, [input, executeCommand])

  const handleArrowUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (commandHistory.length === 0) return

    setHistoryPointer(prev => {
      const next =
        prev === null
          ? commandHistory.length - 1
          : Math.max(0, prev - 1)

      setInput(commandHistory[next])
      return next
    })
  }, [commandHistory])

  const handleArrowDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    setHistoryPointer(prev => {
      if (prev === null) return null

      const next = prev + 1
      if (next >= commandHistory.length) {
        setInput("")
        return null
      }

      setInput(commandHistory[next])
      return next
    })
  }, [commandHistory])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          handleEnter(e)
          break
        case "ArrowUp":
          handleArrowUp(e)
          break
        case "ArrowDown":
          handleArrowDown(e)
          break
      }
    },
    [handleEnter, handleArrowUp, handleArrowDown]
  )

  return {
    input,
    onKeyDown: handleKeyDown,
    onChange: setInput,
    history
  }
}
