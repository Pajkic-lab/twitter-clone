<div align="center">
    <img src="libs/ui/assets/src/lib/svg/twitterLogo.svg" alt="logo" style="display: block; margin: auto; width: 60px; filter: brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(1000%) hue-rotate(190deg) brightness(105%);">
    <p style="font-size: 34px;">Twitter clone</p>
    <hr/>
    <p style="font-size: 24px;">Purpose: sharing Knowledge!</p>
    <p style="font-size: 18px;">Everybody is welcome, regardless of your skill level. 😊</p>
    <img src="libs/ui/assets/src/lib/img/jumbo post.jpg">
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

## Introduction

Welcome to the **Twitter Clone App** repository! This open-source, non-commercial project is designed for:

- Learning and experimenting with modern web technologies
- Sharing best practices
- Collaborating with developers worldwide

Built with a robust tech stack including **TypeScript**, **Nx Monorepo**, **React**, **NestJS**, and **PostgreSQL**, the app replicates core features of Twitter while serving as a platform for growth and innovation.

### Why Should You Join Us?

By contributing to this project, you’ll gain hands-on experience with system design, write clean and test-covered code, and follow professional, production-ready best practices. Collaborate on a codebase that prioritizes quality and embraces modern development standards.

**Everybody is welcome!** Whether you’re a seasoned developer or just starting, we encourage you to join our community and grow together.

## Getting Started

### Prerequisites

- Node.js (v20.x)
- pnpm (v9.x)
- Docker and Docker Compose

### Installation

1. **Fork the repository**
2. **Clone the repository:**
3. **Set up the environment variables:**
   - Copy `.env.example` template file content and create `.env.development` file for development and `.env.staging` for the staging environment.
   - For the staging environment, you should change the `DATABASE_URL_PG` value, which you can find in the `docker-compose` file.
4. **Set up app for development:**
   - This command sets the app environment. Run it initially and whenever you change the environment:
     ```bash
     pnpm run dev:set
     ```
   - Run the app:
     ```bash
     pnpm run dev
     ```
5. **Set up app for staging:**
   - This command sets the app environment. Run it initially and whenever you change the environment:
     ```bash
     pnpm run staging:set-local
     ```
   - Run the app:
     ```bash
     pnpm run staging-local
     ```

### Contributing

TWclone code is open-source. We are committed to a transparent development process and highly appreciate any contributions. Whether you are helping us fix bugs, proposing new features, improving our documentation, or spreading the word - we would love to have you as a part of the TWclone community. Please refer to our [contribution guidelines](#) and [code of conduct](#).

- **Bug Report:** If you see an error message or encounter an issue while using TWclone, please create a bug report.

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
