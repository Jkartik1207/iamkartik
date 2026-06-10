from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import webbrowser

PORT = 8000
ROOT = Path(__file__).parent.resolve()

class PortfolioRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


def find_port(start_port: int = 8000) -> int:
    import socket
    port = start_port
    while port < start_port + 10:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('127.0.0.1', port)) != 0:
                return port
        port += 1
    return start_port


def main() -> None:
    port = find_port(PORT)
    address = ('', port)
    server = ThreadingHTTPServer(address, PortfolioRequestHandler)
    url = f'http://127.0.0.1:{port}'

    print(f'Portfolio server running at {url}')
    print('Press Ctrl+C to stop.')

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')
        server.server_close()


if __name__ == '__main__':
    main()
