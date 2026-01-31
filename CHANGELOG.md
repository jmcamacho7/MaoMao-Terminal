# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-01-31

### Changed
- **Refactor**: Separated internal terminal logic (state, history) vs UI (window, drag/resize) into dedicated hooks/providers (`terminal.logic.ts`, `terminal.ui.ts`) to prevent overlap.
- **Dependencies**: Removed `framer-motion`. Now using native CSS transitions for zero-dependency animations.
- **Documentation**: Updated README to reflect native CSS approach (no manual CSS import required).
- **UX**: Terminal history now visually distinguishes between user input (with `>`) and system output (no prefix).
- **UX**: Commands are now case-insensitive (e.g., `HELP` works same as `help`).
- **Styling**: Input text color is now lighter (whitesmoke) for better contrast against blur effect.

### Added
- **Testing**: Added comprehensive test suite using Vitest and React Testing Library (>90% coverage).
