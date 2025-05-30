/**
 * 存档和读档功能
 */

/**
 * 保存即时存档
 * @returns {Promise<void>}
 */
async function saveState() {
  if (!window.module) return;
  
  if (window.module.saveStateSlot(1)) {
    await window.module.FSSync();
    console.log('存档保存成功');
  } else {
    console.error('存档保存失败');
  }
}

/**
 * 加载即时存档
 * @returns {Promise<void>}
 */
async function loadState() {
  if (!window.module) return;
  
  if (window.module.loadStateSlot(1)) {
    console.log('存档加载成功');
  } else {
    console.error('存档加载失败');
  }
}

// 导出函数
export { saveState, loadState }; 