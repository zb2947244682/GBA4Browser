/**
 * 模拟器初始化和基本功能
 */
import { setupKeyboardControls } from './controls.js';
import { saveState, loadState } from './saveload.js';
import { initLogger } from './logger.js';

// 模拟器模块
let module;
let mGBA;

/**
 * 检测浏览器兼容性
 * @returns {Object} 兼容性信息
 */
function detectBrowserCompatibility() {
  const ua = navigator.userAgent;
  const browserInfo = {
    isCompatible: true,
    browser: 'unknown',
    isWebView: false,
    isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(ua),
    supportsFileAPI: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,
    supportsWebAssembly: typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function',
    supportsModules: 'noModule' in document.createElement('script'),
    isWeChat: /MicroMessenger/i.test(ua),
    issues: []
  };

  // 检测浏览器类型
  if (/MicroMessenger/i.test(ua)) {
    browserInfo.browser = 'WeChat';
    browserInfo.isWebView = true;
  } else if (/QQBrowser/i.test(ua)) {
    browserInfo.browser = 'QQ Browser';
  } else if (/UCBrowser/i.test(ua)) {
    browserInfo.browser = 'UC Browser';
  } else if (/VIA/i.test(ua)) {
    browserInfo.browser = 'VIA Browser';
  } else if (/Edg/i.test(ua)) {
    browserInfo.browser = 'Edge';
  } else if (/Chrome/i.test(ua)) {
    browserInfo.browser = 'Chrome';
  } else if (/Firefox/i.test(ua)) {
    browserInfo.browser = 'Firefox';
  } else if (/Safari/i.test(ua)) {
    browserInfo.browser = 'Safari';
  }

  // 检测WebView
  if (/Android/i.test(ua) && /Version\//i.test(ua) && !(/Chrome/i.test(ua))) {
    browserInfo.isWebView = true;
  }

  // 检查File API支持
  if (!browserInfo.supportsFileAPI) {
    browserInfo.isCompatible = false;
    browserInfo.issues.push('浏览器不支持文件API，无法上传ROM');
  }

  // 检查WebAssembly支持
  if (!browserInfo.supportsWebAssembly) {
    browserInfo.isCompatible = false;
    browserInfo.issues.push('浏览器不支持WebAssembly，无法运行模拟器');
  }

  // 记录浏览器信息
  console.info('浏览器信息:', JSON.stringify(browserInfo, null, 2));
  
  return browserInfo;
}

/**
 * 加载mGBA模块
 * @returns {Promise<Object>} mGBA模块
 */
async function loadMGBA() {
  try {
    console.log('开始加载mGBA模块...');
    
    // 尝试使用动态导入
    try {
      mGBA = await import('../mgba.js');
      console.log('mGBA模块通过ES模块导入成功');
      return mGBA;
    } catch (importErr) {
      console.warn('ES模块导入失败，尝试使用传统方式加载:', importErr.message);
      
      // 如果动态导入失败，尝试使用传统方式加载
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '../mgba.js';
        script.onload = () => {
          if (window.mGBA) {
            console.log('mGBA模块通过脚本标签加载成功');
            resolve(window.mGBA);
          } else {
            reject(new Error('mGBA模块加载成功但未找到全局变量'));
          }
        };
        script.onerror = (err) => {
          reject(new Error('加载mGBA脚本失败: ' + err.message));
        };
        document.head.appendChild(script);
      });
    }
  } catch (err) {
    console.error('加载mGBA模块失败:', err.message);
    throw err;
  }
}

/**
 * 初始化模拟器
 * @returns {Promise<void>}
 */
