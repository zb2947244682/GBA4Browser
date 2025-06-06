import http.server
import socketserver
import os

# Configure the port
PORT = 8000

# Custom handler to set MIME type and cross-origin isolation headers
class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        # Explicitly set MIME type for .wasm files
        if path.endswith('.wasm'):
            print(f"Serving {path} with MIME type: application/wasm")
            return 'application/wasm'
        return super().guess_type(path)

    def end_headers(self):
        # Set MIME type for .wasm files
        if self.path.endswith('.wasm'):
            self.send_header('Content-Type', 'application/wasm')
            print(f"Setting Content-Type header for {self.path}: application/wasm")
        # Add cross-origin isolation headers (optional, included for completeness)
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        # Prevent caching to avoid stale responses
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        print(f"Received GET request for: {self.path}")
        super().do_GET()

# Change to the directory containing the script and static files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Set up the server
Handler = CustomHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down the server...")
        httpd.server_close()