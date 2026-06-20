/* =========================================
   DOPAMINE SHOP — Bundle unico
   Ordine garantito: data → ui → app
   ========================================= */

/* ===== data.js ===== */
/* =========================================
   DOPAMINE SHOP — Core Data & State
   ========================================= */



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
const DESCS = [
  "Realizzato con materiali di prima scelta per un'esperienza quotidiana superiore.",
  "Design minimalista che si adatta a ogni stile di vita moderno.",
  "Tecnologia avanzata in un formato elegante e intuitivo.",
  "La scelta dei professionisti per prestazioni senza compromessi.",
  "Sostenibile, durevole e bello da vedere.",
  "Perfetto come regalo o coccola per te stesso.",
  "Approvato da migliaia di utenti soddisfatti in tutto il mondo.",
  "Combina estetica e funzionalita' in modo impeccabile.",
  "Edizione limitata: disponibilita' ridotta.",
  "Il modo piu' semplice per aggiungere qualita' alla tua giornata.",
];


// ─── KEYWORD MAP per immagini coerenti ──────────────────────────────────────
// Mappa categoria → lista di keyword Unsplash per tipo di prodotto
const CATEGORY_KEYWORDS = {
  tech:    ['headphones','laptop','smartwatch','keyboard','smartphone','webcam','speaker','drone','tablet','microphone'],
  fashion: ['coat fashion','sneakers shoes','tote bag','sweater knitwear','sunglasses','leather belt','scarf wool','wide leg pants','bomber jacket','wool hat'],
  home:    ['floor lamp','ceramic vase','mirror interior','aroma diffuser','linen cushion','candle holder','linen curtain','rattan plant pot','wall clock','glass tableware'],
  beauty:  ['vitamin serum','eyeshadow palette','perfume bottle','face cream','gold face mask','lip balm','shampoo bar','hair brush','foundation makeup','lipstick'],
  sport:   ['yoga mat','kettlebell gym','jump rope','resistance bands','water bottle','gym gloves','running headband','foam roller','dumbbells','weightlifting belt'],
  food:    ['coffee beans','spices cooking','olive oil bottle','dark chocolate','honey jar','pasta artisan','truffle mushroom','balsamic vinegar','matcha tea','cocktail bar'],
  books:   ['sketchbook art','calligraphy pen','architecture book','bullet journal','watercolor painting','tarot cards','novel books','illustrated atlas','photography book','comic book'],
  travel:  ['hiking backpack','travel pillow','padlock security','passport wallet','microfiber towel','travel adapter','cabin bag luggage','sunglasses outdoor','sunscreen bottle','vintage compass'],
  pets:    ['aquarium fish tank','pet fountain water','cat toy interactive','dog collar gps','pet feeder smart','pet carrier travel','dog brush grooming','dog accessories','cooling mat pet','dog treats organic'],
  gaming:  ['game controller','mousepad rgb','gaming chair','gaming headset','monitor screen','nintendo switch','led lights room','playstation console','cable management','streaming webcam'],
};

/**
 * Restituisce una keyword Unsplash coerente con categoria e nome prodotto
 */
function getProductKeyword(catId, productName, seed) {
  const keywords = CATEGORY_KEYWORDS[catId] || ['product'];
  // Usa seed per distribuzione stabile (stesso prodotto = stessa keyword)
  return keywords[seed % keywords.length];
}

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
      const isNew    = Math.random() > 0.82;
      const isHot    = !isNew && Math.random() > 0.85;

      // Immagine coerente con categoria e tipo prodotto
      const keyword  = getProductKeyword(cat.id, baseName, id);
      const imgUrl   = `https://source.unsplash.com/400x400/?${encodeURIComponent(keyword)}&sig=${id}`;
      const thumbUrl = `https://source.unsplash.com/80x80/?${encodeURIComponent(keyword)}&sig=${id}`;

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
        imgUrl,
        thumbUrl,
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

/* ===== ui.js ===== */
/* =========================================
   DOPAMINE SHOP — UI Rendering
   ========================================= */



// ─── NAVIGATION ─────────────────────────────────────────────────────────────

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });

  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  STATE.currentPage = pageId;

  // Render specifico per pagina
  if (pageId === 'shop')      renderShop();
  if (pageId === 'cart')      renderCart();
  if (pageId === 'wishlist')  renderWishlist();
  if (pageId === 'tracking')  renderTracking();
  if (pageId === 'profile')   renderProfile();
}

