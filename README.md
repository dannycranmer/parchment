# 📄 Parchment — Free, Private PDF Tools

**Your files never leave your device.**

Parchment is a collection of free PDF tools that run entirely in your browser. No uploads, no servers, no accounts — just fast, private document processing.

🔗 **Live site:** [dannycranmer.github.io/parchment](https://dannycranmer.github.io/parchment/)

## Tools

| Tool | Description |
|------|-------------|
| **Merge PDF** | Combine multiple PDFs into one. Drag-and-drop, reorder, remove files. |
| **Split PDF** | Split a PDF by page ranges or extract individual pages with thumbnail previews. |
| **Image to PDF** | Convert JPG, PNG, and WebP images to PDF. Reorder, choose page size and orientation. |
| **PDF to Image** | Convert PDF pages to PNG or JPEG at 1×, 2×, or 3× resolution. Download as ZIP. |
| **Compress PDF** | Reduce PDF file size with light, medium, or heavy compression. |
| **Rotate PDF** | Rotate individual pages or all pages by 90°, 180°, or 270°. |
| **Reorder Pages** | Drag-and-drop page reordering with thumbnail previews. |
| **Protect PDF** | Add password protection (RC4-128 encryption) to any PDF. |
| **Unlock PDF** | Remove password from a PDF (password required). |
| **Watermark PDF** | Add a text watermark to every page — customizable text, size, color, opacity, rotation, and position. |
| **Page Numbers** | Add page numbers with configurable position, format, font size, and starting number. |
| **Sign PDF** | Draw or type a signature and place it on any page. Resize, reposition, multiple signatures. |
| **Extract Pages** | Select specific pages with checkboxes and thumbnail previews. Bulk select odd/even pages. |
| **Flatten PDF** | Flatten form fields and annotations into non-editable page content. |
| **PDF to Text** | Extract all text from a PDF. Copy to clipboard or download as .txt. |

## Why Parchment?

- **100% private** — All processing happens in your browser using [pdf-lib](https://pdf-lib.js.org/) and [PDF.js](https://mozilla.github.io/pdf.js/). Files are never uploaded anywhere.
- **Completely free** — No premium tiers, no ads, no signup required.
- **Open source** — MIT licensed. Inspect the code, contribute, or fork it.
- **Works offline** — After the initial page load, tools work without an internet connection.
- **Fast** — No server round-trips. Pure client-side JavaScript.

## Tech Stack

- Pure HTML, CSS, and JavaScript — no frameworks, no build step
- [pdf-lib.js](https://pdf-lib.js.org/) (v1.17.1) — PDF creation and manipulation
- [PDF.js](https://mozilla.github.io/pdf.js/) (v3.11.174) — PDF rendering and text extraction
- [JSZip](https://stuk.github.io/jszip/) — ZIP file generation for batch downloads
- Hosted on GitHub Pages — zero infrastructure cost

## Support

If Parchment saves you time, consider [buying us a coffee](https://buymeacoffee.com/dairylea) ☕

## License

MIT
