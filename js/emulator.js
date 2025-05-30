/**
 * 模拟器初始化和基本功能
 */
import { setupKeyboardControls } from './controls.js';
import { saveState, loadState } from './saveload.js';

// 模拟器模块
let module;

/**
 * 初始化模拟器
 * @returns {Promise<void>}
 */
async function initEmulator() {
  try {
    console.log('正在初始化模拟器...');
    
    // 导入mGBA模块
    const mGBA = await import('../mgba.js');
    
    module = await mGBA.default({
      canvas: document.getElementById('gba-canvas'),
      print: console.log,
      printErr: console.error
    });

    console.log('模拟器基础初始化完成，正在设置文件系统...');
    
    // 初始化文件系统
    await module.FSInit();
    console.log('文件系统初始化完成');

    // 设置按键映射
    setupKeyboardControls(module);
    
    // 隐藏上传文字
    document.querySelector('.upload-text').style.display = 'none';
    console.log('模拟器初始化完成');
    
    // 将模块保存到全局变量，以便其他模块访问
    window.module = module;
    
    return module;
  } catch (err) {
    console.error('模拟器初始化失败:', err);
    document.querySelector('.upload-text').textContent = '模拟器加载失败，请刷新页面重试';
    throw err;
  }
}

/**
 * 处理ROM上传
 * @param {File} file - 上传的ROM文件
 * @returns {Promise<void>}
 */
async function handleRomUpload(file) {
  if (!file) return;

  // 隐藏上传文字
  document.querySelector('.upload-text').style.display = 'none';

  // 确保模拟器已初始化
  if (!module) {
    try {
      console.log('模拟器未初始化，正在初始化...');
      await initEmulator();
    } catch (err) {
      console.error('模拟器初始化失败:', err);
      return;
    }
  }

  // 确保模块存在并且有uploadRom方法
  if (!module || typeof module.uploadRom !== 'function') {
    console.error('模拟器模块未正确加载，请刷新页面重试');
    return;
  }

  try {
    await module.uploadRom(file, () => {
      const romPath = `/data/games/${file.name}`;
      if (module.loadGame(romPath)) {
        module.resumeGame();
        console.log('ROM 加载成功:', romPath);
      } else {
        console.error('ROM 加载失败');
      }
    });
  } catch (err) {
    console.error('ROM 上传失败:', err);
  }
}

/**
 * 设置DOM事件监听
 */
function setupEventListeners() {
  // 上传 ROM
  document.getElementById('rom-upload').addEventListener('change', (event) => {
    handleRomUpload(event.target.files[0]);
  });

  // 将存档和读档函数暴露到全局作用域
  window.saveState = saveState;
  window.loadState = loadState;
}

/**
 * 初始化应用
 */
function init() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，准备初始化模拟器...');
    
    // 设置事件监听
    setupEventListeners();
    
    // 延迟一点初始化，确保页面完全加载
    setTimeout(() => {
      initEmulator().catch(err => {
        console.error('自动初始化失败:', err);
        // 显示错误信息给用户
        document.querySelector('.upload-text').textContent = '点击屏幕上传ROM（如果加载失败，请刷新页面）';
      });
    }, 500);
  });
}

// 导出函数和变量
export { init, initEmulator, handleRomUpload }; 