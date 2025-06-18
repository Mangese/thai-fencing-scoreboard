const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Simple isDev check without external dependency
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Add logging
console.log('=== THAI FENCING SCOREBOARD STARTING ===');
console.log('Electron starting...');
console.log('isDev:', isDev);
console.log('app.isPackaged:', app.isPackaged);
console.log('__dirname:', __dirname);
console.log('process.platform:', process.platform);
console.log('process.arch:', process.arch);
console.log('process.version:', process.version);
console.log('process.versions.electron:', process.versions.electron);

// Debug file structure
const fs = require('fs');
try {
  console.log('=== CHECKING FILE STRUCTURE ===');
  console.log('Files in __dirname:', fs.readdirSync(__dirname));

  // Check if preload.js exists in current directory
  const preloadExists = fs.existsSync(path.join(__dirname, 'preload.js'));
  console.log('preload.js exists in __dirname:', preloadExists);

  // Check if index.html exists in current directory
  const indexExists = fs.existsSync(path.join(__dirname, 'index.html'));
  console.log('index.html exists in __dirname:', indexExists);

} catch (error) {
  console.error('Error checking file structure:', error);
}

let displayWindow = null;
let controlWindow = null;

// Error handling
process.on('uncaughtException', (error) => {
  console.error('=== UNCAUGHT EXCEPTION ===');
  console.error(error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('=== UNHANDLED REJECTION ===');
  console.error('At:', promise, 'reason:', reason);
});

function createDisplayWindow() {
  console.log('Creating display window...');

  try {
    // Fix preload path - use absolute path resolution
    const preloadPath = isDev
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, 'preload.js'); // In production, preload.js is in same folder as electron.js

    console.log('Preload path:', preloadPath);

    displayWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: preloadPath,
        additionalArguments: ['--window-type=display']
      },
      title: 'Thai Fencing Scoreboard - Display',
      show: false,
      frame: true,
      resizable: true,
      fullscreen: false
    });

    // Fix HTML path - use absolute path resolution
    const displayUrl = isDev
      ? 'http://localhost:3000?window=display'
      : `file://${path.join(__dirname, 'index.html')}?window=display`; // Remove 'build/' prefix

    console.log('Display URL:', displayUrl);

    displayWindow.loadURL(displayUrl);

    displayWindow.once('ready-to-show', () => {
      console.log('Display window ready to show');
      displayWindow.show();
      displayWindow.focus();
    });

    displayWindow.on('closed', () => {
      console.log('Display window closed');
      displayWindow = null;
    });

    // Add error handling
    displayWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Display window failed to load:', errorCode, errorDescription);
    });

    return displayWindow;
  } catch (error) {
    console.error('Error creating display window:', error);
    return null;
  }
}

function createControlWindow() {
  console.log('Creating control window...');

  try {
    // Fix preload path - use absolute path resolution
    const preloadPath = isDev
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, 'preload.js'); // In production, preload.js is in same folder as electron.js

    console.log('Control preload path:', preloadPath);

    controlWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: preloadPath,
        additionalArguments: ['--window-type=control']
      },
      title: 'Thai Fencing Scoreboard - Control Panel',
      show: false,
      frame: true,
      resizable: true
    });

    // Fix HTML path - use absolute path resolution
    const controlUrl = isDev
      ? 'http://localhost:3000?window=control'
      : `file://${path.join(__dirname, 'index.html')}?window=control`; // Remove 'build/' prefix

    console.log('Control URL:', controlUrl);

    controlWindow.loadURL(controlUrl);

    controlWindow.once('ready-to-show', () => {
      console.log('Control window ready to show');
      controlWindow.show();
      controlWindow.focus();
    });

    controlWindow.on('closed', () => {
      console.log('Control window closed');
      controlWindow = null;
      // Close display window if control window is closed
      if (displayWindow) {
        displayWindow.close();
      }
    });

    // Add error handling
    controlWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Control window failed to load:', errorCode, errorDescription);
    });

    return controlWindow;
  } catch (error) {
    console.error('Error creating control window:', error);
    return null;
  }
}

function createWindows() {
  // Create both windows
  createDisplayWindow();
  createControlWindow();

  // Position windows side by side for development
  if (isDev) {
    displayWindow.setPosition(0, 0);
    controlWindow.setPosition(960, 0);
  }
}

app.whenReady().then(() => {
  console.log('App ready, creating windows...');

  try {
    createWindows();
  } catch (error) {
    console.error('Error creating windows:', error);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('Activating app, creating windows...');
      createWindows();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Add global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// IPC handlers for window communication
ipcMain.handle('get-window-type', (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);

  console.log('Checking window type for:', senderWindow?.getTitle()); // Debug log

  if (senderWindow === displayWindow) {
    console.log('Returning DISPLAY type');
    return 'DISPLAY';
  }
  if (senderWindow === controlWindow) {
    console.log('Returning CONTROL type');
    return 'CONTROL';
  }

  console.log('Unknown window, defaulting to CONTROL');
  return 'CONTROL';
});

// Handle data synchronization between windows
ipcMain.handle('sync-game-state', (event, gameState) => {
  // Broadcast to all windows except sender
  const windows = [displayWindow, controlWindow].filter(w => w && !w.webContents.isDestroyed());

  windows.forEach(window => {
    if (window.webContents !== event.sender) {
      window.webContents.send('game-state-updated', gameState);
    }
  });
});

// Handle window management
ipcMain.handle('close-display-window', () => {
  if (displayWindow) {
    displayWindow.close();
  }
});

ipcMain.handle('show-display-window', () => {
  if (!displayWindow) {
    createDisplayWindow();
  } else {
    displayWindow.show();
    displayWindow.focus();
  }
});

ipcMain.handle('toggle-display-fullscreen', () => {
  if (displayWindow) {
    displayWindow.setFullScreen(!displayWindow.isFullScreen());
  }
});

// Development helpers
if (isDev) {
  ipcMain.handle('open-dev-tools', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) {
      window.webContents.openDevTools();
    }
  });
}
