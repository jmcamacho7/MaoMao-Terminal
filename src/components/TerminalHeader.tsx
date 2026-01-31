'use client'

import { CloseButton } from "./icons/Close";
import { MaximizeButton } from "./icons/Maximize";
import { MinimizeButton } from "./icons/Minimize";
import { useTerminalUI } from "../terminal/TerminalProvider";
import baseStyles from '../styles/TerminalBase.module.css'
import brandStyles from '../styles/TerminalBrand.module.css'
import controlStyles from '../styles/TerminalControls.module.css'
import themeStyles from '../styles/TerminalTheme.module.css'

export default function TerminalHeader({ onClose }: { onClose: () => void }) {
  const {
    drag,
    isMaximized,
    isMinimized,
    minimize,
    maximize,
    restore
  } = useTerminalUI()

  return (
    <div
      className={`terminal-header ${baseStyles.header} ${themeStyles.header}`}
      onMouseDown={drag}
    >
      <span className={`terminal-title ${brandStyles.title}`}>
        <span className={`cat-icon ${brandStyles.catIcon} ${brandStyles.brandText}`}>猫</span>
        <span className={`brand-text ${brandStyles.brandText}`}>
          MaoMao<span className={`terminal-suffix ${brandStyles.suffix}`}>_terminal</span>
        </span>
      </span>

      <div className={`terminal-controls ${controlStyles.controls}`}>
        <MinimizeButton onClick={minimize} isMinimized={isMinimized} />
        <MaximizeButton onClick={isMaximized ? restore : maximize} isMaximized={isMaximized} />
        <CloseButton onClose={onClose} />
      </div>
    </div>
  )
}