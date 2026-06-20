/* =========================================
   DOPAMINE SHOP — Core Data & State
   ========================================= */

'use strict';

// ─── PRODUCT DATA GENERATOR ─────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'tech',      name: 'Tech & Gadget',    icon: '💻', query: 'technology gadget' },
  { id: 'fashion',   name: 'Moda',             icon: '👗', query: 'fashion clothing' },
  { id: 'home',      name: 'Casa & Design',    icon: '🏠', query: 'home decor interior' },
  { id: 'beauty',    name: 'Beauty',           icon: '✨', query: 'beauty cosmetics' },
  { id: 'sport',     name: 'Sport & Fitness',  icon: '🏋️', query: 'sport fitness equipment' },
  { id: 'food',      name: 'Gourmet',          icon: '🍜', query: 'food gourmet cooking' },
  { id: 'books',     name: 'Libri & Arte',     icon: '📚', query: 'books art library' },
  { id: 'travel',    name: 'Travel & Outdoor', icon: '🌍', query: 'travel outdoor adventure' },
  { id: 'pets',      name: 'Animali',          icon: '🐾', query: 'pet animals cute' },
  { id: 'gaming',    name: 'Gaming',           icon: '🎮', query: 'gaming controller arcade' },
];

const PRODUCT_NAMES = {
  tech:    ['Cuffie Wireless Pro', 'Smart Watch Ultra', 'Tastiera Meccanica RGB', 'Webcam 4K Stream', 'Hub USB-C 10 porte', 'Caricatore GaN 100W', 'SSD Portatile 2TB', 'Ring Light LED', 'Mouse Ergonomico', 'Speaker Bluetooth', 'Drone Compatto', 'Tablet 12"', 'Microfono USB', 'Proiettore Pocket', 'Router WiFi 6'],
  fashion: ['Cappotto Oversize', 'Sneakers Low Top', 'Borsa Tote Canvas', 'Maglione Cashmere', 'Occhiali Vintage', 'Cintura in Pelle', 'Sciarpa Merino', 'Pantaloni Wide Leg', 'Bomber Ricamato', 'Berretto Lana'],
  home:    ['Lampada Arco Moderna', 'Vaso Ceramica Fatto a Mano', 'Specchio Arco Metallo', 'Diffusore Aromi', 'Cuscino Lino 50x50', 'Candelabro Minimalista', 'Tenda Lino Naturale', 'Portavaso Rattan', 'Orologio da Parete', 'Set Bicchieri Vetro'],
  beauty:  ['Siero Vitamina C', 'Palette Occhi 24 colori', 'Profumo Niche 50ml', 'Crema Viso Anti-Age', 'Maschera Oro 24K', 'Balsamo Labbra SPF50', 'Shampoo Solido Bio', 'Spazzola Boar Bristle', 'Fondotinta Fluido', 'Rossetto Matte Set'],
  sport:   ['Tappetino Yoga TPE', 'Kettlebell 16kg', 'Corda da Salto Pro', 'Band Elastici Set', 'Borraccia Thermos', 'Guanti Palestra', 'Fascia Running', 'Foam Roller', 'Manubri Regolabili', 'Cintura Lombare'],
  food:    ['Caffè Specialty 250g', 'Set Spezie Mondo', 'Olio EVO DOP', 'Cioccolato Fondente 90%', 'Miele Toscano', 'Pasta Grano Duro Bio', 'Tartufo Estivo 20g', 'Aceto Balsamico 12 anni', 'Tè Matcha Uji', 'Kit Cocktail Americano'],
  books:   ['Sketchbook Premium A4', 'Penne Calligrafia Set', 'Libro Architettura', 'Agenda Bullet Journal', 'Set Acquerelli 36', 'Tarocchi Illustrati', 'Romanzo Bestseller', 'Atlante Illustrato', 'Libro Fotografia', 'Fumetto Edizione Speciale'],
  travel:  ['Zaino 40L Impermeabile', 'Cuscino Cervicale Viaggio', 'Lucchetto TSA', 'Portadocumenti RFID', 'Asciugamano Microfibra', 'Kit Adattatori Prese', 'Borsa Cabina 20L', 'Occhiali da Sole UV400', 'Crema Solare SPF50', 'Bussola Vintage'],
  pets:    ['Cuccia Design Scandinavo', 'Fontanella Automatica', 'Gioco Interattivo Gatto', 'Collare GPS Tracker', 'Alimentatore Smart', 'Trasportino Aereo', 'Spazzola Furminator', 'Repellente Naturale', 'Tappetino Rinfrescante', 'Snack Biologici'],
  gaming:  ['Controller Ergonomico', 'Mousepad XL RGB', 'Sedia Gaming', 'Cuffie Surround 7.1', 'Schermo 27" 165Hz', 'Switch Pro Controller', 'Tappeto Gaming LED', 'Stand Verticale PS5', 'Cavi Cable Management', 'Webcam Streaming'],
};