async function initEmulator() {
  try {
    console.log('正在初始化模拟器...');
    
    // 检测浏览器兼容性
    const compatibility = detectBrowserCompatibility();
    if (!compatibility.isCompatible) {
      console.error('浏览器兼容性问题:', compatibility.issues.join(', '));
      document.querySelector('.upload-text').textContent = '您的浏览器不兼容，请尝试使用Chrome或Edge浏览器';
      return null;
    }
    
    if (compatibility.isWebView) {
      console.warn('检测到WebView环境，部分功能可能受限');
      document.querySelector('.upload-text').textContent = '在微信等应用内浏览器中，文件上传功能可能受限，建议使用系统浏览器';
    }
    
    // 加载mGBA模块
    try {
      mGBA = await loadMGBA();
    } catch (err) {
      console.error('加载mGBA模块失败:', err.message);
      document.querySelector('.upload-text').textContent = '模拟器加载失败，请刷新页面重试';
      throw err;
    }
    
    // 初始化模拟器
    try {
      module = await mGBA.default({
        canvas: document.getElementById('gba-canvas'),
        print: console.log,
        printErr: console.error
      });
    } catch (err) {
      console.error('初始化模拟器实例失败:', err.message);
      document.querySelector('.upload-text').textContent = '模拟器初始化失败，请刷新页面重试';
      throw err;
    }

    console.log('模拟器基础初始化完成，正在设置文件系统...');
    
    // 初始化文件系统
    try {
      await module.FSInit();
      console.log('文件系统初始化完成');
    } catch (err) {
      console.error('文件系统初始化失败:', err.message);
      document.querySelector('.upload-text').textContent = '文件系统初始化失败，请刷新页面重试';
      throw err;
    }

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
  if (!file) {
    console.warn('没有选择文件');
    return;
  }

  // 隐藏上传文字
  document.querySelector('.upload-text').style.display = 'none';

  // 确保模拟器已初始化
  if (!module) {
    try {
      console.log('模拟器未初始化，正在初始化...');
      await initEmulator();
      
      // 如果初始化后模块仍不存在，则退出
      if (!module) {
        console.error('模拟器初始化后模块仍不存在');
        return;
      }
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
    console.log('开始上传ROM:', file.name, '大小:', file.size, '字节');
    await module.uploadRom(file, () => {
      const romPath = `/data/games/${file.name}`;
      console.log('ROM上传完成，准备加载游戏:', romPath);
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
  // 获取浏览器兼容性信息
  const compatibility = detectBrowserCompatibility();
  
  // 上传 ROM
  const romUpload = document.getElementById('rom-upload');
  const emulatorContainer = document.getElementById('emulator-container');
  
  if (romUpload) {
    // 正常的文件上传事件
    romUpload.addEventListener('change', (event) => {
      if (event.target.files && event.target.files.length > 0) {
        handleRomUpload(event.target.files[0]);
      } else {
        console.warn('未选择文件或文件选择被取消');
      }
    });
    
    // 针对微信等环境，添加点击事件
    if (compatibility.isWeChat || compatibility.isWebView) {
      console.log('检测到微信或WebView环境，添加特殊处理');
      
      // 确保文件选择器可点击
      romUpload.style.opacity = '0.01'; // 不要完全透明，以便微信能检测到点击
      
      // 添加点击事件到容器
      emulatorContainer.addEventListener('click', () => {
        console.log('模拟器容器被点击，尝试触发文件选择');
        try {
          // 尝试手动触发点击
          romUpload.click();
        } catch (err) {
          console.error('无法触发文件选择:', err);
          alert('在当前浏览器环境中无法选择文件，请尝试使用系统浏览器打开');
        }
      });
    }
  } else {
    console.error('找不到ROM上传元素');
  }

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
    
    // 初始化日志系统
    try {
      initLogger();
      console.log('日志系统初始化完成');
    } catch (err) {
      console.error('日志系统初始化失败:', err);
    }
    
    // 设置事件监听
    try {
      setupEventListeners();
      console.log('事件监听器设置完成');
    } catch (err) {
      console.error('设置事件监听器失败:', err);
    }
    
    // 记录系统信息
    console.info('系统信息:', {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      language: navigator.language,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      devicePixelRatio: window.devicePixelRatio
    });
    
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