// The single source of truth for timing. The picture, the sound cues and the HTML captions all read it.
// 120 BPM: one beat = 0.5 s, one bar = 2 s. 28 bars = 56 s.

export const BPM = 120;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const DUR = 56;
export const FPS = 60;

export const SCENES = [
  { id: 's1', from: 0, to: 10 },
  { id: 's2', from: 10, to: 18 },
  { id: 's3', from: 18, to: 26 },
  { id: 's4', from: 26, to: 38 },
  { id: 's5', from: 38, to: 46 },
  { id: 's6', from: 46, to: 56 },
];

/** Named moments (seconds). Every state change lands on the beat grid. */
export const T = {
  // 1. The idea
  wordsStart: 0.25,
  wordStep: 0.18,
  reveal: 2.5,
  send: 3.5,
  spark: 4.0,
  tool: 4.5,
  toolDone: 5.0,
  answer: 5.5,
  lift: 6.5,
  fly: 8.0,
  land: 9.75,
  impact: 10.0,
  // 2. The ticket
  explode: 12.0,
  layerStep: 0.5,
  skewer: 14.0,
  dive: 15.0,
  morphCortx: 16.5,
  cortxFormed: 18.0,
  // 3. The agent
  ccType: 18.5,
  ccEnter: 19.0,
  promptType: 20.0,
  promptEnter: 21.5,
  skill: 22.0,
  show: 22.5,
  cardIn: 22.5,
  status: 23.5,
  update: 24.0,
  diffLift: 25.0,
  // 4. The work
  code: 26.0,
  codeLines: [26.5, 27.0, 27.5],
  backToTerm: 28.5,
  service: 29.0,
  build: 29.5,
  toast: 30.5,
  gate: 31.0,
  checks: [31.5, 32.0, 32.5],
  op: 33.0,
  cursor: 34.0,
  click: 35.0,
  seal: 35.0,
  stamp: 36.0,
  rejoin: 37.0,
  // 5. The trace
  detail: 38.0,
  done: 38.5,
  activity: 39.0,
  comment: 39.5,
  doc: 41.5,
  diagram: 43.0,
  links: [43.5, 44.0, 44.5, 45.0],
  // 6. The environment
  pull: 46.0,
  trace: 46.5,
  closed: 49.5,
  // the climax: the ring collapses, the Toolbox logo is born, the word is revealed
  collapse: 50.0,
  logo: 50.5,
  word: 51.0,
  subtitle: 51.5,
  unfold: 54.0,
  ret: 54.0,
};

/** Caption windows for the HTML subtitles (one sentence per scene). */
export const CAPTIONS = [
  { id: 's1', from: 0.6, to: 9.6 },
  { id: 's2', from: 10.3, to: 17.6 },
  { id: 's3', from: 18.3, to: 25.6 },
  { id: 's4', from: 26.3, to: 37.6 },
  { id: 's5', from: 38.3, to: 45.6 },
  { id: 's6', from: 46.3, to: 49.8 },
];

/** Sound-effect cues: [time, voice, gain]. Synthesized by audio/sfx.py. */
export function cues(lang = 'fr') {
  const c = [];
  const words = lang === 'fr' ? 12 : 14;
  for (let i = 0; i < words; i++) c.push([T.wordsStart + i * T.wordStep, 'tick', 0.22]);
  c.push([T.reveal, 'whoosh', 0.35]);
  c.push([T.send, 'click', 0.5], [T.send + 0.04, 'pop', 0.45]);
  c.push([T.spark, 'shimmer', 0.3]);
  c.push([T.tool, 'tick', 0.4], [T.toolDone, 'pophi', 0.5]);
  for (let i = 0; i < 8; i++) c.push([T.answer + i * 0.125, 'tick', 0.12]);
  c.push([T.lift, 'rise', 0.4], [T.fly, 'whoosh', 0.55], [T.land, 'click', 0.4], [T.impact, 'thump', 0.8]);
  for (let i = 0; i < 4; i++) c.push([T.explode + i * T.layerStep, 'click', 0.45]);
  c.push([T.skewer, 'shimmer', 0.5], [T.skewer, 'whoosh', 0.3]);
  c.push([T.dive, 'rise', 0.4], [T.morphCortx, 'whoosh', 0.45], [T.cortxFormed, 'thump', 0.55]);
  c.push([T.ccType, 'key', 0.35], [T.ccType + 0.12, 'key', 0.35], [T.ccEnter, 'enter', 0.5], [T.ccEnter, 'pophi', 0.3]);
  for (let i = 0; i < 10; i++) c.push([T.promptType + i * 0.125, 'key', 0.3]);
  c.push([T.promptEnter, 'enter', 0.55]);
  c.push([T.skill, 'tick', 0.4], [T.show, 'tick', 0.4], [T.cardIn, 'whoosh', 0.3], [T.status, 'bloop', 0.6]);
  c.push([T.update, 'tick', 0.4], [T.diffLift, 'rise', 0.45]);
  T.codeLines.forEach((t) => c.push([t, 'pophi', 0.35]));
  c.push([T.backToTerm, 'whoosh', 0.35], [T.service, 'tick', 0.4], [T.build, 'tick', 0.35], [T.toast, 'ding', 0.5]);
  c.push([T.gate, 'scan', 0.45]);
  T.checks.forEach((t, i) => c.push([t, 'check' + i, 0.5]));
  c.push([T.op, 'rise', 0.35], [T.cursor, 'tick', 0.15], [T.click, 'click', 0.6], [T.stamp - 0.9, 'riser', 0.5], [T.stamp, 'impact', 0.95]);
  c.push([T.rejoin, 'whoosh', 0.5], [T.detail, 'pop', 0.4], [T.done, 'ding', 0.6], [T.activity, 'tick', 0.3]);
  for (let i = 0; i < 12; i++) c.push([T.comment + i * 0.125, 'tick', 0.09]);
  c.push([T.doc, 'paper', 0.5], [T.diagram, 'paper', 0.45]);
  T.links.forEach((t) => c.push([t, 'tick', 0.35]));
  c.push([T.pull, 'whoosh', 0.5]);
  for (let i = 0; i < 6; i++) c.push([T.trace + i * 0.5, 'note' + i, 0.4]);
  c.push([T.closed, 'shimmer', 0.5]);
  c.push([T.collapse, 'whoosh', 0.6], [T.logo, 'impact', 0.9], [T.word, 'hit', 0.75], [T.subtitle, 'pophi', 0.35]);
  c.push([T.ret, 'reverse', 0.5]);
  return c.sort((a, b) => a[0] - b[0]);
}
