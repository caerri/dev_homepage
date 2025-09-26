const http = require("http");
const PORT = 4000;

// Pulling forks
// const token = process.env.GITHUB_TOKEN;
const usernames = ["caerri", "besh"];
const API_URL = "https://api.github.com/users"; // <-- GPT: how would i have foudn this?

async function getRepos(user) {
    const response = await fetch(`${API_URL}/${user}/repos?per_page=5`);
    if (!response.ok) {
        throw new Error(`Error fetching repos for ${user}: ${response.status}`);
    }
    const repos = await response.json(); // <-- GPT: Explain await please
    console.log(`\n${user}'s repos`);
    repos.forEach(repo => {
        console.log(`- ${repo.name} (language: ${repo.language}, last updated: ${repo.updated_at})`); // <-- GPT:  where is forks_count coming from?
    });
}

// Run
(async () => {
    for (const user of usernames) {
        await getRepos(user);
    }
})(); // <-- GPT:  the second () i'mnot sure why that's tehre?