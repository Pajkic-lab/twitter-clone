---
sidebar_position: 2
---

# Run the App

This guide will walk you through setting up and running the **TWC** project locally.

---

## Getting Started

Before running the app, make sure your environment is properly set up.

### Prerequisites

You’ll need the following installed on your machine:

- **Node.js** (v20.x)
- **pnpm** (v9.x)
- **Docker** and **Docker Compose**

---

### Installation

1. **Fork the repository**

2. **Clone the repository:**

3. **Set up the environment variables:**
   - Run command in root dir.
     ```bash
     pnpm run env:set
     ```
4. **Set up app for development:**
   - Docker has to be running.
   - This command sets development environment. Run it initially and whenever you change the environment:
     ```bash
     pnpm run dev:set
     ```
   - Run the app:
     ```bash
     pnpm run dev
     ```
5. **Set up app for staging:**
   - This command sets staging app environment. Run it initially and whenever you change the environment:
     ```bash
     pnpm run staging-local:set
     ```
   - Run the app:
     ```bash
     pnpm run staging-local
     ```
