/* ============================================================
   CONTORA — times-data.js
   Best posting times data for each platform

   To edit times for a platform: find it below and change
   the slot, day, why, or badge values.

   badge options: "hot" (🔥 red) or "good" (✓ green)
   ============================================================ */

export const timesData = {

  // ——— INSTAGRAM REELS ———
  'Instagram Reels': {
    times: [
      { day: 'Monday',    slot: '7–9 AM',    why: 'People scroll before work',       badge: 'good' },
      { day: 'Tuesday',   slot: '11 AM–1 PM', why: 'Lunch break peak',                badge: 'hot' },
      { day: 'Thursday',  slot: '7–9 PM',    why: 'Evening wind-down',               badge: 'hot' },
      { day: 'Saturday',  slot: '10 AM–12 PM', why: 'Weekend morning browse',         badge: 'good' },
      { day: 'Sunday',    slot: '6–8 PM',    why: 'Pre-week scrolling',              badge: 'good' },
    ],
    tip: 'Instagram Reels get the most reach in the first 90 minutes after posting. Post when your audience is most active — not when YOU feel like posting.',
    frequency: '3–5 Reels per week for optimal growth. Quality over quantity after you hit 4+ per week.',
  },

  // ——— TIKTOK ———
  'TikTok': {
    times: [
      { day: 'Tuesday',   slot: '9–11 AM',   why: 'Morning browse peak',             badge: 'good' },
      { day: 'Wednesday', slot: '7–9 PM',    why: 'Highest engagement window',       badge: 'hot' },
      { day: 'Thursday',  slot: '7–9 AM',    why: 'Commute scrolling',               badge: 'good' },
      { day: 'Friday',    slot: '5–7 PM',    why: 'End of week energy',              badge: 'hot' },
      { day: 'Saturday',  slot: '11 AM–1 PM', why: 'Weekend leisure peak',            badge: 'hot' },
    ],
    tip: 'TikTok distributes content based on completion rate and shares, not follower count. The best time to post is when YOUR specific audience is online — check your analytics.',
    frequency: '1–3 videos per day is ideal for TikTok growth. Consistency beats perfection here.',
  },

  // ——— YOUTUBE SHORTS ———
  'YouTube Shorts': {
    times: [
      { day: 'Monday',    slot: '12–3 PM',   why: 'Midday YouTube session',          badge: 'good' },
      { day: 'Wednesday', slot: '3–6 PM',    why: 'After-school/work peak',          badge: 'hot' },
      { day: 'Friday',    slot: '12–3 PM',   why: 'Friday wind-down browsing',       badge: 'hot' },
      { day: 'Saturday',  slot: '9 AM–12 PM', why: 'Weekend morning sessions',       badge: 'hot' },
      { day: 'Sunday',    slot: '3–6 PM',    why: 'Sunday afternoon browsing',       badge: 'good' },
    ],
    tip: 'YouTube Shorts can resurface weeks after posting unlike Reels/TikTok. Front-load your best content in the first 5 seconds — YouTube uses that to decide distribution.',
    frequency: '2–4 Shorts per week. Pair with long-form for maximum channel growth.',
  },

  // ——— YOUTUBE LONG-FORM ———
  'YouTube Long-form': {
    times: [
      { day: 'Thursday',  slot: '2–4 PM',    why: 'Pre-weekend content catch-up',    badge: 'good' },
      { day: 'Friday',    slot: '12–3 PM',   why: 'Best upload day overall',         badge: 'hot' },
      { day: 'Saturday',  slot: '9–11 AM',   why: 'Weekend binge-watch sessions',    badge: 'hot' },
      { day: 'Sunday',    slot: '2–5 PM',    why: 'Classic YouTube viewing window',  badge: 'hot' },
    ],
    tip: 'For long-form, Friday at noon is statistically the best upload time. Videos need 24–48 hours to get indexed and pushed — so timing your upload accounts for that delay.',
    frequency: '1–2 videos per week is sustainable. Dropping below 1/week hurts momentum significantly.',
  },

};