// ─── NAV BADGES ─────────────────────────────────────────────────────────────

function updateNavBadges() {
  const cartCount = STATE.cart.reduce((s, i) => s + i.qty, 0);
  const wlCount   = STATE.wishlist.length;

  const cartBadge = document.getElementById('cart-badge');
  const wlBadge   = document.getElementById('wishlist-badge');

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle('show', cartCount > 0);
  }
  if (wlBadge) {
    wlBadge.textContent = wlCount;
    wlBadge.classList.toggle('show', wlCount > 0);
  }
}

// ─── STARS ──────────────────────────────────────────────────────────────────

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full)           html += '<span style="color:#FFB800">★</span>';
    else if (i === full && half) html += '<span style="color:#FFB800">½</span>';
    else                    html += '<span style="color:var(--border-color)">★</span>';
  }
  return html;
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────

function renderProductCard(p) {
  const inWl = STATE.wishlist.includes(p.id);
  const inCart = STATE.cart.some(i => i.product.id === p.id);

  let badgeHtml = '';
  if (p.discPct)  badgeHtml = `<span class="card-badge">-${p.discPct}%</span>`;
  else if (p.isNew) badgeHtml = `<span class="card-badge new">NUOVO</span>`;
  else if (p.isHot) badgeHtml = `<span class="card-badge hot">🔥 HOT</span>`;

  const priceHtml = p.oldPrice
    ? `<div><div class="card-price">€${p.price.toFixed(2)}</div><div class="card-price-old">€${p.oldPrice.toFixed(2)}</div></div>`
    : `<div class="card-price">€${p.price.toFixed(2)}</div>`;

  return `
    <div class="product-card" data-id="${p.id}" onclick="openProductModal(${p.id})">
      <div class="card-img-wrap">
        <img src="${p.imgUrl}" alt="${p.name}" loading="lazy">
        ${badgeHtml}
        <button class="card-wishlist ${inWl ? 'wishlisted' : ''}"
                onclick="toggleWishlist(event, ${p.id})"
                aria-label="${inWl ? 'Rimuovi da wishlist' : 'Aggiungi a wishlist'}">
          ${inWl ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-category">${p.catIcon} ${p.catName}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-stars">
          ${renderStars(p.rating)}
          <span class="stars-text">(${p.reviews.toLocaleString('it-IT')})</span>
        </div>
        <div class="card-footer">
          ${priceHtml}
          <button class="btn-add-cart ${inCart ? 'added' : ''}"
                  onclick="addToCartFromCard(event, ${p.id})"
                  aria-label="Aggiungi al carrello">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function renderHome() {
  // Hero stats
  const totalProds = STATE.products.length;
  document.getElementById('hero-prod-count').textContent = totalProds + '+';

  // Categorie hero
  const catGrid = document.getElementById('home-categories');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(c => `
      <button class="cat-pill" onclick="filterByCategory('${c.id}'); navigateTo('shop')">
        <span class="cat-icon">${c.icon}</span> ${c.name}
      </button>
    `).join('');
  }

  // Featured products (random 8)
  const featured = [...STATE.products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  const featGrid = document.getElementById('featured-grid');
  if (featGrid) {
    featGrid.innerHTML = featured.map(renderProductCard).join('');
  }

  // Deals section (discounted)
  const deals = STATE.products
    .filter(p => p.discPct >= 25)
    .sort((a, b) => b.discPct - a.discPct)
    .slice(0, 6);

  const dealsGrid = document.getElementById('deals-grid');
  if (dealsGrid) {
    dealsGrid.innerHTML = deals.map(renderProductCard).join('');
  }
}

// ─── SHOP PAGE ───────────────────────────────────────────────────────────────

function renderShop() {
  renderCategoryBar();
  applyFilters();
}

function renderCategoryBar() {
  const bar = document.getElementById('category-bar');
  if (!bar) return;

  const allPill = `<button class="cat-pill ${STATE.selectedCatId === 'all' ? 'active' : ''}"
                           onclick="filterByCategory('all')">
    🛍️ Tutto
  </button>`;

  const pills = CATEGORIES.map(c => `
    <button class="cat-pill ${STATE.selectedCatId === c.id ? 'active' : ''}"
            onclick="filterByCategory('${c.id}')">
      <span class="cat-icon">${c.icon}</span> ${c.name}
    </button>
  `).join('');

  bar.innerHTML = allPill + pills;
}

function filterByCategory(catId) {
  STATE.selectedCatId = catId;
  applyFilters();
  renderCategoryBar();
}

function applyFilters() {
  let prods = [...STATE.products];

  // Categoria
  if (STATE.selectedCatId !== 'all') {
    prods = prods.filter(p => p.category === STATE.selectedCatId);
  }

  // Ricerca
  if (STATE.searchQuery) {
    const q = STATE.searchQuery.toLowerCase();
    prods = prods.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.catName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  // Prezzo massimo
  prods = prods.filter(p => p.price <= STATE.maxPrice);

  // Rating minimo
  if (STATE.minRating > 0) {
    prods = prods.filter(p => p.rating >= STATE.minRating);
  }

  // Sort
  switch (STATE.sortBy) {
    case 'price-asc':  prods.sort((a, b) => a.price - b.price); break;
    case 'price-desc': prods.sort((a, b) => b.price - a.price); break;
    case 'rating':     prods.sort((a, b) => b.rating - a.rating); break;
    case 'discount':   prods.sort((a, b) => b.discPct - a.discPct); break;
    case 'new':        prods.sort((a, b) => b.isNew - a.isNew); break;
    default:           break;
  }

  STATE.filteredProds  = prods;
  STATE.displayedCount = Math.min(STATE.PAGE_SIZE, prods.length);

  renderProductGrid();
}

function renderProductGrid() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!grid) return;

  const toShow = STATE.filteredProds.slice(0, STATE.displayedCount);

  if (toShow.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-secondary)">
      <div style="font-size:3rem">🔍</div>
      <p style="margin-top:1rem">Nessun prodotto trovato. Prova altri filtri!</p>
    </div>`;
  } else {
    grid.innerHTML = toShow.map(renderProductCard).join('');
  }

  if (countEl) {
    countEl.textContent = `${STATE.filteredProds.length} prodotti`;
  }

  if (loadMoreBtn) {
    loadMoreBtn.style.display = STATE.displayedCount < STATE.filteredProds.length ? 'block' : 'none';
  }
}

