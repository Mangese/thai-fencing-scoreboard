const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Simple isDev check without external dependency
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let displayWindow = null;
let controlWindow = null;

function createDisplayWindow() {
  displayWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, isDev ? 'preload.js' : 'build/preload.js'),
      additionalArguments: ['--window-type=display'] // Add window type argument
    },
    title: 'Thai Fencing Scoreboard - Display',
    icon: path.join(__dirname, 'assets/icon.png'), // Add icon if available
    show: false,
    frame: true,
    resizable: true,
    fullscreen: false
  });

  const displayUrl = isDev
    ? 'http://localhost:3000?window=display'
    : `file://${path.join(__dirname, 'build/index.html')}?window=display`;

  displayWindow.loadURL(displayUrl);

  displayWindow.once('ready-to-show', () => {
    displayWindow.show();
    displayWindow.focus();
  });

  displayWindow.on('closed', () => {
    displayWindow = null;
  });

  return displayWindow;
}

function createControlWindow() {
  controlWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, isDev ? 'preload.js' : 'build/preload.js'),
      additionalArguments: ['--window-type=control'] // Add window type argument
    },
    title: 'Thai Fencing Scoreboard - Control Panel',
    icon: path.join(__dirname, 'assets/icon.png'), // Add icon if available
    show: false,
    frame: true,
    resizable: true
  });

  const controlUrl = isDev
    ? 'http://localhost:3000?window=control'
    : `file://${path.join(__dirname, 'build/index.html')}?window=control`;

  controlWindow.loadURL(controlUrl);

  controlWindow.once('ready-to-show', () => {
    controlWindow.show();
    controlWindow.focus();
  });

  controlWindow.on('closed', () => {
    controlWindow = null;
    // Close display window if control window is closed
    if (displayWindow) {
      displayWindow.close();
    }
  });

  return controlWindow;
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
  createWindows();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindows();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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
