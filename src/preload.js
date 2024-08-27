//项目预加载函数

import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld("electron", {
    ipcRenderer,
    onMessage: (fn) => {
        ipcRenderer.on("message", (event, ...args) => fn(...args));
    },
});

// contextBridge.exposeInMainWorld('api', {
//     sendMsg: (msg) => ipcRenderer.send('ipc-example', msg)
// });



