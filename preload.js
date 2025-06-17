const { contextBridge, ipcRenderer } = require('electron');

// Get window type from command line arguments
const getWindowTypeFromArgs = () => {
  const args = process.argv;
  const windowTypeArg = args.find(arg => arg.startsWith('--window-type='));
  if (windowTypeArg) {
    const type = windowTypeArg.split('=')[1];
    return type === 'display' ? 'DISPLAY' : 'CONTROL';
  }
  return 'CONTROL'; // Default fallback
};

const WINDOW_TYPE = getWindowTypeFromArgs();

// Expose Electron APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Window management
  getWindowType: () => Promise.resolve(WINDOW_TYPE), // Return immediately from preload
  closeDisplayWindow: () => ipcRenderer.invoke('close-display-window'),
  showDisplayWindow: () => ipcRenderer.invoke('show-display-window'),
  toggleDisplayFullscreen: () => ipcRenderer.invoke('toggle-display-fullscreen'),

  // Game state synchronization
  syncGameState: (gameState) => ipcRenderer.invoke('sync-game-state', gameState),
  onGameStateUpdate: (callback) => {
    ipcRenderer.on('game-state-updated', (event, gameState) => callback(gameState));
  },
  removeGameStateListener: () => {
    ipcRenderer.removeAllListeners('game-state-updated');
  },

  // Development helpers
  openDevTools: () => ipcRenderer.invoke('open-dev-tools'),

  // Platform info
  platform: process.platform,
  isElectron: true,
  windowType: WINDOW_TYPE // Expose window type directly
});

// Expose process info for App.js to detect Electron environment
contextBridge.exposeInMainWorld('process', {
  type: 'renderer'
});

console.log('Preload: Window type is', WINDOW_TYPE);
