
import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs'; // ✅ Import filesystem module to read the file

dotenv.config(); // Load environment variables

test('Delete a GitHub repository', async () => {
    const AccessToken = `Bearer ${process.env.AccessToken}`;
    const owner = "Codingnaveen46";

    // ✅ Read the repository name from JSON file
    if (!fs.existsSync('repoData.json')) {
        throw new Error("Repo data file not found. Ensure the create repo test runs first.");
    }

    const repoData = JSON.parse(fs.readFileSync('repoData.json', 'utf-8'));
    const repoName = repoData.repoName;

    if (!repoName) {
        throw new Error("Repo name is missing from the JSON file.");
    }

    console.log(`Deleting Repository: ${repoName}`);

    const requestContext = await request.newContext();

    const response = await requestContext.delete(`https://api.github.com/repos/${owner}/${repoName}`, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': AccessToken,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        }
    });

    console.log(`Status: ${response.status()}`);
    console.log(await response.text());

    expect(response.status(), "Repository deletion failed").toBe(204);

    //testing to check the git commit  after removing the .env
});
