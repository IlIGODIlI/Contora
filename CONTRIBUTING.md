# Contributing to Contora

We love open-source contributions! Thank you for helping build the best content strategy tool for creators.

## Code of Conduct

All contributors must adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. **Fork the Repository**: Create your own copy of this project on GitHub.
2. **Clone the Fork**: Clone the project locally.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Read Detailed Guide**: Review [docs/INSTALLATION.md](docs/INSTALLATION.md) for full instructions on local servers, environment variables, and Netlify CLI integrations.

## Coding Standards

- We use modern ES Modules. Do not write legacy global-scope scripts.
- Keep components modular and reusable.
- Follow consistent naming standards:
  - lowercase folders for assets and scripts
  - camelCase for function and variable names
  - PascalCase for classes
  - snake_case where appropriate
- Format your code using Prettier and verify linting.

## Testing Your Changes

We have unit tests configured under `tests/`. Always run the test suite before proposing changes:
```bash
npm run test
```
If adding a new feature or helper, make sure to write corresponding test coverage.

## Submitting Pull Requests

1. Create a descriptive feature branch: `git checkout -b feature/your-awesome-feature`.
2. Commit your changes with clear, semantic messages.
3. Push to your fork and open a Pull Request.
4. Fill out the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) in detail.
5. Ensure that the automated GitHub CI checks pass.
