<div style="text-align: center;">
    <img src="libs/ui/assets/src/lib/svg/twitterLogo.svg" alt="logo" style="display: block; margin: auto; width: 60px; filter: brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(1000%) hue-rotate(190deg) brightness(105%);">
    <p style="font-size: 34px;">Twitter clone</p>
    <hr/>
    <p style="font-size: 24px;">Purpose: sharing Knowledge!</p>
    <p style="font-size: 18px;">Everybody is welcome, regardless of your skill level. 😊</p>
    <div style="display: flex; justify-content: center; gap: 5px; margin-top: 40px; padding: 160px 60px; background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%);">
        <img src="libs/ui/assets/src/lib/svg/readme/typescript-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/nx-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/react-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/react-query-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/nestjs-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/prisma-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/postqresql-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/zod-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
        <img src="libs/ui/assets/src/lib/svg/readme/pnpm-seeklogo.svg" alt="logo" style="display: block; margin: auto; width: 80px; fill: black">
    </div>
    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.txt" target="_blank">
            <img alt="Static Badge" src="https://img.shields.io/badge/license%20-%20CCBYNCSA4.0-blue" style="height: 20px;">
        </a>
        <a href="https://github.com/Pajkic-lab/twitter-clone/graphs/contributors" target="_blank">
            <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/Pajkic-lab/twitter-clone" style="height: 20px;" > 
        </a>
        <a href="https://github.com/Pajkic-lab/twitter-clone" target="_blank">
            <img src="https://img.shields.io/github/stars/Pajkic-lab/twitter-clone" alt="License Badge" style="height: 20px;"> 
        </a>
    </div>
</div>

# Introduction

Welcome to the **Twitter Clone App** repository! This open-source project is designed to foster collaboration and knowledge sharing among developers. The application replicates core features of Twitter and serves as a platform to learn and grow together as a community. Everybody is welcome!

<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">

<div>
<h2>Purpose</h2>
<p>This project is <strong>non-commercial</strong> and is aimed at:</p>
    <ul>
        <li>Learning and experimenting with modern web technologies</li>
        <li>Sharing knowledge and best practices</li>
        <li>Collaborating with other developers</li>
    </ul>
</div>

<div>
<h2>Tech Stack</h2>
    <ul>
        <li><strong>Language:</strong> TypeScript </li>
        <li><strong>Monorepo:</strong> Nx Monorepo</li>
        <li><strong>Frontend:</strong> React, React query, styled-components</li>
        <li><strong>Backend:</strong> NestJS, Prisma</li>
        <li><strong>Database:</strong> PostgreSQL</li>
    </ul>
</div>

<div>
<h2>Features</h2>
    <ul>
        <li>User authentication and authorization</li>
        <li>Tweet creation and interaction (likes, retweets, comments)</li>
        <li>Follow/unfollow functionality</li>
        <li>Real-time updates with WebSockets</li>
        <li>Notifications</li>
        <li>Hashtags and Trends</li>
        <li>Direct Messaging</li>
        <li>Search Functionality</li>
        <li>Media Uploads</li>
        <li>Analytics Dashboard</li>
        <li>Polls</li>
        <li>Tweet Scheduling</li>
        <li>Accessibility Features</li>
        <li>Multi-language Support</li>
    </ul>
</div>

</div>

<div>
      <h2>Getting Started</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (v20.x)</li>
    <li>pnpm (v9.x)</li>
    <li>Docker and Docker Compose</li>
  </ul>

  <h3>Installation</h3>
  <ol>
    <li><strong>Fork the repository</strong></li>
    </br>
    <li>
      <strong>Clone the repository:</strong>
      <!-- <pre><code>git clone https://github.com/Pajkic-lab/twitter-clone.git</code></pre> -->    
    </li>
    </br>
    <li>
      <strong>Set up the environment variables:</strong>
      <ul>
        <li>Copy <code>.env.example</code> template file content and create <code>.env.development</code> file for development and <code>.env.staging</code> for the staging environment.</li>
        <li>For the staging environment, you should change <code>DATABASE_URL_PG</code> value, which you can find in the <code>docker-compose</code> file.</li>
      </ul>
    </li>
    <li>
      <strong>Set up app for development:</strong>
      <ul>
        <li>This command sets the app environment. Run it initially and whenever you change the environment:</li>
        <pre><code>pnpm run dev:set</code></pre>
        <li>Run the app:</li>
        <pre><code>pnpm run dev</code></pre>
      </ul>
    </li>
    <li>
      <strong>Set up app for staging:</strong>
      <ul>
        <li>This command sets the app environment. Run it initially and whenever you change the environment:</li>
        <pre><code>pnpm run staging:set-local</code></pre>
        <li>Run the app:</li>
        <pre><code>pnpm run staging-local</code></pre>
      </ul>
    </li>
  </ol>

  <h3>Contributing</h3>
  <p>Twclone code is open-source. We are committed to a transparent development process and highly appreciate any contributions. Whether you are helping us fix bugs, proposing new features, improving our documentation, or spreading the word - we would love to have you as a part of the TWclone community. Please refer to our <a>contribution guidelines</a> and <a>code of conduct</a>.</p>
  <ul>
    <li><strong>Bug Report:</strong> If you see an error message or encounter an issue while using TWclone, please create a bug report.</li>
  </ul>
</div>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Special thanks to media team for promoting us

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

### Licensing of Contributions

By contributing, you agree that your work will be licensed under the same **CC BY-NC-SA 4.0** license as the project.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

You are free to:

- **Share**: Copy and redistribute the material in any medium or format.
- **Adapt**: Remix, transform, and build upon the material.

Under the following terms:

- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial**: You may not use the material for commercial purposes.
- **ShareAlike**: If you remix, transform, or build upon the material, you must distribute your contributions under the same license.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Acknowledgments

Thank you to all contributors and the open-source community for supporting this project. Together, we can create something amazing!
