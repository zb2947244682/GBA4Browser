@echo off
chcp 65001 >nul
echo 正在停止mGBA网页模拟器Docker服务...

REM 检查Docker是否安装
docker --version >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到Docker，请确保已安装Docker并启动Docker服务。
    pause
    exit /b 1
)

REM 停止Docker容器
echo 正在停止容器...
docker-compose down

if %errorlevel% neq 0 (
    echo 错误: 停止容器失败，请检查Docker配置。
    pause
    exit /b 1
) else (
    echo 服务已成功停止！
)

pause 