import React from 'react'
import baseStyles from '../styles/TerminalBase.module.css'
import scrollbarStyles from '../styles/TerminalScrollbar.module.css'
import themeStyles from '../styles/TerminalTheme.module.css'

type TerminalBodyProps = {
  history: string[]
  scrollRef: React.RefObject<HTMLDivElement>
}

export default function TerminalBody({ history, scrollRef }: TerminalBodyProps) {
  return (
    <div
      ref={scrollRef}
      className={`terminal-body terminal-scrollbar ${baseStyles.body} ${themeStyles.body} ${scrollbarStyles.scrollbar}`}
    >
      {history.map((line, i) => (
        <div key={i} className={`terminal-line ${baseStyles.line}`}>
          <span className={`terminal-prompt ${themeStyles.prompt}`}>&gt;</span>
          {line}
        </div>
      ))}
    </div>
  )
}