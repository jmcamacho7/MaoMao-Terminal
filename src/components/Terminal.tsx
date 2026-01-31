'use client'

import baseStyles from '../styles/TerminalBase.module.css'
import stateStyles from '../styles/TerminalStates.module.css'
import themeStyles from '../styles/TerminalTheme.module.css'
import React, { useState, useRef, useEffect } from 'react'
import { useTerminalLogic, useTerminalUI } from '../terminal/TerminalProvider'
import TerminalHeader from './TerminalHeader'
import TerminalBody from './TerminalBody'
import TerminalInput from './TerminalInput'

export type TerminalProps = {
  isOpen: boolean
  onClose: () => void
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { history } = useTerminalLogic()

  const {
    size,
    position,
    resize,
    isDragging,
    isResizing,
    isMaximized,
    isMinimized,
    restore
  } = useTerminalUI()

  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true))
      })
    } else {
      setAnimateIn(false)
      timeout = setTimeout(() => {
        setShouldRender(false)
      }, 200)
    }
    return () => clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  useEffect(() => {
    if (isOpen) restore()
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      ref={terminalRef}
      className={`terminal-container
        ${baseStyles.container} 
        ${themeStyles.container} 
        ${!isDragging && !isResizing ? `${stateStyles.transition} terminal-transition` : ''}
        ${animateIn ? stateStyles.visible : stateStyles.hidden}
        ${isMaximized ? stateStyles.maximized : ''}
        ${isMinimized ? stateStyles.minimized : ''}
      `}
      style={{
        width: isMaximized ? undefined : size.width,
        height: isMinimized ? undefined : isMaximized ? undefined : size.height,
        left: isMaximized ? undefined : position.x,
        top: isMaximized ? undefined : position.y,
      }}
    >
      <TerminalHeader onClose={onClose} />

      {!isMinimized && (
        <>
          <TerminalBody history={history} scrollRef={scrollRef} />
          <TerminalInput />
        </>
      )}

      {!isMaximized && (
        <div
          className={`terminal-resize-handle ${baseStyles.resizeHandle} ${themeStyles.resizeHandle}`}
          onMouseDown={resize}
        />
      )}
    </div>
  )
}

export default Terminal