function loadMoreProducts() {
  STATE.displayedCount = Math.min(
    STATE.displayedCount + STATE.PAGE_SIZE,
    STATE.filteredProds.length
  );
  renderProductGrid();
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────

function openProductModal(productId) {
  const p = STATE.products.find(x => x.id === productId);
  if (!p) return;

  // Track view
  STATE.profile.viewedProducts++;
  addXP(1, 'view');
  checkNewBadges();

  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const inWl = STATE.wishlist.includes(p.id);

  modal.querySelector('#modal-img').src    = p.imgUrl.replace('400/400', '600/600');
  modal.querySelector('#modal-img').alt    = p.name;
  modal.querySelector('#modal-cat').textContent  = `${p.catIcon} ${p.catName}`;
  modal.querySelector('#modal-name').textContent = p.name;
  modal.querySelector('#modal-stars').innerHTML  =
    renderStars(p.rating) + ` <span class="stars-text">${p.rating} (${p.reviews.toLocaleString('it-IT')} recensioni)</span>`;
  modal.querySelector('#modal-price').textContent   = `€${p.price.toFixed(2)}`;
  modal.querySelector('#modal-price-old').textContent = p.oldPrice ? `€${p.oldPrice.toFixed(2)}` : '';
  modal.querySelector('#modal-desc').textContent    = p.desc;
  modal.querySelector('#modal-qty-val').textContent = '1';
  modal.querySelector('#modal-wl-btn').innerHTML    = inWl ? '❤️ Nella Wishlist' : '🤍 Wishlist';
  modal.dataset.productId = productId;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Notifica random
  if (Math.random() > 0.7) {
    const msgs = [
      ['🔥', 'Ottimo affare!', `Solo ${p.stock} rimasti in stock`],
      ['👀', 'Popolare!', `${Math.floor(Math.random()*12+3)} persone lo stanno guardando`],
      ['⚡', 'Consegna rapida', 'Ordina entro 2h per riceverlo domani'],
    ];
    const m = msgs[Math.floor(Math.random() * msgs.length)];
    setTimeout(() => showToast(m[0], m[1], m[2]), 1200);
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function changeModalQty(delta) {
  const valEl = document.getElementById('modal-qty-val');
  const current = parseInt(valEl.textContent) || 1;
  const newVal = Math.max(1, Math.min(current + delta, 99));
  valEl.textContent = newVal;
}

function addToCartFromModal() {
  const modal = document.getElementById('product-modal');
  const productId = parseInt(modal.dataset.productId);
  const qty = parseInt(document.getElementById('modal-qty-val').textContent) || 1;
  addToCart(productId, qty);
  closeProductModal();
}

// ─── CART FUNCTIONS ──────────────────────────────────────────────────────────

function addToCart(productId, qty = 1) {
  const p = STATE.products.find(x => x.id === productId);
  if (!p) return;

  const existing = STATE.cart.find(i => i.product.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    STATE.cart.push({ product: p, qty });
    STATE.profile.cartsCreated++;
    addXP(5, 'cart');
  }

  saveState();
  updateNavBadges();
  checkNewBadges();
  showToast('🛒', 'Aggiunto al carrello!', p.name, 2500);
  saveState();
}

function addToCartFromCard(event, productId) {
  event.stopPropagation();
  addToCart(productId, 1);

  // Animate button
  const btn = event.currentTarget;
  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.textContent = '+';
  }, 1500);
}

function removeFromCart(productId) {
  STATE.cart = STATE.cart.filter(i => i.product.id !== productId);
  saveState();
  updateNavBadges();
  if (STATE.currentPage === 'cart') renderCart();
}

function updateCartQty(productId, delta) {
  const item = STATE.cart.find(i => i.product.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveState();
  if (STATE.currentPage === 'cart') renderCart();
}

function getCartTotal() {
  return STATE.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

function getCartItemCount() {
  return STATE.cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  const itemsWrap = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const totalEl   = document.getElementById('cart-total');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shipEl    = document.getElementById('cart-shipping');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!itemsWrap) return;

  if (STATE.cart.length === 0) {
    itemsWrap.innerHTML = '';
    if (emptyEl) emptyEl.classList.add('show');
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (emptyEl) emptyEl.classList.remove('show');
  if (checkoutBtn) checkoutBtn.disabled = false;

  const subtotal = getCartTotal();
  const shipping = subtotal > 49 ? 0 : 4.99;
  const total    = subtotal + shipping;

  itemsWrap.innerHTML = STATE.cart.map(item => {
    const p = item.product;
    return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-img">
          <img src="${p.thumbUrl}" alt="${p.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-cat">${p.catIcon} ${p.catName}</div>
          <div class="cart-item-footer">
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="updateCartQty(${p.id}, -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty(${p.id}, +1)">+</button>
            </div>
            <span class="cart-item-price">€${(p.price * item.qty).toFixed(2)}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${p.id})">🗑 Rimuovi</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
  if (shipEl)     shipEl.textContent     = shipping === 0 ? 'Gratuita 🎉' : `€${shipping.toFixed(2)}`;
  if (totalEl)    totalEl.textContent    = `€${total.toFixed(2)}`;
}

// ─── WISHLIST ────────────────────────────────────────────────────────────────

function toggleWishlist(event, productId) {
  event.stopPropagation();

  const idx = STATE.wishlist.indexOf(productId);
  if (idx === -1) {
    STATE.wishlist.push(productId);
    showToast('❤️', 'Aggiunto alla wishlist!', '', 2000);
    addXP(2, 'wishlist');
  } else {
    STATE.wishlist.splice(idx, 1);
    showToast('💔', 'Rimosso dalla wishlist', '', 1500);
  }

  saveState();
  updateNavBadges();
  checkNewBadges();

  // Aggiorna bottone nella card
  const card = event.currentTarget;
  const inWl = STATE.wishlist.includes(productId);
  card.textContent = inWl ? '❤️' : '🤍';
  card.classList.toggle('wishlisted', inWl);
}

function renderWishlist() {
  const grid  = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');
  if (!grid) return;

  const prods = STATE.products.filter(p => STATE.wishlist.includes(p.id));

  if (prods.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.add('show');
    return;
  }

  if (empty) empty.classList.remove('show');
  grid.innerHTML = prods.map(renderProductCard).join('');
}

// ─── PROFILE PAGE ────────────────────────────────────────────────────────────

function renderProfile() {
  const p = STATE.profile;
  const prog = getXPProgress();

  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };

  setEl('profile-level-name', LEVEL_NAMES[p.level - 1]);
  setEl('profile-xp', `${p.xp} XP`);
  setEl('stat-viewed', p.viewedProducts);
  setEl('stat-carts',  p.cartsCreated);
  setEl('stat-orders', p.ordersPlaced);
  setEl('stat-wishlist', STATE.wishlist.length);
  setEl('stat-level', p.level);
  setEl('stat-xp', p.xp);
  setEl('xp-current', prog.current);
  setEl('xp-needed',  prog.needed);

  const barEl = document.getElementById('xp-bar-fill');
  if (barEl) barEl.style.width = prog.pct + '%';

  // Badges
  const earned = p.badges || [];
  const badgesEl = document.getElementById('badges-grid');
  if (badgesEl) {
    badgesEl.innerHTML = BADGES.map(b => {
      const isEarned = earned.includes(b.id);
      return `
        <div class="badge-card ${isEarned ? 'earned' : 'locked'}" title="${b.desc}">
          <span class="badge-emoji">${b.emoji}</span>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
        </div>
      `;
    }).join('');
  }
}

function updateProfileUI() {
  if (STATE.currentPage === 'profile') renderProfile();
}

// ─── TRACKING PAGE ───────────────────────────────────────────────────────────

const TRACKING_STEPS = [
  { id: 'received',    label: 'Ordine ricevuto',  icon: '✅' },
  { id: 'preparing',  label: 'In preparazione',  icon: '📦' },
  { id: 'shipped',    label: 'Spedito',           icon: '🚚' },
  { id: 'transit',    label: 'In transito',       icon: '✈️' },
  { id: 'delivering', label: 'In consegna',       icon: '🏠' },
  { id: 'delivered',  label: 'Consegnato',        icon: '🎉' },
];

/**
 * Calcola il passo corrente basandosi sul timestamp dell'ordine
 */
function calcTrackingStep(order) {
  const now     = Date.now();
  const elapsed = now - order.placedAt;

  // Tempi simulati casuali memorizzati nell'ordine
  const times = order.trackingTimes;
  let step = 0;
  for (let i = 0; i < times.length; i++) {
    if (elapsed >= times[i]) step = i + 1;
  }
  return Math.min(step, TRACKING_STEPS.length - 1);
}

function generateTrackingTimes() {
  // Tempi casuali in ms: da pochi secondi a ore simulate
  let t = 0;
  return TRACKING_STEPS.slice(1).map(() => {
    t += Math.floor(Math.random() * 30000 + 8000); // 8–38 secondi per step
    return t;
  });
}

function formatTrackingTime(order, stepIndex) {
  const stepTime = order.placedAt + (order.trackingTimes[stepIndex - 1] || 0);
  if (Date.now() < stepTime) return '—';
  const d = new Date(stepTime);
  return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) +
         ' — ' + d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
}

function renderTracking() {
  const list = document.getElementById('orders-list');
  const empty = document.getElementById('empty-orders');
  if (!list) return;

  if (STATE.orders.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  list.innerHTML = STATE.orders.map(order => {
    const currentStep = calcTrackingStep(order);
    const isDelivered = currentStep >= TRACKING_STEPS.length - 1;
    const d = new Date(order.placedAt);

    const stepsHtml = TRACKING_STEPS.map((s, idx) => {
      const isDone   = idx < currentStep;
      const isActive = idx === currentStep;
      const cls = isDone ? 'done' : isActive ? 'active' : '';
      return `
        <div class="timeline-step ${cls}">
          <div class="timeline-dot">${isDone ? '✓' : s.icon}</div>
          <div class="timeline-label">${s.label}</div>
          ${isDone || isActive ? `<div class="timeline-time">${formatTrackingTime(order, idx)}</div>` : ''}
        </div>
      `;
    }).join('');

    const thumbsHtml = (order.items || []).slice(0, 5).map(i =>
      `<div class="order-item-thumb"><img src="${i.product.thumbUrl}" alt="${i.product.name}" loading="lazy"></div>`
    ).join('');

    return `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <div class="order-id">Ordine #${order.id}</div>
            <div class="order-date">${d.toLocaleDateString('it-IT', {day:'2-digit',month:'long',year:'numeric'})}</div>
          </div>
          <div>
            <span class="order-status-badge ${isDelivered ? 'delivered' : ''}">
              ${TRACKING_STEPS[currentStep].label}
            </span>
          </div>
        </div>
        <div class="tracking-timeline">${stepsHtml}</div>
        ${thumbsHtml ? `<div class="order-items-preview">${thumbsHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  // Auto-aggiorna ogni 5 secondi se ci sono ordini in corso
  const inProgress = STATE.orders.some(o => calcTrackingStep(o) < TRACKING_STEPS.length - 1);
  if (inProgress) {
    clearTimeout(window._trackingTimer);
    window._trackingTimer = setTimeout(() => {
      if (STATE.currentPage === 'tracking') renderTracking();
    }, 5000);
  }
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-order-summary');
  if (!el) return;

  const subtotal = getCartTotal();
  const shipping = subtotal > 49 ? 0 : 4.99;
  const total    = subtotal + shipping;

  el.innerHTML = `
    <div class="summary-row"><span>Prodotti (${getCartItemCount()})</span><span>€${subtotal.toFixed(2)}</span></div>
    <div class="summary-row"><span>Spedizione</span><span>${shipping === 0 ? 'Gratuita' : '€' + shipping.toFixed(2)}</span></div>
    <div class="summary-total"><span>Totale</span><span style="color:var(--accent-main)">€${total.toFixed(2)}</span></div>
  `;

  const cartPreview = document.getElementById('checkout-items-preview');
  if (cartPreview) {
    cartPreview.innerHTML = STATE.cart.slice(0, 4).map(i => `
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--border-color)">
        <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0">
          <img src="${i.product.thumbUrl}" style="width:100%;height:100%;object-fit:cover" alt="">
        </div>
        <div style="flex:1;font-size:.82rem">
          <div style="font-weight:600">${i.product.name}</div>
          <div style="color:var(--text-muted)">x${i.qty}</div>
        </div>
        <div style="font-weight:700;font-size:.85rem">€${(i.product.price*i.qty).toFixed(2)}</div>
      </div>
    `).join('') + (STATE.cart.length > 4 ? `<div style="font-size:.8rem;color:var(--text-muted);padding:.5rem 0">+ altri ${STATE.cart.length - 4} prodotti</div>` : '');
  }
}

function selectPayMethod(el) {
  document.querySelectorAll('.pay-method').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
}

function placeOrder() {
  // Validazione base form
  const required = ['checkout-name', 'checkout-email', 'checkout-address', 'checkout-city'];
  for (const id of required) {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) {
      el.style.borderColor = 'var(--accent-rose)';
      el.focus();
      showToast('⚠️', 'Compila tutti i campi', 'Verifica i dati di spedizione', 2500);
      setTimeout(() => el.style.borderColor = '', 2000);
      return;
    }
  }

  // Crea ordine
  const orderId = 'DS' + Date.now().toString(36).toUpperCase();
  const order = {
    id:          orderId,
    placedAt:    Date.now(),
    items:       [...STATE.cart],
    total:       getCartTotal(),
    trackingTimes: generateTrackingTimes(),
  };

  STATE.orders.unshift(order);
  STATE.profile.ordersPlaced++;
  addXP(50, 'order');

  // Reset carrello
  STATE.cart = [];
  saveState();
  updateNavBadges();
  checkNewBadges();

  // Mostra conferma
  const formEl    = document.getElementById('checkout-form');
  const confirmEl = document.getElementById('order-confirm');
  if (formEl)    formEl.style.display = 'none';
  if (confirmEl) {
    confirmEl.classList.add('show');
    document.getElementById('confirm-order-id').textContent = orderId;
  }

  triggerConfetti();
  showToast('🎉', 'Ordine confermato!', `#${orderId} — Inizia il tracciamento`, 5000);
}

/* ===== app.js ===== */
/* =========================================
   DOPAMINE SHOP — Effects & App Init
   ========================================= */



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

// ─── ESPOSIZIONE GLOBALE (richiesta dagli onclick nell'HTML) ─────────────────
window.navigateTo        = navigateTo;
window.filterByCategory  = filterByCategory;
window.openProductModal  = openProductModal;
window.closeProductModal = closeProductModal;
window.changeModalQty    = changeModalQty;
window.addToCartFromModal= addToCartFromModal;
window.addToCartFromCard = addToCartFromCard;
window.toggleWishlist    = toggleWishlist;
window.updateCartQty     = updateCartQty;
window.removeFromCart    = removeFromCart;
window.goToCheckout      = goToCheckout;
window.placeOrder        = placeOrder;
window.selectPayMethod   = selectPayMethod;
window.applyCoupon       = applyCoupon;
window.loadMoreProducts  = loadMoreProducts;
window.onSearch          = onSearch;
window.onPriceRange      = onPriceRange;
window.onRatingFilter    = onRatingFilter;
window.onSortChange      = onSortChange;
window.toggleTheme       = toggleTheme;
window.toggleSound       = toggleSound;
