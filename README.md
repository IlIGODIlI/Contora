# Contora

<p align="center">
  <strong>AI-powered content strategy tool for creators. Get niche-specific plans, hooks, and ideas in minutes.</strong>
</p>

<p align="center">
  <a href="#key-features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Overview

Contora is a premium, high-fidelity single-page web application designed for digital creators looking to build consistent, evidence-backed posting strategies. Instead of generic marketing frameworks, Contora tailors every item (weekly roadmaps, platform-optimal post schedules, hook swipe-files, and content themes) to your platform, style, skill level, and available time.

The project features a sleek dark design system, glowing cursor mouse followers, responsive dashboard layouts, and zero-framework performance.

---

## Key Features

1. **6-Step Onboarding Quiz**: A smooth, animated state machine gathering platform, niche, editing style, and goal data.
2. **Weekly Action Roadmap**: A structured, step-by-step checklist customized to your weekly hours availability.
3. **Interactive Hook Tester**: Audits text hooks across 7 copywriting dimensions (attention open, curiosity gap, pattern interrupts, etc.) with a compact visual ring scorer and AI rewrites.
4. **Infinite Content Idea Generator**: Algorithmic combination shuffler that generates thousands of trending formats, angles, and niche topics.
5. **Data-backed Posting Times**: Shows optimized platform schedules and frequencies with dynamic, visual hot/good badge indicators.
6. **AI Strategy Coach Chat**: Interactive terminal to query hooks, scripts, and content ideas with an assistant trained on your specific niche and style parameters.
7. **One-click Save & Export**: Easily compile and copy your strategy report to clipboard or draft an email instantly.

---

## Tech Stack

Contora is built using modern software practices designed for near-instant client loads and zero layout shift:

- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Custom Design Token variables and hardware-accelerated GPU transitions), and Vanilla ES Modules.
- **Development Tooling**: [Vite](https://vite.dev/) (fast module hot-reloading and micro-bundling).
- **Testing**: [Vitest](https://vitest.dev/) (isolated unit test runner).
- **Backend Function**: [Netlify Functions](https://www.netlify.com/products/functions/) (Node.js serverless route proxying).
- **LLM Integrations**: Native HTTP fetch implementations for **Gemini 1.5 Flash** and **OpenAI GPT-4o-mini**.

---

## Quick Start

Get Contora running on your local machine in under 2 minutes:

### 1. Clone and Install
```bash
git clone https://github.com/your-username/Contora.git
cd Contora
npm install
```

### 2. Configure Environment Keys
Copy the environment variables template:
```bash
cp .env.example .env
```
Fill in your API keys in the `.env` file to activate AI generation:
- `GEMINI_API_KEY=your_gemini_api_key_here` (Recommended)
- `OPENAI_API_KEY=your_openai_api_key_here`

*Note: If no API keys are specified, the backend automatically runs via mock fallbacks so you can test all UI flows instantly.*

### 3. Start Development Server
For full-stack testing (frontend served via Vite + serverless backend endpoint proxying):
```bash
npx netlify dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## Documentation

For deep technical insights and configuration tutorials, refer to the documentation files under `docs/`:

- 📐 **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Explains Jamstack design patterns, module dependency graphs, and request lifecycles.
- ⚙️ **[docs/CONFIGURATION.md](docs/CONFIGURATION.md)**: Explains environment variables, customized questions, posting times, and idea template banks.
- 🔌 **[docs/API.md](docs/API.md)**: Details HTTP request-response payloads for strategy and chat routes.
- 🚀 **[docs/INSTALLATION.md](docs/INSTALLATION.md)**: Complete local setup guide.
- 🛠️ **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)**: Code guidelines and developer standards.
- 📑 **[docs/FAQ.md](docs/FAQ.md)**, **[docs/PERFORMANCE.md](docs/PERFORMANCE.md)**, **[docs/ROADMAP.md](docs/ROADMAP.md)**, **[docs/CHANGELOG.md](docs/CHANGELOG.md)**: Additional project resources.

---

## Testing

Ensure changes do not break core behavior by running the test suite:
```bash
npm run test
```

Vite build validation can be verified using:
```bash
npm run build
```

---

## License

Contora is open-source software licensed under the [MIT License](LICENSE).
