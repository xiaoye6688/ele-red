// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
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
    // 获取屏幕的宽高
    let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    window.setPosition(width / 2 - 200, height / 2 - 200);
  });

  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+up', () => {
    console.log('ctrl+shift+up1');
    // 获取并存储窗口位置
    let position = window.getPosition();
    // 修改win的位置
    window.setPosition(position[0], position[1] - 1);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+down', () => {
    console.log('ctrl+shift+down1');
    // 获取并存储窗口位置
    let position = window.getPosition();
    // 修改win的位置
    window.setPosition(position[0], position[1] + 1);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+left', () => {
    console.log('ctrl+shift+left1');
    // 获取并存储窗口位置
    let position = window.getPosition();
    // 修改win的位置
    window.setPosition(position[0] - 1, position[1]);
  });
  // 监听键盘的ctrl+shift+上/下/左/右组合键
  require('electron').globalShortcut.register('ctrl+shift+right', () => {
    console.log('ctrl+shift+right1');
    // 获取并存储窗口位置
    let position = window.getPosition();
    // 修改win的位置
    window.setPosition(position[0] + 1, position[1]);
  });
  // 监听屏幕分辨率变化，重新设置窗口位置
  require('electron').screen.on('display-metrics-changed', () => {
    // 获取屏幕的宽高
    let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    window.setPosition(width / 2 - 200, height / 2 - 200);
  }
  );

}

app.on('ready', createWindow);
