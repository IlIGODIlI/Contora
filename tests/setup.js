// Vitest Global Environment Setup
global.window = {
  _ideasLoaded: 0,
  _ideasNiche: '',
  _ua: { platform: 'TikTok' },
  scrollTo: () => {}
};

global.document = {
  getElementById: (id) => ({
    textContent: '',
    value: '',
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    },
    innerHTML: '',
    appendChild: () => {},
    removeChild: () => {},
    addEventListener: () => {}
  }),
  querySelectorAll: () => []
};
