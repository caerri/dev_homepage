const http = require('http');
const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Hello from Node on port ${PORT}\n`);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Node server listening at http://0.0.0.0:${PORT}`);
});
