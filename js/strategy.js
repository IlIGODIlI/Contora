/* ============================================================
   CONTORA — strategy.js
   Handles: AI strategy generation, result page building,
            ideas tab, times tab, chat, save section

   SECTIONS:
   1. STATE VARIABLES
   2. genStrategy() — calls AI, builds result
   3. buildResult() — populates all tabs
   4. buildSaveSection() — email/copy buttons
   5. buildIdeasTab() — infinite idea generator
   6. buildTimesTab() — best posting times
   7. switchTab() — tab switching
   8. sendChat() — Ask Contora chat
   9. UTILITY — copyText, showToast, toggleFaq
   ============================================================ */


/* ============================================================
   1. STATE VARIABLES
   ============================================================ */
let strategyData = null;
let resolvedNiche = '';
window._hist = [];    // chat history
window._ua = {};      // user answers
window._niche = '';   // resolved niche string

let _loadingMsgInterval = null;

function _startLoadingMessages() {
  const el = document.getElementById('loadingHeadline');
  const msgs = [
    'Analyzing your niche...',
    'Finding viral patterns...',
    'Generating your strategy...',
    'Optimizing for growth...'
  ];
  let i = 0;
  if (el) el.textContent = msgs[0];
  _loadingMsgInterval = setInterval(() => {
    i = (i + 1) % msgs.length;
    if (!el) return;
    el.classList.add('loading-text-tick');
    setTimeout(() => {
      el.textContent = msgs[i];
      el.classList.remove('loading-text-tick');
    }, 140);
  }, 880);
}

function _stopLoadingMessages() {
  if (_loadingMsgInterval) clearInterval(_loadingMsgInterval);
  _loadingMsgInterval = null;
}

function _escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function _mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


/* ============================================================
   2. genStrategy() — sends answers to AI, parses response
   The AI prompt is here — edit it to change strategy tone/format
   ============================================================ */
async function genStrategy() {
  showPage('loading');
  _startLoadingMessages();

  const niche = answers['niche'] === 'Other / Custom' ? answers['niche_custom'] : answers['niche'];
  resolvedNiche = niche;
  window._ua = answers;
  window._niche = niche;

  const minMs = 2000 + Math.random() * 2000;
  const t0 = Date.now();

  const fallback = {
    headline: `Real talk about ${niche}`,
    summary: `Look — most ${niche} creators on ${answers.platform} are making the exact same mistakes. Posting without a clear hook, copying trends that are already dead, and wondering why nothing grows. With ${answers.time} you can actually beat 80% of them if you're strategic about it.`,
    roadmap: [
      `Post 3x this week. Don't overthink the quality — focus only on your first 2 seconds. That's it.`,
      `Study your best performing post. Make 2 direct variations of it. Kill everything that flopped.`,
      `Pick one format that works and go deep. Collab with one other creator in your exact niche.`
    ],
    hooks: [
      `The thing nobody tells you about ${niche}...`,
      `I spent 6 months learning ${niche} so you don't have to`,
      `Why your ${niche} content isn't growing (the real answer)`,
      `This changed how I approach ${niche} completely`
    ],
    cta: answers.goal.includes('money')
      ? `Comment "guide" and I'll send you everything 👇`
      : `Follow — I drop new ${niche} content every week 🔥`,
    tools_manual: ['CapCut', 'Canva', 'Notion'],
    tools_ai: ['Runway ML', 'ChatGPT', 'ElevenLabs'],
    psychology_tip: `People don't share content they like — they share content that makes them look good for sharing it. For ${niche}, that means making content your audience wants their friends to see, not just content they enjoy watching.`,
    trend: `Raw, unpolished ${niche} content is massively outperforming overproduced stuff right now. Authenticity is winning.`
  };

  try {
    const res = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'strategy',
        payload: {
          platform: answers.platform,
          niche,
          style: answers.style,
          skill: answers.skill,
          time: answers.time,
          goal: answers.goal
        }
      })
    });
    const data = await res.json();
    const text = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);
    strategyData = parsed;
    const elapsed = Date.now() - t0;
    if (elapsed < minMs) await new Promise(r => setTimeout(r, minMs - elapsed));
    _stopLoadingMessages();
    buildResult(parsed, niche);
  } catch (e) {
    strategyData = fallback;
    const elapsed = Date.now() - t0;
    if (elapsed < minMs) await new Promise(r => setTimeout(r, minMs - elapsed));
    _stopLoadingMessages();
    buildResult(fallback, niche);
  }
}


