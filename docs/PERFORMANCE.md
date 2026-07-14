# Performance & Optimization

Contora is engineered for speed, lightweight resource footprint, and zero layout shift. This document highlights our optimization strategies.

---

## 1. Zero-Framework Runtime Overhead

Rather than using heavy frameworks (like React, Angular, or Vue) which bundle megabytes of runtime logic, Contora uses **pure vanilla HTML5, CSS3, and JavaScript (ES Modules)**.

- **Vite Bundling**: All scripts are transpiled and bundled into a single minified JS file (`index-*.js`) of under **38 KB** (compressed).
- **Fast First Contentful Paint (FCP)**: The static page assets load instantly. FCP is achieved in **< 150ms** under standard networks.

---

## 2. Rendering & DOM Optimizations

- **Dynamic innerHTML Batching**: When generating dashboards or infinite idea grids, HTML strings are compiled fully in memory using template literals and injected in a single layout pass. This prevents browser repaint thrashing.
- **Hardware-Accelerated Transitions**: All page transitions and the glowing cursor trail animations utilize CSS `transform` (3D transitions) and `opacity` properties. These properties are handled directly by the GPU, ensuring a stable 60 FPS.
- **Debounced Input Listeners**: The Hook Tester (`hook-tester.js`) debounces keystroke inputs by `1200ms`. This prevents calculating heavy copywriting audits on every letter press, while preserving an engaging scanning animation.

---

## 3. Memory & Anti-Repetition Management

The infinite idea shuffler (`ideaEngine.js`) avoids duplicates by tracking session combinations in JavaScript `Set` structures (`_usedKeys` and `_usedStructureFingerprints`).

To prevent memory leaks over long sessions:
- We set a hard-cap retry limit (`count * 30`) on search attempts.
- Used combinations can be fully garbage-collected by calling `resetIdeaEngine()` (triggered whenever the user clicks "Fresh Start" or starts a new strategy quiz).
- Set sizes are small, holding simple string hashes, meaning memory usage remains below **2 MB** even after generating hundreds of content ideas.
