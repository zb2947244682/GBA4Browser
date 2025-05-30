/**
 * 控制按钮相关功能
 */

/**
 * 按下按钮
 * @param {string} button - 按钮名称
 */
function pressButton(button) {
  if (!window.module) return;
  window.module.buttonPress(button);
}

/**
 * 释放按钮
 * @param {string} button - 按钮名称
 */
function releaseButton(button) {
  if (!window.module) return;
  window.module.buttonUnpress(button);
}

/**
 * 设置键盘映射
 * @param {Object} module - 模拟器模块
 */
function setupKeyboardControls(module) {
  // 设置按键映射
  module.bindKey('KeyZ', 'a');
  module.bindKey('KeyX', 'b');
  module.bindKey('Enter', 'start');
  module.bindKey('ShiftRight', 'select');
  module.bindKey('ArrowUp', 'up');
  module.bindKey('ArrowDown', 'down');
  module.bindKey('ArrowLeft', 'left');
  module.bindKey('ArrowRight', 'right');
  module.bindKey('KeyQ', 'l');
  module.bindKey('KeyW', 'r');

  // 键盘事件监听
  document.addEventListener('keydown', (e) => {
    if (!module) return;
    module.buttonPress(e.code.replace('Key', '').toLowerCase());
  });
  
  document.addEventListener('keyup', (e) => {
    if (!module) return;
    module.buttonUnpress(e.code.replace('Key', '').toLowerCase());
  });
}

// 导出函数
export { pressButton, releaseButton, setupKeyboardControls }; 