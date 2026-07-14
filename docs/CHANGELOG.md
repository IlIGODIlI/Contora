# Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] - 2026-07-14

This major release modernizes the repository layout, refactors script loading to modern modules, implements a local serverless testing server, and creates professional documentation in line with open-source project standards.

### Added
- **Modern Project Structure**: Relocated source code to `src/` to isolate application files from project configuration files.
- **NPM Package Config**: Created `package.json` to manage development tools and testing packages.
- **Vite Build System**: Added `vite.config.js` to manage rapid development hot-reloads and compile high-performance build outputs under `dist/`.
- **Serverless API Gateway**: Implemented Netlify serverless function `netlify/functions/generate.js` to handle strategy and chat completions. Supported both Gemini and OpenAI APIs.
- **Mock Fallback Environment**: Added automated offline fallback mocks in the netlify function, allowing the full strategy and chat loops to run in local unconfigured development.
- **Vitest Testing Runner**: Set up a comprehensive unit testing environment inside `tests/` utilizing Vitest. Added coverage for the idea generation engine and copywriting scoring logic.
- **Detailed Documentation**: Created a documentation library in `docs/` (`ARCHITECTURE.md`, `INSTALLATION.md`, `API.md`, `CONFIGURATION.md`, `FAQ.md`, `PERFORMANCE.md`, `ROADMAP.md`, and `CHANGELOG.md`).
- **Open-source Core files**: Added `LICENSE`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `CONTRIBUTING.md`.

### Changed
- **ES Modules Refactoring**: Refactored the old sequence of global-scope script tags to modern modular imports and exports.
- **Decoupled Architecture**: Cleared circular dependencies by implementing callback mechanisms for quiz completion events.
- **Dynamic Variable Scoping**: Bound exported module methods to `window` globally to guarantee backwards compatibility with dynamic inline HTML templates.
- **Styling Consolidation**: Consolidated the standalone `quiz-transition-snippet.css` file into the animation section of `styles.css`.
