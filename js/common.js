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
  const activeStyle = 'color:var(--teal);font-weight:700';
  const link = (t) => `<a href="${t.href}"${active===t.id?` style="${activeStyle}"`:''}>${t.label}</a>`;
  const hasActiveInMore = moreTools.some(t => t.id === active);

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `<div class="nav-inner">
    <a href="index.html" class="nav-logo">📄 <span>Parchment</span></a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
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
  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
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
}

function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `🔒 Your files never leave your device &nbsp;·&nbsp;
    <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener">☕ Support Parchment</a> &nbsp;·&nbsp;
    Need developer tools? <a href="https://dannycranmer.github.io/devtoolbox/" target="_blank" rel="noopener">Try DevToolbox</a> &nbsp;·&nbsp;
    Edit images? <a href="https://dannycranmer.github.io/imagetoolkit/" target="_blank" rel="noopener">Try ImageToolkit</a>
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
