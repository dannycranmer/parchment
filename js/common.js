/* Parchment — Shared utilities */

function renderNav(active) {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `<div class="nav-inner">
    <a href="index.html" class="nav-logo">📄 <span>Parchment</span></a>
    <div class="nav-links">
      <a href="merge.html"${active==='merge'?' style="color:var(--teal);font-weight:700"':''}>Merge</a>
      <a href="split.html"${active==='split'?' style="color:var(--teal);font-weight:700"':''}>Split</a>
      <a href="image-to-pdf.html"${active==='image-to-pdf'?' style="color:var(--teal);font-weight:700"':''}>Image to PDF</a>
      <a href="pdf-to-image.html"${active==='pdf-to-image'?' style="color:var(--teal);font-weight:700"':''}>PDF to Image</a>
      <a href="compress.html"${active==='compress'?' style="color:var(--teal);font-weight:700"':''}>Compress</a>
      <a href="rotate.html"${active==='rotate'?' style="color:var(--teal);font-weight:700"':''}>Rotate</a>
      <a href="reorder.html"${active==='reorder'?' style="color:var(--teal);font-weight:700"':''}>Reorder</a>
      <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener" class="nav-bmc">☕ Buy me a coffee</a>
    </div>
  </div>`;
  document.body.prepend(nav);
}

function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `🔒 Your files never leave your device &nbsp;·&nbsp;
    <a href="https://buymeacoffee.com/dairylea" target="_blank" rel="noopener">☕ Support Parchment</a> &nbsp;·&nbsp;
    Need developer tools? <a href="https://dannycranmer.github.io/devtoolbox/" target="_blank" rel="noopener">Try DevToolbox</a> &nbsp;·&nbsp;
    Edit images? <a href="https://dannycranmer.github.io/imagetoolkit/" target="_blank" rel="noopener">Try ImageToolkit</a>
    <br><span style="font-size:.8rem;color:var(--text-muted)">Built by Hustle · Free &amp; open source</span>`;
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
