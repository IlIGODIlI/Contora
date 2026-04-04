/* ============================================================
   CONTORA — ideaEngine.js
   Dedicated idea generation engine

   HOW IT WORKS:
   - This file holds ALL idea data + generation logic
   - strategy.js calls generateIdeas() and remixIdea() from here
   - ✏️ To update trends: edit CURRENT_TRENDS below (weekly)
   - Load this BEFORE strategy.js in index.html

   SECTIONS:
   1. CURRENT TRENDS — edit this weekly
   2. NICHE TOPIC BANKS
   3. ANGLE SNIPPETS
   4. TREND INJECTORS
   5. FORMAT LABELS
   6. FORMAT CATEGORIES
   7. SENTENCE SCAFFOLDS
   8. CORE ENGINE — generateIdeas(), remixIdea(), resetIdeaEngine()
   ============================================================ */


/* ============================================================
   1. CURRENT TRENDS ✏️
   Update this array weekly — injected into idea titles.
   ============================================================ */
const CURRENT_TRENDS = [
  'AI replacing editors',
  'faceless content',
  'lo-fi aesthetic',
  'b-roll only videos',
  'raw unfiltered content',
  'creator burnout',
  'going viral with no followers',
  'one-person media company',
  'short form storytelling',
  'digital minimalism',
  'anti-hustle content',
  'building in public',
  'content without showing face',
  'vertical video everything',
  'authenticity over production',
];


/* ============================================================
   2. NICHE TOPIC BANKS
   ============================================================ */
const _ideaData = {
  'Cinematic Editing': {
    topics: ['colour grading', 'transitions', 'pacing', 'sound design', 'LUTs', 'camera movement', 'composition', 'text animation', 'colour theory', 'lens choices', 'audio layering', 'edit structure', 'b-roll technique', 'film emulation', 'slow motion', 'motion blur', 'masking', 'stabilisation'],
  },
  'Self Improvement': {
    topics: ['morning routines', 'discipline', 'focus', 'social media habits', 'reading', 'journaling', 'dopamine detox', 'deep work', 'procrastination', 'identity change', 'energy management', 'decision making', 'goal setting', 'consistency', 'mindset', 'time blocking', 'digital minimalism', 'self-talk'],
  },
  'AI & Tech': {
    topics: ['prompt engineering', 'AI image generation', 'automation', 'AI video tools', 'productivity stacks', 'no-code tools', 'AI writing', 'voice cloning', 'AI in creative work', 'ChatGPT', 'Midjourney', 'Notion AI', 'Claude', 'Runway ML', 'AI ethics', 'workflow automation'],
  },
  'Gaming': {
    topics: ['aim training', 'movement', 'game sense', 'solo queue', 'ranking up', 'settings', 'controller vs mouse', 'mental game', 'tilt control', 'watching replays', 'positioning', 'economy', 'warmup routines', 'communication', 'map knowledge'],
  },
  'Business & Finance': {
    topics: ['passive income', 'side hustles', 'investing basics', 'budgeting', 'freelancing', 'personal finance', 'income streams', 'emergency funds', 'index funds', 'credit usage', 'tax basics', 'savings rate', 'financial independence', 'pricing your work', 'client acquisition'],
  },
  'Lifestyle / Vlogs': {
    topics: ['morning routines', 'solo living', 'minimalism', 'budget living', 'city life', 'social habits', 'weekend routines', 'home setup', 'daily habits', 'work-life balance', 'digital detox', 'friendship', 'spending habits', 'hobbies', 'aesthetic vs reality'],
  },
  'Art & Painting': {
    topics: ['colour mixing', 'brush technique', 'composition', 'watercolour', 'oil painting', 'digital art', 'sketching', 'value studies', 'reference use', 'art supplies', 'perspective', 'anatomy', 'painting from life', 'finding your style', 'consistency'],
  },
  'Food & Cooking': {
    topics: ['knife skills', 'seasoning', 'heat control', 'mise en place', 'sauces', 'meal prep', 'batch cooking', 'spice combos', 'cooking oils', 'umami', 'texture', 'fermentation', 'pan technique', 'baking science', 'plating', 'flavour layering'],
  },
  'Fitness & Health': {
    topics: ['progressive overload', 'recovery', 'protein timing', 'sleep for gains', 'cardio vs weights', 'compound lifts', 'warmup', 'deload weeks', 'mind muscle connection', 'gym consistency', 'home workouts', 'nutrition basics', 'fat loss', 'muscle gain', 'mental fitness'],
  },
  'Music & Audio': {
    topics: ['mixing fundamentals', 'EQ', 'compression', 'reverb', 'arrangement', 'melody writing', 'chord progressions', 'sound design', 'layering', 'mastering basics', 'sampling', 'vocal production', 'music theory', 'creative blocks', 'releasing music', 'plugin chains'],
  },
  'Education & Teaching': {
    topics: ['active recall', 'spaced repetition', 'Feynman technique', 'learning by teaching', 'note-taking', 'flow state', 'reading retention', 'mental models', 'learning fast', 'skill stacking', 'deliberate practice', 'curiosity', 'managing knowledge', 'self-education'],
  },
};

