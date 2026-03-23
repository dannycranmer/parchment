/* Parchment — Shared utilities */

function renderNav(active) {
  const tools = [
    {href:'merge.html', id:'merge', label:'Merge'},
    {href:'split.html', id:'split', label:'Split'},
    {href:'image-to-pdf.html', id:'image-to-pdf', label:'Image to PDF'},
    {href:'pdf-to-image.html', id:'pdf-to-image', label:'PDF to Image'},
    {href:'compress.html', id:'compress', label:'Compress'},
    {href:'rotate.html', id:'rotate', label:'Rotate'},
    {href:'reorder.html', id:'reorder', label:'Reorder'},
    {href:'protect.html', id:'protect', label:'Protect'},
    {href:'unlock.html', id:'unlock', label:'Unlock'},
    {href:'watermark.html', id:'watermark', label:'Watermark'},
    {href:'page-numbers.html', id:'page-numbers', label:'Page #'},
    {href:'extract.html', id:'extract', label:'Extract'},
    {href:'sign.html', id:'sign', label:'Sign'},
    {href:'flatten.html', id:'flatten', label:'Flatten'},
    {href:'pdf-to-text.html', id:'pdf-to-text', label:'PDF to Text'},
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
      <a href="best-pdf-editor.html" style="color:#2dd4bf!important;font-weight:700!important;font-size:.82rem!important">Compare PDF Editors →</a>
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
      <a href="best-pdf-editor.html" style="display:flex;align-items:center;justify-content:center;gap:.5rem;margin:1rem 1rem 0;padding:.85rem 1rem;border-radius:14px;text-decoration:none;color:#2dd4bf;font-weight:700;font-size:.92rem;background:rgba(45,212,191,.1);border:2px solid rgba(45,212,191,.25);font-family:var(--font-body)">📊 Compare PDF Editors</a>
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
    Kids learning? <a href="https://dannycranmer.github.io/eduplay/" target="_blank" rel="noopener">Try EduPlay</a> &nbsp;·&nbsp;
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

/* Download helper */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
