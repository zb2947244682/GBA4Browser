@echo off
chcp 65001 >nul
echo 正在启动 mGBA 网页模拟器服务器...
echo 服务将在 http://localhost:5586 上运行

REM 检查Python是否安装
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到Python，请确保已安装Python并添加到PATH环境变量中。
    pause
    exit /b 1
)

REM 启动服务器
python server.py

REM 如果服务器意外退出
echo 服务器已停止运行。
pause 