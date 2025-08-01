# Mike Pawlak – Portfolio Site

Welcome to my personal portfolio site! This project is not only a showcase of my work and skills, but also a reflection of how I like to build software: clean, maintainable, automated, and user-focused.

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

### Testing & Confidence

- Unit tests written with Jest and Angular Testing Utilities.
- End to end tests for Chrome, Safari, and Firefox with Playwright
- Code coverage tracked via karma-coverage.
- CI workflow runs tests on every PR and blocks merges on failure.

### Continuous Deployment

- **GitHub Actions** pipeline handles:

  - Code linting
  - Unit tests
  - Firebase Hosting preview channels on pull requests
  - Deployment to production on main branch merge

## Explore the Code

- apps/web/ – Angular frontend
- apps/functions/ – Firebase Functions (Node.js backend)
- .github/workflows/ – CI/CD pipelines

## Feature Highlights

- Inline skeleton loaders to improve perceived performance
- Firebase Analytics tracking for user interaction (resume downloads, social links)
- Feature flags powered by Firebase Remote Config
