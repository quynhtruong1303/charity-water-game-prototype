// Otterly Clean! – Game Logic

// ── Otto Speech Bubble Messages by Cleanliness Tier ──────
const OTTO_MESSAGES = {
  happy: [
    'Ahhh, this water is perfect! 🦦',
    'Living my best otter life right now!',
    'So clean I can see my reflection!',
    'This is the cleanest my pool has ever been!',
    'I could float here forever. Keep it up!',
  ],
  tired: [
    'I have a headache...',
    'Something smells off in here...',
    'The water feels a little off today.',
    "I'm not feeling my best right now.",
    'Could use a little more clean water...',
  ],
  sick: [
    'My stomach hurts...',
    'Ugh, the water is really bad today...',
    'I think I swallowed something gross.',
    'Please clean the pool... I feel awful.',
    'This water is making me feel terrible.',
  ],
  critical: [
    "I don't feel so good...",
    'Everything hurts. Please help me...',
    'I need a rescue team...',
    'The water... it\'s too dirty...',
    'Send help. I can\'t swim like this.',
  ],
};

// Pool water gradients per cleanliness tier (top → bottom)
const POOL_COLORS = {
  happy:    'linear-gradient(to bottom, #2E9DF7 0%, #003366 100%)',
  tired:    'linear-gradient(to bottom, #90CC8F 0%, #3D7A44 100%)',
  sick:     'linear-gradient(to bottom, #5FA864 0%, #2A5C30 100%)',
  critical: 'linear-gradient(to bottom, #A0724A 0%, #5C3A1E 100%)',
};

// ── Win / Lose Message Arrays ─────────────────────────────
const WIN_MESSAGES = [
  'Otto did a happy backflip — the water is sparkling clean!',
  'Squeaky clean shift! Otto is one very happy otter.',
  'Top-tier tank keeper! Otto sends his warmest thanks.',
  'Crystal clear water — Otto is living his best life.',
  'Perfect shift! Otto is floating on his back without a care.',
];

const LOSE_MESSAGES = [
  "The water got too murky... Otto needed a rescue team.",
  "Too much trash slipped through. Poor Otto!",
  "Otto's pool needs serious attention next shift.",
  "The water quality slipped below safe levels — Otto's not feeling great.",
  "Better luck next shift! Otto is counting on you.",
];

// ── Game State ────────────────────────────────────────────
let gameScore      = 0;
let trashCollected = 0;
let cleanliness    = 80;   // 0–100
let timerSeconds   = 60;
let timerInterval  = null;
let gameActive     = false;

// Static trash items to re-spawn on each new game
const TRASH_ITEMS = [
  { src: 'img/bag.png',    left: '18%', top: '35%' },
  { src: 'img/bottle.png', left: '52%', top: '55%' },
  { src: 'img/can.png',    left: '72%', top: '28%' },
];

