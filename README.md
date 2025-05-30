# GBA4Browser

基于mGBA的浏览器GBA模拟器，支持在微信等WebView环境中运行。

## 最新更新 (v1.3.1)

- 修复微信环境中版本标签不可见问题
- 添加强制刷新按钮，便于清除缓存
- 改进微信环境中的模块加载机制
- 增强错误处理和用户反馈
- 添加更多调试信息，便于排查问题

## 之前更新 (v1.3.0)

- 添加版本标签，便于识别当前加载的版本
- 改进微信环境中的模块加载机制
- 添加模块加载状态实时显示
- 优化ROM文件加载流程，解决黑屏问题
- 添加更多调试信息，便于排查问题

## 功能特性

- 支持GBA/GBC/GB游戏
- 支持键盘控制和触摸控制
- 支持存档和读档
- 支持在微信等WebView环境中运行
- 日志系统，便于调试

## 使用方法

1. 点击屏幕上传ROM文件
2. 使用键盘或屏幕按钮进行游戏控制
3. 使用存档/读档功能保存游戏进度

## 微信环境使用提示

在微信环境中使用时，请注意：

1. 上传ROM文件时，请选择"文件"而非"照片"
2. 推荐使用.gba格式的ROM文件
3. 如果遇到黑屏问题，请刷新页面重试

## 部署方法

### Docker部署

```bash
docker-compose up -d
```

### 手动部署

1. 安装Python 3.x
2. 运行`python server.py`或`start_server.bat`(Windows)
3. 访问`http://localhost:8000`

## 技术说明

- 基于mGBA模拟器核心
- 使用WebAssembly技术
- 纯前端实现，无需后端支持

## 兼容性

- 推荐使用Chrome、Edge或Firefox浏览器
- 支持微信、QQ等WebView环境
- 支持移动端和桌面端浏览器

## 功能特点

- 在浏览器中运行 GBA 游戏
- 支持键盘和触摸屏操作
- 支持游戏存档和读档
- 响应式设计，适配移动设备
- 美观的游戏机风格界面

## 在线体验

你可以通过以下链接在线体验：

[在线体验 mGBA 网页模拟器](#)

## 本地运行

### 前提条件

- Python 3.x

### 运行步骤

1. 克隆本仓库：

```bash
git clone https://github.com/zb2947244682/GBA4Browser
cd GBA4Browser
```

2. 启动本地服务器：

```bash
python server.py
```

3. 在浏览器中访问：

```
http://localhost:5586
```

## Docker 部署

你也可以使用 Docker 部署此项目：

```bash
docker-compose up -d
```

这将在 http://localhost:5586 启动服务。

## 使用方法

1. 点击屏幕上传 ROM 文件（.gba 格式）
2. 使用屏幕上的按钮或键盘控制游戏
   - 方向键：移动
   - A/B 按钮：动作按钮
   - Start/Select：菜单按钮
   - L/R：肩部按钮
3. 使用底部功能栏进行存档、读档和重置操作

## 键盘映射

- Z：A 按钮
- X：B 按钮
- 方向键：方向控制
- Enter：Start 按钮
- 右 Shift：Select 按钮
- Q：L 按钮
- W：R 按钮

## 技术栈

- HTML5 / CSS3 / JavaScript
- mGBA 核心 (WebAssembly)
- Python (用于本地服务器)

## 注意事项

- 本项目仅用于学习和研究目的
- 请确保你拥有游戏 ROM 的合法版权
- 某些浏览器可能需要启用 SharedArrayBuffer 支持

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 致谢

- [mGBA](https://mgba.io/) - GBA 模拟器核心
- 感谢所有为本项目做出贡献的开发者 