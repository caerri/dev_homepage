// server.js
const http = require("http");
const { URL } = require("url");

const PORT = 5001;

// Plain HTML sent by Node
const indexHTML = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>5 GitHub Repos</title></head>
  <body>
    <h1>5 GitHub Repos</h1>
    <form id="form">
      <input id="username" placeholder="GitHub username" autocomplete="off" />
      <button type="submit">Search</button>
    </form>
    <div id="results"></div>
    <script src="/client.js"></script>
  </body>
</html>`;

// Plain JS sent by Node (runs in the browser)
const clientJS = `document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const input = document.getElementById("username");
  const results = document.getElementById("results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = input.value.trim();
    if (!user) { results.textContent = "Please enter a username."; return; }

    results.textContent = "Loading...";
    try {
      const res = await fetch("/api/repos?user=" + encodeURIComponent(user));
      if (!res.ok) throw new Error("GitHub responded " + res.status);
      const repos = await res.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        results.textContent = "No repos found.";
        return;
      }
      const items = repos.map(r =>
        \`<li>\${r.name} — language: \${r.language ?? "n/a"} — updated: \${r.updated_at}</li>\`
      ).join("");
      results.innerHTML = "<ul>" + items + "</ul>";
    } catch (err) {
      results.textContent = "Error: " + err.message;
    }
  });
});`;

// Helper: send text and stop (prevents "headers already sent")
function send(res, status, body, contentType = "text/plain") {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(body);
}

const server = http.createServer((req, res) => {
  (async () => {
    const url = new URL(req.url, "http://localhost");

    // Page
    if (req.method === "GET" && url.pathname === "/") {
      return send(res, 200, indexHTML, "text/html");
    }

    // Client script
    if (req.method === "GET" && url.pathname === "/client.js") {
      return send(res, 200, clientJS, "text/javascript");
    }

    // API proxy -> GitHub
    if (req.method === "GET" && url.pathname === "/api/repos") {
      const user = url.searchParams.get("user");
      if (!user) return send(res, 400, JSON.stringify({ error: "missing user" }), "application/json");

      const ghURL = `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=5`;
      const ghRes = await fetch(ghURL, {
        headers: {
          "User-Agent": "node-sandbox",
          "Accept": "application/vnd.github+json"
        }
      });

      // Pass through GitHub status (200/404/etc)
      const data = await ghRes.text();
      return send(res, ghRes.status, data, "application/json");
    }

    // Fallback
    send(res, 404, "Not found");
  })().catch(err => {
    send(res, 500, "Server error: " + err.message);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:" + PORT);
});