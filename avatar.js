/*
 * Creador de retratos por capas (SVG propio).
 * Avatar.render(cfg) devuelve un <svg> como texto; Avatar.random() una configuración al azar.
 */
(() => {
  "use strict";

  const INK = "#3a2716";
  const W = 300, H = 340;

  /* ---------- Paletas ---------- */
  const SKIN = [
    ["#fde3cf", "Marfil"], ["#f6cfae", "Melocotón"], ["#e7b48f", "Arena"], ["#c98e66", "Canela"],
    ["#a26a45", "Bronce"], ["#7a4a2e", "Cacao"], ["#55331f", "Ébano"],
    ["#d65f55", "Rojo infernal"], ["#9d8bc9", "Lavanda"], ["#79a7c9", "Azul"], ["#8fb27a", "Verde"],
    ["#9a9a9a", "Piedra"], ["#e8c66a", "Dorado"]
  ];
  const HAIR = [
    ["#1f1712", "Negro"], ["#4a2e1c", "Castaño oscuro"], ["#7a4b2a", "Castaño"], ["#b5763a", "Avellana"],
    ["#e0b35c", "Rubio"], ["#f3dea0", "Rubio claro"], ["#a8361f", "Pelirrojo"], ["#d9d4cc", "Canoso"],
    ["#ffffff", "Blanco"], ["#e59bb6", "Rosa"], ["#6c8fd1", "Azul"], ["#6aa36b", "Verde"], ["#8f62b8", "Violeta"]
  ];
  const EYES = [
    ["#5b3a1e", "Marrón"], ["#8a6b2e", "Ámbar"], ["#3f7a4a", "Verde"], ["#3b6aa8", "Azul"],
    ["#7f8c99", "Gris"], ["#7b3fa0", "Violeta"], ["#c0392b", "Rojo"], ["#d4a017", "Dorado"]
  ];
  const CLOTH = [
    ["#7d2222", "Granate"], ["#3f5a3a", "Bosque"], ["#2f4a6d", "Añil"], ["#5c3c6e", "Ciruela"],
    ["#8a5a2b", "Cuero"], ["#b08a3e", "Ocre"], ["#33302d", "Carbón"], ["#e8dcc0", "Lino"]
  ];
  const HORN = [["#efe4cf", "Hueso"], ["#3a2c28", "Obsidiana"], ["#8b2a22", "Rubí"], ["#b08a3e", "Oro"]];
  const BG = [
    ["#ecdab1", "Pergamino"], ["#7d2222", "Granate"], ["#3f5a3a", "Bosque"], ["#24304a", "Noche"],
    ["#b7a3cf", "Lavanda"], ["#d9a35b", "Atardecer"]
  ];

  /* ---------- Utilidades ---------- */
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + (amt < 0 ? v * amt : (255 - v) * amt))));
    const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  const line = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const mirror = (s) => `<g transform="translate(${W},0) scale(-1,1)">${s}</g>`;
  const both = (s) => s + mirror(s);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ---------- Opciones ---------- */
  const OPTIONS = {
    face: [["oval", "Ovalada"], ["round", "Redonda"], ["heart", "Corazón"]],
    ears: [["human", "Humanas"], ["elf", "Élficas"], ["long", "Muy largas"], ["none", "Ocultas"]],
    eyes: [["round", "Redondos"], ["almond", "Almendrados"], ["sparkle", "Brillantes"], ["happy", "Felices"], ["sleepy", "Soñolientos"], ["cat", "Felinos"]],
    brows: [["soft", "Suaves"], ["thick", "Gruesas"], ["angry", "Decididas"], ["worried", "Preocupadas"]],
    mouth: [["smile", "Sonrisa"], ["grin", "Risa"], ["neutral", "Seria"], ["smirk", "Pícara"], ["oh", "¡Oh!"], ["fang", "Colmillo"]],
    hairStyle: [["short", "Corto"], ["bob", "Melena"], ["long", "Largo"], ["curly", "Rizado"], ["bun", "Moño"], ["braids", "Trenzas"], ["pigtails", "Coletas"], ["mohawk", "Cresta"], ["bald", "Sin pelo"]],
    facialHair: [["none", "Nada"], ["beard", "Barba"], ["mustache", "Bigote"], ["goatee", "Perilla"]],
    horns: [["none", "Sin cuernos"], ["curved", "Curvos"], ["ram", "De carnero"], ["nubs", "Pequeños"], ["dragon", "Dracónicos"]],
    animalEars: [["none", "Ninguna"], ["cat", "De gato"], ["rabbit", "De conejo"]],
    marks: [["none", "Nada"], ["freckles", "Pecas"], ["scales", "Escamas"], ["whiskers", "Bigotes felinos"], ["scar", "Cicatriz"], ["mole", "Lunar"], ["star", "Marca estelar"]],
    blush: [["yes", "Con rubor"], ["no", "Sin rubor"]],
    outfit: [["tunic", "Túnica"], ["armor", "Armadura"], ["cloak", "Capa"], ["robe", "Toga de mago"], ["doublet", "Jubón"], ["leather", "Cuero"]],
    headwear: [["none", "Nada"], ["flowers", "Corona de flores"], ["circlet", "Diadema"], ["wizard", "Sombrero de mago"], ["hood", "Capucha"], ["band", "Cinta"]],
    extra: [["none", "Nada"], ["glasses", "Gafas"], ["earring", "Pendiente"], ["both", "Gafas y pendiente"]]
  };
  const COLORS = { skin: SKIN, hair: HAIR, eye: EYES, cloth: CLOTH, horn: HORN, bg: BG };

  const DEFAULTS = {
    face: "oval", skin: SKIN[1][0], ears: "human", eyes: "round", eye: EYES[0][0], brows: "soft",
    mouth: "smile", hairStyle: "long", hair: HAIR[2][0], facialHair: "none", horns: "none", horn: HORN[0][0],
    animalEars: "none", marks: "none", blush: "yes", outfit: "tunic", cloth: CLOTH[0][0],
    headwear: "none", extra: "none", bg: BG[0][0]
  };

  /* ---------- Capas ---------- */
  const HEAD = {
    oval: "M90,150 C90,100 117,80 150,80 C183,80 210,100 210,150 C210,195 183,220 150,220 C117,220 90,195 90,150Z",
    round: "M86,152 C86,106 114,84 150,84 C186,84 214,106 214,152 C214,194 186,214 150,214 C114,214 86,194 86,152Z",
    heart: "M90,145 C90,98 117,80 150,80 C183,80 210,98 210,145 C210,182 180,216 150,224 C120,216 90,182 90,145Z"
  };

  function backdrop(c) {
    const bg = c.bg, dark = shade(bg, -0.25), light = shade(bg, 0.25);
    const stars = [[40, 50], [262, 70], [52, 200], [255, 190], [30, 120], [272, 130]]
      .map(([x, y], i) => `<path d="M${x},${y - 6} L${x + 2},${y - 2} L${x + 6},${y} L${x + 2},${y + 2} L${x},${y + 6} L${x - 2},${y + 2} L${x - 6},${y} L${x - 2},${y - 2}Z" fill="${light}" opacity="${0.5 + (i % 2) * 0.3}"/>`).join("");
    return `<rect width="${W}" height="${H}" fill="${bg}"/>
      <circle cx="150" cy="150" r="128" fill="${light}" opacity=".35"/>
      <circle cx="150" cy="150" r="128" fill="none" stroke="${dark}" stroke-width="2" stroke-dasharray="2 7" opacity=".7"/>
      ${stars}`;
  }

  function hoodBack(c) {
    const col = c.cloth, d = shade(col, -0.25);
    return `<path d="M64,178 C54,86 106,36 150,36 C194,36 246,86 236,178 C240,236 222,268 150,270 C78,268 60,236 64,178Z" fill="${d}" ${line()}/>`;
  }

  function hairBack(c) {
    const h = c.hair, d = shade(h, -0.2);
    const f = `fill="${h}" ${line()}`;
    switch (c.hairStyle) {
      case "long": return `<path d="M82,140 C68,210 74,275 58,330 C100,342 200,342 242,330 C226,275 232,210 218,140Z" ${f}/>
        <path d="M100,220 C98,260 96,290 90,320 M200,220 C202,260 204,290 210,320" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      case "bob": return `<path d="M80,140 C70,190 76,226 100,238 C130,246 170,246 200,238 C224,226 230,190 220,140Z" ${f}/>`;
      case "curly": return [[82, 150, 30], [86, 200, 28], [102, 236, 22], [218, 150, 30], [214, 200, 28], [198, 236, 22], [150, 72, 40], [100, 96, 32], [200, 96, 32]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${f}/>`).join("");
      case "braids": return both(`<g>${[200, 228, 256, 284].map((y) => `<ellipse cx="96" cy="${y}" rx="15" ry="17" fill="${h}" ${line()}/>`).join("")}
        <rect x="88" y="298" width="16" height="9" rx="3" fill="${c.cloth}" ${line(2)}/>
        <path d="M90,306 L86,326 M96,307 L96,330 M102,306 L106,326" stroke="${h}" stroke-width="5" stroke-linecap="round"/></g>`);
      case "pigtails": return both(`<ellipse cx="64" cy="176" rx="26" ry="46" transform="rotate(14 64 176)" fill="${h}" ${line()}/>
        <circle cx="84" cy="128" r="8" fill="${c.cloth}" ${line(2)}/>`);
      default: return "";
    }
  }

  function body(c) {
    const col = c.cloth, d = shade(col, -0.25), l = shade(col, 0.35), skin = c.skin, sd = shade(skin, -0.15);
    const torso = "M30,340 C34,290 70,262 110,252 L190,252 C230,262 266,290 270,340Z";
    const neck = `<path d="M130,200 L130,258 C140,266 160,266 170,258 L170,200Z" fill="${skin}" ${line()}/>
      <path d="M131,226 C140,236 160,236 169,226 L169,214 C160,222 140,222 131,214Z" fill="${sd}"/>`;
    let out = neck;
    switch (c.outfit) {
      case "armor": {
        const steel = "#a3abb0", sdk = "#6f777c";
        out += `<path d="${torso}" fill="${steel}" ${line()}/>
          <path d="M118,256 L182,256 L174,340 L126,340Z" fill="${col}" ${line()}/>
          <path d="M150,272 L156,286 L150,300 L144,286Z" fill="#e0c472" ${line(2)}/>
          ${both(`<path d="M34,316 C34,282 60,262 104,258 C112,276 108,300 92,314 C72,326 50,326 34,316Z" fill="${steel}" ${line()}/>
            <path d="M52,300 C64,292 82,286 98,284" stroke="${sdk}" stroke-width="3" fill="none"/>
            <circle cx="96" cy="270" r="4" fill="${sdk}"/>`)}
          <path d="M122,254 C134,262 166,262 178,254" stroke="${sdk}" stroke-width="3" fill="none"/>`;
        break;
      }
      case "cloak":
        out += `<path d="${torso}" fill="${l}" ${line()}/>
          ${both(`<path d="M30,340 C34,290 70,262 112,252 L128,256 C120,280 116,310 118,340Z" fill="${col}" ${line()}/>`)}
          <path d="M112,252 C125,268 175,268 188,252" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round"/>
          <path d="M112,252 C125,268 175,268 188,252" fill="none" ${line()}/>
          <circle cx="150" cy="266" r="9" fill="#e0c472" ${line(2.5)}/>`;
        break;
      case "robe":
        out += `<path d="${torso}" fill="${col}" ${line()}/>
          <path d="M108,254 C104,232 122,226 130,240 L170,240 C178,226 196,232 192,254 C176,266 124,266 108,254Z" fill="${d}" ${line()}/>
          <path d="M150,262 L150,340" stroke="#e0c472" stroke-width="4"/>
          ${[[80, 300], [220, 296], [108, 326], [196, 328], [60, 330]].map(([x, y]) => `<path d="M${x},${y - 5} L${x + 1.6},${y - 1.6} L${x + 5},${y} L${x + 1.6},${y + 1.6} L${x},${y + 5} L${x - 1.6},${y + 1.6} L${x - 5},${y} L${x - 1.6},${y - 1.6}Z" fill="#f1dca4"/>`).join("")}`;
        break;
      case "doublet":
        out += `<path d="${torso}" fill="${col}" ${line()}/>
          <path d="M150,262 L150,340" stroke="${d}" stroke-width="3"/>
          ${[278, 298, 318].map((y) => `<circle cx="150" cy="${y}" r="4" fill="#e0c472" ${line(1.5)}/>`).join("")}
          <path d="M112,252 C116,264 128,272 150,268 C172,272 184,264 188,252 C180,248 170,254 162,248 C156,256 144,256 138,248 C130,254 120,248 112,252Z" fill="#fbf6ea" ${line(2.5)}/>
          ${both(`<path d="M44,310 C60,300 78,300 92,310" stroke="${d}" stroke-width="3" fill="none"/>`)}`;
        break;
      case "leather":
        out += `<path d="${torso}" fill="#8a5a2b" ${line()}/>
          <path d="M126,252 L150,290 L174,252" fill="${l}" ${line()}/>
          <path d="M92,262 L208,340" stroke="${col}" stroke-width="12"/>
          <path d="M92,262 L208,340" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 5"/>
          <rect x="150" y="296" width="18" height="14" rx="3" fill="#a3abb0" ${line(2)} transform="rotate(34 159 303)"/>`;
        break;
      default: // tunic
        out += `<path d="${torso}" fill="${col}" ${line()}/>
          <path d="M124,252 L150,292 L176,252" fill="${shade(skin, -0.05)}" ${line()}/>
          <path d="M124,252 L150,292 L176,252" fill="none" stroke="${l}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M124,252 L150,292 L176,252" fill="none" ${line(2)}/>
          ${both(`<path d="M50,322 C62,310 76,304 90,302" stroke="${d}" stroke-width="3" fill="none"/>`)}`;
    }
    return out;
  }

  function ears(c) {
    const s = c.skin, d = shade(s, -0.18);
    switch (c.ears) {
      case "elf": return both(`<path d="M96,142 C82,138 62,120 46,100 C54,132 66,168 94,176Z" fill="${s}" ${line()}/>
        <path d="M90,150 C80,146 70,136 62,124" stroke="${d}" stroke-width="3" fill="none"/>`);
      case "long": return both(`<path d="M96,140 C76,134 46,108 22,78 C32,122 58,170 94,178Z" fill="${s}" ${line()}/>
        <path d="M90,150 C74,142 56,124 42,106" stroke="${d}" stroke-width="3" fill="none"/>`);
      case "human": return both(`<ellipse cx="90" cy="160" rx="11" ry="17" fill="${s}" ${line()}/>
        <path d="M92,152 C86,154 86,166 92,168" stroke="${d}" stroke-width="2.5" fill="none"/>`);
      default: return "";
    }
  }

  function head(c) {
    return `<path d="${HEAD[c.face] || HEAD.oval}" fill="${c.skin}" ${line()}/>`;
  }

  function marks(c) {
    const d = shade(c.skin, -0.28);
    let out = "";
    if (c.blush === "yes") out += both(`<ellipse cx="112" cy="182" rx="13" ry="7" fill="#e9837a" opacity=".45"/>`);
    switch (c.marks) {
      case "freckles": out += both([[108, 172], [116, 178], [102, 180], [112, 186], [122, 172]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${d}"/>`).join("")); break;
      case "scales": out += both([[104, 172], [114, 180], [104, 186], [124, 186], [96, 160]].map(([x, y]) => `<path d="M${x - 5},${y} C${x - 5},${y - 6} ${x + 5},${y - 6} ${x + 5},${y}" stroke="${d}" stroke-width="2" fill="none"/>`).join("")
        + `<path d="M140,104 C140,98 150,98 150,104 M150,104 C150,98 160,98 160,104 M145,112 C145,106 155,106 155,112" stroke="${d}" stroke-width="2" fill="none"/>`); break;
      case "whiskers": out += both(`<path d="M126,180 L96,174 M126,186 L94,188 M127,192 L98,200" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`); break;
      case "scar": out += `<path d="M186,128 L172,170" stroke="${d}" stroke-width="3" stroke-linecap="round"/>
        <path d="M176,138 L186,142 M174,150 L184,154 M172,162 L181,165" stroke="${d}" stroke-width="2" stroke-linecap="round"/>`; break;
      case "mole": out += `<circle cx="180" cy="196" r="2.6" fill="${INK}"/>`; break;
      case "star": out += `<path d="M150,104 L153,111 L160,112 L155,117 L156,124 L150,120 L144,124 L145,117 L140,112 L147,111Z" fill="#e0c472" ${line(1.2)}/>`; break;
    }
    return out;
  }

  function eyes(c) {
    const e = c.eye;
    const cy = 158;
    let one;
    switch (c.eyes) {
      case "almond":
        one = `<path d="M106,${cy} C112,${cy - 12} 132,${cy - 12} 140,${cy - 2} C132,${cy + 8} 112,${cy + 8} 106,${cy}Z" fill="#fff" ${line(2.5)}/>
          <circle cx="124" cy="${cy - 1}" r="7" fill="${e}"/><circle cx="124" cy="${cy - 1}" r="3.2" fill="${INK}"/><circle cx="127" cy="${cy - 4}" r="2" fill="#fff"/>
          <path d="M104,${cy - 2} C112,${cy - 14} 134,${cy - 14} 142,${cy - 3}" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
        break;
      case "sparkle":
        one = `<ellipse cx="122" cy="${cy}" rx="13" ry="15" fill="#fff" ${line(2.5)}/>
          <ellipse cx="122" cy="${cy + 1}" rx="10" ry="12" fill="${e}"/><ellipse cx="122" cy="${cy + 2}" rx="5" ry="6" fill="${INK}"/>
          <circle cx="126" cy="${cy - 4}" r="4" fill="#fff"/><circle cx="118" cy="${cy + 6}" r="2" fill="#fff"/>
          <path d="M107,${cy - 12} C114,${cy - 19} 130,${cy - 19} 137,${cy - 12}" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
        break;
      case "happy":
        one = `<path d="M108,${cy + 4} C112,${cy - 8} 132,${cy - 8} 136,${cy + 4}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        break;
      case "sleepy":
        one = `<path d="M108,${cy} C112,${cy + 10} 132,${cy + 10} 136,${cy}Z" fill="#fff" ${line(2.5)}/>
          <path d="M112,${cy + 1} C116,${cy + 8} 128,${cy + 8} 132,${cy + 1}Z" fill="${e}"/>
          <path d="M106,${cy} L138,${cy}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
        break;
      case "cat":
        one = `<path d="M106,${cy} C112,${cy - 12} 132,${cy - 12} 140,${cy - 4} C132,${cy + 8} 112,${cy + 8} 106,${cy}Z" fill="${e}" ${line(2.5)}/>
          <ellipse cx="123" cy="${cy - 1}" rx="2.6" ry="8" fill="${INK}"/><circle cx="128" cy="${cy - 5}" r="2" fill="#fff"/>`;
        break;
      default: // round
        one = `<ellipse cx="122" cy="${cy}" rx="11" ry="12" fill="#fff" ${line(2.5)}/>
          <circle cx="123" cy="${cy + 1}" r="7" fill="${e}"/><circle cx="123" cy="${cy + 1}" r="3.5" fill="${INK}"/><circle cx="126" cy="${cy - 2}" r="2.2" fill="#fff"/>`;
    }
    return both(one);
  }

  function brows(c) {
    const col = c.hairStyle === "bald" ? shade(c.skin, -0.45) : shade(c.hair, -0.35);
    const by = 134;
    const p = {
      soft: `<path d="M108,${by} C114,${by - 6} 128,${by - 6} 136,${by - 2}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      thick: `<path d="M106,${by + 1} C112,${by - 7} 130,${by - 8} 138,${by - 2} L137,${by + 3} C128,${by - 2} 114,${by - 1} 106,${by + 1}Z" fill="${col}" stroke="${col}" stroke-width="2" stroke-linejoin="round"/>`,
      angry: `<path d="M108,${by - 6} L138,${by + 2}" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`,
      worried: `<path d="M108,${by + 1} C116,${by - 1} 128,${by - 5} 136,${by - 9}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    };
    return both(p[c.brows] || p.soft);
  }

  function nose(c) {
    return `<path d="M148,170 C146,177 150,180 155,178" stroke="${shade(c.skin, -0.35)}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }

  function mouth(c) {
    const y = 194;
    switch (c.mouth) {
      case "grin": return `<path d="M132,${y - 3} C138,${y + 14} 162,${y + 14} 168,${y - 3}Z" fill="#7a2a2a" ${line(2.5)}/>
        <path d="M140,${y + 6} C146,${y + 2} 154,${y + 2} 160,${y + 6} C156,${y + 10} 144,${y + 10} 140,${y + 6}Z" fill="#e57373"/>`;
      case "neutral": return `<path d="M138,${y + 1} L162,${y + 1}" ${line(3)}/>`;
      case "smirk": return `<path d="M136,${y + 2} C146,${y + 6} 158,${y + 2} 166,${y - 6}" fill="none" ${line(3)}/>`;
      case "oh": return `<ellipse cx="150" cy="${y + 2}" rx="7" ry="8" fill="#7a2a2a" ${line(2.5)}/>`;
      case "fang": return `<path d="M134,${y - 2} C142,${y + 8} 158,${y + 8} 166,${y - 2}" fill="none" ${line(3)}/>
        <path d="M156,${y + 2} L159,${y + 10} L162,${y + 1}Z" fill="#fff" ${line(1.5)}/>`;
      default: return `<path d="M134,${y - 2} C142,${y + 9} 158,${y + 9} 166,${y - 2}" fill="none" ${line(3)}/>`;
    }
  }

  function facialHair(c) {
    const h = c.hairStyle === "bald" ? HAIR[1][0] : c.hair;
    switch (c.facialHair) {
      case "beard": return `<path d="M92,168 C94,222 124,246 150,248 C176,246 206,222 208,168 C202,196 186,206 168,204 C160,198 140,198 132,204 C114,206 98,196 92,168Z" fill="${h}" ${line()}/>
        <path d="M136,190 C142,184 158,184 164,190 C158,196 142,196 136,190Z" fill="${shade(h, -0.15)}"/>
        <path d="M140,200 C146,206 154,206 160,200" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      case "mustache": return `<path d="M126,188 C136,178 146,180 150,186 C154,180 164,178 174,188 C166,196 156,194 150,190 C144,194 134,196 126,188Z" fill="${h}" ${line(2.5)}/>`;
      case "goatee": return `<path d="M140,204 C142,220 158,220 160,204 C156,208 144,208 140,204Z" fill="${h}" ${line(2.5)}/>
        <path d="M132,188 C140,182 146,184 150,187 C154,184 160,182 168,188 C160,192 154,191 150,189 C146,191 140,192 132,188Z" fill="${h}" ${line(2)}/>`;
      default: return "";
    }
  }

  function hairFront(c) {
    const h = c.hair;
    const f = `fill="${h}" ${line()}`;
    const shine = `stroke="${shade(h, 0.35)}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"`;
    switch (c.hairStyle) {
      case "short": return `<path d="M84,150 C78,92 112,64 150,64 C188,64 222,92 216,150 C212,128 206,114 196,104 C176,118 128,120 104,104 C94,114 88,128 84,150Z" ${f}/>
        <path d="M118,80 C128,74 140,72 150,72" ${shine}/>`;
      case "bob": return `<path d="M80,168 C74,92 112,62 150,62 C188,62 226,92 220,168 L208,168 C206,142 204,126 200,116 L100,116 C96,126 94,142 92,168Z" ${f}/>
        <path d="M120,124 L120,116 M140,124 L140,116 M160,124 L160,116 M180,124 L180,116" stroke="${shade(h, -0.2)}" stroke-width="2.5"/>
        <path d="M116,78 C126,72 138,70 150,70" ${shine}/>`;
      case "long": return `<path d="M82,170 C74,90 112,60 150,60 C190,60 226,90 218,170 C214,134 204,114 190,100 C170,114 138,104 126,86 C114,104 96,124 82,170Z" ${f}/>
        <path d="M164,72 C178,74 192,82 200,94" ${shine}/>`;
      case "curly": return `<path d="M84,140 C80,96 112,68 150,68 C188,68 220,96 216,140 C206,120 190,108 150,108 C110,108 94,120 84,140Z" ${f}/>
        ${[[96, 112, 16], [114, 94, 18], [136, 84, 18], [164, 84, 18], [186, 94, 18], [204, 112, 16]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${f}/>`).join("")}`;
      case "bun": return `<circle cx="150" cy="58" r="26" ${f}/><path d="M130,58 C140,50 160,50 170,58" stroke="${shade(h, -0.2)}" stroke-width="2.5" fill="none"/>
        <path d="M86,148 C80,96 114,70 150,70 C186,70 220,96 214,148 C208,120 192,104 150,102 C108,104 92,120 86,148Z" ${f}/>
        <path d="M120,84 C130,78 140,76 150,76" ${shine}/>`;
      case "braids": return `<path d="M84,160 C78,94 112,64 150,64 C188,64 222,94 216,160 C212,128 198,108 154,98 L150,74 L146,98 C102,108 88,128 84,160Z" ${f}/>
        <path d="M118,82 C126,76 134,74 140,73" ${shine}/>`;
      case "pigtails": return `<path d="M84,150 C78,94 112,64 150,64 C188,64 222,94 216,150 C210,124 196,110 176,104 L170,116 L160,104 L150,118 L140,104 L130,116 L124,104 C104,110 90,124 84,150Z" ${f}/>
        <path d="M118,80 C128,74 140,72 150,72" ${shine}/>`;
      case "mohawk": return `<path d="M136,118 C128,76 136,44 150,26 C164,44 172,76 164,118 C156,110 144,110 136,118Z" ${f}/>
        <path d="M100,126 C104,112 112,104 122,98 M200,126 C196,112 188,104 178,98" stroke="${shade(h, -0.1)}" stroke-width="3" fill="none" stroke-dasharray="1 5" stroke-linecap="round"/>`;
      default: return "";
    }
  }

  function horns(c) {
    const col = c.horn, d = shade(col, -0.25);
    switch (c.horns) {
      case "curved": return both(`<path d="M116,98 C104,72 92,52 70,40 C88,64 92,86 100,110Z" fill="${col}" ${line()}/>
        <path d="M100,72 L110,68 M92,58 L101,54" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>`);
      case "ram": return both(`<path d="M106,104 C76,84 50,104 56,132 C62,158 92,160 96,140 C100,124 84,118 78,128" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
        <path d="M106,104 C76,84 50,104 56,132 C62,158 92,160 96,140 C100,124 84,118 78,128" fill="none" stroke="${col}" stroke-width="14" stroke-linecap="round"/>
        <path d="M70,98 L76,106 M58,116 L66,120 M60,140 L68,138" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>`);
      case "nubs": return both(`<path d="M118,96 C116,84 120,76 126,72 C130,80 132,88 132,94Z" fill="${col}" ${line()}/>`);
      case "dragon": return both(`<path d="M104,104 C88,88 64,82 38,88 C62,96 80,108 94,126Z" fill="${col}" ${line()}/>
        <path d="M112,92 C104,74 92,64 76,58 C88,72 94,86 98,102Z" fill="${col}" ${line()}/>`);
      default: return "";
    }
  }

  function animalEars(c) {
    const h = c.hairStyle === "bald" ? c.skin : c.hair;
    switch (c.animalEars) {
      case "cat": return both(`<path d="M94,110 L100,48 L140,84 Z" fill="${h}" ${line()}/><path d="M104,96 L107,64 L128,84Z" fill="#f2a5a5"/>`);
      case "rabbit": return both(`<ellipse cx="118" cy="46" rx="15" ry="48" transform="rotate(-14 118 46)" fill="${h}" ${line()}/>
        <ellipse cx="118" cy="48" rx="7" ry="36" transform="rotate(-14 118 48)" fill="#f2a5a5"/>`);
      default: return "";
    }
  }

  function headwear(c) {
    const col = c.cloth, d = shade(col, -0.25), gold = "#e0c472";
    switch (c.headwear) {
      case "flowers": {
        const pos = [[94, 120], [108, 98], [128, 84], [150, 80], [172, 84], [192, 98], [206, 120]];
        const cols = ["#e98aa8", "#f3d36b", "#ffffff", "#e98aa8", "#b79ce0", "#f3d36b", "#ffffff"];
        return `<path d="M90,124 C110,84 190,84 210,124" stroke="#5f8a4f" stroke-width="5" fill="none"/>` + pos.map(([x, y], i) =>
          `<g>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${x + 6 * Math.cos(a * Math.PI / 180)}" cy="${y + 6 * Math.sin(a * Math.PI / 180)}" r="5" fill="${cols[i]}" ${line(1.5)}/>`).join("")}<circle cx="${x}" cy="${y}" r="3.5" fill="#d9a03b"/></g>`).join("");
      }
      case "circlet": return `<path d="M88,124 C110,104 190,104 212,124" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M88,124 C110,104 190,104 212,124" stroke="${gold}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M150,100 L158,110 L150,120 L142,110Z" fill="${col}" ${line(2)}/>`;
      case "wizard": return `<path d="M96,92 C118,70 132,30 160,8 C168,4 186,6 196,20 C182,16 172,22 170,34 C172,56 186,76 206,92Z" fill="${col}" ${line()}/>
        <path d="M104,86 C130,78 172,78 198,86" stroke="${gold}" stroke-width="7" fill="none"/>
        <ellipse cx="150" cy="94" rx="96" ry="16" fill="${d}" ${line()}/>
        <path d="M150,40 L153,47 L160,48 L155,53 L156,60 L150,56 L144,60 L145,53 L140,48 L147,47Z" fill="#f1dca4"/>`;
      case "hood": return `<path d="M88,186 C80,104 114,66 150,66 C186,66 220,104 212,186" stroke="${INK}" stroke-width="20" fill="none" stroke-linecap="round"/>
        <path d="M88,186 C80,104 114,66 150,66 C186,66 220,104 212,186" stroke="${col}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M150,50 C160,48 176,54 184,62" stroke="${shade(col, 0.25)}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      case "band": return `<path d="M86,128 C108,112 192,112 214,128" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M86,128 C108,112 192,112 214,128" stroke="${col}" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M212,126 C226,136 230,152 226,168 M214,128 C232,132 240,146 242,160" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      default: return "";
    }
  }

  function extras(c) {
    let out = "";
    if (c.extra === "glasses" || c.extra === "both") {
      out += both(`<circle cx="122" cy="158" r="18" fill="#ffffff" fill-opacity=".18" stroke="#8a6b2e" stroke-width="3.5"/>`)
        + `<path d="M140,156 C146,150 154,150 160,156" stroke="#8a6b2e" stroke-width="3.5" fill="none"/>`
        + both(`<path d="M104,154 L92,150" stroke="#8a6b2e" stroke-width="3.5" stroke-linecap="round"/>`);
    }
    if ((c.extra === "earring" || c.extra === "both") && c.ears !== "none" && c.headwear !== "hood") {
      out += `<circle cx="${c.ears === "human" ? 90 : 93}" cy="${c.ears === "human" ? 182 : 182}" r="5" fill="none" stroke="#e0c472" stroke-width="3"/>
        <circle cx="${c.ears === "human" ? 90 : 93}" cy="190" r="3" fill="#7d2222"/>`;
    }
    return out;
  }

  /* ---------- Render ---------- */
  function render(cfg, opts = {}) {
    const c = Object.assign({}, DEFAULTS, cfg || {});
    const hooded = c.headwear === "hood";
    const parts = [
      backdrop(c),
      hooded ? hoodBack(c) : "",
      hooded && !["long", "braids"].includes(c.hairStyle) ? "" : hairBack(c),
      body(c),
      hooded ? "" : ears(c),
      head(c),
      marks(c),
      eyes(c),
      brows(c),
      nose(c),
      mouth(c),
      facialHair(c),
      hooded && c.hairStyle === "mohawk" ? "" : hairFront(c),
      hooded ? "" : horns(c),
      hooded ? "" : animalEars(c),
      headwear(c),
      extras(c)
    ];
    const size = opts.size ? `width="${opts.size}" height="${Math.round(opts.size * H / W)}"` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" ${size} role="img" aria-label="Retrato del personaje">${parts.join("")}</svg>`;
  }

  function random() {
    const o = {};
    for (const [k, list] of Object.entries(OPTIONS)) o[k] = pick(list)[0];
    o.skin = pick(SKIN.slice(0, 7))[0];
    if (Math.random() < 0.25) o.skin = pick(SKIN)[0];
    o.hair = pick(HAIR)[0]; o.eye = pick(EYES)[0]; o.cloth = pick(CLOTH)[0]; o.horn = pick(HORN)[0]; o.bg = pick(BG)[0];
    // fantasía con moderación
    if (Math.random() < 0.7) o.horns = "none";
    if (Math.random() < 0.75) o.animalEars = "none";
    if (Math.random() < 0.6) o.facialHair = "none";
    if (Math.random() < 0.4) o.headwear = "none";
    return o;
  }

  // Sugerencias por raza (se aplican al elegir raza si la jugadora aún no ha tocado el retrato)
  const RACE_HINTS = {
    elf: { ears: "elf" }, "half-elf": { ears: "elf" }, tiefling: { horns: "curved", skin: SKIN[7][0], horn: HORN[1][0] },
    dragonborn: { horns: "dragon", marks: "scales", ears: "none" }, tabaxi: { animalEars: "cat", marks: "whiskers", eyes: "cat", ears: "none" },
    harengon: { animalEars: "rabbit", ears: "none" }, goliath: { skin: SKIN[11][0], marks: "scar" }, firbolg: { ears: "long", skin: SKIN[9][0] },
    aasimar: { marks: "star", eyes: "sparkle" }, tortle: { marks: "scales", skin: SKIN[10][0], ears: "none" },
    dwarf: { facialHair: "beard" }, gnome: { ears: "elf", eyes: "sparkle" }, "half-orc": { mouth: "fang", skin: SKIN[10][0] }
  };

  // Convierte el SVG a PNG (data URL) para el PDF y para descargar
  function toPng(cfg, size = 600) {
    return new Promise((resolve, reject) => {
      const svg = render(cfg, { size });
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = Math.round(size * H / W);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    });
  }

  window.Avatar = { render, random, toPng, OPTIONS, COLORS, DEFAULTS, RACE_HINTS, W, H };
})();
