/* Parchment — Shared utilities */

function renderNav(active) {
  const tools = [
    {href:'merge.html', id:'merge', label:'Merge'},
    {href:'split.html', id:'split', label:'Split'},
    {href:'image-to-pdf.html', id:'image-to-pdf', label:'Image to PDF'},
    {href:'pdf-to-image.html', id:'pdf-to-image', label:'PDF to Image'},
    {href:'compress.html', id:'compress', label:'Compress'},
    {href:'reorder.html', id:'reorder', label:'Reorder'},
    {href:'unlock.html', id:'unlock', label:'Unlock'},
    {href:'watermark.html', id:'watermark', label:'Watermark'},
    {href:'page-numbers.html', id:'page-numbers', label:'Page #'},
    {href:'extract.html', id:'extract', label:'Extract'},
    {href:'sign.html', id:'sign', label:'Sign'},
    {href:'flatten.html', id:'flatten', label:'Flatten'},
    {href:'pdf-to-text.html', id:'pdf-to-text', label:'PDF to Text'},
    {href:'protect.html', id:'protect', label:'Protect'},
    {href:'rotate.html', id:'rotate', label:'Rotate'},
  ];
  const VISIBLE = 8;
  const visibleTools = tools.slice(0, VISIBLE);
  const moreTools = tools.slice(VISIBLE);
  const activeStyle = 'color:var(--accent);font-weight:700';
  const link = (t) => `<a href="${t.href}"${active===t.id?` style="${activeStyle}"`:''}>${t.label}</a>`;
  const hasActiveInMore = moreTools.some(t => t.id === active);

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `<div class="nav-inner">
    <a href="index.html" class="nav-logo">📄 <span>Parchment</span></a>
    <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    <div class="nav-links">
      ${visibleTools.map(link).join('\n      ')}
      <div class="nav-more${hasActiveInMore?' has-active':''}">
        <button class="nav-more-btn" aria-expanded="false">More &#9662;</button>
        <div class="nav-more-dropdown">
          ${moreTools.map(link).join('\n          ')}
        </div>
      </div>
      <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" class="nav-bmc">☕ Buy me a coffee</a>
    </div>
  </div>`;
  document.body.prepend(nav);

  /* Desktop More dropdown */
  const moreEl = nav.querySelector('.nav-more');
  const moreBtn = nav.querySelector('.nav-more-btn');
  if (moreBtn) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = moreEl.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', () => {
      moreEl.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
    });
  }

  /* Mobile nav — full-screen categorized takeover */
  const categories = [
    { title: '📑 Organize', items: [
      {href:'merge.html', id:'merge', icon:'📑', label:'Merge'},
      {href:'split.html', id:'split', icon:'✂️', label:'Split'},
      {href:'extract.html', id:'extract', icon:'📄', label:'Extract'},
      {href:'reorder.html', id:'reorder', icon:'🔀', label:'Reorder'},
      {href:'rotate.html', id:'rotate', icon:'🔄', label:'Rotate'},
    ]},
    { title: '🔄 Convert', items: [
      {href:'image-to-pdf.html', id:'image-to-pdf', icon:'🖼️', label:'Image to PDF'},
      {href:'pdf-to-image.html', id:'pdf-to-image', icon:'📷', label:'PDF to Image'},
      {href:'pdf-to-text.html', id:'pdf-to-text', icon:'📝', label:'PDF to Text'},
      {href:'compress.html', id:'compress', icon:'📦', label:'Compress'},
    ]},
    { title: '✏️ Edit', items: [
      {href:'sign.html', id:'sign', icon:'✍️', label:'Sign'},
      {href:'watermark.html', id:'watermark', icon:'💧', label:'Watermark'},
      {href:'page-numbers.html', id:'page-numbers', icon:'🔢', label:'Page Numbers'},
      {href:'flatten.html', id:'flatten', icon:'📋', label:'Flatten'},
    ]},
    { title: '🔐 Security', items: [
      {href:'protect.html', id:'protect', icon:'🔒', label:'Protect'},
      {href:'unlock.html', id:'unlock', icon:'🔓', label:'Unlock'},
    ]},
  ];

  const mobileItem = (t) => `<a href="${t.href}" class="mobile-nav-item${active===t.id?' active':''}"><span class="mobile-nav-item-icon">${t.icon}</span><span class="mobile-nav-item-label">${t.label}</span></a>`;

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.insertBefore(overlay, nav.nextSibling);

  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-label', 'PDF tool navigation');
  mobileNav.innerHTML = `
    <div class="mobile-nav-header">
      <a href="index.html" class="mobile-nav-logo">📄 Parchment</a>
      <button class="mobile-nav-close" aria-label="Close menu">✕</button>
    </div>
    <div class="mobile-nav-scroll">
      <a href="index.html" class="mobile-nav-home">🏠 All Tools</a>
      ${categories.map(cat => `
      <div class="mobile-nav-section">
        <div class="mobile-nav-section-title">${cat.title}</div>
        <div class="mobile-nav-grid">
          ${cat.items.map(mobileItem).join('\n          ')}
        </div>
      </div>`).join('')}
      <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" class="mobile-nav-bmc">☕ Support Parchment</a>
      <div class="mobile-nav-privacy">🔒 Your files never leave your device</div>
    </div>`;
  document.body.insertBefore(mobileNav, overlay.nextSibling);

  /* Hamburger toggle logic */
  const hamburger = nav.querySelector('.hamburger');
  let isOpen = false;

  function openMobileNav() {
    if (isOpen) return;
    isOpen = true;
    hamburger.classList.add('active');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!isOpen) return;
    isOpen = false;
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => isOpen ? closeMobileNav() : openMobileNav());
  overlay.addEventListener('click', closeMobileNav);
  mobileNav.querySelector('.mobile-nav-close').addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeMobileNav(); });
}

