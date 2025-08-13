# Mike Pawlak – Portfolio Site

![Latest Tests](https://github.com/mikepawlak/portfolio-site/actions/workflows/on_merge_to_main.yml/badge.svg?branch=main)
![Production Deployments](https://img.shields.io/github/deployments/mikepawlak/portfolio-site/production)

Welcome to my [personal portfolio site](https://mikepawlak.com/)! This project is not only a showcase of my work and skills, but also a reflection of how I like to build software: clean, maintainable, automated, and user-focused.

## What This Is

This site is a modern, responsive single-page application built with Angular 17+ and Firebase. It highlights my:

- Professional experience
- Resume download
- Contact methods (GitHub, LinkedIn, Email)

It’s designed to be fast, accessible, and easy to maintain — the same principles I bring to the teams I work with.

## How I Like to Work

### Code Quality & Consistency

- **Pre-commit hooks** using lint-staged and husky ensure code is linted, formatted, and tested before hitting the repository.
- **ESLint + Angular ESLint** for type-safe, accessible, and idiomatic TypeScript code.
- **Prettier** for consistent formatting.

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/67db55c9-753f-481a-9d3b-0afe5dc82bfb" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/7e65820a-925b-4577-b1a9-debabd7ee849" />
    </td>
  </tr>
</table>

### Testing & Confidence

- Unit tests written with Jest and Angular Testing Utilities.
- End to end tests for Chrome, Safari, and Firefox with Playwright
- Code coverage tracked via karma-coverage.
- CI workflow runs tests on every PR and blocks merges on failure.

<img src="https://github.com/user-attachments/assets/51e6cc2b-d73b-475d-a443-a42ee9ebffcc" />

### Continuous Deployment

- **GitHub Actions** pipeline handles:
  - Code linting
  - Unit tests
  - Firebase Hosting preview channels on pull requests
  - Deployment to production on main branch merge

<img style="margin: 0px auto" alt="Github Actions on Pull Request" src="https://github.com/user-attachments/assets/2f92142c-b6d2-45e7-93c5-e4eae34c83e8" />

## Explore the Code

- [apps/web/](http://github.com/mikepawlak/portfolio-site/tree/main/apps/web) – Angular frontend
- [apps/functions/](https://github.com/mikepawlak/portfolio-site/tree/main/apps/functions) – Firebase Functions (Node.js backend)
- [.github/](https://github.com/mikepawlak/portfolio-site/tree/main/.github/) – CI/CD pipelines
