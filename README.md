# mGBA 网页模拟器

这是一个基于 mGBA 的网页版 GBA 模拟器，可以在浏览器中运行 GBA 游戏。

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