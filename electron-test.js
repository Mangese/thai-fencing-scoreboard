const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

console.log('=== ELECTRON TEST VERSION ===');
console.log('Node version:', process.version);
console.log('Electron version:', process.versions.electron);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current directory:', __dirname);

// Show a dialog immediately
app.whenReady().then(() => {
  console.log('App is ready!');

  // Create a simple window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load a simple HTML string instead of file
  win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Window</title>
        <style>
          body { 
            font-family: Arial; 
            padding: 50px; 
            background: #f0f0f0;
            text-align: center;
          }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>🎯 Electron Test Window</h1>
        <p>If you see this, Electron is working!</p>
        <p>Platform: ${process.platform}</p>
        <p>Node: ${process.version}</p>
        <p>Electron: ${process.versions.electron}</p>
      </body>
    </html>
  `));

  win.on('ready-to-show', () => {
    console.log('Window ready to show');
    win.show();

    // Show success dialog
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Success!',
      message: 'Electron is working!',
      detail: 'Your app can run on this Windows machine.'
    });
  });

  win.on('closed', () => {
    console.log('Window closed');
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed, quitting app');
  app.quit();
});

// Error handlers
process.on('uncaughtException', (error) => {
  console.error('=== UNCAUGHT EXCEPTION ===');
  console.error(error);

  // Try to show error dialog
  try {
    dialog.showErrorBox('Application Error', error.message);
  } catch (e) {
    console.error('Could not show error dialog:', e);
  }
});

app.on('ready', () => {
  console.log('App ready event fired');
});

console.log('Script loaded, waiting for app ready...');
