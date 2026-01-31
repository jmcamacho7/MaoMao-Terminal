import { describe, it, expect } from 'vitest'
import { renderHook, act, fireEvent } from '@testing-library/react'
import { useStatus } from './useStatus'

describe('useStatus', () => {
	it('initializes with default values', () => {
		const { result } = renderHook(() => useStatus())
		expect(result.current.isMinimized).toBe(false)
		expect(result.current.isMaximized).toBe(false)
	})

	it('handles minimize', () => {
		const { result } = renderHook(() => useStatus())
		act(() => {
				result.current.minimize()
		})
		expect(result.current.isMinimized).toBe(true)
		expect(result.current.size.height).toBe(42)
	})

	it('handles maximize', () => {
		const { result } = renderHook(() => useStatus())
		act(() => {
			result.current.maximize()
		})
		expect(result.current.isMaximized).toBe(true)
		expect(result.current.isMinimized).toBe(false)
	})

	it('restores state', () => {
		const { result } = renderHook(() => useStatus())

		act(() => {
			result.current.maximize()
		})
		expect(result.current.isMaximized).toBe(true)

		act(() => {
			result.current.restore()
		})
		expect(result.current.isMaximized).toBe(false)
	})

	it('handles drag interactions', () => {
		const { result } = renderHook(() => useStatus())

		const mouseEvent = { clientX: 150, clientY: 150 } as any

		act(() => {
			result.current.drag(mouseEvent)
		})

		expect(result.current.isDragging).toBe(true)

		act(() => {
			fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
		})

		expect(result.current.position.x).not.toBe(100)

		act(() => {
			fireEvent.mouseUp(window)
		})
		expect(result.current.isDragging).toBe(false)
	})

	it('handles resize interactions', () => {
		const { result } = renderHook(() => useStatus())
		const initialHeight = result.current.size.height

		act(() => {
			result.current.resize({ clientX: 550, clientY: 350 } as any)
		})
		expect(result.current.isResizing).toBe(true)

		act(() => {
			fireEvent.mouseMove(window, { clientX: 600, clientY: 400 })
		})

		expect(result.current.size.height).toBeGreaterThan(initialHeight)

		act(() => {
			fireEvent.mouseUp(window)
		})
		expect(result.current.isResizing).toBe(false)
	})
})
