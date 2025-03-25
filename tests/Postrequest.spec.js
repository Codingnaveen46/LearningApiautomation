
import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs'; // ✅ Import filesystem module to write to a file

dotenv.config(); // Load environment variables

test('Create a GitHub repo using Playwright API', async () => {
    const AccessToken = `Bearer ${process.env.AccessToken}`;

    const requestContext = await request.newContext();

    const response = await requestContext.post('https://api.github.com/user/repos', {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': AccessToken,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        data: {
            name: "new-playwright-repo2",
            private: false
        }
    });

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status(), "Failed to create repo").toBe(201);

    const repoName = responseBody.name;
    console.log(`Repository Created: ${repoName}`);

    // ✅ Store repo name in a JSON file
    fs.writeFileSync('repoData.json', JSON.stringify({ repoName }), 'utf-8');
});



