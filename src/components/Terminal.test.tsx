import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TerminalProvider } from '../terminal/TerminalProvider'
import Terminal from './Terminal'

vi.mock('../styles/TerminalBase.module.css', () => ({ default: { container: 'base-container' } }))
vi.mock('../styles/TerminalStates.module.css', () => ({ default: { visible: 'visible', hidden: 'hidden' } }))
vi.mock('../styles/TerminalTheme.module.css', () => ({ default: { container: 'theme-container' } }))
vi.mock('../styles/TerminalBrand.module.css', () => ({ default: {} }))
vi.mock('../styles/TerminalControls.module.css', () => ({ default: {} }))

describe('Terminal Component', () => {
  it('renders nothing when closed', () => {
    render(
      <TerminalProvider>
        <Terminal isOpen={false} onClose={() => { }} />
      </TerminalProvider>
    )
    const element = screen.queryByText('MaoMao')
    expect(element).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(
      <TerminalProvider>
        <Terminal isOpen={true} onClose={() => { }} />
      </TerminalProvider>
    )
    const element = screen.getByText('MaoMao')
    expect(element).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(
      <TerminalProvider>
        <Terminal isOpen={true} onClose={handleClose} />
      </TerminalProvider>
    )

    const buttons = screen.getAllByRole('button')
    const closeBtn = buttons[buttons.length - 1]
    fireEvent.click(closeBtn)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
