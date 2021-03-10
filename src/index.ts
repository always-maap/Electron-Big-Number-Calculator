import { app, BrowserWindow, ipcMain } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 400,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  ipcMain.on("resizeWindow", (event, isAdvanced: boolean) => {
    isAdvanced ? mainWindow.setSize(400, 600, true) : mainWindow.setSize(600, 600, true);
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
