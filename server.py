import http.server
import socketserver

PORT = 8000

# 设置简单的请求处理器
Handler = http.server.SimpleHTTPRequestHandler

# 创建并启动服务器
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"服务器运行在端口 {PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")
        httpd.server_close()