const _defaultIdeaData = {
  topics: ['my workflow', 'the biggest mistake', 'what I learned', 'the honest truth', 'behind the scenes', 'consistency', 'the real process', 'what works vs what doesn\'t'],
};


/* ============================================================
   3. ANGLE SNIPPETS
   ============================================================ */
const IDEA_ANGLE_SNIPPETS = [
  'a confession most creators avoid',
  'the harsh truth nobody says out loud',
  'a myth bust with receipts',
  'a root-cause breakdown',
  'a reframe that changes how you see it',
  'a side-by-side that ends the debate',
  'a hidden truth insiders already know',
  'the beginner trap that caps growth',
  'an advanced insight most skip',
  'a controversial take you can defend',
  'an urgency angle tied to this week',
  'a psychology play on why people share',
  'a pattern interrupt before second three',
  'a "why now" frame for 2026',
  'a mistake audit with timestamps',
  'a comparison that picks a winner',
  'a reaction to a viral clip in your niche',
];


/* ============================================================
   4. TREND INJECTORS
   ============================================================ */
const IDEA_TREND_INJECTORS = [
  'this is blowing up right now',
  'nobody is talking about this yet',
  'this trend is about to die',
  'why this is going viral right now',
  'this week only — the window is tight',
  'this month\'s shift nobody\'s naming',
  'no one is noticing this on the FYP',
  'this is dying — last chance to ride it',
  'everyone\'s sleeping on this angle',
  'the algorithm is quietly favoring this',
  'this is the quiet meta shift',
  '2026 is the year this breaks wide',
  'this is about to peak — ride before saturation',
  'creators are pivoting here fast',
  'this is the backlash phase — use it',
  'this edit format is everywhere — twist it',
  'watch this before it\'s oversaturated',
  'this is the new scroll-stopper',
  'oversaturated but still printing',
  'the comment section is fighting about this',
  'this is mid — here\'s what\'s next',
  'for you page is rewarding this structure',
  'late to the trend — here\'s the fresh angle',
];


/* ============================================================
   5. FORMAT LABELS
   ============================================================ */
const IDEA_FORMAT_LABELS = [
  'hook-first video',
  'tight breakdown reel',
  'fast reel',
  'story-driven cut',
  'reaction clip',
  'mini case study',
  'split-screen comparison',
  'talking-head sprint',
  'cold-open skit',
  'text-on-screen rant',
  'B-roll montage',
  'tutorial sprint',
  'listicle sprint',
  'confession beat',
  'before/after reveal',
  'mic-drop closer',
  'pattern-interrupt opener',
  'one-take authority rant',
  'proof-first explainer',
  'comment-bait closer',
];


/* ============================================================
   6. FORMAT CATEGORIES
   ============================================================ */
const IDEA_FORMAT_CATEGORIES = [
  'Breakdown',
  'Experiment',
  'Hot take',
  'Case study',
  'Trend ride',
  'Deep cut',
];


/* ============================================================
   7. SENTENCE SCAFFOLDS
   Placeholders: {niche} {topic} {angle} {injector} {format} {year}
   ============================================================ */
