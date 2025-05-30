/**
 * 日志模块
 */

// 存储日志条目
const logs = [];
const MAX_LOGS = 1000; // 最大日志数量

// 原始控制台方法
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info
};

/**
 * 初始化日志系统
 */
function initLogger() {
  // 创建日志容器
  const logContainer = document.createElement('div');
  logContainer.className = 'log-container';
  logContainer.innerHTML = `
    <div class="log-header">
      <div class="log-title">日志</div>
      <button class="log-close">&times;</button>
    </div>
    <div class="log-content"></div>
    <div class="log-actions">
      <button class="log-button" id="log-clear">清除日志</button>
      <button class="log-button" id="log-copy">复制日志</button>
    </div>
  `;
  document.body.appendChild(logContainer);

  // 获取日志内容元素
  const logContent = logContainer.querySelector('.log-content');

  // 重写控制台方法
  console.log = function() {
    const args = Array.from(arguments);
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    addLogEntry(message, 'log');
    originalConsole.log.apply(console, arguments);
  };

  console.error = function() {
    const args = Array.from(arguments);
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    addLogEntry(message, 'error');
    originalConsole.error.apply(console, arguments);
  };

  console.warn = function() {
    const args = Array.from(arguments);
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    addLogEntry(message, 'warn');
    originalConsole.warn.apply(console, arguments);
  };

  console.info = function() {
    const args = Array.from(arguments);
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    addLogEntry(message, 'info');
    originalConsole.info.apply(console, arguments);
  };

  // 添加日志条目
  function addLogEntry(message, type) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      message,
      type
    };
    
    logs.push(logEntry);
    
    // 限制日志数量
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // 更新日志显示
    updateLogDisplay();
  }

  // 更新日志显示
  function updateLogDisplay() {
    if (logContainer.style.display === 'flex') {
      logContent.innerHTML = '';
      
      logs.forEach(log => {
        const logElement = document.createElement('div');
        logElement.className = `log-entry ${log.type}`;
        logElement.textContent = `[${log.timestamp}] ${log.message}`;
        logContent.appendChild(logElement);
      });
      
      // 滚动到底部
      logContent.scrollTop = logContent.scrollHeight;
    }
  }

  // 显示日志
  window.showLogs = function() {
    logContainer.style.display = 'flex';
    updateLogDisplay();
  };

  // 隐藏日志
  window.hideLogs = function() {
    logContainer.style.display = 'none';
  };

  // 清除日志
  window.clearLogs = function() {
    logs.length = 0;
    updateLogDisplay();
  };

  // 复制日志
  window.copyLogs = function() {
    const logText = logs.map(log => `[${log.timestamp}][${log.type}] ${log.message}`).join('\n');
    
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = logText;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    // 选择并复制文本
    textarea.select();
    document.execCommand('copy');
    
    // 移除临时元素
    document.body.removeChild(textarea);
    
    console.log('日志已复制到剪贴板');
  };

  // 添加事件监听
  logContainer.querySelector('.log-close').addEventListener('click', window.hideLogs);
  logContainer.querySelector('#log-clear').addEventListener('click', window.clearLogs);
  logContainer.querySelector('#log-copy').addEventListener('click', window.copyLogs);

  // 捕获全局错误
  window.addEventListener('error', function(event) {
    console.error('全局错误:', event.message, 'at', event.filename, ':', event.lineno, ':', event.colno);
    return false;
  });

  // 捕获未处理的Promise错误
  window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise错误:', event.reason);
    return false;
  });

  // 记录初始日志
  console.log('日志系统初始化完成');
}

export { initLogger }; 