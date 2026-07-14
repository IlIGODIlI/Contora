import { describe, test, expect } from 'vitest';
import { runPeakLogic } from '../src/js/hook-tester.js';

// Setup mock global environment
global.window = {
  _niche: 'Cinematic Editing'
};

describe('hook-tester - runPeakLogic', () => {
  test('should score a weak hook lower', () => {
    const wrap = { innerHTML: '' };
    const weakHook = 'some text'; // lacks opener, number, gap, etc.
    
    runPeakLogic(weakHook, wrap);
    
    expect(wrap.innerHTML).toContain('Needs optimization');
    expect(wrap.innerHTML).toContain('score-circle');
  });

  test('should score a strong hook higher', () => {
    const wrap = { innerHTML: '' };
    // Strong hook has opener ("why "), pattern interrupt ("..."), curiosity gap ("secret"), and numbers ("3")
    const strongHook = 'Why doing this edit... will ruin your 3 clips';
    
    runPeakLogic(strongHook, wrap);
    
    // Check if the verdict is high
    expect(wrap.innerHTML).toContain('Elite Hook');
    expect(wrap.innerHTML).toContain('score-circle');
  });

  test('should offer an AI rewrite fallback recommendations based on deficiencies', () => {
    const wrap = { innerHTML: '' };
    const hook = 'I love color grading'; // lacks numbers, lacks pattern interrupts
    
    runPeakLogic(hook, wrap);
    
    expect(wrap.innerHTML).toContain('AI-optimized rewrite');
    expect(wrap.innerHTML).toContain('I love color grading (and the 3 steps I took to get there).');
  });
});
