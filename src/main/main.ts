import { app, BrowserWindow, ipcMain, shell, IpcMessageEvent } from 'electron'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    title: 'My Electron App',
  })

  // 앱 메뉴 삭제
  win.setMenu(null)

  win.webContents.on('new-window', (event, url) => {
    // 웹브라우저에서 새창을 뛰우는 링크(<a target="_brank"> 태그)를 누르면 호출되는 콜백.

    // 네이티브 새 창으로 뜨는것 막기
    event.preventDefault()

    // url을 기본 브라우저로 켜줍니다.
    shell.openExternal(url)
  })

  ipcMain.on('msg', (event: IpcMessageEvent, msg: string) => {
    if (msg === 'ping') {
      event.sender.send('msg', 'pong')
    }
  })

  // and load the index.html of the app.
  win.loadFile('./build/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
