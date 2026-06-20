# 🛍️ Dopamine Shop

> **Shopping therapy senza spendere un centesimo.**  
> Sfoglia, aggiungi al carrello, completa il checkout e traccia la spedizione — tutto simulato, tutta soddisfazione.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-6C3BFF?style=flat-square)](https://pages.github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Funzionalità

### 🛒 Shopping Experience
- **120+ prodotti fittizi** generati automaticamente in 10 categorie
- **Immagini reali** da Picsum Photos (lazy loaded)
- **Prezzi casuali** con sconti e offerte
- **Filtri avanzati**: categoria, prezzo massimo, valutazione minima, ordinamento
- **Ricerca live** con debounce

### 📦 Carrello & Checkout
- Aggiunta/rimozione prodotti con aggiornamento in tempo reale
- Salvataggio nel `localStorage` (persiste al refresh)
- Checkout simulato con form indirizzo
- 4 metodi di pagamento fittizi
- Codici coupon segreti (prova `DOPAMINA`, `VIP20`, `SHOP2024`)
- **Animazione di conferma ordine** con confetti

### 🚚 Tracking Spedizione
- Timeline con 6 fasi: Ricevuto → Preparazione → Spedito → Transito → Consegna → Consegnato
- Avanzamento automatico in tempo reale
- Persiste tra i refresh tramite `localStorage`
- Aggiornamento auto ogni 5-10 secondi

### 🧠 Sistema Dopamina (Gamification)
- **10 livelli** con nomi progressivi (Neofita → Dopamine God)
- **XP** guadagnato per ogni azione (visualizzazione, carrello, ordine, wishlist...)
- **10 badge** sbloccabili
- **Statistiche dettagliate**: prodotti visti, carrelli, ordini, wishlist
- Barra progresso XP animata

### 🎁 Wishlist
- Salvataggio preferiti con cuore ❤️
- Aggiunta massiva al carrello
- Persistenza `localStorage`

### 🎨 UX & Design
- **Dark mode / Light mode** con salvataggio preferenza
- **Notifiche toast** animate (prodotto aggiunto, badge sbloccato, ecc.)
- **Confetti** ad ogni ordine completato
- **Suoni opzionali** (Web Audio API, attivabili/disattivabili)
- **Mobile-first**, navigazione bottom bar su mobile
- Hover micro-animations sulle card

---

## 🚀 Deploy su GitHub Pages

### Metodo 1: Fork diretto
1. Fai **Fork** di questo repository
2. Vai su **Settings → Pages**
3. Seleziona **Source: Deploy from a branch**
4. Branch: `main` / Folder: `/ (root)`
5. Click **Save**
6. Aspetta 1-2 minuti e il sito è live su `https://<username>.github.io/dopamine-shop/`

### Metodo 2: Upload manuale
```bash
# Clona il tuo repo vuoto
git clone https://github.com/<tuousername>/<tuorepo>.git
cd <tuorepo>

# Copia i file del progetto nella cartella
cp -r /path/to/dopamine-shop/* .

# Commit e push
git add .
git commit -m "🛍️ Initial commit: Dopamine Shop"
git push origin main
```
Poi abilita GitHub Pages come sopra.

### Metodo 3: GitHub CLI
```bash
gh repo create dopamine-shop --public --clone
cd dopamine-shop
# copia i file
git add . && git commit -m "🛍️ Launch" && git push
gh api -X PUT "repos/<username>/dopamine-shop/pages" \
  -f source.branch=main -f source.path=/
```

---

## 📁 Struttura del progetto

```
dopamine-shop/
│
├── index.html          # App SPA completa (layout, pagine, modal)
├── css/
│   └── style.css       # Design system, componenti, responsive
├── js/
│   ├── data.js         # Generazione prodotti, stato, XP, badge
│   ├── ui.js           # Rendering UI, carrello, wishlist, tracking
│   └── app.js          # Init, effetti, confetti, toast, suoni, tema
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Direttive crawler
└── README.md           # Questo file
```

---

## 🎮 Come si usa

| Azione | Effetto |
|--------|---------|
| Clicca su un prodotto | Apre il modal dettaglio (+1 XP) |
| 🤍 sulle card | Aggiunge/rimuove dalla wishlist (+2 XP) |
| Aggiungi al carrello | Salva nel carrello (+5 XP) |
| Completa il checkout | Crea ordine simulato (+50 XP + confetti) |
| Traccia l'ordine | Vedi la spedizione avanzare in tempo reale |
| Usa un coupon | Prova `DOPAMINA` (+10 XP) |
| Raggiungi un livello | Toast di celebrazione |
| Sblocca un badge | Notifica speciale |

---

## 🔐 Coupon segreti

| Codice | Sconto |
|--------|--------|
| `DOPAMINA` | -10% |
| `SHOP2024` | -15% |
| `FREEDAY`  | -5%  |
| `VIP20`    | -20% |

> 💡 Gli sconti sono puramente estetici, nessun pagamento reale avviene.

---

## 🛠️ Sviluppo locale

Non richiede nessun build step, server o installazione:

```bash
# Opzione 1: apri direttamente
open index.html

# Opzione 2: server locale minimale (Python)
python3 -m http.server 8080
# poi vai su http://localhost:8080

# Opzione 3: server locale (Node.js)
npx serve .
```

---

## 🧩 Personalizzazione

### Aggiungere prodotti
Modifica `PRODUCT_NAMES` in `js/data.js` aggiungendo nomi per ogni categoria.

### Aggiungere categorie
Aggiungi un oggetto a `CATEGORIES` in `js/data.js` con `id`, `name`, `icon` e `query`.

### Cambiare la palette
Modifica i custom properties in `css/style.css`:
```css
:root {
  --accent-main: #6C3BFF; /* viola principale */
  --accent-lime: #C8FF00; /* lime accento */
}
```

### Aggiungere badge
Aggiungi un oggetto a `BADGES` in `js/data.js` con `id`, `emoji`, `name`, `desc` e una funzione `check`.

---

## 📊 Performance

- **Nessuna dipendenza esterna** (solo Google Fonts)
- **Immagini lazy loaded** (IntersectionObserver nativo)
- **Debounce ricerca** (300ms)
- **LocalStorage** per persistenza senza backend
- **Canvas confetti** ottimizzato con requestAnimationFrame

---

## 🌐 SEO

Il progetto include:
- Meta tag completi (description, keywords, author)
- Open Graph per social sharing
- Twitter Card
- `sitemap.xml` per i crawler
- `robots.txt`
- HTML semantico con landmark roles
- Attributi `aria-*` per accessibilità

---

## 📝 Licenza

MIT © 2024 Dopamine Shop — Usa, modifica, condividi liberamente.

---

> *"Il segreto della felicità? Shopping senza conto in banca."* 🛍️✨
