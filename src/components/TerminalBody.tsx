import { TerminalHistoryItem } from '../hooks/useTerminal'
import baseStyles from '../styles/TerminalBase.module.css'
import scrollbarStyles from '../styles/TerminalScrollbar.module.css'
import themeStyles from '../styles/TerminalTheme.module.css'

type TerminalBodyProps = {
  history: TerminalHistoryItem[]
  scrollRef: React.RefObject<HTMLDivElement>
}

export default function TerminalBody({ history, scrollRef }: TerminalBodyProps) {
  return (
    <div
      ref={scrollRef}
      className={`terminal-body terminal-scrollbar ${baseStyles.body} ${themeStyles.body} ${scrollbarStyles.scrollbar}`}
    >
      {history.map((item, i) => (
        <div key={i} className={`terminal-line ${baseStyles.line}`}>
          {item.type === 'input' && (
            <span className={`terminal-prompt ${themeStyles.prompt}`}>&gt;</span>
          )}
          {item.content}
        </div>
      ))}
    </div>
  )
}