import { createContext, useContext } from 'react'
import { useKeys } from '../../hooks/useKeys'
import { useStatus } from '../../hooks/useStatus'
import { useTerminal } from '../../hooks/useTerminal'

export type TerminalUIContextType = {
    size: { width: number; height: number }
    position: { x: number; y: number }
    isDragging: boolean
    isResizing: boolean
    drag: (e: React.MouseEvent) => void
    resize: (e: React.MouseEvent) => void
    input: string
    onChange: (value: string) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isMinimized: boolean
    isMaximized: boolean
    minimize: () => void
    maximize: () => void
    restore: () => void
}

export const TerminalUIContext = createContext<TerminalUIContextType | undefined>(undefined)

export const useTerminalUI = () => {
    const context = useContext(TerminalUIContext)
    if (!context) throw new Error('useTerminalUI must be used within TerminalProvider')
    return context
}

export const useTerminalUIProvider = (
    terminal: ReturnType<typeof useTerminal>
) => {
    const status = useStatus()
    const keys = useKeys(terminal)

    const uiValue: TerminalUIContextType = {
        size: status.size,
        position: status.position,
        isDragging: status.isDragging,
        isResizing: status.isResizing,
        drag: status.drag,
        resize: status.resize,
        input: keys.input,
        onChange: keys.onChange,
        onKeyDown: keys.onKeyDown,
        isMinimized: status.isMinimized,
        isMaximized: status.isMaximized,
        minimize: status.minimize,
        maximize: status.maximize,
        restore: status.restore
    }

    return { uiValue }
}
