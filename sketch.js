/*
 * Formas «dibujadas a mano» para la ficha estilo boceto.
 * Cada elemento con data-shape="..." recibe un fondo SVG generado a su tamaño exacto,
 * con trazos temblorosos y doble línea. Se usa como imagen de fondo para que
 * html2canvas lo capture bien en el PDF.
 */
(() => {
  "use strict";

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

  const TAU = Math.PI * 2;
  const ring = (n, f) => Array.from({ length: n }, (_, i) => { const t = (i / n) * TAU - Math.PI / 2; const r = f(t); return [0.5 + r * Math.cos(t), 0.5 + r * Math.sin(t)]; });

  // Formas en coordenadas 0..1; cada forma es una lista de polígonos cerrados
  const SHAPES = {
    rect: () => [[[0, 0], [1, 0], [1, 1], [0, 1]]],
    circle: () => [ring(40, () => 0.5)],
    triangle: () => [[[0.5, 0], [1, 1], [0, 1]]],
    pentagon: () => [ring(5, () => 0.5)],
    diamond: () => [[[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]]],
    star: () => [Array.from({ length: 10 }, (_, i) => { const t = (i / 10) * TAU - Math.PI / 2; const r = i % 2 ? 0.22 : 0.5; return [0.5 + r * Math.cos(t), 0.55 + r * Math.sin(t)]; })],
    sparkle: () => [Array.from({ length: 8 }, (_, i) => { const t = (i / 8) * TAU - Math.PI / 2; const r = i % 2 ? 0.14 : 0.5; return [0.5 + r * Math.cos(t), 0.5 + r * Math.sin(t)]; })],
    burst: () => [Array.from({ length: 22 }, (_, i) => { const t = (i / 22) * TAU; const r = i % 2 ? 0.36 : 0.5; return [0.5 + r * Math.cos(t), 0.5 + r * Math.sin(t)]; })],
    splat: () => [ring(56, (t) => 0.5 * (0.72 + 0.28 * Math.abs(Math.sin(3.5 * t))))],
    blob: () => [ring(48, (t) => 0.5 * (0.86 + 0.08 * Math.sin(3 * t + 1) + 0.06 * Math.cos(5 * t)))],
    heart: () => [Array.from({ length: 48 }, (_, i) => {
      const t = (i / 48) * TAU; const x = 16 * Math.sin(t) ** 3; const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return [0.5 + x / 34, 0.47 + y / 34];
    })],
    shield: () => [[[0, 0.06], [0.5, 0], [1, 0.06], [1, 0.45], [0.86, 0.72], [0.5, 1], [0.14, 0.72], [0, 0.45]]],
    banner: () => [[[0, 0.08], [1, 0], [0.95, 0.5], [1, 1], [0, 0.92], [0.04, 0.5]]],
    boot: () => [[[0.3, 0], [0.72, 0.02], [0.7, 0.62], [0.98, 0.74], [1, 1], [0.22, 1], [0.26, 0.55]]],
    sword: () => [
      [[0, 0.5], [0.08, 0.32], [0.74, 0.32], [0.74, 0.68], [0.08, 0.68]],
      [[0.74, 0.08], [0.82, 0.08], [0.82, 0.92], [0.74, 0.92]],
      [[0.82, 0.38], [1, 0.38], [1, 0.62], [0.82, 0.62]]
    ],
    scroll: () => [[[0.03, 0.02], [0.97, 0], [1, 0.5], [0.97, 1], [0.02, 0.98], [0, 0.5]]]
  };

  // Densifica y hace temblar un polígono; devuelve un path suave
  function roughPath(poly, w, h, rand, jitter) {
    const pts = [];
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i], [x2, y2] = poly[(i + 1) % poly.length];
      const ax = x1 * w, ay = y1 * h, bx = x2 * w, by = y2 * h;
      const len = Math.hypot(bx - ax, by - ay);
      const n = Math.max(1, Math.round(len / 22));
      for (let k = 0; k < n; k++) {
        const t = k / n;
        pts.push([ax + (bx - ax) * t + (rand() - 0.5) * jitter * 2, ay + (by - ay) * t + (rand() - 0.5) * jitter * 2]);
      }
    }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let d = `M${mid(pts[pts.length - 1], pts[0]).map((v) => v.toFixed(1)).join(",")}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], m = mid(p, pts[(i + 1) % pts.length]);
      d += ` Q${p[0].toFixed(1)},${p[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`;
    }
    return d + "Z";
  }

  // Trazos de una forma: lista de { d, width, alpha, fill }
  function strokesFor(shape, w, h, seed, opts = {}) {
    const polys = (SHAPES[shape] || SHAPES.rect)();
    const m = opts.margin ?? 4;
    const iw = w - m * 2, ih = h - m * 2;
    const jitter = opts.jitter ?? Math.min(3.2, Math.max(1.2, Math.min(iw, ih) / 40));
    const r1 = rng(seed), r2 = rng(seed + 7);
    const out = [];
    polys.forEach((poly) => {
      out.push({ d: roughPath(poly, iw, ih, r1, jitter), width: opts.width ?? 2.6, alpha: 1, fill: opts.fill });
      out.push({ d: roughPath(poly, iw, ih, r2, jitter * 1.3), width: 1.1, alpha: 0.65 });
    });
    return { m, strokes: out };
  }

  function svgFor(shape, w, h, seed, opts = {}) {
    const { m, strokes } = strokesFor(shape, w, h, seed, opts);
    const paths = strokes.map((s) => `<path d="${s.d}" fill="${s.fill || "none"}" stroke="#1b1b1b" stroke-width="${s.width}" stroke-linejoin="round" stroke-linecap="round" opacity="${s.alpha}"/>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g transform="translate(${m},${m})">${paths}</g></svg>`;
  }

  // Se dibuja en un canvas (Path2D) y se usa como PNG: así ningún navegador
  // (Safari incluido) bloquea luego la exportación del PDF.
  function pngFor(shape, w, h, seed, opts = {}) {
    const k = 2;
    const cv = document.createElement("canvas");
    cv.width = Math.ceil(w * k); cv.height = Math.ceil(h * k);
    const ctx = cv.getContext("2d");
    const { m, strokes } = strokesFor(shape, w, h, seed, opts);
    ctx.scale(k, k); ctx.translate(m, m);
    ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.strokeStyle = "#1b1b1b";
    strokes.forEach((s) => {
      const p = new Path2D(s.d);
      if (s.fill) { ctx.fillStyle = s.fill; ctx.fill(p); }
      ctx.globalAlpha = s.alpha; ctx.lineWidth = s.width; ctx.stroke(p); ctx.globalAlpha = 1;
    });
    return cv.toDataURL("image/png");
  }

  // Aplica las formas a todos los [data-shape] dentro de root (tras el layout)
  function apply(root) {
    root.querySelectorAll("[data-shape]").forEach((el, i) => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      const seed = hash((el.dataset.seed || "") + el.dataset.shape + i);
      const opts = { fill: el.dataset.fill, width: el.dataset.stroke ? +el.dataset.stroke : undefined };
      let url;
      try { url = pngFor(el.dataset.shape, w, h, seed, opts); }
      catch { url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgFor(el.dataset.shape, w, h, seed, opts))}`; }
      el.style.backgroundImage = `url("${url}")`;
      el.style.backgroundSize = "100% 100%";
      el.style.backgroundRepeat = "no-repeat";
    });
  }

  window.Sketch = { apply, svgFor, pngFor };
})();
