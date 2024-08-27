'use strict'

import { app, protocol, BrowserWindow,ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
//import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import {autoUpdater} from "electron-updater";
import * as path from "path";

const isDevelopment = process.env.NODE_ENV !== 'production'


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')

  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 检查更新
ipcMain.on("update", () => {
  checkUpdate();
});

function sendUpdateMessage(text) {
  this.win.webContents.send("message", text);
}

function checkUpdate() {
  if (process.platform == "darwin") {
    autoUpdater.setFeedURL({
      provider: 'generic',
      url: 'http://192.168.1.36/testapp001/'
    }); //设置要检测更新的路径
  } else {
    autoUpdater.setFeedURL({
      provider: 'generic',
      url: 'http://192.168.1.36/testapp001/'
    });
  }

  //检测更新
  autoUpdater.checkForUpdates();


  let message = {
    error: "检查更新出错",
    checking: "正在检查更新……",
    updateAva: "检测到新版本，正在下载……",
    updateNotAva: "现在使用的就是最新版本，不用更新"
  };

  //监听'error'事件
  autoUpdater.on("error", () => {
    sendUpdateMessage(message.error);
    window.alert(message.error);
  });

  autoUpdater.on("checking-for-update", function () {
    sendUpdateMessage(message.checking);
    window.alert(message.error);
  });

  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on("update-available", () => {
    sendUpdateMessage(message.updateAva);
    window.alert(message.error);
  });

  autoUpdater.on("update-not-available", function () {
    sendUpdateMessage(message.updateNotAva);
    window.alert(message.error);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", (progressObj) => {
    // console.log(progressObj);
    // win.webContents.send("downloadProgress", progressObj);
    // win.setProgressBar(progressObj.percent / 100);
    sendUpdateMessage(progressObj.percent / 100);
  });

  // 下载完成
  autoUpdater.on(
      "update-downloaded",
      (
      ) => {
        autoUpdater.quitAndInstall();
      }
  );
}






























