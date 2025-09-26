const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Serve the HTML page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <head><title>5 Github Repos</title></head>
        <body>
          <form id="form">
            Enter GitHub Username to Search
            <input type="text" id="username" placeholder="Github Username">
            <button type="submit">Submit</button>
          </form>
          <div id="results"></div>
          <script src="/client.js"></script>
        </body>
      </html>
    `);
  } else if (req.url === "/client.js") {
    // Serve the client script
    const filePath = path.join(__dirname, "client.js");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("client.js not found");
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  } else {
    // Anything else -> 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(5001, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:5001");
});