import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MaximizeButton } from './Maximize'

vi.mock('../../styles/TerminalControls.module.css', () => ({ default: { button: 'button-class' } }))

describe('MaximizeButton', () => {
  it('renders and calls onClick', () => {
    const handleClick = vi.fn()
    render(<MaximizeButton onClick={handleClick} isMaximized={false} />)

    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalled()
  })

  it('shows correct title and icon', () => {
    const { rerender } = render(<MaximizeButton onClick={() => { }} isMaximized={false} />)
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Maximize')

    rerender(<MaximizeButton onClick={() => { }} isMaximized={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Restore')
  })
})
