# Configuration & Customization Guide

This guide describes how to configure environment credentials and customize the onboarding flow, platform schedules, and content banks in Contora.

---

## 1. Environment Configurations

Copy `.env.example` to `.env` in your project root:
```bash
cp .env.example .env
```

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `OPENAI_API_KEY` | OpenAI Developer Key (for GPT-4o-mini generations) | `sk-proj-...` |
| `GEMINI_API_KEY` | Google AI Studio Key (for Gemini 1.5 Flash generations) | `AIzaSy...` |

*Note: If both keys are present, the Netlify function defaults to using Gemini API.*

---

## 2. Customizing Onboarding Questions

The onboarding questions are declared statically in **`src/js/quiz.js`** inside the `questions` array.

To add or modify questions or options, locate the array:
```javascript
const questions = [
  {
    id: 'platform',
    step: 'Step 1 of 6',
    q: 'Where do you create content?',
    sub: 'Pick your main platform.',
    type: 'grid', // 'grid' (icons) or 'single' (radio buttons)
    opts: [
      { icon: '📸', t: 'Instagram Reels', d: 'Short-form video content' },
      ...
    ]
  },
  ...
]
```

To add a new platform option, simply append a new object to the `opts` array.

---

## 3. Customizing Posting Schedules

Optimal posting windows are defined in **`src/js/times-data.js`**. The schedules are keyed by platform name:

```javascript
const timesData = {
  'Instagram Reels': {
    times: [
      { day: 'Monday',  slot: '7–9 AM', why: 'People scroll before work', badge: 'good' },
      { day: 'Tuesday', slot: '11 AM–1 PM', why: 'Lunch break peak', badge: 'hot' },
      ...
    ],
    tip: 'Instagram Reels get the most reach in the first 90 minutes...',
    frequency: '3–5 Reels per week for optimal growth...'
  },
  ...
}
```

- **`badge` Options**:
  - `"hot"`: Displays with a red fire icon (🔥 Best)
  - `"good"`: Displays with a green checkmark icon (✓ Good)

---

## 4. Customizing Content Ideas & Trend Banks

The algorithmically shuffled content ideas are built in **`src/js/ideaEngine.js`**. You can modify three key sections to freshen up the combinations:

### Weekly Trend Injectors
The `CURRENT_TRENDS` array contains weekly trending concepts that are spliced into the ideas:
```javascript
const CURRENT_TRENDS = [
  'AI replacing editors',
  'faceless content',
  'lo-fi aesthetic',
  ...
];
```

### Niche Specific Topics
Update the topic database under `_ideaData` to inject new search keywords:
```javascript
const _ideaData = {
  'Cinematic Editing': {
    topics: ['colour grading', 'transitions', 'pacing', 'sound design', ...],
  },
  ...
}
```

### Headline Scaffolds
Modify `IDEA_SENTENCE_SCAFFOLDS` to add new structural sentence blueprints. Use placeholders to map variables:
- `{niche}`: Resolved niche name
- `{topic}`: Shuffled topic keyword
- `{angle}`: Copywriting angle
- `{injector}`: Current trend phrase
- `{format}`: Video formatting tag
- `{year}`: Current year (2026)

```javascript
const IDEA_SENTENCE_SCAFFOLDS = [
  '{injector} — {format} for {niche}: {angle}.',
  'Stop the scroll: {injector}. {angle} + {format} — anchored on {topic}.',
  ...
];
```
