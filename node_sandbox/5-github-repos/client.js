// client.js

document.addEventListener("DOMContentLoaded", () => {
    // pulls from server.js
    const form = document.getElementById("form");
    const resultsDiv = document.getElementById("results");

    // on submit
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // to stop refresh

        const username = document.getElementById("username").ariaValueMax.trim();
        if (!username) {
            resultsDiv.innerHTML = "<p>Please enter a username.</p>";
            return;
        }

        resultsDiv.innerHTML = "<p>Loading...</p>"

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=5`);

            if (!response.ok) {
                throw new Error(`GitHub error: ${response.status}`);
            }

            const repos = await response.json();

            if (repos.length === 0) {
                resultsDiv.innerHTML = "<>No repos found.</p>";
                return;
            }

            const list = repos.map(repo =>
                `<li>${repo.name}, Language: "${repo.language}</li>`
            ).join("");

            resultsDiv.innerHTML = `<ul>${list}</ul>`
        }
    });
});