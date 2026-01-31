# 🐱 MaoMao Terminal

> A dynamic, context-aware, and draggable terminal component for React applications.

[![npm version](https://img.shields.io/npm/v/maomao-terminal.svg)](https://www.npmjs.com/package/maomao-terminal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**MaoMao Terminal** is not just a UI toy; it's a powerful debugging and interaction tool. It allows you to inject commands dynamically from any component in your application tree, making it context-aware.

## ✨ Features

- **Context-Aware**: Register commands from any component using the `useTerminalContext` hook.
- **Draggable & Resizable**: Fully interactive window management (minimize, maximize, drag, resize).
- **Built-in Utilities**: Comes with `inspect`, `location`, `storage`, `time`, and more.
- **Command History**: Navigate through previous commands with Up/Down arrows.
- **Animations**: Smooth transitions powered by Native CSS & Transitions (Zero dependencies).
- **TypeScript**: Fully typed for excellent developer experience.
- **Testing**: Includes a comprehensive test suite (Vitest + React Testing Library) with >90% coverage.

## ✅ Compatibility

| Technology | Support | Note |
|------------|---------|------|
| **React**  | v16.8+  | Requires Hooks support (`useState`, `useEffect`) |
| **Next.js**| v13+    | Fully aligned with App Router (`'use client'`) & Pages Router |
| **Vite**   | All versions | Works out of the box |

## 📦 Installation

This library depends on `react` and `react-dom`.

```bash
# npm
npm install maomao-terminal

# yarn
yarn add maomao-terminal
```

## 🚀 Quick Start

### 1. Wrap your application with `TerminalProvider`

This provider manages the state of global and dynamic commands.

```tsx
import React, { useState } from 'react';
import { TerminalProvider, Terminal } from 'maomao-terminal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TerminalProvider>
      <div className="app-container">
        <button onClick={() => setIsOpen(true)}>Open Terminal</button>
        
        <Terminal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
        
        {/* Your app content */}
      </div>
    </TerminalProvider>
  );
}

export default App;
```

## 💡 Advanced Usage: Dynamic Commands

The real power of MaoMao Terminal lies in its ability to "learn" commands from the components currently rendered on the screen.

Use `useTerminalContext` to register commands that are only available when a specific component is mounted.

```tsx
import { useEffect } from 'react';
import { useTerminalContext } from 'maomao-terminal';

const UserProfile = ({ userId }) => {
  const { registerDynamicCommands, unregisterDynamicCommands } = useTerminalContext();

  useEffect(() => {
    const commands = [
      {
        command: 'getUser',
        response: async (args) => {
          // You can clear data, fetch API, or log info
          return `Current User ID: ${userId}`;
        }
      }
    ];

    // Register a command specific to this component
    registerDynamicCommands(commands);

    // Cleanup when component unmounts
    return () => unregisterDynamicCommands(commands);
  }, [userId, registerDynamicCommands, unregisterDynamicCommands]);

  return <div>User Profile Component</div>;
};
```

Now, when `UserProfile` is on screen, you can type `getUser` in the terminal!

## 🛠 Built-in Commands

| Command | Description | Args |
|---------|-------------|------|
| `help` | Lists available commands | |
| `clear` | Clears the terminal output | |
| `echo` | Repeats your input | `[text]` |
| `inspect` | Inspects global window properties | |
| `location` | Shows current URL | |
| `storage` | Inspects or clears localStorage | `[clear]` |
| `viewport` | Shows window dimensions | |
| `time` | Shows current local time | |
| `about` | Library information | |

## 🎨 Customization

The terminal uses **CSS Modules** internally to avoid class collisions. However, it relies on modern CSS variables for theming if exposed, or you can override specific data attributes if supported in future versions.

For now, as it is zero-dependency, styles are bundled. If you need to override deep styles, you might need to use specific CSS selectors targeting the structure:

- `[class*="terminal-container"]`: The main window
- `[class*="terminal-header"]`: The drag handle
- `[class*="terminal-body"]`: The content area

## 🧪 Testing

If you are contributing, you can run the test suite:

```bash
npm run test
# or for coverage
npm run test:coverage
```

Current coverage is >90% across logic and components.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by **Juan Manuel Camacho Sanchez**
