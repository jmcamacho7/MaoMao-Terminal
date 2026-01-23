# MaoMao Terminal 🐱

> A lightweight, draggable, and resizable terminal component for React applications.

Maomao Terminal provides a fully functional, retro-styled terminal interface for your React apps. It supports command history, draggable/resizable windows, and a powerful system for registering global and dynamic commands.

## Features

- 📦 **Draggable & Resizable**: Full window control with a floating interface.
- ⌨️ **Command Support**: Built-in command system with support for custom dynamic commands.
- 🎨 **Customizable**: Easy styling via CSS variables and class overrides.
- ⚡ **Lightweight**: Built with React and Framer Motion for smooth animations.

## Installation

```bash
npm install maomao framer-motion
# or
yarn add maomao framer-motion
```

*Note: `framer-motion` is a peer dependency.*

## Quick Start

### 1. Wrap your app in the provider

```tsx
import { TerminalProvider } from 'maomao';

function App() {
  return (
    <TerminalProvider>
      <YourApplication />
    </TerminalProvider>
  );
}
```

### 2. Add the Terminal component

```tsx
import { useState } from 'react';
import { Terminal } from 'maomao';
import 'maomao/dist/components/Terminal.css'; // Don't forget the styles!

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Terminal</button>
      
      <Terminal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
}
```

## Adding Custom Commands

You can register commands globally or dynamically within your components using `useTerminalContext`.

```tsx
import { useEffect } from 'react';
import { useTerminalContext, TerminalCommand } from 'maomao';

const MyComponent = () => {
  const { registerDynamicCommands, unregisterDynamicCommands } = useTerminalContext();

  useEffect(() => {
    const myCommands: TerminalCommand[] = [
      {
        command: 'greet',
        response: (args) => `Hello, ${args[0] || 'stranger'}! 👋`
      },
      {
        command: 'fetch-data',
        response: async () => {
          const data = await fetch('/api/data').then(res => res.json());
          return JSON.stringify(data, null, 2);
        }
      }
    ];

    registerDynamicCommands(myCommands);

    // Cleanup when component unmounts
    return () => unregisterDynamicCommands(myCommands);
  }, [registerDynamicCommands, unregisterDynamicCommands]);

  return <div>Component with special commands</div>;
};
```

## Styling

Maomao uses standard CSS classes that you can override in your own stylesheets.

| Class | Description |
|-------|-------------|
| `.terminal-container` | Main wrapper, controls background, border, shadow |
| `.terminal-header` | Top bar (draggable area) |
| `.terminal-body` | Content area with command history |
| `.terminal-input-wrapper` | Area containing the prompt ($) and input |
| `.terminal-resize-handle` | The handle in the bottom-right corner |

## API Reference

### `<Terminal />`

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Controls visibility of the terminal |
| `onClose` | `() => void` | Callback fired when the close button is clicked |

### `TerminalCommand` Type

```typescript
type TerminalCommand = {
  command: string;
  response: (args: string[]) => string | Promise<string>;
}
```

## License

MIT