function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `<div style="margin-bottom:.75rem"><a href="best-pdf-editor.html" style="color:#2dd4bf;font-size:1.05rem;font-weight:600;text-decoration:none">Looking for a full PDF editor? See our honest comparison of the best PDF editors in 2026 →</a></div>
    🔒 Your files never leave your device &nbsp;·&nbsp;
    <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener">☕ Support Parchment</a> &nbsp;·&nbsp;
    Need developer tools? <a href="https://devbrew.org/" target="_blank" rel="noopener">Try DevBrew</a> &nbsp;·&nbsp;
    Edit images? <a href="https://dannycranmer.github.io/imagetoolkit/" target="_blank" rel="noopener">Try ImageToolkit</a> &nbsp;·&nbsp;
    <a href="best-pdf-editor.html">Compare PDF Editors — Best of 2026</a>
    <br><span style="font-size:.8rem;color:var(--text-muted)">Built by Hustle · Free &amp; open source · <a href="https://github.com/dannycranmer/parchment" target="_blank" rel="noopener" style="color:inherit">⭐ View on GitHub</a></span>`;
  document.body.appendChild(f);
}

/* File size formatting */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

/* Drop zone setup */
function setupDropZone(el, opts) {
  const input = el.querySelector('input[type="file"]');
  el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('dragover'); });
  el.addEventListener('dragleave', () => el.classList.remove('dragover'));
  el.addEventListener('drop', e => {
    e.preventDefault();
    el.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(f => opts.accept ? opts.accept(f) : true);
    if (files.length) opts.onFiles(files);
  });
  input.addEventListener('change', () => {
    const files = Array.from(input.files);
    if (files.length) opts.onFiles(files);
    input.value = '';
  });
}

/* Status / progress helpers */
function setStatus(el, msg, type) {
  el.textContent = msg;
  el.className = 'status-msg' + (type ? ' ' + type : '');
}

function setProgress(bar, pct) {
  bar.classList.toggle('active', pct > 0 && pct < 100);
  bar.querySelector('.fill').style.width = pct + '%';
}

/* Usage tracking */
function trackUsage() {
  const count = parseInt(localStorage.getItem('parchment_uses') || '0', 10) + 1;
  localStorage.setItem('parchment_uses', count);
  return count;
}

function getUsageCount() {
  return parseInt(localStorage.getItem('parchment_uses') || '0', 10);
}

/* Download helper */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  trackUsage();
  showPostActionNudge();
  showPostActionCTA();
}

