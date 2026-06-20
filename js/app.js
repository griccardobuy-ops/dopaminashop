/* =========================================
   DOPAMINE SHOP — Effects & App Init
   ========================================= */

'use strict';

// ─── TOAST NOTIFICATION SYSTEM ──────────────────────────────────────────────

/**
 * Mostra una notifica toast
 * @param {string} icon  - emoji
 * @param {string} msg   - messaggio principale
 * @param {string} sub   - sottomessaggio (opzionale)
 * @param {number} dur   - durata in ms (default 3000)
 */
function showToast(icon, msg, sub = '', dur = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div>
      <div class="toast-msg">${msg}</div>
      ${sub ? `<div class="toast-sub">${sub}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, dur);
}

// ─── CONFETTI ENGINE ─────────────────────────────────────────────────────────

let confettiCanvas, confettiCtx, confettiParticles = [], confettiAnimId;

function initConfetti() {
  confettiCanvas = document.getElementById('confetti-canvas');
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
}

function resizeConfettiCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function triggerConfetti() {
  if (!confettiCanvas) return;
  resizeConfettiCanvas();

  const colors = ['#6C3BFF', '#C8FF00', '#FF4D6D', '#FFB800', '#9470FF', '#7CFFD4'];
  confettiParticles = [];

  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x:    Math.random() * confettiCanvas.width,
      y:    Math.random() * confettiCanvas.height - confettiCanvas.height,
      r:    Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot:  Math.random() * Math.PI * 2,
      vx:   Math.random() * 4 - 2,
      vy:   Math.random() * 4 + 2,
      vr:   (Math.random() - 0.5) * 0.2,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      w:    Math.random() * 10 + 5,
      h:    Math.random() * 6 + 3,
      opacity: 1,
    });
  }

  cancelAnimationFrame(confettiAnimId);
  animateConfetti();
}

function animateConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach(p => {
    confettiCtx.save();
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.fillStyle   = p.color;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot);

    if (p.shape === 'rect') {
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    } else {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.r, 0, Math.PI * 2);
      confettiCtx.fill();
    }
    confettiCtx.restore();

    p.x  += p.vx;
    p.y  += p.vy;
    p.rot += p.vr;
    p.vy += 0.08; // gravità

    // Fade out quando escono dallo schermo
    if (p.y > confettiCanvas.height * 0.8) {
      p.opacity -= 0.02;
    }
  });

  confettiParticles = confettiParticles.filter(p => p.opacity > 0);

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ─── SOUND SYSTEM ────────────────────────────────────────────────────────────

let soundEnabled = localStorage.getItem('ds_sound') !== 'off';

function playSound(type) {
  if (!soundEnabled) return;

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'add':
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
        break;

      case 'order':
        // Melodia di successo
        [523, 659, 784, 1047].forEach((freq, i) => {
          const o2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          o2.connect(g2); g2.connect(ctx.destination);
          o2.frequency.value = freq;
          g2.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
          g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
          o2.start(ctx.currentTime + i * 0.12);
          o2.stop(ctx.currentTime + i * 0.12 + 0.2);
        });
        break;

      case 'badge':
        osc.frequency.setValueAtTime(784, ctx.currentTime);
        osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;
    }
  } catch(e) {
    // Audio non disponibile, ignoriamo
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('ds_sound', soundEnabled ? 'on' : 'off');
  const btn = document.getElementById('sound-toggle');
  if (btn) btn.textContent = soundEnabled ? '🔊' : '🔇';
  showToast(soundEnabled ? '🔊' : '🔇', soundEnabled ? 'Suoni attivati' : 'Suoni disattivati', '', 1500);
}

// ─── THEME SYSTEM ────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('ds_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ds_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title       = theme === 'dark' ? 'Modalità chiara' : 'Modalità scura';
  });
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────

let searchTimeout;
function onSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    STATE.searchQuery = val.trim();
    if (STATE.currentPage !== 'shop') navigateTo('shop');
    else applyFilters();
  }, 300);
}

// ─── PRICE FILTER ────────────────────────────────────────────────────────────

function onPriceRange(val) {
  STATE.maxPrice = parseFloat(val);
  document.getElementById('price-max-label').textContent = `€${parseFloat(val).toFixed(0)}`;
  applyFilters();
}

function onRatingFilter(val) {
  STATE.minRating = parseFloat(val);
  applyFilters();
}

function onSortChange(val) {
  STATE.sortBy = val;
  applyFilters();
}

// ─── COUPON (effetto psicologico) ────────────────────────────────────────────

const FAKE_COUPONS = {
  'DOPAMINA': 10,
  'SHOP2024': 15,
  'FREEDAY':  5,
  'VIP20':    20,
};

function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (FAKE_COUPONS[code]) {
    showToast('🎟️', `Coupon "${code}" applicato!`, `-${FAKE_COUPONS[code]}% sul totale`, 3500);
    input.value = '';
    addXP(10, 'coupon');
  } else {
    showToast('❌', 'Codice non valido', 'Prova: DOPAMINA, SHOP2024 o VIP20', 3000);
  }
}

// ─── CHECKOUT INIT ───────────────────────────────────────────────────────────

function goToCheckout() {
  if (STATE.cart.length === 0) {
    showToast('🛒', 'Carrello vuoto!', 'Aggiungi qualcosa prima di procedere', 2500);
    return;
  }

  navigateTo('checkout');

  // Popola form con dati fittizi (per divertimento)
  const fakeNames = ['Marco Rossi', 'Sofia Bianchi', 'Luca Ferrari', 'Giulia Romano'];
  const fakeCities = ['Milano', 'Roma', 'Torino', 'Bologna', 'Firenze', 'Napoli'];
  const fakeStreets = ['Via Roma 15', 'Corso Italia 42', 'Via Garibaldi 7', 'Piazza del Duomo 1'];

  const nameEl = document.getElementById('checkout-name');
  if (nameEl && !nameEl.value) {
    // Pre-compila solo se vuoto
  }

  renderCheckoutSummary();
}

// ─── NOTIFICHE CASUALI ───────────────────────────────────────────────────────

const MOTIVATIONAL_MSGS = [
  ['💡', 'Lo sapevi?', 'I prodotti in offerta finiscono in media in 2 ore.'],
  ['🌟', 'Consiglio del giorno', 'La wishlist è gratis. L\'unico rischio è innamorarti.'],
  ['📊', 'Tendenza', 'Il 73% degli shopper pentiti ha aspettato troppo.'],
  ['🎁', 'Idea regalo', 'Stai pensando a qualcuno? La wishlist si può condividere!'],
  ['⚡', 'Flash deal', 'Sconti del 30-50% attivi ora nella sezione Deals.'],
];

function startRandomNotifications() {
  // Prima notifica dopo 15 secondi
  setTimeout(() => {
    const m = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
    showToast(m[0], m[1], m[2], 4000);

    // Poi ogni 45-90 secondi
    setInterval(() => {
      const msg = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
      showToast(msg[0], msg[1], msg[2], 4000);
    }, Math.random() * 45000 + 45000);
  }, 15000);
}

// ─── APP INITIALIZATION ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tema
  initTheme();

  // 2. Carica stato dal localStorage
  loadState();

  // 3. Genera prodotti
  STATE.products = generateProducts(120);

  // 4. Confetti canvas
  initConfetti();

  // 5. Filtra prodotti inizialmente
  STATE.filteredProds  = [...STATE.products];
  STATE.displayedCount = STATE.PAGE_SIZE;

  // 6. Render homepage
  renderHome();
  updateNavBadges();

  // 7. Event listeners globali

  // Chiudi modal su Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });

  // Chiudi modal cliccando overlay
  const modalOverlay = document.getElementById('product-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeProductModal();
    });
  }

  // Resize confetti
  window.addEventListener('resize', resizeConfettiCanvas);

  // 8. Notifiche casuali motivazionali
  startRandomNotifications();

  // 9. Inizia su home
  navigateTo('home');

  // 10. XP iniziale se nuovo utente
  if (STATE.profile.xp === 0 && STATE.profile.viewedProducts === 0) {
    setTimeout(() => {
      showToast('👋', 'Benvenuto nel Dopamine Shop!', 'Guarda, aggiungi, senti la soddisfazione ✨', 5000);
    }, 1000);
  }

  // 11. Aggiorna tracking in background
  setInterval(() => {
    if (STATE.currentPage === 'tracking') renderTracking();
  }, 10000);

  // 12. Pulisci XP display
  updateProfileUI();
});
