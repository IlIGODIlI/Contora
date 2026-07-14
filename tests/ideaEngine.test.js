import { describe, test, expect, beforeEach } from 'vitest';
import { generateIdeas, resetIdeaEngine, _usedKeys, _usedStructureFingerprints } from '../src/js/ideaEngine.js';

// Mock browser global environment
global.window = {
  _ideasLoaded: 0,
  _ideasNiche: '',
  _ua: { platform: 'TikTok' }
};

describe('ideaEngine - generateIdeas', () => {
  beforeEach(() => {
    resetIdeaEngine();
  });

  test('should generate default count of 5 ideas', () => {
    const ideas = generateIdeas('Cinematic Editing', 5, 'TikTok');
    expect(ideas).toBeInstanceOf(Array);
    expect(ideas.length).toBe(5);
  });

  test('should return items with valid structure', () => {
    const ideas = generateIdeas('Self Improvement', 1, 'YouTube Shorts');
    const idea = ideas[0];
    
    expect(idea).toHaveProperty('t'); // Title
    expect(idea).toHaveProperty('d'); // Description
    expect(idea).toHaveProperty('tags'); // Tag array
    expect(idea).toHaveProperty('category');
    expect(idea).toHaveProperty('platform');

    expect(typeof idea.t).toBe('string');
    expect(idea.tags).toBeInstanceOf(Array);
  });

  test('should fall back gracefully to default topics for unknown niches', () => {
    const niche = 'Super Rare Niche That Does Not Exist 12345';
    const ideas = generateIdeas(niche, 2, 'Instagram Reels');
    expect(ideas.length).toBe(2);
    // Since some scaffolds might not use the {niche} placeholder directly, we test that the fallback works without crashing.
    expect(ideas[0]).toHaveProperty('t');
  });

  test('resetIdeaEngine should clear history sets', () => {
    generateIdeas('Fitness & Health', 3, 'TikTok');
    expect(_usedKeys.size).toBeGreaterThan(0);

    resetIdeaEngine();
    expect(_usedKeys.size).toBe(0);
    expect(_usedStructureFingerprints.size).toBe(0);
  });
});
