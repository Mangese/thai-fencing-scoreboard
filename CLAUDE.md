# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Thai Fencing Scoreboard is an Electron-based React application that provides a dual-window scoring system for Thai fencing competitions. The application creates two synchronized windows:
- **Display Window**: Clean, fullscreen-ready scoreboard for public viewing
- **Control Window**: Feature-rich control panel for match officials

## Architecture

### Dual Window System
The application uses Electron's multi-window capability:
- `electron.js` manages window creation and IPC communication
- Windows are synchronized via IPC handlers in `electron.js:135-144`
- Window type determination in `App.js:22-46` using either URL params or Electron IPC

### State Management
Central game state managed through:
- `useGameState.js`: Primary state hook with IPC synchronization
- `useTimer.js`: Timer-specific state and logic
- `useAudio.js`: Sound effects management
- State persisted to localStorage via `storage.js`

### Component Structure
- `src/components/display/`: Display window components (clean UI)
- `src/components/control/`: Control panel components (feature-rich UI)
- `src/components/setup/`: Match setup screens
- `src/components/summary/`: Post-match summary
- `src/components/logs/`: Match history and logs
- `src/components/common/`: Shared components between windows

## Development Commands

### React Development
```bash
npm start                 # Start React dev server (port 3000)
npm test                  # Run tests
npm run build            # Build React app for production
```

### Electron Development
```bash
npm run electron-dev     # Run Electron with React dev server
npm run electron         # Run Electron with built React app
```

### Distribution
```bash
npm run dist             # Build for current platform
npm run dist-all         # Build for Windows, macOS, and Linux
npm run dist-win         # Windows only
npm run dist-mac         # macOS only
npm run dist-portable    # Portable versions
```

## Key Files and Logic

### Game Logic (`src/utils/gameLogic.js`)
Contains all scoring logic, timer management, and game state transitions. Key functions for match scoring rules and warning system.

### Constants (`src/utils/constants.js`)
Game configuration including:
- `GAME_CONFIG.WINNING_SCORE`: Points needed to win (5)
- `GAME_CONFIG.INITIAL_TIME`: Match duration (180 seconds)
- Warning types and thresholds
- Screen and window type enums

### IPC Communication
- Game state synchronization between windows
- Window management (show/hide display, fullscreen toggle)
- Development tools access

## Development Notes

- The application supports both development (URL params) and production (Electron IPC) window detection
- State changes in one window automatically sync to the other via Electron IPC
- Audio feedback is integrated throughout the scoring system
- The display window auto-hides cursor after 3 seconds of inactivity
- Local storage persistence ensures game state survives application restarts