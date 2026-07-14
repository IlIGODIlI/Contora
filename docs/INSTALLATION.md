# Installation & Setup Guide

This guide walks you through setting up Contora on your local machine for development.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18.x or later is recommended)
- [NPM](https://www.npmjs.com/) (Standard package manager included with Node)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (Optional, but highly recommended for local serverless backend testing)

---

## Step-by-Step Local Setup

### 1. Clone and Install Dependencies
Clone the repository and install the development packages:
```bash
git clone https://github.com/your-username/Contora.git
cd Contora
npm install
```

### 2. Configure Environment Variables
Copy the template `.env.example` to create a local `.env` file:
```bash
cp .env.example .env
```
Open `.env` and fill in your API key(s) to enable active AI generations:
- **`OPENAI_API_KEY`**: Set this to your OpenAI Developer API Key.
- **`GEMINI_API_KEY`**: Set this to your Google AI Gemini API Key.

*Note: If both keys are empty, the application will automatically fall back to static mock data in development so you can still test the UI.*

### 3. Running the App Local Dev Servers

#### Option A: Frontend Only (No local Netlify Functions)
To test the frontend UI and style changes without calls to an LLM, run the Vite development server:
```bash
npm run dev
```
This serves the application at [http://localhost:5173/](http://localhost:5173/).

#### Option B: Full Stack (Frontend + Local Serverless API) - *Recommended*
To test local AI generation features, run the Netlify CLI development environment (which loads environment variables from your `.env` file and spins up the serverless backend function proxy):
```bash
npx netlify dev
```
This serves the proxy application at [http://localhost:3000/](http://localhost:3000/). The frontend will route API requests to `http://localhost:3000/.netlify/functions/generate` which connects to OpenAI or Gemini APIs using the keys in your `.env` file.

---

## Running Verification

### Running Tests
Execute the unit test runner to verify logic:
```bash
npm run test
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```
This compiles the code into the `dist/` directory at the project root.
