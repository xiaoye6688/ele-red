// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  // win = new BrowserWindow({
  //   width: 100,
  //   height: 100,
  //   transparent: true,
  //   frame: false,
  //   alwaysOnTop: true,
  //   // autoHideMenuBar: false, // 隐藏菜单栏 true为隐藏
  //   // frame: false, // 隐藏顶部导航（关闭、最大、最小化）
  //   // resizable: false, // 不允许缩放
  //   // movable: false, // 不允许移动
  //   skipTaskbar: true, // 隐藏任务栏图标 true为隐藏
  // });
  let window = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    autoHideMenuBar: false, // 隐藏菜单栏 true为隐藏
  });

  window.loadURL(path.join('file://', __dirname, 'index.html'));
  // 设置window鼠标穿透
  window.setIgnoreMouseEvents(true);

  // 监听键盘的ctrl+shift+o组合键，实现窗口的显示和隐藏
  require('electron').globalShortcut.register('ctrl+shift+o', () => {
    console.log('ctrl+shift+o');
    // 判断win是否显示
    if (window.isVisible()) {
      // 隐藏win
      window.hide();
    } else {
      // 显示win
      window.show();
    }
  });

  // 监听键盘的ctrl+shift+p组合键
  require('electron').globalShortcut.register('ctrl+shift+p', () => {
    console.log('ctrl+shift+p');
    // 修改win的位置，使其在屏幕正中间
    window.on('ready-to-show', () => {
      const { width, height } = window.getBounds();
      const { x, y } = require('electron').screen.getCursorScreenPoint();
      window.setPosition(x - width / 2, y - height / 2);
    });
  });

  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+up', () => {
    console.log('ctrl+shift+up1');
    // 页面注入js代码，修改id为red-dot的css属性的top的值 + 0.5
    window.webContents.executeJavaScript(`
      document.getElementById('red-dot').style.top = document.getElementById('red-dot').style.top + 0.5;
    `);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+down', () => {
    console.log('ctrl+shift+down1');
    // 页面注入js代码，修改id为red-dot的css属性的top的值 - 0.5
    window.webContents.executeJavaScript(`
      document.getElementById('red-dot').style.top = document.getElementById('red-dot').style.top - 0.5;
    `);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+left', () => {
    console.log('ctrl+shift+left1');
    // 页面注入js代码，修改id为red-dot的css属性的left的值 - 0.5
    window.webContents.executeJavaScript(`
      document.getElementById('red-dot').style.left = document.getElementById('red-dot').style.left - 0.5;
    `);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+right', () => {
    console.log('ctrl+shift+right1');
    // 页面注入js代码，修改id为red-dot的css属性的left的值 + 0.5，并且捕获错误
    window.webContents.executeJavaScript(`
      document.getElementById('red-dot').style.left = document.getElementById('red-dot').style.left + 0.5;
    `).catch((err) => {
      console.log(err);
    }
    );
  });


}

app.on('ready', createWindow);
