import { useRef, useState, useEffect, useCallback } from "react"

export function useStatus() {
  const MIN_HEIGHT = 42;
  const MIN_WIDTH = 300;

  const [size, setSize] = useState({ width: 500, height: 300 })
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const isDraggingRef = useRef(false)
  const isResizingRef = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const lastFloatingSize = useRef({ width: 500, height: 300 })
  const lastFloatingPosition = useRef({ x: 100, y: 100 })

  useEffect(() => {
    if (!isMaximized && !isMinimized) {
      lastFloatingSize.current = size;
      lastFloatingPosition.current = position;
    }
  }, [size, position, isMaximized, isMinimized]);

  const dragTo = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return
    setPosition({
      x: Math.min(Math.max(0, e.clientX - dragStart.current.x), window.innerWidth - size.width),
      y: Math.min(Math.max(0, e.clientY - dragStart.current.y), window.innerHeight - size.height)
    })
  }, [size])

  const resizeTo = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return
    setSize({
      width: Math.max(MIN_WIDTH, resizeStart.current.width + (e.clientX - resizeStart.current.x)),
      height: Math.max(MIN_HEIGHT, resizeStart.current.height + (e.clientY - resizeStart.current.y))
    })
  }, [])

  const end = useCallback(() => {
    isDraggingRef.current = false
    isResizingRef.current = false
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDraggingRef.current) dragTo(e)
      if (isResizingRef.current) resizeTo(e)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', end)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', end)
    }
  }, [dragTo, resizeTo, end])

  const minimize = () => {
    setIsMinimized(true)
    setIsMaximized(false)
    setSize(prev => ({ ...prev, height: MIN_HEIGHT }))
  }

  const maximize = () => {
    setIsMaximized(true)
    setIsMinimized(false)
    setPosition({ x: 0, y: 0 })
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const restore = () => {
    setSize(lastFloatingSize.current)
    setPosition(lastFloatingPosition.current)
    setIsMinimized(false)
    setIsMaximized(false)
  }

  const drag = (e: React.MouseEvent) => {
    if (isMaximized) return 
    isDraggingRef.current = true
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const resize = (e: React.MouseEvent) => {
    if (isMaximized || isMinimized) return
    isResizingRef.current = true
    resizeStart.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height }
  }

  return { 
    size, position, isMinimized, isMaximized, 
    drag, resize, minimize, maximize, restore 
  }
}