const IDEA_SENTENCE_SCAFFOLDS = [
  '{injector} — {format} for {niche}: {angle}.',
  '{niche} is {injector}; ship {angle} as a {format} around {topic}.',
  'Stop the scroll: {injector}. {angle} + {format} — anchored on {topic}.',
  'Why {niche} is {injector} right now: {topic}, framed as {angle}.',
  '{year} {niche} lane: {injector} layered into a {format} with {angle}.',
  'Nobody\'s stitching this yet — {injector}, {angle}, {format} on {topic}.',
  'The {format} that hits in {niche}: {injector} + {angle}.',
  '{injector}. You\'ll lose the window — {angle} {format} on {topic}.',
  'Hot take without the cringe: {angle} — {injector} — {format} for {niche}.',
  'If you post one thing: {injector}. Build it as {angle} in a {format}.',
  'This {format} is {injector} in {niche}; the unlock is {angle}.',
  'Break the feed: {topic} through {angle} — {injector} — delivered as {format}.',
  'The comment bait: {injector}. The substance: {angle} ({format}).',
  '{niche} creators are missing {injector}; {angle} fixes it in a {format}.',
  'Ruthless clarity: {topic} vs the narrative — {angle}, {injector}.',
  'Ship this before it\'s noise: {format} + {injector} + {angle}.',
  'The share trigger: {injector}. The retention: {angle} in a {format}.',
  'Not theory — {format} proof: {topic} with {angle} ({injector}).',
  'Debate fuel: {injector}. Your stance: {angle} as {format} in {niche}.',
  'Pattern interrupt: {injector} → {angle} → {format} on {topic}.',
  'This is the angle: {angle}. Wrap it in {format} while it\'s {injector}.',
  'Underpriced attention: {injector}. Package {topic} as {angle} ({format}).',
  'The FYP read: {injector}. Your execution: {format} + {angle}.',
  'Make them save it: {angle} — {injector} — {format} for {niche}.',
  'End-game {year}: {niche} rewards {angle}; format it as {format} ({injector}).',
  'Sharp, modern, now: {topic} — {injector} — {angle} — {format}.',
];

/** Legacy alias kept for safety */
const CONTORA_TRENDS = CURRENT_TRENDS;


/* ============================================================
   8. CORE ENGINE
   ============================================================ */

// Session anti-repetition state
const _usedKeys = new Set();
const _usedStructureFingerprints = new Set();
window._ideasLoaded = 0;
window._ideasNiche  = '';

// Seeded RNG (for remix)
function _mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// HTML escape
function _escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

// Match niche string to topic bank
function _getIdeasBank(niche) {
  if (!niche) return _defaultIdeaData;
  const n = niche.toLowerCase();
  const keys = Object.keys(_ideaData);
  const match =
    keys.find(k => n.includes(k.toLowerCase().split(' ')[0])) ||
    keys.find(k => k.toLowerCase().includes(n.split(' ')[0]));
  return _ideaData[match] || _defaultIdeaData;
}

// Platform meta
function _platformIdeaMeta(platform) {
  const p = (platform || '').toLowerCase();
  if (p.includes('tiktok'))
    return { tag: 'TikTok', line: 'Trend-first, sound-aware — steal attention in the first second.', max: 168 };
  if (p.includes('youtube') && p.includes('short'))
    return { tag: 'YouTube Shorts', line: 'Hook → proof → payoff; tight pacing, no meandering.', max: 195 };
  if (p.includes('youtube'))
    return { tag: 'YouTube', line: 'Structured setup; one clear thesis; room for a mid-roll beat.', max: 220 };
  if (p.includes('instagram'))
    return { tag: 'Instagram Reels', line: 'Fast, punchy, visual-first — pattern interrupt before they swipe.', max: 178 };
  return { tag: 'Short-form', line: 'Punchy delivery, scroll-stopping open, clear payoff.', max: 185 };
}

// Quality filters
function _ideaBanned(text) {
  const t = text.toLowerCase();
  if (/\b(pov|imagine)\b/.test(t)) return true;
  if (/\btips\s+for\b/.test(t)) return true;
  if (/things\s+you\s+(should|need)\s+to\s+know\b/.test(t)) return true;
  return false;
}

function _ideaQualityPass(text) {
  if (!text || text.length < 36 || text.length > 235) return false;
  if (_ideaBanned(text)) return false;
  return true;
}

function _ideaOpeningFingerprint(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().split(/\s+/).slice(0, 7).join(' ');
}

