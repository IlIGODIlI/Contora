/* ============================================================
   CONTORA — quiz.js
   This file controls the 6-question onboarding quiz

   SECTIONS:
   1. QUESTIONS ARRAY — edit options/text here
   2. QUIZ STATE
   3. QUIZ NAVIGATION (showPage, showQuiz, renderQ)
   4. OPTION SELECTION logic
   5. BACK / NEXT buttons
   ============================================================ */


/* ============================================================
   1. QUESTIONS ARRAY
   To change a question: find it by its "id" and edit "q", "sub", or "opts"
   To add a new option: copy an existing {icon, t, d} block and add it to the opts array
   ============================================================ */
const questions = [

  // STEP 1 — Platform
  {
    id: 'platform',
    step: 'Step 1 of 6',
    q: 'Where do you create content?',
    sub: 'Pick your main platform.',
    type: 'grid',
    opts: [
      { icon: '📸', t: 'Instagram Reels', d: 'Short-form video content' },
      { icon: '🎵', t: 'TikTok', d: 'Viral short videos' },
      { icon: '▶️', t: 'YouTube Shorts', d: 'Short-form on YouTube' },
      { icon: '🎬', t: 'YouTube Long-form', d: 'In-depth video content' },
    ]
  },

  // STEP 2 — Niche
  {
    id: 'niche',
    step: 'Step 2 of 6',
    q: "What's your content niche?",
    sub: 'Pick one — or type your own at the bottom.',
    type: 'grid',
    opts: [
      { icon: '🎬', t: 'Cinematic Editing', d: 'Transitions, color, motion' },
      { icon: '💡', t: 'Self Improvement', d: 'Mindset, habits, growth' },
      { icon: '🤖', t: 'AI & Tech', d: 'Tools, workflows, future' },
      { icon: '🎮', t: 'Gaming', d: 'Gameplay, reviews, clips' },
      { icon: '💼', t: 'Business & Finance', d: 'Money, startups, side hustles' },
      { icon: '✈️', t: 'Lifestyle / Vlogs', d: 'Daily life, travel, aesthetic' },
      { icon: '🎨', t: 'Art & Painting', d: 'Illustration, painting, drawing' },
      { icon: '🍳', t: 'Food & Cooking', d: 'Recipes, kitchen, food vlogs' },
      { icon: '💪', t: 'Fitness & Health', d: 'Workouts, nutrition, wellness' },
      { icon: '🎵', t: 'Music & Audio', d: 'Production, covers, performance' },
      { icon: '📚', t: 'Education & Teaching', d: 'Tutorials, explainers, breakdowns' },
      { icon: '✏️', t: 'Other / Custom', d: 'Type your niche below' },
    ]
  },

  // STEP 3 — Editing Style
  {
    id: 'style',
    step: 'Step 3 of 6',
    q: "What's your editing style?",
    sub: 'How do your videos look and feel?',
    type: 'grid',
    opts: [
      { icon: '🌑', t: 'Dark & Cinematic', d: 'Moody, deep colors, slow cuts' },
      { icon: '✨', t: 'Clean & Minimal', d: 'Simple, aesthetic, light' },
      { icon: '⚡', t: 'Fast & Energetic', d: 'Quick cuts, hype energy' },
      { icon: '🎞️', t: 'Raw & Authentic', d: 'Natural, unfiltered, real' },
    ]
  },

  // STEP 4 — Skill Level
  {
    id: 'skill',
    step: 'Step 4 of 6',
    q: "What's your skill level?",
    sub: "Be honest — this helps us give better, more relevant advice.",
    type: 'single',
    opts: [
      { t: 'Complete beginner', d: 'Just starting out, learning the basics' },
      { t: 'Intermediate', d: 'Know the basics, want to level up fast' },
      { t: 'Advanced', d: 'Experienced creator, looking to scale' },
    ]
  },

  // STEP 5 — Time per week
  {
    id: 'time',
    step: 'Step 5 of 6',
    q: 'How much time can you give?',
    sub: 'Per week, realistically. Not what you wish, what you actually have.',
    type: 'single',
    opts: [
      { t: '1–3 hours / week', d: 'Tight schedule, need a lean efficient strategy' },
      { t: '4–7 hours / week', d: 'Part-time creator with some room' },
      { t: '8–15 hours / week', d: 'Serious about growing, making it a priority' },
      { t: '15+ hours / week', d: 'Full-time focus, all in' },
    ]
  },

  // STEP 6 — Goal
  {
    id: 'goal',
    step: 'Step 6 of 6',
    q: "What's your main goal?",
    sub: 'What does winning look like for you?',
    type: 'single',
    opts: [
      { t: 'Grow my following', d: 'Build a loyal audience from scratch' },
      { t: 'Make money from content', d: 'Brand deals, products, or services' },
      { t: 'Build my personal brand', d: 'Get known and respected in my niche' },
      { t: 'Just express myself', d: 'Create for the love of it, no pressure' },
    ]
  },
];


/* ============================================================
   2. QUIZ STATE — don't edit these, they're runtime variables
   ============================================================ */
let answers = {};
let currentQ = 0;
let _isTransitioning = false; // blocks double-clicks during animation


/* ============================================================
   3. QUIZ NAVIGATION
   ============================================================ */

