(() => {
  const entities = [
    { sym: 'ETH', name: 'Ethereum', type: 'CRYPTO', exch: 'Binance' },
    { sym: 'BTC', name: 'Bitcoin', type: 'CRYPTO', exch: 'Binance' },
    { sym: 'MARA', name: 'Marathon Digital Holdings, Inc.', type: 'STOCK', exch: 'NASDAQ' },
    { sym: 'NVDA', name: 'NVIDIA Corporation', type: 'STOCK', exch: 'NASDAQ' },
    { sym: 'AMZN', name: 'Amazon.com, Inc.', type: 'STOCK', exch: 'NASDAQ' },
    { sym: 'AC', name: 'Associated Capital Group, Inc.', type: 'STOCK', exch: 'NYSE' },
    { sym: 'META', name: 'Meta Platforms, Inc.', type: 'STOCK', exch: 'NASDAQ' },
    { sym: 'ARB', name: 'Arbitrum', type: 'CRYPTO', exch: 'Binance' },
    { sym: 'TSM', name: 'Taiwan Semiconductor Company Limited', type: 'STOCK', exch: 'NYSE' },
    { sym: 'AVAX', name: 'Avalanche', type: 'CRYPTO', exch: 'Binance' }
  ];
  function renderEntities(listEl, filter = '') {
    if (!listEl) return;
    const q = (filter || '').trim().toLowerCase();
    const data = entities.filter(e => !q || e.sym.toLowerCase().includes(q) || e.name.toLowerCase().includes(q));
    listEl.innerHTML = data.map(e => `
      <div class="entity-row"><div class="sym">${e.sym}</div><div class="name">${e.name}</div><div class="type">${e.type}</div><div class="exch">${e.exch}</div></div>
    `).join('');
  }
  const tpl = (active) => `
    <div class="side-brand">
      <div class="logo"></div>
      <div class="name">ALVA</div>
      <button id="sidebarToggle" class="collapse-btn" aria-label="Collapse Navigation">«</button>
    </div>
    <div class="icon-rail">
      <a class="rail-btn" href="index.html" title="Home" aria-label="Home">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"/></svg>
      </a>
      <a class="rail-btn" href="explore.html" title="Explore" aria-label="Explore">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-8 0c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zm0 2c-2.761 0-5 1.79-5 4v2h10v-2c0-2.21-2.239-4-5-4zm8 0c-.738 0-1.429.131-2.061.362A5.97 5.97 0 0119 17v2h5v-2c0-2.21-2.239-4-5-4z"/></svg>
      </a>
      <a class="rail-btn" href="#search" title="Search" aria-label="Search">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>
      </a>
      <a class="rail-btn" href="playbook_strategy.html" title="Starred" aria-label="Starred">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </a>
      <a class="rail-btn" href="playbook_strategy.html" title="Playbooks" aria-label="Playbooks">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V2zm-2 14H8v-2h8v2zm0-4H8V8h8v4z"/></svg>
      </a>
      <a class="rail-btn" href="#threads-more" title="Threads" aria-label="Threads">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4h16v10H5.17L4 15.17V4zm0 12h12v4H4v-4z"/></svg>
      </a>
    </div>
    <nav>
      <div class="nav-new-chat">
        <button id="newChatBtn" class="new-chat-btn" aria-label="New Playbook">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 5v14m-7-7h14" stroke="#374151" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
          New Playbook
        </button>
      </div>
      <div class="nav-top">
        <ul>
          <li><a class="${active==='home'?'active':''}" href="index.html">Home</a></li>
          <li><a class="${active==='explore'?'active':''}" href="explore.html">Explore</a></li>
          <li><a href="#search">Search</a></li>
        </ul>
      </div>
      <div class="nav-scroll">
        <div class="section with-divider">
          <div class="section-title">Starred</div>
          <ul>
            <li><a href="playbook_dashboard.html">Dashboard-Playbook A<span class="dot" aria-label="更新"></span></a></li>
            <li><a href="playbook_strategy.html">Strategy-Playbook B</a></li>
            <li><a href="playbook_strategy.html">Research-Playbook C</a></li>
            <li><a class="more" href="#starred-more">··· More</a></li>
          </ul>
        </div>
        <div class="section with-divider">
          <div class="section-title section-title-row"><span>Playbooks</span></div>
          <ul>
            <li><a href="playbook_dashboard.html">Dashboard-Playbook A</a></li>
            <li><a href="playbook_strategy.html">Strategy-Playbook B<span class="dot" aria-label="更新"></span></a></li>
            <li><a href="playbook_strategy.html">Research-Playbook C</a></li>
            <li><a class="more" href="#library-playbooks-more">··· More</a></li>
          </ul>
        </div>
        <div class="section with-divider">
          <div class="section-title section-title-row"><span>Threads</span></div>
          <ul>
            <li><a href="#threads-a">Thread A</a></li>
            <li><a href="#threads-b">Thread B</a></li>
            <li><a href="#threads-c">Thread C</a></li>
            <li><a class="more" href="#threads-more">··· More</a></li>
          </ul>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="me-icons">
          <button class="icon-btn" title="Profile" aria-label="Profile">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"/></svg>
          </button>
          <button class="icon-btn" title="Settings" aria-label="Settings">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.14 12.936a7.997 7.997 0 0 0 .06-1.936 7.997 7.997 0 0 0-.06-1.936l2.037-1.585a.5.5 0 0 0 .12-.643l-1.93-3.343a.5.5 0 0 0-.6-.219l-2.4.967a7.992 7.992 0 0 0-3.35-1.936l-.36-2.54A.5.5 0 0 0 12.197 0h-3.394a.5.5 0 0 0-.497.431l-.36 2.54a7.992 7.992 0 0 0-3.35 1.936l-2.4-.967a.5.5 0 0 0-.6.219L-.333 7.003a.5.5 0 0 0 .12.643l2.037 1.585a7.997 7.997 0 0 0-.06 1.936c0 .66.07 1.296.06 1.936l-2.037 1.585a.5.5 0 0 0-.12.643l1.93 3.343a.5.5 0 0 0 .6.219l2.4-.967a7.992 7.992 0 0 0 3.35 1.936l.36 2.54a.5.5 0 0 0 .497.431h3.394a.5.5 0 0 0 .497-.431l.36-2.54a7.992 7.992 0 0 0 3.35-1.936l2.4.967a.5.5 0 0 0 .6-.219l1.93-3.343a.5.5 0 0 0-.12-.643l-2.037-1.585ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>
          </button>
        </div>
      </div>
    </nav>
  `;
  function detectActive() {
    const p = location.pathname.split('/').pop() || 'index.html';
    if (p === '' || p === 'index.html') return 'home';
    if (p === 'explore.html') return 'explore';
    return '';
  }
  function applyCollapsedFromStorage() {
    try {
      const v = localStorage.getItem('alva_nav_collapsed');
      const collapsed = v === '1';
      document.body.classList.toggle('sidebar-collapsed', collapsed);
      const btn = document.getElementById('sidebarToggle');
      if (btn) btn.textContent = collapsed ? '»' : '«';
    } catch {}
  }
  function bindToggle() {
    const btn = document.getElementById('sidebarToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const collapsed = document.body.classList.toggle('sidebar-collapsed');
      btn.textContent = collapsed ? '»' : '«';
      try { localStorage.setItem('alva_nav_collapsed', collapsed ? '1' : '0'); } catch {}
    });
  }
  function bindSearch() {
    const links = document.querySelectorAll('a[href="#search"]');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const listEl = document.getElementById('entityList');
    const closeBtn = document.getElementById('searchClose');
    if (!links.length || !overlay) return;
    const open = () => {
      overlay.classList.add('open');
      if (listEl) renderEntities(listEl, '');
      if (input) { input.value = ''; input.focus(); }
    };
    links.forEach(l => l.addEventListener('click', (e) => { e.preventDefault(); open(); }));
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
      if (e.key === 'Escape') overlay.classList.remove('open');
    });
    if (input) input.addEventListener('input', (e) => renderEntities(listEl, e.target.value));
  }
  function bindNewPlaybook() {
    const btn = document.getElementById('newChatBtn');
    if (!btn) return;
    const initialPop = document.getElementById('navPopover');
    const closeBtn = document.getElementById('popoverClose');
    if (!initialPop) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = 'playbook-new.html';
      });
      return;
    }
    const close = () => {
      const p = document.getElementById('navPopover');
      if (p) p.classList.remove('open');
    };
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const p = document.getElementById('navPopover');
      if (p) p.classList.add('open');
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('click', (e) => {
      const p = document.getElementById('navPopover');
      if (!p || !p.classList.contains('open')) return;
      const within = p.contains(e.target) || (btn && btn.contains(e.target));
      if (!within) close();
    });
  }
  function bindPopoverActions() {
    const pop = document.getElementById('navPopover');
    if (!pop) return;
    pop.querySelectorAll('.action-btn').forEach(btn => {
      if (btn.classList.contains('disabled') || btn.getAttribute('aria-disabled') === 'true') return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const act = btn.getAttribute('data-act');
        pop.classList.remove('open');
        location.href = 'playbook-new.html';
      });
    });
  }
  function init() {
    const aside = document.querySelector('aside');
    if (!aside) return;
    const active = detectActive();
    const hasNav = !!aside.querySelector('.nav-top');
    if (!hasNav) aside.innerHTML = tpl(active);
    applyCollapsedFromStorage();
    bindToggle();
    bindSearch();
    bindNewPlaybook();
    bindPopoverActions();
  }
  window.AlvaNav = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