/* ============================================================
   3. buildResult() — fills all tabs with content
   ============================================================ */
function buildResult(s, niche) {
  showPage('result');
  switchTab('strategy');
  window._hist = [];

  // — Result hero header —
  document.getElementById('resultHero').innerHTML = `
    <div class="result-hero-card">
      <div class="res-badge">✓ Strategy Generated for ${niche}</div>
      <div class="res-hero-title">${s.headline}</div>
      <div class="res-hero-sub">${s.summary}</div>
    </div>`;

  // — Strategy tab content —
  const roadmapHTML = Array.isArray(s.roadmap)
    ? `<div class="roadmap-steps">${s.roadmap.map((r, i) => `<div class="roadmap-step"><div class="roadmap-num">${i + 1}</div><div class="roadmap-text">${r}</div></div>`).join('')}</div>`
    : `<div class="card-body" style="white-space:pre-line">${s.roadmap}</div>`;

  document.getElementById('tab-strategy').innerHTML = `
    <div class="fade">
      <div class="res-grid">
        <div class="res-card full"><div class="card-tag">📅 Weekly Roadmap</div>${roadmapHTML}</div>
        <div class="res-card">
          <div class="card-tag">🪝 Hook Library</div>
          <ul class="hooks">${s.hooks.map(h => `<li class="hook" onclick="copyText('${h.replace(/'/g, "\\'")}')"><span class="hook-copy">Copy</span>${h}</li>`).join('')}</ul>
          <p style="font-size:11px;color:var(--text3);margin-top:10px">Click any hook to copy it</p>
        </div>
        <div class="res-card">
          <div class="card-tag">📣 Your CTA</div>
          <div class="cta-copy-box" onclick="copyText('${s.cta.replace(/'/g, "\\'")}')">
            ${s.cta} <span class="cta-copy-hint">Copy</span>
          </div>
          <div class="card-tag">🧠 Psychology Tip</div>
          <div class="card-body">${s.psychology_tip}</div>
        </div>
        <div class="res-card">
          <div class="card-tag">🛠️ Manual Tools</div><div class="pills">${s.tools_manual.map(t => `<span class="pill">${t}</span>`).join('')}</div>
          <div class="card-tag" style="margin-top:18px">🤖 AI Tools</div><div class="pills">${s.tools_ai.map(t => `<span class="pill">${t}</span>`).join('')}</div>
        </div>
        <div class="res-card full">
          <div class="card-tag">🔥 Trending Right Now</div>
          <div class="card-body">${s.trend}</div>
        </div>
      </div>
      ${buildSaveSection(s, niche)}
      <div class="res-actions">
        <button class="btn-primary" onclick="showQuiz()">Redo Strategy</button>
        <button class="btn-ghost" onclick="showPage('landing')">← Back Home</button>
      </div>
    </div>`;

  // — Build other tabs —
  buildIdeasTab(niche);
  buildTimesTab();
}


/* ============================================================
   4. buildSaveSection() — email & copy-all buttons
   ============================================================ */
function buildSaveSection(s, niche) {
  const emailBody = encodeURIComponent(`CONTORA CONTENT STRATEGY — ${niche.toUpperCase()}

HEADLINE: ${s.headline}

SUMMARY:
${s.summary}

ROADMAP:
${Array.isArray(s.roadmap) ? s.roadmap.map((r, i) => `${i + 1}. ${r}`).join('\n') : s.roadmap}

