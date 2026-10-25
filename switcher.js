/* Список макетов и переключатель между ними.
   Подключён на странице каждого макета: слева внизу кнопка «Макеты». Главная страница берёт список отсюда же. */
(() => {
  'use strict';
  const PR = 'https://github.com/somon101/hostel/pull/';
  /* новые макеты сверху; чтобы добавить макет, положите его в versions/<id>/index.html и допишите строку сюда */
  const MOCKUPS = [
    { id: 'v8', title: 'Тёплый, скруглённый, спокойный', tag: 'Главный макет', pr: 6,
      desc: 'Собран по вашим 20 ответам. Светлый кремовый фон, терракотовые кнопки, сильно скруглённые карточки, фото на весь экран, плавающее меню, переключатели темы и языка (RU и EN).' },
    { id: 'v7', title: 'Мягкая бумага и жёлтая полоса', tag: 'Черновик, не слит', pr: null,
      desc: 'Редизайн по навыку Hallmark: бумажная фактура, жирный округлый шрифт, жёлтая полоса быстрого бронирования и тёмный блок контактов.' },
    { id: 'v6', title: 'Стекло, синий и золото', tag: '', pr: 4,
      desc: 'Название «Минутка». Стиль Liquid Glass по дизайн-системе навыка ui-ux-pro-max: полупрозрачные панели, шрифт Playfair Display SC, синий с золотом.' },
    { id: 'v5', title: 'Яркий и скруглённый', tag: '', pr: 4,
      desc: 'Светлый и весёлый: пастельные цветные плитки, плавающее меню, арки на фото, бегущая лента, шрифт Unbounded.' },
    { id: 'v4', title: 'Тёмный журнальный', tag: '', pr: 4,
      desc: 'Тёмный фон, золотой акцент, огромный заголовок и меню с логотипом по центру. Вы назвали его скучным и квадратным.' },
    { id: 'v3', title: 'Синий и золото с вопросами', tag: '', pr: 3,
      desc: 'Тот же светлый макет плюс полоса с цифрами и раздел «Вопросы и ответы».' },
    { id: 'v2', title: 'Синий и золото, светлый', tag: '', pr: 2,
      desc: 'Первый редизайн: шрифты Cormorant и Inter, панель быстрого бронирования под главным экраном, карточки номеров.' },
    { id: 'v1', title: 'Исходный сайт «Эталон»', tag: 'Самая первая версия', pr: null,
      desc: 'Зелёный и золотой, как было в самом начале, до всех изменений.' },
  ].map((m) => ({ ...m, prUrl: m.pr ? PR + m.pr : null, num: Number(m.id.slice(1)) }));
  window.MOCKUPS = MOCKUPS;

  const me = document.currentScript;
  const id = me && me.dataset.id;
  if (!id) return; // главная страница только читает список
  const root = me.getAttribute('src').replace(/switcher\.js.*$/, '');
  const href = (m) => `${root}versions/${m.id}/index.html`;
  const idx = MOCKUPS.findIndex((m) => m.id === id);

  const host = document.createElement('div');
  host.id = 'mockup-switcher';
  const sh = host.attachShadow({ mode: 'open' });
  sh.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
      .wrap { position: fixed; left: 16px; bottom: 16px; z-index: 2147483000; color: #fff; }
      button, a { font: inherit; color: inherit; }
      .fab { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px 0 14px; border: 1px solid rgb(255 255 255 / .25); border-radius: 999px; background: #1f1712; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgb(0 0 0 / .35); }
      .fab:hover { background: #33261c; }
      .fab:focus-visible, a:focus-visible, .step:focus-visible { outline: 3px solid #f0b552; outline-offset: 2px; }
      .fab small { font-weight: 600; opacity: .75; font-size: 12px; }
      .panel { position: absolute; left: 0; bottom: 54px; width: min(340px, calc(100vw - 32px)); max-height: min(70vh, 520px); overflow: auto; padding: 8px; border-radius: 22px; background: #1f1712; border: 1px solid rgb(255 255 255 / .18); box-shadow: 0 24px 60px rgb(0 0 0 / .45); display: none; }
      .panel.open { display: block; }
      .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 8px 10px; }
      .head a { font-size: 13px; font-weight: 700; color: #f0b552; text-decoration: none; }
      .steps { display: flex; gap: 6px; }
      .step { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid rgb(255 255 255 / .25); border-radius: 50%; background: transparent; cursor: pointer; font-size: 16px; text-decoration: none; }
      .step[aria-disabled="true"] { opacity: .3; pointer-events: none; }
      .item { display: grid; grid-template-columns: 34px 1fr; gap: 10px; align-items: center; padding: 10px; border-radius: 16px; text-decoration: none; }
      .item:hover { background: rgb(255 255 255 / .09); }
      .item[aria-current="page"] { background: rgb(240 181 82 / .18); }
      .n { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: rgb(255 255 255 / .14); font-weight: 800; font-size: 13px; }
      .t { font-weight: 700; font-size: 14px; line-height: 1.25; }
      .s { font-size: 12px; opacity: .7; margin-top: 2px; }
      @media (max-width: 768px) { .wrap { bottom: 84px; } }
      @media print { .wrap { display: none; } }
    </style>
    <div class="wrap">
      <div class="panel" id="panel" role="region" aria-label="Макеты"></div>
      <button class="fab" id="fab" type="button" aria-expanded="false" aria-controls="panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
        <span>Макеты</span><small>${idx + 1 > 0 ? MOCKUPS[idx].num + ' из ' + MOCKUPS.length : ''}</small>
      </button>
    </div>`;
  const panel = sh.getElementById('panel'); const fab = sh.getElementById('fab');
  const newer = MOCKUPS[idx - 1]; const older = MOCKUPS[idx + 1];
  const step = (m, label, ch) => (m ? `<a class="step" href="${href(m)}" aria-label="${label}: ${m.title}">${ch}</a>` : `<span class="step" aria-disabled="true" aria-label="${label}">${ch}</span>`);
  panel.innerHTML = `<div class="head"><a href="${root}index.html">Все макеты</a><div class="steps">${step(older, 'Предыдущий', '‹')}${step(newer, 'Следующий', '›')}</div></div>` +
    MOCKUPS.map((m) => `<a class="item" href="${href(m)}"${m.id === id ? ' aria-current="page"' : ''}><span class="n">${m.num}</span><span><div class="t">${m.title}</div><div class="s">${m.tag || (m.pr ? 'Pull request №' + m.pr : '')}</div></span></a>`).join('');
  const set = (open) => { panel.classList.toggle('open', open); fab.setAttribute('aria-expanded', String(open)); };
  fab.addEventListener('click', () => set(!panel.classList.contains('open')));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  addEventListener('click', (e) => { if (!e.composedPath().includes(host)) set(false); });
  document.body.append(host);
})();
