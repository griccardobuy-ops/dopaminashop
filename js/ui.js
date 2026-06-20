/* =========================================
   DOPAMINE SHOP — UI Rendering
   ========================================= */

'use strict';

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
