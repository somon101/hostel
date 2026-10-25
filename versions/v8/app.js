/* Минутка: theme, language, navigation, reveal, booking dialog. Everything degrades to the plain page without this script. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };
  root.classList.add('js');

  /* ---------- texts: Russian lives in the HTML, English here, Chechen is waiting for its translation ---------- */
  const T = {
    ru: {
      nights: (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'ночь' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'ночи' : 'ночей'}`,
      total: 'Итого', perNightLine: (p) => `${p} за ночь`,
      pickDates: 'Выберите даты, и мы посчитаем стоимость.', badDates: 'Дата выезда должна быть позже даты заезда.',
      notSent: 'Заявка не отправлена: форма пока не подключена. Позвоните в отель.',
      loc: 'ru-RU', guests: ['гость', 'гостя', 'гостей'],
    },
    en: {
      nights: (n) => `${n} ${n === 1 ? 'night' : 'nights'}`,
      total: 'Total', perNightLine: (p) => `${p} per night`,
      pickDates: 'Choose your dates and we will work out the price.', badDates: 'Check-out must be after check-in.',
      notSent: 'The request was not sent: the form is not connected yet. Please call the hotel.',
      loc: 'en-GB',
      'meta.title': 'Minutka, a hotel in Grozny', skip: 'Skip to content', brand: 'Minutka', 'brand.home': 'Minutka, home', 'nav.label': 'Sections',
      'nav.rooms': 'Rooms', 'nav.services': 'Services', 'nav.about': 'About', 'nav.gallery': 'Gallery', 'nav.faq': 'FAQ', 'nav.contacts': 'Contacts',
      'lang.label': 'Language', 'theme.toggle': 'Switch theme', book: 'Book now', menu: 'Menu', close: 'Close', call: 'Call',
      'hero.alt': 'A spacious room with warm light and a large bed', 'hero.title': 'Welcome to Minutka',
      'hero.lead': 'Warm light, a calm atmosphere and comfort you can feel in every detail.', 'hero.rooms': 'Rooms and suites',
      'hero.facts': 'At a glance', 'hero.f1': '10 rooms', 'hero.f2': 'Front desk 24/7', 'hero.f3': 'Wi‑Fi throughout',
      'rooms.title': 'Choose a room', 'rooms.lead': 'Find the right option for your stay.', perNight: 'per night',
      'rooms.note': 'Prices are shown for demonstration. The administrator will confirm the exact price and availability for your dates.',
      'r.standard.alt': 'Standard room: a bed by the window with curtains', 'r.standard.kind': 'A cosy room', 'r.standard.name': 'Standard', 'r.standard.desc': 'A cosy room for a comfortable stay.', 'r.standard.cap': 'up to 2 guests', 'r.standard.beds': '1 double bed',
      'r.comfort.alt': 'Comfort room: a bright room with a large window', 'r.comfort.kind': 'More space', 'r.comfort.name': 'Comfort', 'r.comfort.desc': 'More space and convenience for a couple or a family.', 'r.comfort.cap': 'up to 3 guests', 'r.comfort.beds': '1 double bed + sofa',
      'r.deluxe.alt': 'Deluxe room: warm light, a bed and an armchair', 'r.deluxe.kind': 'A special stay', 'r.deluxe.name': 'Deluxe', 'r.deluxe.desc': 'A spacious room with a separate lounge area.', 'r.deluxe.cap': 'up to 4 guests', 'r.deluxe.beds': '1 double bed + sofa',
      'r.lux.alt': 'Suite: a bedroom with a large bed and tall windows', 'r.lux.kind': 'Maximum comfort', 'r.lux.name': 'Suite', 'r.lux.desc': 'A spacious suite for a long or special stay.', 'r.lux.cap': 'up to 4 guests', 'r.lux.beds': 'Bedroom and living room',
      'svc.title': 'Pleasant details', 'svc.lead': 'Care for guests, comfortable rooms and attention to small things, so you can simply rest.',
      'svc.wifi.t': 'Fast Wi‑Fi', 'svc.wifi.d': 'Stay connected and work in comfort.', 'svc.desk.t': 'Front desk 24/7', 'svc.desk.d': 'We help with check-in, taxis and any question, at any time.',
      'svc.loc.t': 'Handy location', 'svc.loc.d': 'The hotel is in the city, close to its infrastructure.', 'svc.bf.t': 'Breakfast', 'svc.bf.d': 'A slow morning and a tasty breakfast on request.',
      'about.alt': 'The hotel facade in the evening with warm glowing windows', 'about.title': 'Hospitality in the details',
      'about.p1': 'Minutka is a small city hotel for those who value calm, personal space and a warm welcome. It is easy to recover after a busy day here and to feel the rhythm of Grozny.',
      'about.p2': 'Just <strong>ten rooms</strong>, to keep the atmosphere intimate and give every guest attention.',
      'about.c1': 'Cosy rooms', 'about.c2': 'Care 24/7', 'about.c3': 'Wi‑Fi throughout', 'about.c4': 'Handy location', 'about.link': 'About the services',
      'gal.title': 'Photo gallery', 'gal.lead': 'A few shots of the hotel rooms.',
      g1: 'A room with a red headboard and a crystal chandelier', g2: 'A bed and a bathroom behind a glass partition', g3: 'A bed by the window, brown curtains and a floor lamp', g4: 'A room with concrete walls, wood and green accents', g5: 'A room with a desk and dark finishes',
      'faq.title': 'The short answers', 'faq.lead': 'Cannot find an answer? Call us or leave a request and the administrator will help.',
      'faq.q1': 'How do I book a room?', 'faq.a1': 'Press “Book now”, choose your dates and room category, and leave your name and phone. The administrator will contact you and confirm availability.',
      'faq.q2': 'How many rooms does the hotel have?', 'faq.a2': 'Ten rooms in four categories: Standard, Comfort, Deluxe and Suite. The small size lets us give every guest attention.',
      'faq.q3': 'Is the front desk open around the clock?', 'faq.a3': 'Yes, the front desk works 24/7: we help with check-in, taxis and any question, at any time.',
      'faq.q4': 'Are breakfast and Wi‑Fi available?', 'faq.a4': 'Wi‑Fi is available throughout the hotel. Breakfast is arranged on request.',
      'faq.q5': 'Are the prices and availability on the site final?', 'faq.a5': 'The site is a demonstration for now: prices and details are examples. The administrator confirms the exact price and availability for your dates.',
      'ct.title': 'Easy to reach, easy to stay', 'ct.lead': 'We will gladly help plan your arrival. Call or write to us and we will answer your questions about staying.',
      'ct.addr': 'Address', 'ct.addrv': 'Grozny, Vakhi Aliev street, 45', 'ct.phone': 'Phone', 'ct.demo': 'The number and address are for demonstration', 'ct.desk': 'Front desk', 'ct.deskv': 'Around the clock', 'ct.map': 'Map of Grozny', 'ct.maplink': 'Show on the map',
      'cf.title': 'Write to us', 'cf.lead': 'Leave your name and phone and the administrator will call you back.', 'cf.send': 'Send',
      'f.name': 'Your name', 'f.phone': 'Phone', 'f.msg': 'Message', 'f.in': 'Check-in', 'f.out': 'Check-out', 'f.guests': 'Guests', 'f.room': 'Room category',
      'f.demo': 'The form is not connected yet: requests are not sent. Please call the hotel.',
      'foot.note': '© 2026 Minutka hotel. A demonstration site: prices and contacts are examples.',
      'bk.title': 'Booking request', 'bk.lead': 'Leave your contacts, and the administrator will get in touch and confirm availability.', 'bk.send': 'Send request',
    },
    ce: {}, // add the Chechen texts here, same keys as English; the НО switch appears as soon as this has entries
  };

  let lang = 'ru';
  const priceFmt = () => new Intl.NumberFormat((T[lang] && T[lang].loc) || T.ru.loc);
  const tr = (key) => (T[lang] && T[lang][key] !== undefined ? T[lang][key] : T.ru[key]);

  /* remember the Russian original of every translatable node */
  $$('[data-i18n]').forEach((el) => { el.dataset.ru = el.textContent; });
  $$('[data-i18n-html]').forEach((el) => { el.dataset.ru = el.innerHTML; });
  $$('[data-i18n-attr]').forEach((el) => {
    el.dataset.ruAttrs = JSON.stringify(Object.fromEntries(el.dataset.i18nAttr.split(';').map((p) => { const [a, k] = p.split(':'); return [a, el.getAttribute(a)]; })));
  });
  const titleRu = document.title;

  function applyLang(next) {
    lang = next;
    root.lang = next === 'ce' ? 'ce' : next;
    const d = T[next] || {};
    $$('[data-i18n]').forEach((el) => { el.textContent = next === 'ru' || d[el.dataset.i18n] === undefined ? el.dataset.ru : d[el.dataset.i18n]; });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = next === 'ru' || d[el.dataset.i18nHtml] === undefined ? el.dataset.ru : d[el.dataset.i18nHtml]; });
    $$('[data-i18n-attr]').forEach((el) => {
      const orig = JSON.parse(el.dataset.ruAttrs);
      el.dataset.i18nAttr.split(';').forEach((p) => { const [a, k] = p.split(':'); el.setAttribute(a, next === 'ru' || d[k] === undefined ? orig[a] : d[k]); });
    });
    document.title = next === 'ru' || d['meta.title'] === undefined ? titleRu : d['meta.title'];
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    $$('[data-price-view]').forEach((el) => { el.textContent = `${priceFmt().format(Number(el.closest('[data-price]').dataset.price))} ₽`; });
    buildRoomOptions();
    renderSummary();
    store.set('lang', next);
  }
  $$('.lang button').forEach((b) => {
    if (b.dataset.lang === 'ce' && Object.keys(T.ce).length) b.hidden = false;
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });

  /* ---------- theme ---------- */
  const themeBtn = $('#themeToggle');
  const metaTheme = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.dataset.theme = t;
    if (metaTheme) metaTheme.content = t === 'dark' ? '#1b1410' : '#fff8ee';
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  themeBtn.addEventListener('click', () => { const t = root.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(t); store.set('theme', t); });

  /* ---------- navigation ---------- */
  const nav = $('#nav'); const burger = $('#burger'); const sheet = $('#navSheet');
  const onScroll = () => {
    nav.classList.toggle('is-solid', scrollY > 40);
    if (!reduce) { const bg = $('#heroBg'); if (bg && scrollY < innerHeight * 1.2) bg.style.setProperty('--py', String(Math.round(scrollY * 0.22))); }
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  onScroll();
  const closeSheet = () => { sheet.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => { const open = sheet.classList.toggle('is-open'); burger.setAttribute('aria-expanded', String(open)); });
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) closeSheet(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

  /* ---------- reveal on scroll ---------- */
  const items = $$('[data-reveal]');
  items.forEach((el) => { const sibs = $$('[data-reveal]', el.parentElement).filter((s) => s.parentElement === el.parentElement); el.style.setProperty('--i', String(Math.min(sibs.indexOf(el), 5))); });
  if (reduce || !('IntersectionObserver' in window)) items.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- toast ---------- */
  const toast = $('#toast'); let toastTimer;
  const say = (msg) => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 5200); };

  /* ---------- booking dialog ---------- */
  const dlg = $('#bookDialog'); const roomSel = $('#bkRoom'); const inEl = $('#bkIn'); const outEl = $('#bkOut'); const sum = $('#bkSummary');
  const rooms = $$('.room').map((r) => ({ id: r.dataset.room, price: Number(r.dataset.price), nameKey: `r.${r.dataset.room}.name`, nameEl: $('h3', r) }));
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  inEl.min = outEl.min = iso(today);

  function buildRoomOptions() {
    const keep = roomSel.value;
    roomSel.innerHTML = '';
    rooms.forEach((r) => { const o = document.createElement('option'); o.value = r.id; o.textContent = `${r.nameEl.textContent}, ${priceFmt().format(r.price)} ₽`; roomSel.append(o); });
    if (keep) roomSel.value = keep;
  }
  function renderSummary() {
    const r = rooms.find((x) => x.id === roomSel.value);
    outEl.setCustomValidity('');
    if (!r || !inEl.value || !outEl.value) { sum.innerHTML = ''; const p = document.createElement('small'); p.textContent = tr('pickDates'); sum.append(p); return; }
    const n = Math.round((new Date(`${outEl.value}T00:00:00`) - new Date(`${inEl.value}T00:00:00`)) / 86400000);
    if (n < 1) { outEl.setCustomValidity(tr('badDates')); sum.innerHTML = ''; const p = document.createElement('small'); p.textContent = tr('badDates'); sum.append(p); return; }
    sum.innerHTML = '';
    const row = document.createElement('div');
    const a = document.createElement('span'); a.textContent = `${tr('total')}, ${tr('nights')(n)}`;
    const b = document.createElement('strong'); b.textContent = `${priceFmt().format(r.price * n)} ₽`;
    row.append(a, b);
    const s = document.createElement('small'); s.textContent = tr('perNightLine')(`${priceFmt().format(r.price)} ₽`);
    sum.append(row, s);
  }
  [roomSel, inEl, outEl].forEach((el) => el.addEventListener('change', renderSummary));
  inEl.addEventListener('change', () => { if (inEl.value) { outEl.min = inEl.value; if (outEl.value && outEl.value <= inEl.value) outEl.value = ''; } renderSummary(); });

  function openBook(roomId) {
    if (roomId) roomSel.value = roomId;
    renderSummary();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    closeSheet();
  }
  $$('[data-book]').forEach((b) => b.addEventListener('click', () => openBook(b.dataset.roomPick)));
  $('#bookClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  /* no request exists behind either form yet, so none of them pretends to send */
  $('#bookForm').addEventListener('submit', (e) => { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; dlg.close(); say(tr('notSent')); });
  $('#contactForm').addEventListener('submit', (e) => { e.preventDefault(); say(tr('notSent')); });

  /* ---------- start ---------- */
  buildRoomOptions();
  renderSummary();
  const saved = store.get('lang');
  if (saved && saved !== 'ru' && T[saved] && Object.keys(T[saved]).length) applyLang(saved);
  else $$('[data-price-view]').forEach((el) => { el.textContent = `${priceFmt().format(Number(el.closest('[data-price]').dataset.price))} ₽`; });
})();