// ── Screen Navigation ─────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Timer ─────────────────────────────────────────────────
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  timerSeconds = 60;
  document.getElementById('game-timer').textContent = formatTime(timerSeconds);

  timerInterval = setInterval(() => {
    timerSeconds--;
    document.getElementById('game-timer').textContent = formatTime(timerSeconds);
    if (timerSeconds <= 0) {
      endGame();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// ── Score ─────────────────────────────────────────────────
function addScore(points) {
  gameScore += points;
  document.getElementById('game-score').textContent = gameScore;
}

// ── Otto State (speech bubble + pool color) ───────────────
function getTier(pct) {
  if (pct >= 80) return 'happy';
  if (pct >= 50) return 'tired';
  if (pct >= 20) return 'sick';
  return 'critical';
}

function updateOttoState(pct) {
  const tier     = getTier(pct);
  const messages = OTTO_MESSAGES[tier];
  const msg      = messages[Math.floor(Math.random() * messages.length)];

  document.getElementById('speech-bubble').textContent = msg;
  document.getElementById('pool-zone').style.background = POOL_COLORS[tier];

  // Warning banner: visible only in the sick tier
  const pool = document.getElementById('pool-zone');
  pool.classList.toggle('warning-flash', tier === 'sick');
}

// ── Jerry Can Bar ─────────────────────────────────────────
function renderJerryCans(pct) {
  const row = document.getElementById('jerry-can-row');
  row.innerHTML = '';
  const filled = Math.round(pct / 10);

  for (let i = 0; i < 10; i++) {
    const img = document.createElement('img');
    img.src = 'img/water-can.png';
    img.alt = 'jerry can';
    img.className = 'jerry-can' + (i < filled ? '' : ' empty');
    row.appendChild(img);
  }

  document.getElementById('cleanliness-pct').textContent = pct + '%';
}

// ── Trash Spawning ────────────────────────────────────────
function spawnTrash() {
  const pool = document.getElementById('pool-zone');
  pool.querySelectorAll('.trash-item').forEach(t => t.remove());

  TRASH_ITEMS.forEach(({ src, left, top }) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'trash';
    img.className = 'trash-item';
    img.style.left = left;
    img.style.top  = top;
    pool.appendChild(img);
  });
}

// ── Trash Click ───────────────────────────────────────────
document.getElementById('pool-zone').addEventListener('click', (e) => {
  if (!gameActive) return;
  if (e.target.classList.contains('trash-item')) {
    e.target.remove();
    trashCollected++;
    document.getElementById('trash-collected').textContent = trashCollected;
    addScore(10);
  }
});

// ── Game Start ────────────────────────────────────────────
function startGame() {
  // Reset state
  gameScore      = 0;
  trashCollected = 0;
  cleanliness    = 80;
  gameActive     = true;

  // Reset UI counters
  document.getElementById('game-score').textContent    = '0';
  document.getElementById('trash-collected').textContent = '0';
  document.getElementById('medicine-count').textContent  = '0';

  renderJerryCans(cleanliness);
  updateOttoState(cleanliness);
  spawnTrash();
  showScreen('game-screen');
  startTimer();
}

// ── Game End ──────────────────────────────────────────────
function endGame() {
  stopTimer();
  gameActive = false;

  const win = cleanliness >= 80;

  // Random message from appropriate array
  const pool = win ? WIN_MESSAGES : LOSE_MESSAGES;
  const msg  = pool[Math.floor(Math.random() * pool.length)];

  // Water quality points
  let qualityPts = 0;
  if      (cleanliness >= 80) qualityPts = 500;
  else if (cleanliness >= 50) qualityPts = 250;
  else if (cleanliness >= 20) qualityPts = 100;

  // Trash bonus
  let trashBonus = 0;
  if      (trashCollected >= 100) trashBonus = 500;
  else if (trashCollected >= 50)  trashBonus = 300;
  else if (trashCollected >= 25)  trashBonus = 150;
  else if (trashCollected >= 10)  trashBonus = 50;

  const sessionTotal = qualityPts + trashBonus;

  // Cleanliness tier label
  const cleanlinessLabel =
    cleanliness >= 80 ? 'Clean Water ✓' :
    cleanliness >= 50 ? 'Slightly Dirty'  :
    cleanliness >= 20 ? 'Dirty'           :
                        'Unsalvageable';

  // Otto status line
  const ottoStatus = win
    ? 'Otto is happy & healthy today!'
    : 'Otto needed a rescue team this shift...';

  // Populate score screen
  document.getElementById('score-end-message').textContent   = msg;
  document.getElementById('otto-status').textContent         = ottoStatus;
  document.getElementById('score-cleanliness').textContent   = cleanlinessLabel;
  document.getElementById('score-trash').textContent         = trashCollected + ' pieces';
  document.getElementById('score-quality-pts').textContent   = qualityPts + ' pts';
  document.getElementById('score-trash-bonus').textContent   = '+' + trashBonus + ' pts';
  document.getElementById('score-session-total').textContent = sessionTotal + ' pts';
  document.getElementById('score-lifetime').textContent      = sessionTotal + ' pts';

  showScreen('score-screen');
}

// ── Button Listeners ──────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('replay-btn').addEventListener('click', () => showScreen('start-screen'));

// ── Initial render (game screen preview) ─────────────────
renderJerryCans(80);
