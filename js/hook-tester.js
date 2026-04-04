/* ============================================================
   CONTORA — HOOK AUDITOR v3.0 (PEAK PERFORMANCE)
   ============================================================ */

let debounceTimer;

function updateCharCount(el) {
    document.getElementById('hookChar').textContent = el.value.length + '/200';
}

function testHook() {
    const hook = document.getElementById('hookInput').value.trim();
    const wrap = document.getElementById('hookScoreWrap');
    
    if (!hook || hook.length < 8) {
        wrap.classList.remove('show');
        return;
    }

    // 1. SHOW THE SCANNER (High-End UX)
    wrap.classList.add('show');
    wrap.innerHTML = `
        <div class="hook-scan-block">
            <div class="analyzing-text">Cross-referencing niche data…</div>
            <div class="ai-scanner"></div>
            <div class="hook-scan-sub">Auditing retention psychology & platform fit…</div>
        </div>
    `;

    // 2. TRIGGER THE BRAIN (1.2s Delay for Perceived Value)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        runPeakLogic(hook, wrap);
    }, 1200);
}

function runPeakLogic(hook, wrap) {
    const lower = hook.toLowerCase();
    const words = hook.split(/\s+/);
    const wc = words.length;

    // --- NICHE INTELLIGENCE ---
    const nicheDict = {
        'Cinematic Editing': ['edit', 'color', 'grade', 'transition', 'footage', 'b-roll', 'timeline', 'cut', 'vfx'],
        'Self Improvement': ['habit', 'routine', 'discipline', 'mindset', 'focus', 'growth', 'morning', 'success'],
        'AI & Tech': ['ai', 'tool', 'automation', 'chatgpt', 'workflow', 'tech', 'software', 'prompt', 'future'],
        'Fitness & Health': ['gym', 'workout', 'gains', 'muscle', 'diet', 'protein', 'training', 'fat', 'health'],
        'Business & Finance': ['money', 'income', 'scale', 'profit', 'invest', 'passive', 'client', 'sales', 'rich']
    };

    const userNiche = window._niche || 'General';
    const keywords = nicheDict[userNiche] || [];
    const hasNicheMatch = keywords.some(k => lower.includes(k));

    // --- DIMENSION SCORING ---
    const strongOpeners = ['i ', 'why ', 'the ', 'what ', 'how ', 'stop', 'wait', 'nobody', 'most ', 'this ', 'you\'re'];
    const hasStrongOpen = strongOpeners.some(w => lower.startsWith(w));
    
    const gapPhrases = ['secret', 'truth', 'actually', 'real', 'honest', 'hidden', 'why', 'discovered', 'the thing'];
    const hasGap = gapPhrases.some(p => lower.includes(p));

    const nums = hook.match(/\d+/g) || [];
    const hasNumbers = nums.length > 0;

    // --- BUILD THE 8-DIMENSION CRITERIA ---
    const criteria = [
        { label: 'Immediate Attention', score: hasStrongOpen ? 95 : 40, tip: 'First 2 words determines the scroll.' },
        { label: 'Pattern Interrupt', score: (hook.includes('—') || hook.includes(':') || hook.includes('...')) ? 100 : 35, tip: 'Visual breaks stop the eye.' },
        { label: 'Curiosity Gap', score: hasGap ? 98 : 45, tip: 'Makes the brain seek an answer.' },
        { label: 'Numeric Impact', score: hasNumbers ? 100 : 30, tip: 'Numbers add logical weight.' },
        { label: 'Niche Relevance', score: hasNicheMatch ? 100 : 40, tip: `Uses ${userNiche} specific keywords.` },
        { label: 'Emotional Trigger', score: (lower.includes('mistake') || lower.includes('win') || lower.includes('fail')) ? 90 : 55, tip: 'Connects to a core feeling.' },
        { label: 'Clarity Score', score: (wc >= 6 && wc <= 14) ? 100 : 65, tip: 'Optimal length is 6-14 words.' },
        { label: 'Platform Fit', score: 88, tip: 'Formatted for high-retention vertical video.' }
    ];

    const totalScore = Math.round(criteria.reduce((a, b) => a + b.score, 0) / criteria.length);
    const weakest = criteria.reduce((prev, curr) => (prev.score < curr.score) ? prev : curr);

    // --- REWRITE ENGINE ---
    let rewrite = "";
    if (weakest.label === 'Numeric Impact') {
        rewrite = `${hook} (and the 3 steps I took to get there).`;
    } else if (weakest.label === 'Niche Relevance') {
        rewrite = `${hook} for ${userNiche} creators specifically.`;
    } else if (weakest.label === 'Pattern Interrupt') {
        const parts = hook.split(' ');
        rewrite = `${parts.slice(0, 2).join(' ')} — ${parts.slice(2).join(' ')} (wait for it).`;
    } else {
        rewrite = `The truth about ${hook} that nobody is telling you.`;
    }

    // --- RENDER RESULTS ---
    const barsHTML = criteria.map(c => {
        const col = c.score >= 75 ? 'var(--green)' : c.score >= 50 ? 'var(--orange)' : 'var(--red)';
        return `
            <div class="score-bar-item">
                <span class="score-bar-label">${c.label}</span>
                <div class="score-bar-track"><div class="score-bar-fill" style="width:${c.score}%; background:${col}"></div></div>
            </div>`;
    }).join('');

    const tipsHTML = criteria.map(c => {
        const cls = c.score >= 75 ? 'pos' : c.score >= 50 ? 'neu' : 'neg';
        return `<div class="score-tip ${cls}"><strong>${c.label}:</strong> ${c.tip}</div>`;
    }).join('');

    wrap.innerHTML = `
        <div class="hook-result-panel">
            <div class="score-top">
                <div class="score-circle score-circle--compact ${totalScore >= 80 ? 'great' : totalScore >= 50 ? 'good' : 'weak'}">
                    ${totalScore}
                </div>
                <div class="score-verdict">
                    <div class="score-verdict-title">${totalScore >= 80 ? 'Elite Hook 🔥' : 'Needs optimization'}</div>
                    <div class="score-verdict-sub">Focus on <strong>${weakest.label}</strong> to scale your reach.</div>
                </div>
            </div>
            <div class="score-bars score-bars--two-col">${barsHTML}</div>
            <div class="score-tips">${tipsHTML}</div>
            <div class="rewrite-box">
                <div class="rewrite-box-label">💡 AI-optimized rewrite</div>
                <div class="rewrite-box-text">"${rewrite}"</div>
            </div>
        </div>`;
}

function clearHook() {
    document.getElementById('hookInput').value = '';
    document.getElementById('hookChar').textContent = '0/200';
    document.getElementById('hookScoreWrap').classList.remove('show');
}