HOOKS:
${s.hooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}

YOUR CTA:
${s.cta}

TOOLS (MANUAL): ${s.tools_manual.join(', ')}
TOOLS (AI): ${s.tools_ai.join(', ')}

PSYCHOLOGY TIP:
${s.psychology_tip}

TRENDING NOW:
${s.trend}

---
Built with Contora — contora.app`);

  const mailtoLink = `mailto:?subject=My ${niche} Content Strategy — Contora&body=${emailBody}`;
  const copyAll = `${s.headline}\n\n${s.summary}\n\nROADMAP:\n${Array.isArray(s.roadmap) ? s.roadmap.map((r, i) => `${i + 1}. ${r}`).join('\n') : s.roadmap}\n\nHOOKS:\n${s.hooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nCTA: ${s.cta}\n\nPSYCHOLOGY: ${s.psychology_tip}\n\nTRENDING: ${s.trend}`;

  return `<div class="save-section">
    <div class="save-title">Save your strategy</div>
    <div class="save-sub">Don't lose this. Email it to yourself or copy the whole thing in one click.</div>
    <div class="save-btns">
      <a href="${mailtoLink}" class="btn-save">📧 Email to myself</a>
      <button class="btn-save-ghost" onclick="copyText(\`${copyAll.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">📋 Copy everything</button>
    </div>
  </div>`;
}


/* ============================================================
   5. buildIdeasTab() — powered by ideaEngine.js
   append=true means load 5 more (don't reset)
   All generation logic lives in js/ideaEngine.js
   ============================================================ */

function buildIdeasTab(niche, append) {
  if (!append) {
    resetIdeaEngine(); // clears session memory — defined in ideaEngine.js
    window._ideasNiche = niche;
  }
  const n = window._ideasNiche || niche;
  const batch = generateIdeas(n, 5, window._ua?.platform); // from ideaEngine.js
  window._ideasLoaded += batch.length;

  const items = batch.map((idea, i) => {
    const cat = _escHtml(idea.category || '');
    const platHtml = idea.platform ? `<span class="idea-platform">${_escHtml(idea.platform)}</span>` : '';
    const trendHtml = idea.trend ? `<span class="idea-trend">${_escHtml(idea.trend)}</span>` : '';
    return `
    <div class="idea-item fade">
      <div class="idea-num">${window._ideasLoaded - 5 + i + 1}</div>
      <div class="idea-content">
        <div class="idea-meta"><span class="idea-cat">${cat}</span>${platHtml}${trendHtml}</div>
        <div class="idea-title">${_escHtml(idea.t)}</div>
        <div class="idea-desc">${_escHtml(idea.d)}</div>
        <div class="idea-tags">${(idea.tags || []).map(tag => `<span class="idea-tag">${_escHtml(tag)}</span>`).join('')}</div>
      </div>
      <div class="idea-actions">
        <button type="button" class="idea-copy-btn" onclick="event.stopPropagation(); copyText(${JSON.stringify(idea.t)})">Copy</button>
        <button type="button" class="idea-remix-btn" onclick="event.stopPropagation(); remixIdea(${JSON.stringify(idea.t)}, ${JSON.stringify(n || '')})">Remix</button>
      </div>
    </div>`;
  }).join('');

  const safeN = (n || '').replace(/'/g, "\\'");

  if (append) {
    const list = document.getElementById('_ideasList');
    if (list) { list.insertAdjacentHTML('beforeend', items); }
    const ctr = document.getElementById('_ideasCtr');
    if (ctr) ctr.textContent = `${window._ideasLoaded} ideas generated — unique combinations`;
  } else {
    document.getElementById('tab-ideas').innerHTML = `<div class="fade">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <div class="card-tag">💡 Content Ideas</div>
          <div style="font-size:20px;font-weight:900;color:var(--text);letter-spacing:-.5px">Ready-to-shoot ideas for ${n}</div>
          <div style="font-size:13px;color:var(--text3);margin-top:4px" id="_ideasCtr">5 fresh angles — combinational engine tuned for 2026 · Generate more anytime</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-sm-ghost" onclick="buildIdeasTab('${safeN}')">🔄 Fresh start</button>
          <button class="btn-sm" onclick="buildIdeasTab('${safeN}',true)">Generate more</button>
        </div>
      </div>
      <div class="ideas-list" id="_ideasList">${items}</div>
      <div style="text-align:center;margin-top:20px">
        <button class="btn-sm" onclick="buildIdeasTab('${safeN}',true)" style="padding:12px 28px">Generate more →</button>
        <div style="font-size:12px;color:var(--text3);margin-top:10px">Unique mixes of formats, angles, and trends — keep generating</div>
      </div>
    </div>`;
  }
}


/* ============================================================
   6. buildTimesTab() — best posting times for user's platform
   Data is in js/times-data.js
   ============================================================ */
function buildTimesTab() {
  const platform = window._ua?.platform || 'Instagram Reels';
  const d = timesData[platform] || timesData['Instagram Reels'];

  const timesHTML = d.times.map(t => `
    <div class="time-card">
      <div class="time-day">${t.day}</div>
      <div class="time-slot">${t.slot}</div>
      <div class="time-why">${t.why}</div>
      <span class="time-badge ${t.badge}">${t.badge === 'hot' ? '🔥 Best' : '✓ Good'}</span>
    </div>`).join('');

  document.getElementById('tab-times').innerHTML = `
    <div class="fade">
      <div class="res-grid">
        <div class="res-card full">
          <div class="card-tag">⏰ Best Times for ${platform}</div>
          <div class="times-grid">${timesHTML}</div>
          <p style="font-size:12px;color:var(--text3);margin-top:16px;line-height:1.6">
            📊 <strong>Note:</strong> These are general best practices based on platform-wide data. Your specific audience may differ — check your own analytics after 2 weeks of posting.
          </p>
        </div>
        <div class="res-card">
          <div class="card-tag">💡 Platform Tip</div>
          <div class="card-body">${d.tip}</div>
        </div>
        <div class="res-card">
          <div class="card-tag">📆 Posting Frequency</div>
          <div class="card-body">${d.frequency}</div>
        </div>
      </div>
    </div>`;
}


/* ============================================================
   7. switchTab() — switches between result page tabs
   ============================================================ */
function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === id);
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === 'tab-' + id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ============================================================
   8. sendChat() — Ask Contora AI chat
   ============================================================ */
async function sendChat() {
  const inp = document.getElementById('chatIn');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';

  const msgs = document.getElementById('chatMsgs');
  msgs.innerHTML += `<div class="msg user">${msg}</div><div class="msg ai" id="typingMsg" style="opacity:.6">Thinking...</div>`;
  msgs.scrollTop = msgs.scrollHeight;
  window._hist.push({ role: 'user', content: msg });

  try {
    const res = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat',
        payload: {
          messages: window._hist,
          niche: window._niche,
          platform: window._ua?.platform,
          style: window._ua?.style,
          goal: window._ua?.goal
        }
      })
    });
    const data = await res.json();
    const reply = data.choices[0].message.content;
    window._hist.push({ role: 'assistant', content: reply });
    const t = document.getElementById('typingMsg');
    if (t) t.remove();
    msgs.innerHTML += `<div class="msg ai">${reply}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  } catch (e) {
    const t = document.getElementById('typingMsg');
    if (t) t.remove();
    msgs.innerHTML += `<div class="msg ai">Something went wrong. Try again!</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }
}


/* ============================================================
   9. UTILITY — toast, copy, FAQ toggle
   ============================================================ */

// Show "Copied!" toast notification
function showToast(msg = 'Copied!') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// Copy text to clipboard
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(() => showToast('Copied to clipboard ✓')).catch(() => {
    const el = document.createElement('textarea');
    el.value = txt;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Copied!');
  });
}

// Toggle FAQ open/close
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}