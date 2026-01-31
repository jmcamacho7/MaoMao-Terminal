import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MinimizeButton } from './Minimize'

vi.mock('../../styles/TerminalControls.module.css', () => ({ default: { button: 'button-class' } }))

describe('MinimizeButton', () => {
  it('renders and calls onClick', () => {
    const handleClick = vi.fn()
    render(<MinimizeButton onClick={handleClick} isMinimized={false} />)

    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalled()
  })

  it('shows correct title', () => {
    const { rerender } = render(<MinimizeButton onClick={() => { }} isMinimized={false} />)
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Minimize')

    rerender(<MinimizeButton onClick={() => { }} isMinimized={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Restore')
  })
})
