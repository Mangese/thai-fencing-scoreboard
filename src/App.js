import React, { useEffect, useState } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useTimer } from './hooks/useTimer.js';
import { SCREEN_TYPES, WINDOW_TYPES } from './utils/constants.js';
import DisplayScreen from './components/display/DisplayScreen.js';
import './index.css';

// Import screen components
import SetupScreen from './components/setup/SetupScreen.js';
import ControlScreen from './components/control/ControlScreen.js';
import SummaryScreen from './components/summary/SummaryScreen.js';
import LogsScreen from './components/logs/LogsScreen.js';

function App() {
  const gameStateHook = useGameState();
  const { gameState, setGameState } = gameStateHook;

  // Determine window type from URL or electron process
  const [windowType, setWindowType] = useState(WINDOW_TYPES.DISPLAY);

  // Get window type on mount
  useEffect(() => {
    const determineWindowType = () => {
      try {
        // Check if running in Electron
        if (window.electronAPI && window.process && window.process.type === 'renderer') {
          // Use the window type exposed directly from preload
          const type = window.electronAPI.windowType;
          console.log('Electron Window Type:', type);
          setWindowType(type || WINDOW_TYPES.CONTROL);
        } else {
          // Fallback: check URL params for development
          const urlParams = new URLSearchParams(window.location.search);
          const urlType = urlParams.get('window') === 'display' ? WINDOW_TYPES.DISPLAY : WINDOW_TYPES.CONTROL;
          console.log('URL Window Type:', urlType);
          setWindowType(urlType);
        }
      } catch (error) {
        console.error('Error in determineWindowType:', error);
        setWindowType(WINDOW_TYPES.CONTROL);
      }
    };

    // Small delay to ensure electronAPI is ready
    setTimeout(determineWindowType, 100);
  }, []);

  // Handle window-specific behavior
  useEffect(() => {
    if (windowType === WINDOW_TYPES.DISPLAY) {
      // Hide cursor on display window after inactivity
      let timeoutId;
      const hideCursor = () => document.body.style.cursor = 'none';
      const showCursor = () => {
        document.body.style.cursor = 'default';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hideCursor, 3000);
      };

      document.addEventListener('mousemove', showCursor);
      timeoutId = setTimeout(hideCursor, 3000);

      return () => {
        document.removeEventListener('mousemove', showCursor);
        clearTimeout(timeoutId);
      };
    }
  }, [windowType]);

  // Display Window - Only shows clean scoreboard
  if (windowType === WINDOW_TYPES.DISPLAY) {
    console.log('Rendering DISPLAY window'); // Debug log
    if (!gameState || !gameStateHook.getPlayerData) {
      return <div>Loading Display...</div>;
    }
    return (
      <DisplayScreen
        gameState={gameState}
        getPlayerData={gameStateHook.getPlayerData}
      />
    );
  }

  console.log('Rendering CONTROL window'); // Debug log

  // Safety check for game state
  if (!gameState) {
    return <div>Loading Control Panel...</div>;
  }

  // Control Window - Shows different screens based on game state
  const renderControlScreen = () => {
    switch (gameState.currentScreen) {
      case SCREEN_TYPES.SETUP:
        return <SetupScreen {...gameStateHook} />;

      case SCREEN_TYPES.GAME:
        return <ControlScreen {...gameStateHook} />;

      case SCREEN_TYPES.SUMMARY:
        return <SummaryScreen {...gameStateHook} />;

      case SCREEN_TYPES.LOGS:
        return <LogsScreen {...gameStateHook} />;

      default:
        return (
          <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            Unknown Screen
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderControlScreen()}
    </div>
  );
}

export default App;
