# GBA4Browser - 网页版GBA模拟器

这是一个基于mGBA的网页版GameBoy Advance模拟器，可以在浏览器中运行GBA游戏。

## 特性

- 直接在浏览器中加载和运行GBA ROM文件
- 键盘控制支持
- 游戏状态保存和加载功能
- 响应式界面设计

## 如何使用

### 在Windows上运行

1. 确保已安装Python 3.x
2. 打开命令提示符或PowerShell，进入项目根目录
3. 运行服务器脚本：
   ```
   python server.py
   ```
4. 在浏览器中访问：`http://localhost:8000`

### 在Ubuntu上部署

1. 确保已安装Python 3.x：
   ```
   sudo apt update
   sudo apt install python3
   ```

2. 运行服务器：
   ```
   python3 server.py
   ```

3. 如果需要在不同端口运行，可以指定端口号：
   ```
   python3 server.py 9000
   ```

## 使用说明

1. 点击"选择文件"按钮上传GBA ROM文件（.gba格式）
2. 点击"开始游戏"按钮启动游戏
3. 使用键盘控制：
   - 方向键：上下左右
   - Z键：A按钮
   - X键：B按钮
   - A键：L按钮
   - S键：R按钮
   - Enter键：Start按钮
   - Backspace键：Select按钮

## 技术说明

这个项目使用了以下技术：

- mGBA - 高性能GBA模拟器核心
- WebAssembly - 用于在浏览器中高效运行mGBA核心
- JavaScript - 处理用户输入和界面交互
- Python - 提供简单的HTTP服务器，支持必要的CORS头部

## 注意事项

- 为了使WebAssembly的SharedArrayBuffer功能正常工作，服务器添加了特殊的CORS头部
- 本模拟器仅用于教育和个人用途，请不要用于分发受版权保护的游戏ROM 