const ADJECTIVES = ['Premium', 'Pro', 'Ultra', 'Deluxe', 'Elite', 'Pure', 'Eco', 'Smart', 'Organic', 'Luxe'];
const BRANDS     = ['Zenith', 'Arco', 'Lumis', 'Nori', 'Volta', 'Koda', 'Breva', 'Torq', 'Flair', 'Nexis'];
const DESCS      = [
  'Realizzato con materiali di prima scelta per un'esperienza quotidiana superiore.',
  'Design minimalista che si adatta a ogni stile di vita moderno.',
  'Tecnologia avanzata in un formato elegante e intuitivo.',
  'La scelta dei professionisti per prestazioni senza compromessi.',
  'Sostenibile, durevole e bello da vedere.',
  'Perfetto come regalo o coccola per te stesso.',
  'Approvato da migliaia di utenti soddisfatti in tutto il mondo.',
  'Combina estetica e funzionalità in modo impeccabile.',
  'Edizione limitata: disponibilità ridotta.',
  'Il modo più semplice per aggiungere qualità alla tua giornata.',
];

/**
 * Genera un array di prodotti fittizi
 * @param {number} count - numero di prodotti da generare
 * @returns {Array} array di prodotti
 */
function generateProducts(count = 120) {
  const products = [];
  let id = 1;

  CATEGORIES.forEach(cat => {
    const names = PRODUCT_NAMES[cat.id] || [];
    const perCat = Math.max(names.length, Math.ceil(count / CATEGORIES.length));

    for (let i = 0; i < perCat && products.length < count; i++) {
      const baseName = names[i % names.length];
      const brand    = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const adj      = Math.random() > 0.6 ? ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] + ' ' : '';
      const price    = parseFloat((Math.random() * 290 + 9.99).toFixed(2));
      const hasDisc  = Math.random() > 0.55;
      const discPct  = hasDisc ? [10, 15, 20, 25, 30, 40, 50][Math.floor(Math.random() * 7)] : 0;
      const oldPrice = hasDisc ? parseFloat((price / (1 - discPct / 100)).toFixed(2)) : null;
      const rating   = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
      const reviews  = Math.floor(Math.random() * 4800 + 12);
      const imgId    = 100 + id * 7;  // stable image per product
      const isNew    = Math.random() > 0.82;
      const isHot    = !isNew && Math.random() > 0.85;

      products.push({
        id,
        name:     `${adj}${baseName} ${brand}`,
        brand,
        category: cat.id,
        catName:  cat.name,
        catIcon:  cat.icon,
        price,
        oldPrice,
        discPct,
        rating,
        reviews,
        desc:     DESCS[Math.floor(Math.random() * DESCS.length)],
        imgUrl:   `https://picsum.photos/seed/ds${imgId}/400/400`,
        thumbUrl: `https://picsum.photos/seed/ds${imgId}/80/80`,
        isNew,
        isHot,
        stock:    Math.floor(Math.random() * 40 + 1),
      });

      id++;
    }
  });

  return products;
}

// ─── APP STATE ───────────────────────────────────────────────────────────────

const STATE = {
  products:     [],
  filteredProds:[],
  displayedCount: 0,
  PAGE_SIZE:    24,

  cart:         [],   // { product, qty }
  wishlist:     [],   // product IDs
  orders:       [],   // ordini simulati
  profile: {
    name:       'Shopper',
    xp:         0,
    level:      1,
    viewedProducts: 0,
    cartsCreated:   0,
    ordersPlaced:   0,
  },

  currentPage:  'home',
  selectedCatId: 'all',
  sortBy:        'default',
  maxPrice:      500,
  minRating:     0,
  searchQuery:   '',
};

// ─── PERSISTENCE ────────────────────────────────────────────────────────────

function saveState() {
  try {
    localStorage.setItem('ds_cart',     JSON.stringify(STATE.cart));
    localStorage.setItem('ds_wishlist', JSON.stringify(STATE.wishlist));
    localStorage.setItem('ds_orders',   JSON.stringify(STATE.orders));
    localStorage.setItem('ds_profile',  JSON.stringify(STATE.profile));
  } catch(e) { console.warn('localStorage non disponibile:', e); }
}

