# Serverless API Specification

This document details the API contract for the Contora backend serverless function hosted at:
`/.netlify/functions/generate`

All requests must be sent as HTTP **`POST`** requests with `Content-Type: application/json`.

---

## 1. Route: Generate Content Strategy

Builds a structured, niche-specific plan for a creator based on onboarding parameters.

### Request Body
- **`type`**: Must be `"strategy"`
- **`payload`**: JSON object containing:
  - **`platform`** (string): Target platform (e.g., `"Instagram Reels"`, `"TikTok"`, `"YouTube Shorts"`, `"YouTube Long-form"`)
  - **`niche`** (string): Selected content niche (e.g., `"Cinematic Editing"`, `"Self Improvement"`, or custom text)
  - **`style`** (string): Editing style aesthetic (e.g., `"Dark & Cinematic"`, `"Clean & Minimal"`)
  - **`skill`** (string): Experience level (`"Complete beginner"`, `"Intermediate"`, `"Advanced"`)
  - **`time`** (string): Available time per week (`"1–3 hours / week"`, `"4–7 hours / week"`, etc.)
  - **`goal`** (string): Main goal objective (`"Grow my following"`, `"Make money from content"`, etc.)

```json
{
  "type": "strategy",
  "payload": {
    "platform": "TikTok",
    "niche": "Fitness & Health",
    "style": "Fast & Energetic",
    "skill": "Intermediate",
    "time": "4-7 hours / week",
    "goal": "Grow my following"
  }
}
```

### Response Body
The API wraps its response inside a chat completion shape for client compatibility:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "```json\n{\n  \"headline\": \"Ditch the Cardio: The 3-Step Hypertrophy Blueprint\",\n  \"summary\": \"Most fitness creators post long workouts that get zero retention. On TikTok, you need to deliver value in under 45 seconds.\",\n  \"roadmap\": [\n    \"Post 2 value clips this week with text overlays\",\n    \"Study audio trends and match cuts to the beat\",\n    \"Do a Q&A video answering top comment requests\"\n  ],\n  \"hooks\": [\n    \"Stop doing situps if you want abs...\",\n    \"I tested every protein timing schedule so you don't have to\",\n    \"Why your current leg day is wasting your time\",\n    \"The honest truth about recovery splits\"\n  ],\n  \"cta\": \"Follow for daily evidence-based fitness tips! 🔥\",\n  \"tools_manual\": [\"CapCut\", \"Notion\"],\n  \"tools_ai\": [\"ChatGPT\", \"ElevenLabs\"],\n  \"psychology_tip\": \"Viewers share fitness tips to show authority or validate their own lifestyle decisions to friends.\",\n  \"trend\": \"Before/after transformations focusing on strength ratios rather than scale weight.\"\n}\n```"
      }
    }
  ]
}
```

---

## 2. Route: Interactive Coach Chat

Handles chat conversations between the creator and the Contora AI Assistant.

### Request Body
- **`type`**: Must be `"chat"`
- **`payload`**: JSON object containing:
  - **`messages`** (array): Chat history containing objects with `{ role: 'user' | 'assistant', content: string }`
  - **`niche`** (string): Creator's niche
  - **`platform`** (string): Target platform
  - **`style`** (string): Editing style
  - **`goal`** (string): Primary goal

```json
{
  "type": "chat",
  "payload": {
    "messages": [
      {
        "role": "user",
        "content": "How do I make my leg day workouts look more energetic?"
      }
    ],
    "niche": "Fitness & Health",
    "platform": "TikTok",
    "style": "Fast & Energetic",
    "goal": "Grow my following"
  }
}
```

### Response Body

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "To make your fitness edits feel fast and energetic on TikTok:\n\n1. **Beat Synced Cuts**: Cut your clips exactly to the kick drums of your audio track.\n2. **Speed Ramping**: Slow down the lifting phase slightly, then speed up the transition between reps to maintain speed.\n3. **Tight Framing**: Shoot close-ups of the plates or movements rather than wide-angle full body shots."
      }
    }
  ]
}
```