function _nicheTitle(s) {
  if (!s || !String(s).trim()) return 'Your niche';
  const t = String(s).trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * generateIdeas(niche, count, platform)
 * Called by strategy.js → buildIdeasTab()
 */
function generateIdeas(niche, count, platform) {
  count = count || 5;
  const bank = _getIdeasBank(niche);
  const pm = _platformIdeaMeta(platform || window._ua?.platform);
  const nicheDisp = _nicheTitle(niche);
  const year = '2026';
  const ideas = [];
  let attempts = 0;

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  while (ideas.length < count && attempts < count * 30) {
    attempts++;
    const topic    = pick(bank.topics);
    const si       = Math.floor(Math.random() * IDEA_SENTENCE_SCAFFOLDS.length);
    const ai       = Math.floor(Math.random() * IDEA_ANGLE_SNIPPETS.length);
    const ii       = Math.floor(Math.random() * IDEA_TREND_INJECTORS.length);
    const fi       = Math.floor(Math.random() * IDEA_FORMAT_LABELS.length);
    const scaffold = IDEA_SENTENCE_SCAFFOLDS[si];
    const angle    = IDEA_ANGLE_SNIPPETS[ai];
    const injector = IDEA_TREND_INJECTORS[ii];
    const format   = IDEA_FORMAT_LABELS[fi];
    const comboKey = `${si}|${ai}|${ii}|${fi}|${topic}`;

    let title = scaffold
      .replace(/\{niche\}/g,    nicheDisp)
      .replace(/\{topic\}/g,    topic)
      .replace(/\{angle\}/g,    angle)
      .replace(/\{injector\}/g, injector)
      .replace(/\{format\}/g,   format)
      .replace(/\{year\}/g,     year)
      .replace(/\s+/g, ' ').trim();

    if (title.length > pm.max) title = title.slice(0, pm.max - 1).trim() + '…';

    const fp = _ideaOpeningFingerprint(title);
    if (!_ideaQualityPass(title)) continue;
    if (_usedKeys.has(comboKey) && attempts < count * 20) continue;
    if (_usedStructureFingerprints.has(fp) && attempts < count * 25) continue;

    _usedKeys.add(comboKey);
    _usedStructureFingerprints.add(fp);

    const category = pick(IDEA_FORMAT_CATEGORIES);
    ideas.push({
      t:        title,
      d:        `${pm.tag} · ${pm.line}`,
      tags:     [category, format, pm.tag],
      category,
      trend:    injector,
      platform: pm.tag,
    });
  }

  return ideas;
}

/**
 * remixIdea(title, niche)
 * Seeded remix — generates a fresh idea inspired by the original
 */
function remixIdea(title, niche) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = ((h << 5) - h) + title.charCodeAt(i) | 0;
  const seed = (Math.abs(h) ^ (Date.now() % 2147483647)) >>> 0;
  const rnd  = _mulberry32(seed);
  const bank = _getIdeasBank(niche || window._ideasNiche || window._niche);
  const pm   = _platformIdeaMeta(window._ua?.platform);
  const nicheDisp = _nicheTitle(niche || window._ideasNiche || window._niche);
  const year = '2026';

  function pick(arr) { return arr[Math.floor(rnd() * arr.length)]; }

  let t = pick(IDEA_SENTENCE_SCAFFOLDS)
    .replace(/\{niche\}/g,    nicheDisp)
    .replace(/\{topic\}/g,    pick(bank.topics))
    .replace(/\{angle\}/g,    pick(IDEA_ANGLE_SNIPPETS))
    .replace(/\{injector\}/g, pick(IDEA_TREND_INJECTORS))
    .replace(/\{format\}/g,   pick(IDEA_FORMAT_LABELS))
    .replace(/\{year\}/g,     year)
    .replace(/\s+/g, ' ').trim();

  if (t.length > pm.max) t = t.slice(0, pm.max - 1).trim() + '…';

  copyText(t);
  showToast('Remixed — copied ✓');
}

/**
 * resetIdeaEngine()
 * Call on "Fresh Start" — clears session memory
 */
function resetIdeaEngine() {
  _usedKeys.clear();
  _usedStructureFingerprints.clear();
  window._ideasLoaded = 0;
}