function loadState() {
  try {
    const cart    = localStorage.getItem('ds_cart');
    const wl      = localStorage.getItem('ds_wishlist');
    const orders  = localStorage.getItem('ds_orders');
    const profile = localStorage.getItem('ds_profile');

    if (cart)    STATE.cart     = JSON.parse(cart);
    if (wl)      STATE.wishlist = JSON.parse(wl);
    if (orders)  STATE.orders   = JSON.parse(orders);
    if (profile) STATE.profile  = { ...STATE.profile, ...JSON.parse(profile) };
  } catch(e) { console.warn('Errore caricamento stato:', e); }
}

// ─── XP & LEVEL SYSTEM ─────────────────────────────────────────────────────

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2600, 3600, 5000];
const LEVEL_NAMES = [
  'Neofita', 'Curioso', 'Esploratore', 'Appassionato',
  'Collezionista', 'Conoscitore', 'Esperto', 'Maestro',
  'Gran Maestro', 'Leggenda', 'Dopamine God'
];

function addXP(amount, reason = '') {
  STATE.profile.xp += amount;
  const newLevel = calcLevel(STATE.profile.xp);

  if (newLevel > STATE.profile.level) {
    STATE.profile.level = newLevel;
    showToast('🎉', `Livello ${newLevel} raggiunto!`, `Sei ora un ${LEVEL_NAMES[newLevel - 1]}`, 4000);
    triggerConfetti();
  }

  saveState();
  updateProfileUI();
}

function calcLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function getXPProgress() {
  const lvl = STATE.profile.level;
  const curr = LEVEL_THRESHOLDS[lvl - 1] || 0;
  const next  = LEVEL_THRESHOLDS[lvl] || curr + 1000;
  const pct   = Math.min(((STATE.profile.xp - curr) / (next - curr)) * 100, 100);
  return { current: STATE.profile.xp - curr, needed: next - curr, pct };
}

// ─── BADGE DEFINITIONS ──────────────────────────────────────────────────────

const BADGES = [
  { id: 'first_view',    emoji: '👁️',  name: 'Prima Occhiata',      desc: 'Hai visto il primo prodotto',       check: p => p.viewedProducts >= 1 },
  { id: 'explorer',      emoji: '🔍',  name: 'Esploratore',          desc: '25 prodotti visualizzati',          check: p => p.viewedProducts >= 25 },
  { id: 'curious',       emoji: '🤓',  name: 'Curiosissimo',         desc: '100 prodotti visualizzati',         check: p => p.viewedProducts >= 100 },
  { id: 'first_cart',    emoji: '🛒',  name: 'Primo Carrello',       desc: 'Hai aggiunto il primo prodotto',    check: p => p.cartsCreated >= 1 },
  { id: 'big_spender',   emoji: '💳',  name: 'Big Spender (finto!)', desc: '3 carrelli creati',                 check: p => p.cartsCreated >= 3 },
  { id: 'first_order',   emoji: '📦',  name: 'Primo Ordine',         desc: 'Hai simulato il primo acquisto',    check: p => p.ordersPlaced >= 1 },
  { id: 'shopaholic',    emoji: '🛍️', name: 'Shopaholic',           desc: '5 ordini simulati',                 check: p => p.ordersPlaced >= 5 },
  { id: 'level5',        emoji: '⭐',  name: 'Stella Nascente',      desc: 'Raggiunto il livello 5',            check: p => p.level >= 5 },
  { id: 'level10',       emoji: '🏆',  name: 'Campione Assoluto',    desc: 'Raggiunto il livello massimo',      check: p => p.level >= 10 },
  { id: 'wishmaster',    emoji: '❤️',  name: 'Wishmaster',           desc: '10 prodotti nella wishlist',        check: (p, s) => s.wishlist.length >= 10 },
];

function checkNewBadges() {
  const earned = (STATE.profile.badges || []);
  let newOnes = [];

  BADGES.forEach(b => {
    if (!earned.includes(b.id) && b.check(STATE.profile, STATE)) {
      earned.push(b.id);
      newOnes.push(b);
    }
  });

  if (newOnes.length > 0) {
    STATE.profile.badges = earned;
    saveState();
    newOnes.forEach(b => {
      setTimeout(() => showToast(b.emoji, `Badge sbloccato: ${b.name}!`, b.desc, 4500), 800);
    });
  }
}
