
import { useTerminalUI } from '../terminal/TerminalProvider'
import baseStyles from '../styles/TerminalBase.module.css'
import themeStyles from '../styles/TerminalTheme.module.css'

export default function TerminalInput() {
  const { input, onChange, onKeyDown } = useTerminalUI()

  return (
    <div className={`terminal-input-wrapper ${baseStyles.inputWrapper} ${themeStyles.inputWrapper}`}>
      <span className={`terminal-prompt ${themeStyles.prompt}`}>$</span>
      <input
        className={`terminal-input ${baseStyles.input}`}
        autoFocus
        placeholder="Type a command..."
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
