'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal } from '../hooks/useTerminal'
import { useStatus } from '../hooks/useStatus'
import { CloseButton } from './icons/Close'
import { MaximizeButton } from './icons/Maximize'
import { MinimizeButton } from './icons/Minimize'
import './Terminal.css'

export type TerminalProps = {
  isOpen: boolean
  onClose: () => void
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [historyPointer, setHistoryPointer] = useState<number | null>(null)
  const { history, commandHistory, executeCommand } = useTerminal()
  const {
    size,
    position,
    drag,
    resize,
    isMaximized,
    isMinimized,
    minimize,
    maximize,
    restore
  } = useStatus()

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        enter(e)
        break
      case 'ArrowUp':
        arrowUp(e)
        break
      case 'ArrowDown':
        arrowDown(e)
        break
    }
  }

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    executeCommand(input)
    setInput('')
    setHistoryPointer(null)
  }

  const arrowUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (commandHistory.length === 0) return

    const newPointer = historyPointer === null
      ? commandHistory.length - 1
      : Math.max(0, historyPointer - 1)

    setHistoryPointer(newPointer)
    setInput(commandHistory[newPointer])
  }

  const arrowDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (historyPointer === null) return

    const newPointer = historyPointer + 1
    if (newPointer >= commandHistory.length) {
      setHistoryPointer(null)
      setInput('')
    } else {
      setHistoryPointer(newPointer)
      setInput(commandHistory[newPointer])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={terminalRef}
          className="terminal-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: isMaximized ? window.innerWidth : size.width,
            height: isMinimized ? 42 : isMaximized ? window.innerHeight : size.height,
            left: isMaximized ? 0 : position.x,
            top: isMaximized ? 0 : position.y,
            borderRadius: isMaximized ? 0 : 8
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        >
          <div className="terminal-header" onMouseDown={drag}>
            <span className="terminal-title">
              <span className="w-3 h-3 rounded-full bg-red-500 block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
              <span className="w-3 h-3 rounded-full bg-green-500 block" />
              <span style={{ marginLeft: 8 }}>MaoMaoTerminal:~</span>
            </span>

            <div className="terminal-controls">
              <MinimizeButton onClick={minimize} isMinimized={isMinimized} />
              <MaximizeButton onClick={isMaximized ? restore : maximize} isMaximized={isMaximized} />
              <CloseButton onClose={onClose} />
            </div>
          </div>

          <div ref={scrollRef} className="terminal-body terminal-scrollbar">
            {history.map((line, i) => (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">➜</span>
                {line}
              </div>
            ))}
          </div>

          <div className="terminal-input-wrapper">
            <span className="terminal-prompt">$</span>
            <input
              className="terminal-input"
              autoFocus
              placeholder="Type a command..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {!isMaximized && !isMinimized && (
            <div className="terminal-resize-handle" onMouseDown={resize} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Terminal
