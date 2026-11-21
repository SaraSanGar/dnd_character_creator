/*
 * Iconos dibujados a mano (SVG propio) para clases y trasfondos.
 * Lienzo de 64×64, trazo negro redondeado; la clase "hl" se rellena con el color de rotulador.
 */
(() => {
  "use strict";

  const f = (d) => `<path d="${d}" fill="currentColor" stroke="none"/>`;   // relleno de tinta
  const h = (d) => `<path class="hl" d="${d}"/>`;                           // relleno de rotulador
  const p = (d, extra = "") => `<path d="${d}" ${extra}/>`;
  const star = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * 0.3} ${y - r * 0.3} L${x + r} ${y} L${x + r * 0.3} ${y + r * 0.3} L${x} ${y + r} L${x - r * 0.3} ${y + r * 0.3} L${x - r} ${y} L${x - r * 0.3} ${y - r * 0.3}Z" fill="currentColor" stroke="none"/>`;

  function gear(cx, cy, r) {
    let teeth = "";
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const x1 = cx + r * Math.cos(a), y1 = cy + r * Math.sin(a);
      const x2 = cx + (r + 6) * Math.cos(a), y2 = cy + (r + 6) * Math.sin(a);
      teeth += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="6"/>`;
    }
    return teeth + `<circle class="hl" cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.35}"/>`;
  }

  function rays(cx, cy, r1, r2, n) {
    let out = "";
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 ? r2 - 4 : r2;
      out += `<path d="M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)} L${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}"/>`;
    }
    return out;
  }

  const ICONS = {
    /* ---------- Clases ---------- */
    artificer: gear(27, 38, 11) + `<path d="M46 6 L40 18 L47 18 L41 30" stroke-width="3"/>` + star(52, 30, 4),
    barbarian: p("M32 4 L32 60", 'stroke-width="5"') + h("M34 11 C45 7 53 14 54 23 C53 32 45 38 34 34 Z") + h("M30 11 C19 7 11 14 10 23 C11 32 19 38 30 34 Z") + p("M28 46 L36 46 M28 52 L36 52", 'stroke-width="2"'),
    bard: p("M33 32 L50 12", 'stroke-width="6"') + p("M47 9 L55 6 L58 14 L52 17 Z") +
      `<ellipse class="hl" cx="24" cy="41" rx="15" ry="12" transform="rotate(-40 24 41)"/>` + `<circle cx="23" cy="42" r="4" fill="currentColor" stroke="none"/>` + p("M12 52 L52 13", 'stroke-width="1.4"') + p("M15 55 L54 16", 'stroke-width="1.4"'),
    cleric: `<circle class="hl" cx="32" cy="32" r="10"/>` + rays(32, 32, 14, 24, 12),
    druid: p("M20 58 C24 40 30 24 36 6", 'stroke-width="4"') + h("M35 14 C43 7 52 9 55 13 C49 20 41 20 35 14 Z") + p("M38 14 L51 13", 'stroke-width="1.6"') +
      h("M29 28 C21 21 12 23 10 27 C16 33 25 32 29 28 Z") + p("M27 28 L14 27", 'stroke-width="1.6"') + `<circle cx="22" cy="46" r="2.5" fill="currentColor" stroke="none"/>`,
    fighter: p("M33 31 L52 9 L56 10 L55 14 L37 34 Z", 'fill="#fff"') + p("M29 28 L40 39") + p("M33 35 L26 42", 'stroke-width="4"') +
      h("M8 26 L22 21 L36 26 C36 41 29 50 22 55 C15 50 8 41 8 26 Z") + p("M22 22 L22 54", 'stroke-width="2"') + p("M9 34 L35 34", 'stroke-width="2"'),
    monk: h("M16 30 C16 24 20 22 24 22 L44 22 C48 22 50 25 50 29 L50 40 C50 48 44 54 36 54 L26 54 C20 54 16 50 16 44 Z") +
      p("M26 22 L26 33 M34 22 L34 33 M42 22 L42 33", 'stroke-width="2.2"') + p("M16 39 C23 36 31 38 33 45") + p("M4 28 L10 28 M3 36 L9 36 M5 44 L10 44", 'stroke-width="2.2"'),
    paladin: h("M14 10 L50 10 L50 30 C50 44 40 52 32 57 C24 52 14 44 14 30 Z") + p("M32 17 L32 47 M21 28 L43 28", 'stroke-width="4"'),
    ranger: p("M18 6 C44 16 44 48 18 58", 'stroke-width="4"') + p("M18 6 L18 58", 'stroke-width="1.5"') +
      p("M8 32 L54 32") + f("M47 26 L58 32 L47 38 Z") + p("M9 32 L4 26 M9 32 L4 38 M15 32 L10 26 M15 32 L10 38", 'stroke-width="2"'),
    rogue: p("M30 36 L48 14 L53 13 L52 18 L34 40 Z", 'fill="#fff"') + p("M26 32 L38 44", 'stroke-width="3.5"') + p("M31 41 L24 48", 'stroke-width="5"') + `<circle cx="22" cy="50" r="3" fill="currentColor" stroke="none"/>` +
      `<circle class="hl" cx="14" cy="14" r="6"/>` + p("M20 16 L34 20 M29 19 L28 24 M33 20 L32 25", 'stroke-width="2.5"'),
    sorcerer: h("M32 57 C18 57 12 45 16 35 C18 29 24 25 24 16 C30 20 32 26 32 30 C34 24 38 20 40 11 C48 21 52 32 48 43 C46 51 40 57 32 57 Z") +
      p("M32 51 C26 51 24 45 26 41 C28 37 31 36 32 31 C35 35 38 39 38 43 C38 48 36 51 32 51 Z", 'stroke-width="2"') + star(10, 14, 4) + star(54, 8, 3),
    warlock: h("M5 32 C15 18 49 18 59 32 C49 46 15 46 5 32 Z") + `<circle cx="32" cy="32" r="9" fill="#fff"/>` + `<ellipse cx="32" cy="32" rx="2.6" ry="7" fill="currentColor" stroke="none"/>` +
      p("M32 6 L32 12 M16 10 L19 15 M48 10 L45 15 M32 52 L32 58 M16 54 L19 49 M48 54 L45 49", 'stroke-width="2.4"'),
    wizard: h("M20 48 C26 34 30 20 36 8 C40 3 47 7 45 13 C43 11 40 12 40 16 C40 28 42 38 44 48 Z") +
      p("M10 50 C22 45 42 45 54 50 C46 55 18 55 10 50 Z", 'fill="#fff"') + p("M22 43 C29 41 37 41 43 43", 'stroke-width="2.4"') + star(32, 30, 4.5) + star(52, 24, 3),

    /* ---------- Trasfondos ---------- */
    acolyte: h("M32 6 C38 13 38 19 32 21 C26 19 26 13 32 6 Z") + p("M32 21 L32 25", 'stroke-width="2"') +
      p("M24 25 L40 25 L40 52 L24 52 Z", 'fill="#fff"') + p("M40 30 C42 32 42 36 40 37", 'stroke-width="2"') + `<ellipse cx="32" cy="53" rx="17" ry="4" fill="#fff"/>`,
    charlatan: h("M17 40 C24 36 40 44 47 40 C47 50 41 56 32 56 C23 56 17 50 17 40 Z") +
      p("M26 7 L38 7 L38 11 L36 11 L36 22 C46 26 50 34 48 44 C46 52 40 56 32 56 C24 56 18 52 16 44 C14 34 18 26 28 22 L28 11 L26 11 Z") +
      `<circle cx="28" cy="47" r="2" fill="currentColor" stroke="none"/><circle cx="36" cy="50" r="1.6" fill="currentColor" stroke="none"/>` + star(52, 14, 4),
    criminal: h("M7 26 C15 19 28 21 32 28 C36 21 49 19 57 26 C57 37 49 43 42 41 C38 39 34 35 32 35 C30 35 26 39 22 41 C15 43 7 37 7 26 Z") +
      `<ellipse cx="20" cy="30" rx="5" ry="3.2" fill="#fff"/><ellipse cx="44" cy="30" rx="5" ry="3.2" fill="#fff"/>` + p("M7 26 L2 22 M57 26 L62 22", 'stroke-width="2.4"'),
    entertainer: p("M22 46 L22 14 L46 8 L46 40") + p("M22 15 L46 9 M22 22 L46 16", 'stroke-width="4.5"') +
      `<ellipse cx="17" cy="47" rx="6" ry="4.5" class="hl"/><ellipse cx="41" cy="41" rx="6" ry="4.5" class="hl"/>` + star(54, 52, 4) + star(8, 18, 3),
    "folk-hero": p("M32 58 L32 26", 'stroke-width="4"') + p("M19 24 C19 31 45 31 45 24") + p("M19 24 L19 8 M32 27 L32 6 M45 24 L45 8") + h("M28 46 L36 46 L36 54 L28 54 Z"),
    "guild-artisan": h("M8 40 L46 40 C46 46 41 48 37 48 L37 53 L45 56 L19 56 L27 53 L27 48 C20 48 13 45 8 40 Z") + p("M46 40 L57 36 L46 44") +
      p("M28 33 L48 13", 'stroke-width="4"') + p("M42 6 L55 19 L51 23 L38 10 Z", 'fill="#fff"'),
    hermit: `<circle cx="32" cy="7" r="3"/>` + p("M22 18 L42 18 L38 11 L26 11 Z", 'fill="#fff"') + h("M23 18 L41 18 L41 47 L23 47 Z") +
      p("M32 26 C36 31 36 36 32 38 C28 36 28 31 32 26 Z", 'fill="#fff"') + p("M20 47 L44 47 L44 54 L20 54 Z", 'fill="#fff"'),
    noble: h("M10 46 L14 20 L24 32 L32 13 L40 32 L50 20 L54 46 Z") + p("M10 46 L54 46 L53 53 L11 53 Z", 'fill="#fff"') +
      `<circle cx="14" cy="18" r="3" fill="currentColor" stroke="none"/><circle cx="32" cy="11" r="3" fill="currentColor" stroke="none"/><circle cx="50" cy="18" r="3" fill="currentColor" stroke="none"/>`,
    outlander: h("M32 6 L18 26 L26 26 L14 42 L28 42 L28 54 L36 54 L36 42 L50 42 L38 26 L46 26 Z") + p("M4 56 L60 56", 'stroke-width="2.5"') + star(54, 12, 3),
    sage: p("M12 18 L40 18 L40 52 L12 52 Z", 'fill="#fff"') + p("M18 27 L34 27 M18 34 L34 34 M18 41 L28 41", 'stroke-width="2"') +
      h("M58 4 C44 8 36 20 33 36 C42 32 53 21 58 4 Z") + p("M33 36 L27 46", 'stroke-width="2.6"'),
    sailor: `<circle cx="32" cy="10" r="5"/>` + p("M32 15 L32 55", 'stroke-width="4"') + p("M21 23 L43 23", 'stroke-width="4"') +
      p("M11 39 C13 51 23 56 32 56 C41 56 51 51 53 39") + p("M7 43 L11 38 L16 43 M48 43 L53 38 L57 43"),
    soldier: h("M13 46 L13 30 C13 17 22 9 32 9 C42 9 51 17 51 30 L51 46 L40 52 L40 36 L24 36 L24 52 Z") + p("M24 30 L40 30", 'stroke-width="3.5"') + p("M32 9 C30 3 38 1 44 4 C40 6 36 8 34 12", 'stroke-width="2.5"'),
    urchin: h("M13 46 C13 33 23 27 34 28 C45 30 51 38 51 46 Z") + `<circle cx="30" cy="26" r="6" fill="#fff"/>` +
      `<circle cx="41" cy="37" r="2" fill="currentColor" stroke="none"/>` + p("M51 44 L56 42 M51 46 L57 47", 'stroke-width="1.6"') + p("M13 46 C6 46 4 38 9 34 C12 32 14 28 12 24", 'stroke-width="2.4"'),
    "haunted-one": h("M18 55 L18 26 C18 16 24 10 32 10 C40 10 46 16 46 26 L46 55 L41 50 L36 55 L32 50 L28 55 L23 50 Z") +
      `<ellipse cx="27" cy="27" rx="3" ry="4" fill="currentColor" stroke="none"/><ellipse cx="37" cy="27" rx="3" ry="4" fill="currentColor" stroke="none"/><ellipse cx="32" cy="38" rx="3.5" ry="4.5" fill="currentColor" stroke="none"/>`,
    "far-traveler": `<circle cx="32" cy="32" r="24" fill="#fff"/>` + h("M32 12 L38 32 L26 32 Z") + p("M32 12 L38 32 L32 52 L26 32 Z") +
      p("M32 4 L32 9 M32 55 L32 60 M4 32 L9 32 M55 32 L60 32", 'stroke-width="2.4"'),
    feylost: h("M10 34 C10 18 22 10 32 10 C42 10 54 18 54 34 Z") + p("M24 34 L22 54 L42 54 L40 34") +
      `<circle cx="24" cy="22" r="3" fill="#fff"/><circle cx="38" cy="19" r="2.5" fill="#fff"/><circle cx="44" cy="28" r="2" fill="#fff"/>` + star(8, 10, 3.5) + star(57, 46, 3)
  };

  function iconSVG(id, size) {
    const body = ICONS[id];
    if (!body) return "";
    return `<svg class="ico" viewBox="0 0 64 64" ${size ? `width="${size}" height="${size}"` : ""} fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  window.Icons = { svg: iconSVG, has: (id) => !!ICONS[id], ids: () => Object.keys(ICONS) };
})();
