#!/usr/bin/env python3
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加必要的CORS和SharedArrayBuffer支持头部
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        SimpleHTTPRequestHandler.end_headers(self)
    
    def do_GET(self):
        # 处理wasm文件的正确MIME类型
        if self.path.endswith('.wasm'):
            self.send_response(200)
            self.send_header('Content-type', 'application/wasm')
            self.end_headers()
            
            try:
                with open(os.path.join(os.getcwd(), self.path[1:]), 'rb') as f:
                    self.wfile.write(f.read())
            except Exception as e:
                print(f"错误: {e}")
            return
        
        # 处理worker文件
        if self.path.endswith('.worker.js'):
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
            self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
            self.end_headers()
            
            try:
                with open(os.path.join(os.getcwd(), self.path[1:]), 'rb') as f:
                    self.wfile.write(f.read())
            except Exception as e:
                print(f"错误: {e}")
            return
            
        return SimpleHTTPRequestHandler.do_GET(self)
    
    def do_OPTIONS(self):
        # 处理预检请求
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()

def main():
    print("启动GBA模拟器Web服务器...")
    # 默认使用dist目录
    os.chdir('dist')
    
    # 默认端口8000
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"错误: 无效端口号 '{sys.argv[1]}'")
            return
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    
    print(f"服务器运行在 http://localhost:{port}")
    print("按 Ctrl+C 停止服务器")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")
    
if __name__ == '__main__':
    main() 