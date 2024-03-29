// main.js
const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const fs = require('fs');

let tray = null;
// 测试注释
function createWindow() {
  let window = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,// 透明
    frame: false,// 无边框
    alwaysOnTop: true,// 窗口置顶
    autoHideMenuBar: false, // 隐藏菜单栏 true为隐藏
    skipTaskbar: true,// 任务栏中是否隐藏 true为隐藏 false为显示
    focusable: false, // 设置窗口不获取焦点
    clickThrough: true, // 设置窗口鼠标穿透
    // 窗口启动时不影响其他窗口
    paintWhenInitiallyHidden: false,
    icon: path.join(__dirname, 'icon/add.png'),
  });

  window.loadURL(path.join('file://', __dirname, 'index.html'));
  // 设置window鼠标穿透
  window.setIgnoreMouseEvents(true);

  // 读取red-package.json文件
  let redPackage = fs.readFileSync(path.join(__dirname, 'red-package.json'), 'utf-8');
  // 将red-package.json文件转换为json对象
  redPackage = JSON.parse(redPackage);
  let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  window.setPosition(width / 2 - 200, height / 2 - 200);
  // 窗口再次置顶
  window.setAlwaysOnTop(true, 'pop-up-menu')
  // 窗口加载完成后window自动失去焦点
  window.on('ready-to-show', () => {
    window.blur();
  });
  // 监听键盘的ctrl+shift+o组合键，实现窗口的显示和隐藏
  showO(window);

  // 监听键盘的ctrl+shift+p组合键,居中显示
  autoP(window);

  //  上下左右移动
  UDLR(window);

  // 监听屏幕分辨率变化，重新设置窗口位置
  resolution(window);

  // 保存窗口位置
  savePosition(window);

}

app.whenReady().then(() => {
  // 设置图标位置为icon/十字.ico
  tray = new Tray(path.join(__dirname, 'icon/十字.ico'));
  // 设置右键菜单
  const contextMenu = require('electron').Menu.buildFromTemplate([
    { label: '退出', click: () => { app.quit(); } }
  ]);
  // 设置图标的右键菜单
  tray.setContextMenu(contextMenu);
});

// 上下左右移动
function UDLR(window) {
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
}

// 监听屏幕分辨率变化，重新设置窗口位置
function resolution(window) {
  require('electron').screen.on('display-metrics-changed', () => {
    // 获取屏幕的宽高
    let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    window.setPosition(width / 2 - 200, height / 2 - 200);
  }
  );
}

// 显示隐藏
function showO(window) {
  require('electron').globalShortcut.register('ctrl+shift+o', () => {
    console.log('ctrl+shift+o');
    // 判断win是否显示
    if (window.isVisible()) {
      // 隐藏win
      window.hide();
    } else {
      // 显示win
      window.show();
      mainWindow.showInactive(); // 显示窗口但不获取焦点
    }
  });
}

// 居中显示
function autoP(window) {
  require('electron').globalShortcut.register('ctrl+shift+p', () => {
    console.log('ctrl+shift+p');
    // 打印窗口位置
    console.log(window.getPosition());
    // 修改win的位置，使其在屏幕正中间
    // 获取屏幕的宽高
    let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    window.setPosition(width / 2 - 200, height / 2 - 200);
    // 打印窗口位置
    console.log(window.getPosition());
  });
}

// 保存窗口位置
function savePosition(window) {
  // 将red-package.json文件中的position属性修改为当前窗口的位置
  // 监听ctrl+shift+l组合键
  require('electron').globalShortcut.register('ctrl+shift+i', () => {
    console.log('ctrl+shift+i');
    // 获取当前窗口的位置
    let position = window.getPosition();
    // 将red-package.json文件中的position属性修改为当前窗口的位置
    let redPackage = require('./red-package.json');
    redPackage.position = position;

    // 将red-package.json文件中的position属性修改为当前窗口的位置
    fs.writeFileSync('./red-package.json', JSON.stringify(redPackage));
  }
  );


}

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  // 关闭进程中所有名为ele-red.exe的进程
  require('child_process').exec('taskkill /f /im ele-red.exe', function (err, stdout, stderr) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
} else {
  app.on('ready', createWindow);
}
