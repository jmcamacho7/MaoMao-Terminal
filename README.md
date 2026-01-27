# 🐱 MaoMao Terminal v1.0.2

> A dynamic, context-aware, and draggable terminal component for React applications.

[![npm version](https://img.shields.io/npm/v/maomao-terminal.svg)](https://www.npmjs.com/package/maomao-terminal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**MaoMao Terminal** is not just a UI toy; it's a powerful debugging and interaction tool. It allows you to inject commands dynamically from any component in your application tree, making it context-aware.

## ✨ Features

- **Context-Aware**: Register commands from any component using the `useTerminalContext` hook.
- **Draggable & Resizable**: Fully interactive window management (minimize, maximize, drag, resize).
- **Built-in Utilities**: Comes with `inspect`, `location`, `storage`, `time`, and more.
- **Command History**: Navigate through previous commands with Up/Down arrows.
- **Animations**: Smooth transitions powered by `framer-motion`.
- **TypeScript**: Fully typed for excellent developer experience.

## ✅ Compatibility

| Technology | Support | Note |
|------------|---------|------|
| **React**  | v16.8+  | Requires Hooks support (`useState`, `useEffect`) |
| **Next.js**| v13+    | Fully aligned with App Router (`'use client'`) & Pages Router |
| **Vite**   | All versions | Works out of the box |

## 📦 Installation

This library depends on `react`, `react-dom`, and `framer-motion`.

```bash
# npm
npm install maomao-terminal framer-motion

# yarn
yarn add maomao-terminal framer-motion
```

## 🚀 Quick Start

### 1. Wrap your application with `TerminalProvider`

This provider manages the state of global and dynamic commands.

```tsx
import React, { useState } from 'react';
import { TerminalProvider, Terminal } from 'maomao-terminal';
// Import default styles (required)
import 'maomao-terminal/dist/components/Terminal.css'; 

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
  const { registerCommand, unregisterCommand } = useTerminalContext();

  useEffect(() => {
    // Register a command specific to this component
    registerCommand({
      command: 'getUser',
      response: async (args) => {
        // You can clear data, fetch API, or log info
        return `Current User ID: ${userId}`;
      }
    });

    // Cleanup when component unmounts
    return () => unregisterCommand('getUser');
  }, [userId, registerCommand, unregisterCommand]);

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

The terminal comes with a default dark theme. You can override styles by targeting the CSS classes defined in `Terminal.css`.

Top-level classes:
- `.terminal-container`: The main window.
- `.terminal-header`: The drag handle and title bar.
- `.terminal-body`: The content area.
- `.terminal-input`: The command input field.

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
