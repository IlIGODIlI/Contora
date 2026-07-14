import fetch from 'node-fetch';

/**
 * Netlify serverless function handler
 */
export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { type, payload } = JSON.parse(event.body);

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // Use Mock Fallback if no keys are provided
    if (!openAiKey && !geminiKey) {
      console.log('No API keys found. Returning mock fallback response.');
      return handleMockFallback(type, payload);
    }

    if (type === 'strategy') {
      return await handleStrategyRequest(payload, openAiKey, geminiKey);
    } else if (type === 'chat') {
      return await handleChatRequest(payload, openAiKey, geminiKey);
    } else {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid request type' })
      };
    }
  } catch (err) {
    console.error('Error in Netlify function:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error', message: err.message })
    };
  }
}

/**
 * Handle Content Strategy generation requests using LLMs
 */
async function handleStrategyRequest(payload, openAiKey, geminiKey) {
  const { platform, niche, style, skill, time, goal } = payload;

  const systemPrompt = `You are Contora AI, a world-class growth strategist for creators. 
Analyze the creator's request and build a high-performance content strategy.
You MUST respond with a JSON object formatted exactly as below:
{
  "headline": "A punchy, scroll-stopping headline tailored to their niche",
  "summary": "A 2-3 sentence overview explaining their core opportunity and current mistakes in the niche",
  "roadmap": [
    "Actionable step 1 for Week 1 based on their time availability",
    "Actionable step 2 for Week 2 based on their time availability",
    "Actionable step 3 for Month 2 based on their time availability"
  ],
  "hooks": [
    "A niche-specific hook line to try (emotional/curiosity gap)",
    "A numeric/proof-first hook line to try",
    "A pattern interrupt/contrarian hook line to try",
    "A story-driven hook line to try"
  ],
  "cta": "A punchy Call To Action tailored to their goal",
  "tools_manual": ["2-3 manual creation tools suited for their skill level"],
  "tools_ai": ["2-3 AI creation tools suited for their skill level"],
  "psychology_tip": "A deep psychological insight on why people share content in this niche",
  "trend": "A current 2026 trending format/topic in this specific niche"
}

Provide ONLY the JSON output. Do NOT write any conversational text. Wrap the JSON in markdown code blocks: \`\`\`json { ... } \`\`\`.`;

  const userPrompt = `Create a strategy for:
- Platform: ${platform}
- Niche: ${niche}
- Editing Style: ${style}
- Skill Level: ${skill}
- Weekly Time Commitment: ${time}
- Primary Goal: ${goal}`;

  let jsonText = '';

  if (geminiKey) {
    jsonText = await callGemini(systemPrompt, userPrompt, geminiKey);
  } else if (openAiKey) {
    jsonText = await callOpenAi([{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], openAiKey);
  }

  // Format response to look like OpenAI completion format expected by frontend
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      choices: [
        {
          message: {
            role: 'assistant',
            content: jsonText
          }
        }
      ]
    })
  };
}

/**
 * Handle chat assistant requests using LLMs
 */
async function handleChatRequest(payload, openAiKey, geminiKey) {
  const { messages, niche, platform, style, goal } = payload;

  const systemMessage = {
    role: 'system',
    content: `You are Contora AI, a friendly, direct, and elite content coach for creators.
The user is creating content in the "${niche}" niche on "${platform}" with a "${style}" editing style, aiming to "${goal}".
Keep your answers brief, actionable, and scroll-stopping. Avoid corporate jargon.`
  };

  const fullMessages = [systemMessage, ...messages];
  let replyText = '';

  if (geminiKey) {
    // Convert messages format for Gemini
    const geminiPrompt = fullMessages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n') + '\n\nASSISTANT:';
    replyText = await callGemini('', geminiPrompt, geminiKey);
  } else if (openAiKey) {
    replyText = await callOpenAi(fullMessages, openAiKey);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      choices: [
        {
          message: {
            role: 'assistant',
            content: replyText
          }
        }
      ]
    })
  };
}

/**
 * Call Gemini API using native REST fetch
 */
async function callGemini(systemPrompt, promptText, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: systemPrompt ? `${systemPrompt}\n\n${promptText}` : promptText }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API call failed: ${err}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Call OpenAI Chat Completion API
 */
async function callOpenAi(messages, apiKey) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API call failed: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Mock Fallback Responses (Offline/Unconfigured)
 */
function handleMockFallback(type, payload) {
  if (type === 'strategy') {
    const { platform, niche, style, skill, time, goal } = payload;
    const strategy = {
      headline: `Dominating the ${niche} space with ${style} style`,
      summary: `To win on ${platform} as a ${skill} in ${niche}, you need to stand out. With ${time} committed per week, your main target is to resolve ${goal}. Stop overproducing and start iterating.`,
      roadmap: [
        `Audit the top 5 competitors in your ${niche} niche. List their top hooks.`,
        `Produce 3 short drafts matching the '${style}' style. Keep cuts under 1.5 seconds.`,
        `Configure your profile description to focus on your goal: ${goal}.`
      ],
      hooks: [
        `Nobody is talking about this mistake in ${niche}...`,
        `How I got started in ${niche} from complete scratch`,
        `This ${style} edit format is the secret hack to 10k views`,
        `Why your ${niche} content isn't scaling (the actual fix)`
      ],
      cta: goal.includes('money')
        ? `Get my free ${niche} monetization cheat-sheet in bio! 💰`
        : `Follow for daily ${niche} hacks and breakdowns! 🔥`,
      tools_manual: ['CapCut', 'Canva', 'Notion'],
      tools_ai: ['Runway ML', 'ChatGPT', 'ElevenLabs'],
      psychology_tip: `Shared content in the ${niche} space relies on self-expression and community identification. Make videos that viewers want to forward to friends to say 'this is exactly me'.`,
      trend: `Raw behind-the-scenes vlogs showing real editing workflows are trending heavily for 2026. Use minimal text overlay.`
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        choices: [
          {
            message: {
              role: 'assistant',
              content: `\`\`\`json\n${JSON.stringify(strategy, null, 2)}\n\`\`\``
            }
          }
        ]
      })
    };
  } else {
    // Chat fallback
    const { messages, niche } = payload;
    const lastUserMessage = messages[messages.length - 1]?.content || 'hello';
    const reply = `Contora Coach (Offline mode): That is a great question about the ${niche} niche! Standard best practice for "${lastUserMessage}" is to focus on your initial 3 seconds hook and drive clear CTA actions. Try scripting a contrarian reframe to interrupt the user's feed. Let me know if you want hook rewrites!`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        choices: [
          {
            message: {
              role: 'assistant',
              content: reply
            }
          }
        ]
      })
    };
  }
}
