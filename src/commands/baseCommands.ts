import { TerminalCommand } from '../hooks/useTerminal'

export const baseCommands: TerminalCommand[] = [
  {
    command: 'echo',
    response: args => args.join(' '),
  },
  {
    command: 'help',
    response: () =>
      `\nAvailable commands:\n` +
      `  clear      → Clear the console\n` +
      `  echo       → Echo input\n` +
      `  help       → Show this help message\n` +
      `  inspect    → Show current page info\n` +
      `  location   → Show current URL\n` +
      `  reload     → Refresh the page\n` +
      `  storage    → Show localStorage keys (or 'storage clear')\n` +
      `  userAgent  → Show browser user agent\n` +
      `  viewport   → Show window dimensions\n` +
      `  time       → Show current local time\n`,
  },
  {
    command: 'inspect',
    response: () => {
      const keys = Object.keys(window)
      return `Window properties (${keys.length}):\n${keys.slice(0, 20).join(', ')}${keys.length > 20 ? ', ...' : ''
        }`
    },
  },
  {
    command: 'location',
    response: () => `Current URL: ${window.location.href}`,
  },
  {
    command: 'userAgent',
    response: () => `Browser user agent:\n${navigator.userAgent}`,
  },
  {
    command: 'time',
    response: () => `Current time: ${new Date().toLocaleTimeString()}`,
  },
  {
    command: 'viewport',
    response: () => `Viewport: ${window.innerWidth} x ${window.innerHeight} px`,
  },
  {
    command: 'reload',
    response: () => {
      window.location.reload()
      return 'Reloading...'
    },
  },
  {
    command: 'storage',
    response: (args: string[]) => {
      if (args[0] === 'clear') {
        localStorage.clear()
        return 'LocalStorage cleared.'
      }
      const keys = Object.keys(localStorage)
      if (keys.length === 0) return 'LocalStorage is empty.'
      return `LocalStorage keys (${keys.length}):\n- ${keys.join('\n- ')}`
    },
  },
  {
    command: 'about',
    response: () => `
    /\\_/\\
   ( o.o )   MaoMao Terminal v1.0.4
    > ^ <    Context-Aware Debugging

   [==================================]

   A dynamic overlay to inject commands
   directly from your React components.

   > "Code like a cat: agile and precise."

   Type 'help' to start.

   (c) Juan Manuel Camacho Sanchez
    `
  },
]