// Switch between pages (landing / quiz / loading / result)
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  if (id === 'result') {
    document.body.classList.add('dashboard-active');
  } else {
    document.body.classList.remove('dashboard-active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Start quiz from beginning
function showQuiz() {
  currentQ = 0;
  answers = {};
  resolvedNiche = '';
  showPage('quiz');
  renderQ();
}

// Render the current question (direction: 1 = forward, -1 = back)
function renderQ(direction) {
  const q = questions[currentQ];
  const pct = Math.round(((currentQ + 1) / questions.length) * 100);

  // Progress bar updates smoothly via CSS transition
  document.getElementById('progFill').style.width = pct + '%';
  document.getElementById('progLabel').textContent = q.step;
  document.getElementById('progPct').textContent = pct + '%';

  let optsHtml = '';

  if (q.type === 'grid') {
    optsHtml = `<div class="opts-grid">
      ${q.opts.map(o => `
        <div class="opt${answers[q.id] === o.t ? ' sel' : ''}" data-val="${o.t}" onclick="selOpt(this,'${q.id}')">
          <span class="opt-icon">${o.icon}</span>
          <div class="opt-title">${o.t}</div>
          <div class="opt-desc">${o.d}</div>
        </div>
      `).join('')}
    </div>
    ${q.id === 'niche' ? `
      <div class="custom-input-wrap${answers[q.id] === 'Other / Custom' ? ' show' : ''}" id="customNicheWrap">
        <input class="custom-niche-in" id="customNicheIn"
          placeholder="e.g. Watercolor painting, Poetry, Skateboarding..."
          value="${answers['niche_custom'] || ''}"
          oninput="handleCustomNiche(this.value)">
        <button type="button" class="btn-next btn-custom-continue" id="customContinueBtn" onclick="continueCustomNiche()"
          ${(answers['niche_custom'] || '').trim().length < 2 ? 'disabled' : ''}>Continue →</button>
      </div>` : ''}`;
  } else {
    optsHtml = `<div class="opts-single">
      ${q.opts.map(o => `
        <div class="opt-s${answers[q.id] === o.t ? ' sel' : ''}" data-val="${o.t}" onclick="selOpt(this,'${q.id}')">
          <div class="radio"></div>
          <div>
            <div class="opt-s-title">${o.t}</div>
            <div class="opt-s-desc">${o.d}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  const isLast = currentQ === questions.length - 1;

  // Inject new content
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-slide">
      <div class="step-lbl">${q.step}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-sub">${q.sub}</div>
      ${optsHtml}
      <div class="quiz-nav">
        <button class="btn-back" onclick="goBack()" style="${currentQ === 0 ? 'visibility:hidden' : ''}">← Back</button>
        ${isLast
          ? `<button class="btn-next" id="nextBtn" onclick="goNext()" ${answers[q.id] ? '' : 'disabled'}>Build My Strategy 🚀</button>`
          : `<div></div>`
        }
      </div>
    </div>`;

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    const slide = document.querySelector('.quiz-slide');
    if (slide) slide.classList.add('quiz-slide-in');
  });
}

// Animate out current question, then render next
function transitionTo(nextFn) {
  if (_isTransitioning) return;
  _isTransitioning = true;

  const slide = document.querySelector('.quiz-slide');
  if (slide) {
    slide.classList.add('quiz-slide-out');
    setTimeout(() => {
      nextFn();
      _isTransitioning = false;
    }, 260); // matches CSS quiz-slide transition
  } else {
    nextFn();
    _isTransitioning = false;
  }
}


/* ============================================================
   4. OPTION SELECTION
   ============================================================ */
function selOpt(el, qid) {
  // Highlight selected option
  el.closest('.opts-grid,.opts-single').querySelectorAll('.opt,.opt-s').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  answers[qid] = el.dataset.val;

  // Special case: niche "Other / Custom" — show text input, don't auto-advance
  if (qid === 'niche') {
    const wrap = document.getElementById('customNicheWrap');
    if (wrap) {
      if (el.dataset.val === 'Other / Custom') {
        wrap.classList.add('show');
        setTimeout(() => document.getElementById('customNicheIn').focus(), 50);
        return; // wait for user to type before advancing
      } else {
        wrap.classList.remove('show');
        answers['niche_custom'] = '';
      }
    }
  }

  // Last question: just enable the button, don't auto-advance
  const isLast = currentQ === questions.length - 1;
  if (isLast) {
    const btn = document.getElementById('nextBtn');
    if (btn) btn.disabled = false;
    return;
  }

  // Auto-advance to next question after a short pause (feels intentional)
  setTimeout(() => {
    transitionTo(() => {
      currentQ++;
      renderQ(1);
    });
  }, 180);
}

// Handle custom niche text input
function handleCustomNiche(val) {
  answers['niche_custom'] = val.trim();
  const continueBtn = document.getElementById('customContinueBtn');
  if (continueBtn) continueBtn.disabled = val.trim().length < 2;
}

function continueCustomNiche() {
  const v = (answers['niche_custom'] || '').trim();
  if (v.length < 2) return;
  setTimeout(() => {
    transitionTo(() => {
      currentQ++;
      renderQ(1);
    });
  }, 120);
}


/* ============================================================
   5. BACK / NEXT BUTTONS
   ============================================================ */
function goNext() {
  if (currentQ < questions.length - 1) {
    transitionTo(() => {
      currentQ++;
      renderQ(1);
    });
  } else {
    genStrategy(); // defined in strategy.js
  }
}

function goBack() {
  if (currentQ > 0) {
    transitionTo(() => {
      currentQ--;
      renderQ(-1);
    });
  } else {
    showPage('landing');
  }
}