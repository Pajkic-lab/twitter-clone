# Contributing

We would love it if you contributed to the project and helped make Twclone better. We will make sure that contributing to Twclone is easy, enjoyable, and educational for anyone and everyone. All contributions are welcome, including features, issues, documentation, guides, and more.

All contributions to this open-source Twclone app must adhere to high-quality standards. Developers are expected to ensure that all code is covered with tests, as testing will be an integral part of the development process. Additionally, contributors must follow linting rules and other guidelines, which will be discussed and clearly established to maintain consistency and code quality throughout the project. 😊

## Current state and future development

The app is currently built as a monolith. Once all the major features are implemented, we plan to engage with our community to explore the possibility of refactoring it into a microservices architecture, depending on the level of interest.

## Got a question?

You can ask questions, consult with more experienced Twclone devs, and discuss Twclone-related topics in the our [Github discussions](https://github.com/Pajkic-lab/twitter-clone/discussions).

## Found a bug?

If you find a bug in the source code, you can help us by [submitting an issue](https://github.com/Pajkic-lab/twitter-clone/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=) to our GitHub Repository. Even better, you can submit a Pull Request with a fix.

## Missing a feature?

You can request a new feature by [submitting an issue](https://github.com/Pajkic-lab/twitter-clone/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=) to our GitHub Repository.

If you'd like to implement a new feature, it's always good to be in touch with us before you invest time and effort, since not all features can be supported.

- For a Major Feature, first open an issue and outline your proposal. This will let us coordinate efforts, prevent duplication of work, and help you craft the change so that it's successfully integrated into the project.

## What do you need to know to help?

If you want to help out with a code contribution, our project uses the following stack:

### Server-side

- [Node.JS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/docs)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/) (with [PostgreSQL](https://www.postgresql.org/about/))
- [Jest](https://docs.nestjs.com/fundamentals/testing) (for testing)

### Client-side

- [React](https://reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Styled components](https://styled-components.com/)

## Good first issues

Are you new to open source contribution? Wondering how contributions work in our project? Here's a quick rundown.

Find an issue that you're interested in addressing, or a feature that you'd like to add.
You can use [this view](https://github.com/Pajkic-lab/twitter-clone/issues?q=is%3Aopen+is%3Aissue+label%3Agood-first-issue) which helps new contributors find easy gateways into our project.

## Step 1: Make a fork

Fork the Amplication repository to your GitHub organization. This means that you'll have a copy of the repository under _your-GitHub-username/repository-name_.

> :accessibility: Un-check "Copy the DEFAULT branch only"

## Step 2: Clone the repository to your local machine

```sh
git clone -b next https://github.com/{your-GitHub-username}/twitter-clone.git

```

## Step 3: Prepare the development environment

Set up and run the development environment on your local machine following the [README](./README.md#Installation)

## Step 4: Create a branch

Create a new branch for your changes from develop branch.
In order to keep branch names uniform and easy-to-understand, please use the following conventions for branch naming.
Generally speaking, it is a good idea to add a group/type prefix to a branch.
Here is a list of good examples:

- for docs change : `docs/{ISSUE_NUMBER}-{CUSTOM_NAME}` for e.g. docs/2233-update-contributing-docs
- for new features : `feat/{ISSUE_NUMBER}-{CUSTOM_NAME}` for e.g. feat/1144-add-plugins
- for bug fixes : `fix/{ISSUE_NUMBER}-{CUSTOM_NAME}` for e.g. fix/9878-fix-invite-wrong-url
- for anything else: `chore/{ISSUE_NUMBER}-{CUSTOM_NAME}` for e.g. chore/111-update-ci-url

```sh
git checkout -b branch-name-here
```

## Step 5: Make your changes

Update the code with your bug fix or new feature.

## Step 6: Add the changes that are ready to be committed

Stage the changes that are ready to be committed:

```sh
git add .
```

## Step 7: Commit the changes (Git)

Commit the changes with a short message. (See below for more details on how we structure our commit messages)

```sh
git commit -m "<type>(<package>): <subject>"
```

## Step 8: Push the changes to the remote repository

Push the changes to the remote repository using:

```sh
git push origin branch-name-here
```

## Step 9: Create Pull Request

In GitHub, do the following to submit a pull request to the upstream repository:

1.  Give the pull request a title and a short description of the changes made following the template. Include also the issue or bug number associated with your change. Explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. <br/> ⚠️ **Make sure your pull request target the `develop` branch.**

> Pull request title should be in the form of `<type>(<package>): <subject>` as per commit messages.
> Remember, it's okay if your pull request is not perfect (no pull request ever is). The reviewer will be able to help you fix any problems and improve it!

2.  Wait for the pull request to be reviewed by a maintainer.

3.  Make changes to the pull request if the reviewing maintainer recommends them.

Celebrate your success after your pull request is merged :-)

## Git Commit Messages

We structure our commit messages like this:

```
<type>(<package>): <subject>
```

Example

```
fix(server): missing entity on init
```

### Types:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Changes to the documentation
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Packages:

- **server**
- **client**
- **library**

## Code of conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

[Code of Conduct](./CODE_OF_CONDUCT.md)

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy.
