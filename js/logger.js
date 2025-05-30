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

// 检查是否在微信环境中
function isWeChatEnvironment() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

/**
 * 初始化日志系统
 */
function initLogger() {
  try {
    // 检查是否已经初始化
    if (window._logContainer) {
      console.log('日志系统已经初始化');
      return;
    }
    
    // 创建日志容器
    const logContainer = document.createElement('div');
    logContainer.className = 'log-container';
    // 设置初始样式，确保在微信等环境中正常工作
    logContainer.style.position = 'fixed';
    logContainer.style.top = '0';
    logContainer.style.left = '0';
    logContainer.style.width = '100%';
    logContainer.style.height = '100%';
    logContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    logContainer.style.zIndex = '100';
    logContainer.style.display = 'none';
    logContainer.style.flexDirection = 'column';
    logContainer.style.padding = '10px';
    logContainer.style.overflow = 'hidden';
    
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
    
    // 确保body已经加载完成
    if (document.body) {
      document.body.appendChild(logContainer);
    } else {
      // 如果body还没准备好，等待DOMContentLoaded事件
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(logContainer);
      });
    }

    // 保存到全局变量，确保在模块加载失败时也能访问
    window._logContainer = logContainer;

    // 获取日志内容元素
    const logContent = logContainer.querySelector('.log-content');
    
    // 设置日志内容样式
    logContent.style.flex = '1';
    logContent.style.overflowY = 'auto';
    logContent.style.color = '#ddd';
    logContent.style.fontFamily = 'monospace';
    logContent.style.fontSize = '14px';
    logContent.style.whiteSpace = 'pre-wrap';
    logContent.style.wordWrap = 'break-word';
    logContent.style.padding = '10px 0';

    // 设置日志头部样式
    const logHeader = logContainer.querySelector('.log-header');
    logHeader.style.display = 'flex';
    logHeader.style.justifyContent = 'space-between';
    logHeader.style.alignItems = 'center';
    logHeader.style.color = 'white';
    logHeader.style.padding = '10px 0';
    logHeader.style.borderBottom = '1px solid #444';
    logHeader.style.marginBottom = '10px';

    // 设置日志标题样式
    const logTitle = logContainer.querySelector('.log-title');
    logTitle.style.fontSize = '18px';
    logTitle.style.fontWeight = 'bold';

    // 设置关闭按钮样式
    const closeButton = logContainer.querySelector('.log-close');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';

    // 设置操作区域样式
    const logActions = logContainer.querySelector('.log-actions');
    logActions.style.display = 'flex';
    logActions.style.justifyContent = 'space-between';
    logActions.style.padding = '10px 0';
    logActions.style.borderTop = '1px solid #444';

    // 设置按钮样式
    const buttons = logContainer.querySelectorAll('.log-button');
    buttons.forEach(button => {
      button.style.backgroundColor = '#444';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.padding = '8px 15px';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
    });

    // 重写控制台方法
    try {
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
    } catch (err) {
      alert('重写控制台方法失败: ' + err.message);
    }

    // 添加日志条目
    function addLogEntry(message, type) {
      try {
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
      } catch (err) {
        originalConsole.error('添加日志条目失败:', err);
      }
    }

    // 更新日志显示
    function updateLogDisplay() {
      try {
        if (logContainer.style.display === 'flex') {
          logContent.innerHTML = '';
          
          logs.forEach(log => {
            const logElement = document.createElement('div');
            logElement.className = `log-entry ${log.type}`;
            logElement.textContent = `[${log.timestamp}] ${log.message}`;
            
            // 设置日志条目样式
            logElement.style.marginBottom = '5px';
            logElement.style.paddingBottom = '5px';
            logElement.style.borderBottom = '1px solid #333';
            
            // 根据类型设置颜色
            if (log.type === 'error') {
              logElement.style.color = '#ff6b6b';
            } else if (log.type === 'warn') {
              logElement.style.color = '#feca57';
            } else if (log.type === 'info') {
              logElement.style.color = '#54a0ff';
            }
            
            logContent.appendChild(logElement);
          });
          
          // 滚动到底部
          logContent.scrollTop = logContent.scrollHeight;
        }
      } catch (err) {
        originalConsole.error('更新日志显示失败:', err);
      }
    }
    
    // 将updateLogDisplay暴露到全局作用域
    window.updateLogDisplay = updateLogDisplay;

    // 显示日志
    window.showLogs = function() {
      try {
        logContainer.style.display = 'flex';
        updateLogDisplay();
        console.log('日志面板已打开');
      } catch (err) {
        alert('打开日志面板失败: ' + err.message);
      }
    };

    // 隐藏日志
    window.hideLogs = function() {
      try {
        logContainer.style.display = 'none';
        console.log('日志面板已关闭');
      } catch (err) {
        alert('关闭日志面板失败: ' + err.message);
      }
    };

    // 清除日志
    window.clearLogs = function() {
      try {
        logs.length = 0;
        updateLogDisplay();
        console.log('日志已清除');
      } catch (err) {
        alert('清除日志失败: ' + err.message);
      }
    };

    // 复制日志
    window.copyLogs = function() {
      try {
        const logText = logs.map(log => `[${log.timestamp}][${log.type}] ${log.message}`).join('\n');
        
        // 创建临时文本区域
        const textarea = document.createElement('textarea');
        textarea.value = logText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // 选择并复制文本
        textarea.select();
        const successful = document.execCommand('copy');
        
        // 移除临时元素
        document.body.removeChild(textarea);
        
        if (successful) {
          console.log('日志已复制到剪贴板');
        } else {
          console.warn('复制日志失败，可能是浏览器不支持');
        }
      } catch (err) {
        console.error('复制日志时出错:', err.message);
        alert('复制日志失败: ' + err.message);
      }
    };

    // 添加事件监听
    try {
      logContainer.querySelector('.log-close').addEventListener('click', window.hideLogs);
      logContainer.querySelector('#log-clear').addEventListener('click', window.clearLogs);
      logContainer.querySelector('#log-copy').addEventListener('click', window.copyLogs);
    } catch (err) {
      originalConsole.error('添加日志按钮事件监听失败:', err);
    }

    // 捕获全局错误
    try {
      window.addEventListener('error', function(event) {
        console.error('全局错误:', event.message, 'at', event.filename, ':', event.lineno, ':', event.colno);
        return false;
      });
    } catch (err) {
      originalConsole.error('添加全局错误监听失败:', err);
    }

    // 捕获未处理的Promise错误
    try {
      window.addEventListener('unhandledrejection', function(event) {
        let errorInfo = '未知错误';
        try {
          if (event.reason) {
            if (typeof event.reason === 'object') {
              errorInfo = JSON.stringify(event.reason);
            } else {
              errorInfo = String(event.reason);
            }
          }
        } catch (e) {
          errorInfo = '无法序列化的错误对象';
        }
        console.error('未处理的Promise错误:', errorInfo);
        return false;
      });
    } catch (err) {
      originalConsole.error('添加Promise错误监听失败:', err);
    }

    // 记录初始日志
    console.log('日志系统初始化完成');
  } catch (err) {
    alert('日志系统初始化失败: ' + err.message);
    originalConsole.error('日志系统初始化失败:', err);
  }
}

// 导出函数
export { initLogger };

// 为了兼容不支持ES模块的浏览器，创建一个全局函数
window.initLogger = initLogger; 