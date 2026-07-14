# Frequently Asked Questions

## Product Questions

### 1. Is Contora really free?
Yes. Contora is 100% free, open-source, and requires no registration, signups, or credit cards. You can build as many strategies as you want.

### 2. How is this different from ChatGPT?
ChatGPT is a general-purpose text tool. It often gives generic, dry marketing advice when prompted. Contora is built specifically for digital creators. It blends your platform, style, skill level, and available time with a custom copywriting audit engine (Hook Tester) and infinite content idea combinations.

### 3. Will two creators get the same strategy?
No. The strategies are generated dynamically. The backend LLMs use your specific answers, and the frontend Hook Tester and Idea Shuffler utilize seeded RNG and combinational engines, meaning two creators in the same niche with different styles or skill levels will receive entirely distinct outputs.

### 4. What platforms and niches does Contora support?
Out of the box, we support:
- **Platforms**: Instagram Reels, TikTok, YouTube Shorts, and YouTube Long-form.
- **Niches**: Cinematic Editing, Self Improvement, AI & Tech, Gaming, Business & Finance, Lifestyle/Vlogs, Art & Painting, Food & Cooking, Fitness & Health, Music & Audio, Education, and custom text inputs.

---

## Technical Questions

### 5. Why does the API call fail in local development?
By default, standard browser requests to Netlify Functions (`/.netlify/functions/*`) fail if run directly from a static server (like `npm run dev`) because the serverless functions are not running. To run the backend functions locally:
1. Ensure you have installed Netlify CLI (`npm install -g netlify-cli`).
2. Run `npx netlify dev` instead of `npm run dev`. This will host a proxy server that handles the backend requests.

### 6. Do I need an OpenAI or Gemini API key to run this?
No. If no keys are specified in your `.env` file, the Netlify function (`netlify/functions/generate.js`) automatically detects this and returns simulated mock payloads tailored to your inputs. This ensures that developers can run and test the full application immediately without signing up for paid AI credentials.

### 7. Why use ES Modules instead of legacy scripts?
Modernizing the scripts into ES Modules allows us to:
- Establish a clear dependency tree.
- Avoid polluting the global window namespace.
- Run automated unit tests using Vitest in isolation.
- Compile and bundle the code into single-file outputs via Vite for rapid load performance.