/* Post-action donation CTA — usage-aware toast after successful PDF operation */
function showPostActionCTA() {
  /* Only show once per session */
  if (sessionStorage.getItem('parchment_cta_shown')) return;
  /* Don't show on non-tool pages */
  const path = window.location.pathname;
  if (path.includes('index') || path.includes('best-pdf-editor') || path.includes('compare')) return;

  sessionStorage.setItem('parchment_cta_shown', '1');

  const uses = getUsageCount();

  setTimeout(() => {
    const toast = document.createElement('div');
    toast.className = 'post-action-cta';

    if (uses >= 3) {
      /* Prominent toast for repeat users */
      toast.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#1e293b;color:#e2e8f0;padding:1rem 1.5rem;border-radius:12px;font-size:.95rem;box-shadow:0 8px 24px rgba(0,0,0,.3);z-index:9999;cursor:pointer;opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .3s ease;max-width:360px;border-left:3px solid #2dd4bf';
      toast.innerHTML = 'You\'ve processed ' + uses + ' files for free — help keep Parchment free <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" style="color:#2dd4bf;font-weight:700;text-decoration:none;white-space:nowrap" onclick="event.stopPropagation()">&#9749; Buy us a coffee</a>';
    } else {
      /* Simple toast for new users (1-2 uses) */
      toast.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#1e293b;color:#e2e8f0;padding:.75rem 1.25rem;border-radius:12px;font-size:.9rem;box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:9999;cursor:pointer;opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .3s ease;max-width:320px';
      toast.innerHTML = 'Glad this helped? <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" style="color:#2dd4bf;font-weight:600;text-decoration:none;white-space:nowrap" onclick="event.stopPropagation()">&#9749; Buy us a coffee</a>';
    }

    document.body.appendChild(toast);

    /* Animate in */
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    function dismiss() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }

    toast.addEventListener('click', dismiss);
    setTimeout(dismiss, uses >= 3 ? 15000 : 10000);
  }, 1000);

  /* Show persistent banner for power users (5+ uses) */
  if (uses >= 5) showPowerUserBanner(uses);
}

/* Persistent bottom banner for power users — dismissible, non-blocking */
function showPowerUserBanner(uses) {
  if (sessionStorage.getItem('parchment_banner_dismissed')) return;
  if (document.querySelector('.parchment-power-banner')) return;

  const banner = document.createElement('div');
  banner.className = 'parchment-power-banner';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,.92);backdrop-filter:blur(8px);color:#e2e8f0;padding:1rem 1.5rem;display:flex;align-items:center;justify-content:center;gap:1rem;z-index:9990;border-top:2px solid #2dd4bf;font-size:.9rem;opacity:0;transform:translateY(100%);transition:opacity .4s ease,transform .4s ease';
  banner.innerHTML = '<span style="flex:1;text-align:center">You\'re a power user! \uD83C\uDF89 You\'ve processed ' + uses + ' files for free. Consider supporting Parchment</span>'
    + '<a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" style="background:#2dd4bf;color:#0f172a;padding:.5rem 1rem;border-radius:8px;font-weight:700;text-decoration:none;white-space:nowrap;font-size:.85rem">☕ Buy me a coffee</a>'
    + '<button style="position:absolute;top:.4rem;right:.6rem;background:none;border:none;color:#94a3b8;font-size:1.2rem;cursor:pointer;padding:4px 8px;line-height:1" aria-label="Dismiss">&times;</button>';

  document.body.appendChild(banner);

  requestAnimationFrame(() => {
    banner.style.opacity = '1';
    banner.style.transform = 'translateY(0)';
  });

  banner.querySelector('button').addEventListener('click', () => {
    sessionStorage.setItem('parchment_banner_dismissed', '1');
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 400);
  });
}

/* Post-action conversion nudge — subtle link to comparison page after tool use */
function showPostActionNudge() {
  if (document.querySelector('.post-action-nudge')) return;
  /* Don't show on comparison pages themselves */
  const path = window.location.pathname;
  if (path.includes('best-pdf-editor') || path.includes('compare') || path.includes('index')) return;

  const nudge = document.createElement('div');
  nudge.className = 'post-action-nudge';
  nudge.style.cssText = 'max-width:600px;margin:1rem auto;padding:.75rem 1rem;background:rgba(42,123,111,.06);border:1px solid rgba(42,123,111,.15);border-radius:10px;text-align:center;font-size:.85rem;color:var(--text-muted);animation:fadeUp .4s ease';
  nudge.innerHTML = 'Need more PDF power? <a href="best-pdf-editor.html" style="color:var(--teal);font-weight:600;text-decoration:none">See how Parchment compares to paid editors &rarr;</a>';

  /* Insert after the main action area */
  const statusEl = document.querySelector('.status-msg');
  const target = statusEl ? statusEl.parentElement : document.querySelector('.tool-section') || document.querySelector('.article-body');
  if (target) target.appendChild(nudge);
}
