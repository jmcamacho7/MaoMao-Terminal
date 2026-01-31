import { describe, it, expect, vi } from 'vitest'
import { baseCommands } from './baseCommands'

const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
    href: 'http://localhost/'
  },
  writable: true
})

const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
  removeItem: vi.fn()
}

Object.defineProperties(localStorageMock, {
  getItem: { enumerable: false },
  setItem: { enumerable: false },
  clear: { enumerable: false },
  length: { enumerable: false },
  key: { enumerable: false },
  removeItem: { enumerable: false },
  store: { enumerable: false }
})

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

describe('baseCommands', () => {
  const getCmd = (name: string) => baseCommands.find(c => c.command === name)!

  it('echoes input', async () => {
    const echo = getCmd('echo')
    expect(echo.response(['hello', 'world'])).toBe('hello world')
  })

  it('shows help', async () => {
    const help = getCmd('help')
    const output = await help.response([]) as string
    expect(output).toContain('Available commands')
    expect(output).toContain('echo')
  })

  it('shows location', async () => {
    const location = getCmd('location')
    expect(await location.response([])).toBe('Current URL: http://localhost/')
  })

  it('reloads page', async () => {
    const reload = getCmd('reload')
    expect(await reload.response([])).toBe('Reloading...')
    expect(mockReload).toHaveBeenCalled()
  })

  it('shows time', async () => {
    const time = getCmd('time')
    const output = await time.response([]) as string
    expect(output).toContain('Current time')
  })

  it('shows userAgent', async () => {
    const ua = getCmd('userAgent')
    expect(await ua.response([])).toContain('Browser user agent')
  })

  it('shows viewport', async () => {
    const vp = getCmd('viewport')
    expect(await vp.response([])).toContain('Viewport')
  })

  it('handles storage command', async () => {
    const storage = getCmd('storage')

    expect(await storage.response([])).toBe('LocalStorage is empty.')

    const ls = window.localStorage as any
    ls['token'] = '123'
    ls['theme'] = 'dark'

    const response = await storage.response([]) as string
    expect(response).toContain('LocalStorage keys (2)')
    expect(response).toContain('token')
    expect(response).toContain('theme')

    const clearResp = await storage.response(['clear'])
    expect(clearResp).toBe('LocalStorage cleared.')
    expect(ls.clear).toHaveBeenCalled()

    delete ls['token']
    delete ls['theme']
  })

  it('inspects window', async () => {
    const inspect = getCmd('inspect')
    const output = await inspect.response([]) as string
    expect(output).toContain('Window properties')
  })
})
