@echo off
chcp 65001 >nul
echo 正在使用Docker启动mGBA网页模拟器...

REM 检查Docker是否安装
docker --version >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到Docker，请确保已安装Docker并启动Docker服务。
    pause
    exit /b 1
)

REM 检查Docker Compose是否安装
docker-compose --version >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到Docker Compose，请确保已安装Docker Compose。
    pause
    exit /b 1
)

REM 启动Docker容器
echo 正在启动容器...
docker-compose up -d

if %errorlevel% neq 0 (
    echo 错误: 启动容器失败，请检查Docker配置。
    pause
    exit /b 1
) else (
    echo 服务已成功启动！
    echo 请访问 http://localhost:5586 使用mGBA模拟器
)

REM 显示容器状态
echo.
echo 容器状态:
docker-compose ps

pause 