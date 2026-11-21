(() => {
  "use strict";

  const STEPS = ["Nombre", "Raza", "Clase", "Conjuros", "Trasfondo", "Personalidad", "Retrato", "Historia", "Pergamino"];
  const STEP = { name: 0, race: 1, cls: 2, spells: 3, bg: 4, persona: 5, portrait: 6, story: 7, sheet: 8 };
  const OPTIONAL = [STEP.spells, STEP.persona, STEP.portrait, STEP.story];
  const STORAGE_KEY = "forja-heroes-v1";
  const STORY_PROMPTS = [
    "¿De dónde viene tu personaje?",
    "¿Quién es la persona más importante de su vida?",
    "¿Qué le empujó a la aventura?",
    "¿Qué es lo que más teme?",
    "¿Qué secreto guarda?",
    "¿Qué sueña con conseguir?"
  ];

  const blank = () => ({ step: 0, name: "", player: "", race: null, subrace: null, raceChoice: null, cls: null, equip: [], skills: [], subclass: null,
    spells: { cantrips: [], lvl1: [], race: null }, bg: null,
    persona: { traits: ["", ""], ideal: "", bond: "", flaw: "", alignment: null, languages: [] },
    avatar: null, portraitImg: null, portraitMode: "picrew", story: "" });
  let state = load() || blank();

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const findRace = (id) => RACES.find((r) => r.id === id);
  const findClass = (id) => CLASSES.find((c) => c.id === id);
  const findBg = (id) => BACKGROUNDS.find((b) => b.id === id);
  const sourceName = (s) => SOURCES[s] || s;

  /* ---------- Persistencia (solo comodidad, puede fallar) ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw), base = blank();
      const st = Object.assign(base, data);
      st.spells = Object.assign(blank().spells, data.spells || {});
      st.persona = Object.assign(blank().persona, data.persona || {});
      if (st.step >= STEPS.length) st.step = 0;
      return st;
    } catch { return null; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* sin almacenamiento */ }
  }

  /* ---------- Stepper ---------- */
  function stepDone(i) {
    switch (i) {
      case STEP.name: return state.name.trim().length > 0;
      case STEP.race: return raceComplete();
      case STEP.cls: return classComplete(state.cls, state.skills, state.subclass);
      case STEP.spells: return !!state.cls && spellsComplete();
      case STEP.bg: return !!state.bg;
      case STEP.persona: return personaFilled();
      case STEP.portrait: return !!(state.portraitImg || state.avatar);
      case STEP.story: return state.story.trim().length > 0;
      default: return false;
    }
  }
  function raceComplete() {
    const r = findRace(state.race);
    if (!r) return false;
    if (r.subraces && !state.subrace) return false;
    if (r.choices && !state.raceChoice) return false;
    return true;
  }

  function renderStepper() {
    $("#stepper").innerHTML = STEPS.map((s, i) => `
      <button type="button" data-goto="${i}" class="${i === state.step ? "active" : ""} ${stepDone(i) ? "done" : ""}">
        <span class="num">${stepDone(i) && i !== state.step ? "✓" : i + 1}</span><span class="label">${s}</span>
      </button>`).join("");
  }

  function goTo(i) {
    state.step = Math.max(0, Math.min(STEPS.length - 1, i));
    save();
    document.querySelectorAll(".step").forEach((el) => el.classList.toggle("active", +el.dataset.step === state.step));
    if (state.step === STEP.spells) renderSpells();
    if (state.step === STEP.persona) renderPersona();
    if (state.step === STEP.portrait) renderPortrait();
    if (state.step === STEP.sheet) renderSheet();
    renderStepper();
    renderFooter();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderFooter() {
    $("#prevBtn").style.visibility = state.step === 0 ? "hidden" : "visible";
    const next = $("#nextBtn");
    next.style.visibility = state.step === STEPS.length - 1 ? "hidden" : "visible";
    const canNext = OPTIONAL.includes(state.step) || stepDone(state.step);
    next.disabled = !canNext;
    next.textContent = state.step === STEP.story ? "Ver pergamino →" : "Siguiente →";

    const r = findRace(state.race), c = findClass(state.cls), b = findBg(state.bg);
    const parts = [];
    if (state.name.trim()) parts.push(`<b>${esc(state.name.trim())}</b>`);
    if (r) parts.push(esc(raceLabel()));
    if (c) parts.push(esc(c.name));
    if (b) parts.push(esc(b.name));
    $("#selectionSummary").innerHTML = parts.join(" · ");
  }

  function raceLabel() {
    const r = findRace(state.race);
    if (!r) return "";
    const sub = r.subraces?.find((s) => s.id === state.subrace);
    const ch = r.choices?.find((x) => x.id === state.raceChoice);
    if (sub && r.subraces.length > 1) return sub.name;
    if (ch) return `${r.name} (${ch.name.toLowerCase()})`;
    return r.name;
  }

  /* ---------- Cartas ---------- */
  function cardHTML(kind, item, selected, chips) {
    return `
      <button type="button" class="card ${selected ? "selected" : ""}" data-kind="${kind}" data-id="${item.id}">
        ${selected ? '<span class="seal">Elegida</span>' : ""}
        <div class="card-head">
          <div class="glyph" aria-hidden="true">${esc(item.glyph)}</div>
          <div>
            <div class="card-title">${esc(item.name)}</div>
            <div class="card-en">${esc(item.en)}</div>
          </div>
        </div>
        <p class="card-text">${esc(item.intro)}</p>
        <div class="chips">${chips.map(([t, cls]) => `<span class="chip ${cls || ""}">${esc(t)}</span>`).join("")}</div>
        <div class="card-more">Leer más ›</div>
      </button>`;
  }

  function renderGrids() {
    $("#raceGrid").innerHTML = RACES.map((r) => cardHTML("race", r, state.race === r.id, [
      [r.source, "wine"], [shortAsi(r.asi)], [r.size.split(" (")[0]]
    ])).join("");
    $("#classGrid").innerHTML = CLASSES.map((c) => cardHTML("class", c, state.cls === c.id, [
      ["Dado " + c.hitDie, "wine"], [c.primary], c.caster ? ["✦ Magia", "green"] : ["⚔ Marcial"]
    ])).join("");
    $("#bgGrid").innerHTML = BACKGROUNDS.map((b) => cardHTML("bg", b, state.bg === b.id, [
      [b.source === "PHB" ? "PHB" : b.source, "wine"], ...b.skills.replace(/^Elige 2: /, "").split(/, | o /).slice(0, 2).map((s) => [s])
    ])).join("");
  }

  function shortAsi(asi) {
    return asi.startsWith("Una característica") ? "+2 / +1 a elegir" : asi;
  }

  /* ---------- Modal de detalle ---------- */
  let modalCtx = null;

  function rows(pairs) {
    return `<table class="stat-table">${pairs.filter(([, v]) => v).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>`;
  }
  function traitsHTML(list) {
    return list.map((t) => `<p class="trait"><b>${esc(t.n)}.</b> ${esc(t.d)}</p>`).join("");
  }
  function headHTML(item, extra) {
    return `<div class="modal-head"><div class="glyph" aria-hidden="true">${esc(item.glyph)}</div>
      <div><h3 id="modalTitle">${esc(item.name)}</h3><div class="card-en">${esc(item.en)} · ${esc(extra)}</div></div></div>`;
  }

  function openModal(kind, id) {
    const pre = {
      subrace: kind === "race" && state.race === id ? state.subrace : null,
      choice: kind === "race" && state.race === id ? state.raceChoice : null,
      equip: kind === "class" ? normalizePicks(id, state.cls === id ? state.equip : []) : [],
      skills: kind === "class" && state.cls === id ? state.skills.slice() : [],
      subclass: kind === "class" && state.cls === id ? state.subclass : null
    };
    modalCtx = { kind, id, ...pre };
    renderModal();
    $("#modal").hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalChoose").focus({ preventScroll: true });
  }

  function closeModal() {
    $("#modal").hidden = true;
    document.body.style.overflow = "";
    modalCtx = null;
  }

  function renderModal() {
    const { kind, id } = modalCtx;
    let html = "";
    let ready = true;
    let warn = "";

    if (kind === "race") {
      const r = findRace(id);
      html += headHTML(r, sourceName(r.source));
      html += `<p class="modal-intro">${esc(r.intro)}</p>`;
      html += rows([["Aumento de características", r.asi], ["Tamaño", r.size], ["Velocidad", r.speed]]);
      html += `<div class="section-title">Rasgos</div>${traitsHTML(r.traits)}`;

      if (r.subraces) {
        if (r.subraces.length > 1) {
          html += `<div class="section-title">Elige una subraza</div><div class="options">` +
            r.subraces.map((s) => `<button type="button" class="option ${modalCtx.subrace === s.id ? "selected" : ""}" data-sub="${s.id}">
              <strong>${esc(s.name)}</strong><small>${esc(s.asi)}</small></button>`).join("") + `</div>`;
        } else if (!modalCtx.subrace) {
          modalCtx.subrace = r.subraces[0].id;
        }
        const s = r.subraces.find((x) => x.id === modalCtx.subrace);
        if (s) {
          html += `<div class="sub-detail"><p class="trait"><b>${esc(s.name)}</b> <i>(${esc(s.en)})</i>. ${esc(s.intro)}</p>
            <p class="trait"><b>Aumento de características.</b> ${esc(s.asi)}</p>${traitsHTML(s.traits)}</div>`;
        } else { ready = false; warn = "Elige una subraza para continuar."; }
      }
      if (r.choices) {
        html += `<div class="section-title">${esc(r.choiceLabel)}</div><div class="options">` +
          r.choices.map((c) => `<button type="button" class="option ${modalCtx.choice === c.id ? "selected" : ""}" data-choice="${c.id}">
            <strong>${esc(c.name)}</strong><small>${esc(c.d)}</small></button>`).join("") + `</div>`;
        if (!modalCtx.choice) { ready = false; warn = `Elige tu ${r.choiceLabel.toLowerCase()} para continuar.`; }
      }
    }

    if (kind === "class") {
      const c = findClass(id);
      html += headHTML(c, c.caster ? "Lanza conjuros" : "Clase marcial");
      html += `<p class="modal-intro">${esc(c.intro)}</p>`;
      html += rows([
        ["Característica principal", c.primary],
        ["Dado de golpe", `${c.hitDie} por nivel`],
        ["Salvaciones", c.saves],
        ["Armaduras", c.armor],
        ["Armas", c.weapons],
        ["Herramientas", c.tools],
        ["Habilidades", c.skills]
      ]);
      html += `<div class="section-title">Rasgos de nivel 1</div><div class="chips">${c.features.map((f) => `<span class="chip">${esc(f)}</span>`).join("")}</div>`;

      // Habilidades de clase
      const cs = CLASS_SKILLS[id];
      if (cs) {
        const from = cs.from || SKILLS.map((x) => x[0]);
        const have = raceSkills();
        const n = modalCtx.skills.length;
        html += `<div class="section-title">Habilidades <span class="count-pill ${n === cs.n ? "ok" : ""}">${n} / ${cs.n}</span></div>
          <p class="hint" style="margin:0 0 10px">Elige ${cs.n}. Serás competente en ellas (sumas tu bonificador de competencia).</p>
          <div class="skill-grid">${from.map((sk) => {
            const on = modalCtx.skills.includes(sk);
            const lock = !on && n >= cs.n;
            const abil = (SKILLS.find((x) => x[0] === sk) || [, ""])[1];
            return `<button type="button" class="skill ${on ? "selected" : ""} ${lock ? "locked" : ""}" data-skill="${esc(sk)}">
              <span>${esc(sk)}</span><small>${esc(abil)}${have.includes(sk) ? " · ya la tienes por tu raza" : ""}</small></button>`;
          }).join("")}</div>`;
        if (n !== cs.n) { ready = false; warn = `Elige ${cs.n} habilidades para continuar.`; }
      }

      // Subclase de nivel 1 (dominio / patrón)
      const sc = SUBCLASSES[id];
      if (sc) {
        html += `<div class="section-title">${esc(sc.label)}</div><p class="hint" style="margin:0 0 10px">${esc(sc.hint)}</p>
          <div class="options">${sc.options.map((o) => `<button type="button" class="option ${modalCtx.subclass === o.id ? "selected" : ""}" data-subcls="${o.id}">
            <strong>${esc(o.name)}</strong><small>${esc(o.en)}${o.src !== "PHB" ? " · " + esc(o.src) : ""}</small></button>`).join("")}</div>`;
        const o = sc.options.find((x) => x.id === modalCtx.subclass);
        if (o) {
          html += `<div class="sub-detail"><p class="trait"><i>${esc(o.intro)}</i></p>
            ${o.spells && o.spells !== "—" ? `<p class="trait"><b>Conjuros adicionales.</b> ${esc(o.spells)}</p>` : ""}
            ${o.feats.map(([n2, d]) => `<p class="trait"><b>${esc(n2)}.</b> ${esc(d)}</p>`).join("")}</div>`;
        } else if (ready) { ready = false; warn = `Elige tu ${sc.label.toLowerCase()} para continuar.`; }
      }

      const eq = CLASS_EQUIPMENT[id];
      if (eq) {
        html += `<div class="section-title">Equipo inicial</div>
          <p class="hint" style="margin:0 0 10px">Además del equipo de tu trasfondo. Donde haya opciones, elige una.</p>`;
        eq.items.forEach((item, i) => {
          if (Array.isArray(item)) {
            html += `<div class="options equip-options">` + item.map((opt, j) =>
              `<button type="button" class="option ${modalCtx.equip[i] === j ? "selected" : ""}" data-eq="${i}" data-opt="${j}">
                <small>(${"abc"[j]})</small> <strong>${esc(opt)}</strong></button>`).join("") + `</div>`;
          } else {
            html += `<p class="trait equip-fixed">✦ ${esc(item)}</p>`;
          }
        });
        if (eq.alt) html += `<p class="hint" style="margin-top:6px">${esc(eq.alt)}</p>`;
      }
    }

    if (kind === "bg") {
      const b = findBg(id);
      html += headHTML(b, sourceName(b.source));
      html += `<p class="modal-intro">${esc(b.intro)}</p>`;
      html += rows([
        ["Habilidades", b.skills],
        ["Herramientas", b.tools],
        ["Idiomas", b.languages],
        ["Equipo", b.equipment]
      ]);
      html += `<div class="section-title">Rasgo: ${esc(b.feature.n)}</div><p class="trait">${esc(b.feature.d)}</p>`;
    }

    if (warn) html += `<p class="modal-warning">${esc(warn)}</p>`;
    $("#modalBody").innerHTML = html;
    const btn = $("#modalChoose");
    btn.disabled = !ready;
    const current = (kind === "race" && state.race === id) || (kind === "class" && state.cls === id) || (kind === "bg" && state.bg === id);
    btn.textContent = current ? "Guardar elección" : "Elegir ✓";
  }

  function chooseFromModal() {
    const { kind, id } = modalCtx;
    if (kind === "race") {
      state.race = id; state.subrace = modalCtx.subrace || null; state.raceChoice = modalCtx.choice || null;
      if (!raceSpellPick()) state.spells.race = null;
    }
    if (kind === "class") {
      if (state.cls !== id) { state.spells.cantrips = []; state.spells.lvl1 = []; }
      state.cls = id; state.equip = modalCtx.equip.slice();
      state.skills = modalCtx.skills.slice(); state.subclass = modalCtx.subclass;
    }
    if (kind === "bg") state.bg = id;
    save();
    closeModal();
    renderGrids();
    renderStepper();
    renderFooter();
  }

  /* ---------- Conjuros ---------- */
  const spellInfo = () => (typeof CLASS_SPELLCASTING !== "undefined" ? CLASS_SPELLCASTING[state.cls] : null);

  // Truco extra por raza (alto elfo: un truco de la lista de mago)
  function raceSpellPick() {
    if (state.race === "elf" && state.subrace === "high") {
      return { label: "Truco de alto elfo", hint: "Conoces un truco a tu elección de la lista de mago. Usas Inteligencia para lanzarlo.", list: CLASS_SPELL_LISTS.wizard[0], max: 1 };
    }
    return null;
  }

  function pickConfig() {
    const info = spellInfo();
    const groups = [];
    if (info && !info.later) {
      const lists = CLASS_SPELL_LISTS[state.cls];
      groups.push({ key: "cantrips", title: "Trucos", hint: `Conoces ${info.cantrips} trucos. Se lanzan a voluntad, sin gastar espacios.`, list: lists[0], max: info.cantrips, exact: true });
      const lvlHint = info.mode === "known" ? `Elige ${info.max}.`
        : info.mode === "spellbook" ? "Elige 6 para tu libro de conjuros."
        : `Elige entre 1 y ${info.max} según tu modificador de ${info.ability} (pregunta a tu DM si no lo sabes).`;
      groups.push({ key: "lvl1", title: info.mode === "spellbook" ? "Libro de conjuros (nivel 1)" : "Conjuros de nivel 1", hint: lvlHint, list: lists[1], max: info.max, exact: info.mode !== "prepared" });
    }
    const rp = raceSpellPick();
    if (rp) groups.push({ key: "race", title: rp.label, hint: rp.hint, list: rp.list, max: rp.max, exact: true });
    return groups;
  }

  function picked(key) {
    if (key === "race") return state.spells.race ? [state.spells.race] : [];
    return state.spells[key] || [];
  }

  function spellsComplete() {
    return pickConfig().every((g) => {
      const n = picked(g.key).length;
      return g.exact ? n === g.max : n >= 1 && n <= g.max;
    });
  }

  function spellCardHTML(key, slug, on, full) {
    const sp = SPELLS[slug];
    const tags = [sp.school, sp.time, sp.range, sp.dur];
    return `<button type="button" class="spell ${on ? "selected" : ""} ${!on && full ? "locked" : ""}" data-pick="${key}" data-slug="${slug}" data-search="${esc((sp.es + " " + sp.en).toLowerCase())}" aria-pressed="${on}">
      <span class="spell-check" aria-hidden="true">${on ? "✦" : ""}</span>
      <span class="spell-name">${esc(sp.es)}</span>
      <span class="spell-en">${esc(sp.en)}${sp.src !== "PHB" ? " · " + esc(sp.src) : ""}</span>
      <span class="spell-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}${sp.conc ? '<span class="tag-c">Concentración</span>' : ""}${sp.ritual ? '<span class="tag-r">Ritual</span>' : ""}</span>
      <span class="spell-desc">${esc(sp.d)}</span>
    </button>`;
  }

  function renderSpells() {
    const box = $("#spellPicker");
    const c = findClass(state.cls);
    const info = spellInfo();
    const groups = pickConfig();
    let html = "";

    if (!c) {
      $("#spellIntro").textContent = "Primero elige una clase.";
      box.innerHTML = `<div class="scroll-panel"><p class="hint" style="text-align:center">Vuelve al paso de clase y elige una para ver sus conjuros.</p></div>`;
      return;
    }
    if (!info || info.later) {
      $("#spellIntro").textContent = info?.later || `Los ${c.name.toLowerCase()}s no lanzan conjuros de clase a nivel 1.`;
      if (!groups.length) {
        box.innerHTML = `<div class="scroll-panel"><p style="text-align:center;margin:0">⚔ ${esc(info?.later || "Tu clase no usa conjuros.")} Puedes pasar al siguiente paso.</p>
          <p class="hint" style="text-align:center">Si tu raza te da algún conjuro (como el Legado infernal del tiefling), ya aparece en sus rasgos.</p></div>`;
        return;
      }
    } else {
      $("#spellIntro").textContent = `Como ${c.name.toLowerCase()}, lanzas conjuros con ${info.ability}.`;
      html += `<div class="scroll-panel spell-rules">
        <dl class="mini-dl">
          <dt>Característica</dt><dd>${esc(info.ability)}</dd>
          <dt>Espacios de nivel 1</dt><dd>${info.slots}</dd>
          <dt>Trucos</dt><dd>${info.cantrips}</dd>
        </dl>
        <p class="hint">${esc(info.rule)}</p>
      </div>`;
    }

    groups.forEach((g) => {
      const sel = picked(g.key);
      const full = sel.length >= g.max;
      html += `<section class="spell-group" data-group="${g.key}">
        <div class="spell-group-head">
          <div><h3>${esc(g.title)}</h3><p class="hint">${esc(g.hint)}</p></div>
          <div class="spell-count ${(g.exact ? sel.length === g.max : sel.length >= 1) ? "ok" : ""}">${sel.length} / ${g.max}</div>
        </div>
        ${g.list.length > 8 ? `<input type="search" class="spell-search" data-search-for="${g.key}" placeholder="Buscar conjuro…" aria-label="Buscar en ${esc(g.title)}">` : ""}
        <div class="spell-grid">${g.list.map((slug) => spellCardHTML(g.key, slug, sel.includes(slug), full)).join("")}</div>
      </section>`;
    });
    box.innerHTML = html;
  }

  function toggleSpell(key, slug) {
    const g = pickConfig().find((x) => x.key === key);
    if (!g) return;
    if (key === "race") {
      state.spells.race = state.spells.race === slug ? null : slug;
    } else {
      const arr = state.spells[key];
      const i = arr.indexOf(slug);
      if (i >= 0) arr.splice(i, 1);
      else if (arr.length < g.max) arr.push(slug);
      else return;
    }
    save();
    // Actualiza solo esa sección para no perder la búsqueda ni el scroll
    const sec = document.querySelector(`.spell-group[data-group="${key}"]`);
    const sel = picked(key);
    const full = sel.length >= g.max;
    sec.querySelectorAll(".spell").forEach((b) => {
      const on = sel.includes(b.dataset.slug);
      b.classList.toggle("selected", on);
      b.classList.toggle("locked", !on && full);
      b.setAttribute("aria-pressed", on);
      b.querySelector(".spell-check").textContent = on ? "✦" : "";
    });
    const cnt = sec.querySelector(".spell-count");
    cnt.textContent = `${sel.length} / ${g.max}`;
    cnt.classList.toggle("ok", g.exact ? sel.length === g.max : sel.length >= 1);
    renderStepper();
  }

  function sheetSpellsHTML() {
    const info = spellInfo();
    const cls = info && !info.later ? state.spells : null;
    const race = raceSpellPick() && state.spells.race ? state.spells.race : null;
    if (!cls && !race) return "";
    const item = (slug) => {
      const sp = SPELLS[slug];
      return `<p class="trait"><b>${esc(sp.es)}</b> <i>(${esc(sp.en)})</i> — ${esc(sp.time)} · ${esc(sp.range)} · ${esc(sp.dur)}. ${esc(sp.d)}</p>`;
    };
    const cantrips = (cls ? cls.cantrips : []).slice();
    let head = "";
    if (cls) {
      head = `<dl class="spell-dl">
          <dt>Característica</dt><dd>${esc(info.ability)}</dd>
          <dt>Espacios de nivel 1</dt><dd>${info.slots}</dd>
          <dt>CD de salvación</dt><dd>8 + bonificador de competencia (+2) + mod. de ${esc(info.ability)}</dd>
          <dt>Ataque de conjuro</dt><dd>bonificador de competencia (+2) + mod. de ${esc(info.ability)}</dd>
        </dl>`;
    }
    return `<div class="sheet-section sheet-spells">
        <h4>Conjuros</h4>
        ${head}
        <div class="sheet-cols" style="margin-top:8px">
          <div>
            <div class="sheet-sub">Trucos</div>
            ${cantrips.map(item).join("")}
            ${race ? `<div class="sheet-sub">Truco de alto elfo (Inteligencia)</div>${item(race)}` : ""}
            ${!cantrips.length && !race ? '<p class="trait"><i>Sin elegir</i></p>' : ""}
          </div>
          <div>
            ${cls ? `<div class="sheet-sub">${info.mode === "spellbook" ? "Libro de conjuros (nivel 1)" : info.mode === "prepared" ? "Conjuros preparados (nivel 1)" : "Conjuros conocidos (nivel 1)"}</div>
            ${cls.lvl1.map(item).join("") || '<p class="trait"><i>Sin elegir</i></p>'}` : ""}
          </div>
        </div>
      </div>`;
  }

  /* ---------- Clase: habilidades y subclase ---------- */
  function classComplete(clsId, skills, subclass) {
    if (!clsId) return false;
    const cs = CLASS_SKILLS[clsId];
    if (cs && (skills || []).length !== cs.n) return false;
    if (SUBCLASSES[clsId] && !subclass) return false;
    return true;
  }
  const raceSkills = () => RACE_SKILLS[state.race] || [];
  const bgSkills = () => {
    const b = findBg(state.bg);
    if (!b || b.skills.startsWith("Elige")) return [];
    return b.skills.split(", ");
  };
  const subclassInfo = () => SUBCLASSES[state.cls]?.options.find((o) => o.id === state.subclass) || null;

  /* ---------- Personalidad (opcional) ---------- */
  const PERSONA_CATS = [
    ["traits", "Rasgos de personalidad", "Elige hasta dos."],
    ["ideal", "Ideal", "Lo que más valora tu personaje."],
    ["bond", "Vínculo", "Una persona, lugar o causa que le importa."],
    ["flaw", "Defecto", "Una debilidad o un vicio."]
  ];

  function personaFilled() {
    const p = state.persona;
    return !!(p.traits.some((t) => t.trim()) || p.ideal.trim() || p.bond.trim() || p.flaw.trim() || p.alignment || p.languages.length);
  }

  function knownLanguages() {
    const r = findRace(state.race), b = findBg(state.bg);
    const out = [];
    const rl = r?.traits.find((t) => t.n === "Idiomas");
    if (rl) out.push(["Raza", rl.d]);
    if (b && b.languages !== "Ninguno") out.push(["Trasfondo", b.languages]);
    const sc = subclassInfo();
    if (sc && /idiomas/i.test(sc.feats.map((f) => f[1]).join(" "))) out.push([SUBCLASSES[state.cls].label, "Dos idiomas a tu elección"]);
    return out;
  }

  function renderPersona() {
    const b = findBg(state.bg);
    const tables = b ? PERSONALITY[b.id] : null;
    const p = state.persona;
    let html = "";

    if (!tables) {
      html += `<div class="scroll-panel"><p class="hint" style="text-align:center;margin:0">Elige primero un trasfondo para ver sus ideas de personalidad. Mientras, puedes escribir las tuyas.</p></div>`;
    }
    html += `<div class="persona-grid">`;
    PERSONA_CATS.forEach(([key, title, hint]) => {
      const list = tables ? tables[key === "traits" ? "traits" : key + "s"] : [];
      const values = key === "traits" ? p.traits : [p[key]];
      html += `<section class="persona-card" data-cat="${key}">
        <div class="persona-head">
          <div><h3>${esc(title)}</h3><p class="hint">${esc(hint)}</p></div>
          ${list.length ? `<button type="button" class="dice-btn" data-roll="${key}" title="Tirar d${list.length}">🎲 d${list.length}</button>` : ""}
        </div>
        ${values.map((v, i) => `<textarea class="persona-input" rows="2" data-cat="${key}" data-idx="${i}" placeholder="${key === "traits" ? `Rasgo ${i + 1}` : "Escribe el tuyo o elige uno abajo"}">${esc(v)}</textarea>`).join("")}
        ${list.length ? `<ol class="persona-list">${list.map((t, i) => {
          const on = values.includes(t);
          return `<li><button type="button" class="persona-opt ${on ? "selected" : ""}" data-cat="${key}" data-opt="${i}"><span class="die">${i + 1}</span>${esc(t)}</button></li>`;
        }).join("")}</ol>` : ""}
      </section>`;
    });
    html += `</div>`;

    // Alineamiento
    html += `<section class="persona-card wide">
      <div class="persona-head"><div><h3>Alineamiento</h3><p class="hint">Opcional. La brújula moral de tu personaje.</p></div></div>
      <div class="align-grid">${ALIGNMENTS.map(([id, name, d]) => `<button type="button" class="align ${p.alignment === id ? "selected" : ""}" data-align="${id}">
        <strong>${esc(name)}</strong><small>${esc(d)}</small></button>`).join("")}</div>
    </section>`;

    // Idiomas
    const known = knownLanguages();
    html += `<section class="persona-card wide">
      <div class="persona-head"><div><h3>Idiomas</h3><p class="hint">Opcional. Marca los idiomas que habla tu personaje.</p></div></div>
      ${known.length ? `<ul class="known-langs">${known.map(([src, t]) => `<li><b>${esc(src)}:</b> ${esc(t)}</li>`).join("")}</ul>` : ""}
      <div class="lang-group"><span class="lang-label">Estándar</span>${LANGUAGES.standard.map((l) => langBtn(l)).join("")}</div>
      <div class="lang-group"><span class="lang-label">Exóticos</span>${LANGUAGES.exotic.map((l) => langBtn(l)).join("")}</div>
    </section>`;

    $("#personaBox").innerHTML = html;
    document.querySelectorAll(".persona-input").forEach(autoGrow);
  }
  function autoGrow(ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 4 + "px"; }
  const langBtn = (l) => `<button type="button" class="lang ${state.persona.languages.includes(l) ? "selected" : ""}" data-lang="${esc(l)}">${esc(l)}</button>`;

  function setPersona(cat, text, idx) {
    const p = state.persona;
    if (cat === "traits") {
      const i = p.traits.indexOf(text);
      if (idx != null) p.traits[idx] = text;
      else if (i >= 0) p.traits[i] = "";
      else {
        const empty = p.traits.findIndex((t) => !t.trim());
        p.traits[empty >= 0 ? empty : 1] = text;
      }
    } else {
      p[cat] = idx == null && p[cat] === text ? "" : text;
    }
    save();
  }

  function personaClick(e) {
    const opt = e.target.closest(".persona-opt");
    const roll = e.target.closest("[data-roll]");
    const al = e.target.closest("[data-align]");
    const lg = e.target.closest("[data-lang]");
    const tables = PERSONALITY[state.bg];
    if (opt && tables) {
      const cat = opt.dataset.cat;
      setPersona(cat, tables[cat === "traits" ? "traits" : cat + "s"][+opt.dataset.opt]);
    } else if (roll && tables) {
      const cat = roll.dataset.roll;
      const list = tables[cat === "traits" ? "traits" : cat + "s"];
      let pickIdx = Math.floor(Math.random() * list.length);
      if (cat === "traits") { // evita repetir el que ya está
        const cur = state.persona.traits;
        let tries = 0;
        while (cur.includes(list[pickIdx]) && tries++ < 20) pickIdx = Math.floor(Math.random() * list.length);
        const empty = cur.findIndex((t) => !t.trim());
        state.persona.traits[empty >= 0 ? empty : 0] = list[pickIdx];
        save();
      } else setPersona(cat, list[pickIdx], 0);
      roll.classList.remove("rolling"); void roll.offsetWidth; roll.classList.add("rolling");
    } else if (al) {
      state.persona.alignment = state.persona.alignment === al.dataset.align ? null : al.dataset.align; save();
    } else if (lg) {
      const arr = state.persona.languages, l = lg.dataset.lang, i = arr.indexOf(l);
      if (i >= 0) arr.splice(i, 1); else arr.push(l);
      save();
    } else return;
    const y = window.scrollY;
    renderPersona(); renderStepper();
    window.scrollTo(0, y);
  }

  /* ---------- Retrato ---------- */
  const AVATAR_TABS = [
    ["Cara", [["face", "Forma de la cara"], ["skin", "Tono de piel", "skin"], ["blush", "Rubor"], ["marks", "Detalles"]]],
    ["Ojos y boca", [["eyes", "Ojos"], ["eye", "Color de ojos", "eye"], ["brows", "Cejas"], ["mouth", "Boca"]]],
    ["Pelo", [["hairStyle", "Peinado"], ["hair", "Color de pelo", "hair"], ["facialHair", "Vello facial"]]],
    ["Fantasía", [["ears", "Orejas"], ["animalEars", "Orejas de animal"], ["horns", "Cuernos"], ["horn", "Color de cuernos", "horn"]]],
    ["Ropa", [["outfit", "Ropa"], ["cloth", "Color de la ropa", "cloth"], ["headwear", "Cabeza"], ["extra", "Complementos"]]],
    ["Fondo", [["bg", "Fondo", "bg"]]]
  ];
  let avatarTab = 0;

  function avatarCfg() {
    if (!state.avatar) state.avatar = Object.assign({}, Avatar.DEFAULTS, Avatar.RACE_HINTS[state.race] || {});
    return state.avatar;
  }

  function renderPortrait() {
    const mode = state.portraitMode === "draw" ? "draw" : "picrew";
    document.querySelectorAll("[data-pmode]").forEach((b) => b.classList.toggle("active", b.dataset.pmode === mode));
    $("#picrewPanel").hidden = mode !== "picrew";
    $("#drawPanel").hidden = mode !== "draw";
    $("#picrewPreview").innerHTML = state.portraitImg
      ? `<img src="${state.portraitImg}" alt="Tu retrato">`
      : `<span>Aquí aparecerá tu imagen</span>`;
    $("#portraitRemove").hidden = !state.portraitImg;
    if (mode !== "draw") return;
    const cfg = avatarCfg();
    save();
    $("#avatarPreview").innerHTML = Avatar.render(cfg);
    $("#avatarTabs").innerHTML = AVATAR_TABS.map(([t], i) => `<button type="button" role="tab" aria-selected="${i === avatarTab}" class="${i === avatarTab ? "active" : ""}" data-tab="${i}">${esc(t)}</button>`).join("");
    const [, groups] = AVATAR_TABS[avatarTab];
    $("#avatarOptions").innerHTML = groups.map(([key, label, colorKey]) => {
      if (colorKey) {
        return `<div class="av-group"><h4>${esc(label)}</h4><div class="swatches">${Avatar.COLORS[colorKey].map(([hex, name]) =>
          `<button type="button" class="swatch ${cfg[key] === hex ? "selected" : ""}" style="background:${hex}" data-av="${key}" data-val="${hex}" title="${esc(name)}" aria-label="${esc(name)}"></button>`).join("")}
          <label class="swatch custom" title="Color personalizado"><input type="color" data-avcolor="${key}" value="${cfg[key]}">✎</label></div></div>`;
      }
      return `<div class="av-group"><h4>${esc(label)}</h4><div class="av-options">${Avatar.OPTIONS[key].map(([val, name]) =>
        `<button type="button" class="av-opt ${cfg[key] === val ? "selected" : ""}" data-av="${key}" data-val="${val}">
          <span class="av-thumb">${Avatar.render(Object.assign({}, cfg, { [key]: val }), { size: 66 })}</span><span>${esc(name)}</span></button>`).join("")}</div></div>`;
    }).join("");
  }

  function setAvatar(key, val) {
    avatarCfg()[key] = val; save();
    const y = $("#avatarOptions").scrollTop;
    renderPortrait(); renderStepper();
    $("#avatarOptions").scrollTop = y;
  }

  async function downloadAvatarPng() {
    try {
      const url = await Avatar.toPng(avatarCfg(), 900);
      const a = document.createElement("a");
      a.href = url; a.download = `${fileSlug()}-retrato.png`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (err) { console.error(err); alert("No se pudo crear la imagen."); }
  }

  // Reduce la imagen subida para que quepa en el navegador y en el PDF
  function loadPortraitFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 700, k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        state.portraitImg = cv.toDataURL("image/jpeg", 0.9);
        save(); renderPortrait(); renderStepper();
      };
      img.onerror = () => alert("No se pudo leer esa imagen.");
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  const fileSlug = () => (state.name.trim() || "personaje").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "personaje";

  /* ---------- Equipo inicial ---------- */
  // Una elección por línea con opciones (por defecto la primera, (a)).
  function normalizePicks(clsId, picks) {
    const eq = CLASS_EQUIPMENT[clsId];
    if (!eq) return [];
    return eq.items.map((item, i) => {
      if (!Array.isArray(item)) return null;
      const p = Array.isArray(picks) ? picks[i] : null;
      return Number.isInteger(p) && p >= 0 && p < item.length ? p : 0;
    });
  }
  function chosenEquipment(clsId, picks) {
    const eq = CLASS_EQUIPMENT[clsId];
    if (!eq) return [];
    const norm = normalizePicks(clsId, picks);
    return eq.items.map((item, i) => (Array.isArray(item) ? item[norm[i]] : item));
  }

  /* ---------- Ficha estilo boceto ---------- */
  const PAGE_W = 794, PAGE_H = 1123;
  const SKILL_ORDER = ["Atletismo", "Acrobacias", "Juego de manos", "Sigilo", "Arcanos", "Historia", "Investigación", "Naturaleza", "Religión", "Medicina", "Percepción", "Perspicacia", "Supervivencia", "Trato con animales", "Engaño", "Interpretación", "Intimidación", "Persuasión"];
  const ABILITIES = [["Fuerza", "circle"], ["Destreza", "triangle"], ["Constitución", "rect"], ["Inteligencia", "pentagon"], ["Sabiduría", "diamond"], ["Carisma", "star"]];

  function sheetData() {
    const r = findRace(state.race), c = findClass(state.cls), b = findBg(state.bg);
    const sub = r?.subraces?.find((s) => s.id === state.subrace);
    const ch = r?.choices?.find((x) => x.id === state.raceChoice);
    const sc = c ? subclassInfo() : null;
    const profSkills = new Set([...raceSkills(), ...state.skills, ...bgSkills()]);
    const info = spellInfo();
    const classSpells = info && !info.later ? state.spells : { cantrips: [], lvl1: [] };
    const raceCantrip = raceSpellPick() && state.spells.race ? [state.spells.race] : [];
    const raceTraits = r ? [...r.traits.filter((t) => t.n !== "Idiomas"), ...(sub ? sub.traits : [])] : [];
    if (ch) raceTraits.unshift({ n: r.choiceLabel, d: `${ch.name}: ${ch.d}` });
    const langs = state.persona.languages.length ? state.persona.languages.join(", ")
      : [r?.traits.find((t) => t.n === "Idiomas")?.d, b && b.languages !== "Ninguno" ? b.languages + " (trasfondo)" : ""].filter(Boolean).join(" ");
    return { r, c, b, sub, ch, sc, profSkills, info, classSpells, raceCantrip, raceTraits, langs };
  }

  const shape = (s, cls = "", inner = "", extra = "") => `<div class="sk-shape ${cls}" data-shape="${s}" ${extra}>${inner}</div>`;

  function portraitHTML(forPdf, png) {
    const drawn = () => (forPdf && png ? `<img src="${png}" alt="">` : Avatar.render(state.avatar));
    if (state.portraitMode === "draw" && state.avatar) return drawn();
    if (state.portraitImg) return `<img src="${state.portraitImg}" alt="">`;
    if (state.avatar) return drawn();
    return `<span class="sk-hint">retrato</span>`;
  }

  function page1HTML(d, forPdf, png) {
    const { r, c, b, sc } = d;
    const name = state.name.trim();
    const hitMax = c ? c.hitDie.slice(1) : "";
    const speed = r ? r.speed.split(" (")[0].split(";")[0] : "";
    const spellsList = [...d.classSpells.cantrips.map((s) => [s, "truco"]), ...d.raceCantrip.map((s) => [s, "truco"]), ...d.classSpells.lvl1.map((s) => [s, "nv 1"])];
    const traitNames = [
      ...d.raceTraits.map((t) => t.n),
      ...(c ? c.features : []),
      ...(sc ? sc.feats.map((f) => f[0]) : []),
      ...(b ? [b.feature.n] : [])
    ];
    const tools = [c && c.tools !== "Ninguna" ? c.tools : "", b && b.tools !== "Ninguna" ? b.tools : ""].filter(Boolean).join("; ");
    const inventory = [...(c ? chosenEquipment(c.id, state.equip) : []), ...(b ? [b.equipment] : [])];
    const raceAsi = r ? r.asi + (d.sub && d.sub.asi !== r.asi ? "; " + d.sub.asi : "") : "";

    return `<div class="sk-page sk-p1">
      ${shape("rect", "sk-portrait", portraitHTML(forPdf, png))}
      <div class="sk-top">
        <div class="sk-row1">
          ${shape("sparkle", "sk-lv", `<span class="sk-lbl">Lv</span><b>1</b>`)}
          ${shape("banner", "sk-name", `<span class="sk-lbl">Nombre:</span><b>${esc(name)}</b>`)}
        </div>
        <div class="sk-row2">
          ${shape("blob", "sk-race", `<span class="sk-lbl">Raza</span><b>${esc(r ? raceLabel() : "")}</b>`)}
          ${shape("burst", "sk-bg", `<span class="sk-lbl">Trasfondo</span><b>${esc(b ? b.name : "")}</b>`)}
        </div>
        <div class="sk-row3">
          ${shape("scroll", "sk-class", `<span class="sk-lbl">Clase</span><b>${esc(c ? c.name : "")}</b>${sc ? `<small>${esc(sc.name)}</small>` : ""}`)}
          ${state.player.trim() ? `<div class="sk-player"><span class="sk-lbl">Jugadora:</span> ${esc(state.player.trim())}</div>` : ""}
        </div>
      </div>

      <div class="sk-abilities">
        ${ABILITIES.map(([n, s]) => `<div class="sk-ab">${shape(s, "sk-ab-shape", "")}<span class="sk-ab-name">${n}</span></div>`).join("")}
        ${raceAsi ? `<p class="sk-note">Raza: ${esc(raceAsi)}</p>` : ""}
      </div>

      <div class="sk-mid">
        <div class="sk-inspo">
          <div class="sk-mini">${shape("sparkle", "sk-spark", "")}<span>Inspiración</span></div>
          <div class="sk-mini">${shape("sparkle", "sk-spark", "")}<span>Proficiencia <b class="sk-prof">+2</b></span></div>
        </div>
        ${shape("rect", "sk-skills", `<ul>${SKILL_ORDER.map((sk) => `<li class="${d.profSkills.has(sk) ? "on" : ""}"><i class="dot"></i><span class="blank"></span>${esc(sk)}</li>`).join("")}</ul>`)}
      </div>

      <div class="sk-right">
        <div class="sk-stats">
          <div class="sk-stat">${shape("shield", "sk-st", "")}<span>Armadura</span></div>
          <div class="sk-stat">${shape("heart", "sk-st", c ? `<small>${hitMax} + CON</small>` : "")}<span>Vida</span></div>
          <div class="sk-stat">${shape("splat", "sk-st", "")}<span>¡Iniciativa!</span></div>
          <div class="sk-stat">${shape("boot", "sk-st", `<b>${esc(speed)}</b>`)}<span>Velocidad</span></div>
        </div>
        <div class="sk-row-saves">
          <div class="sk-death"><span class="sk-lbl">Salvación de muerte</span>
            <div>éxitos ${shape("circle", "sk-dot")}${shape("circle", "sk-dot")}${shape("circle", "sk-dot")}</div>
            <div>fallos ${shape("circle", "sk-dot")}${shape("circle", "sk-dot")}${shape("circle", "sk-dot")}</div>
          </div>
          ${shape("sword", "sk-dice", `<b>1${esc(c ? c.hitDie : "")}</b><span class="sk-lbl">Dado</span>`)}
        </div>
        ${shape("rect", "sk-box sk-attacks", `<h3>Ataques y hechizos</h3>
          ${d.info && !d.info.later ? `<p class="sk-small">Espacios de nivel 1: ${d.info.slots} · ${esc(d.info.ability)}</p>` : ""}
          <ul>${spellsList.map(([s, t]) => `<li>${esc(SPELLS[s].es)} <em>(${t})</em></li>`).join("") || '<li class="sk-empty">—</li>'}</ul>`)}
        ${shape("rect", "sk-box sk-traits", `<h3 class="sk-vert">Rasgos</h3><ul>${traitNames.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`)}
      </div>

      ${shape("rect", "sk-box sk-comp", `<h3>Competencias</h3>
        <p><b>Salvaciones:</b> ${esc(c ? c.saves : "")}</p>
        <p><b>Armaduras:</b> ${esc(c ? c.armor : "")}</p>
        <p><b>Armas:</b> ${esc(c ? c.weapons : "")}</p>
        ${tools ? `<p><b>Herramientas:</b> ${esc(tools)}</p>` : ""}
        <p><b>Idiomas:</b> ${esc(d.langs)}</p>`)}
      ${shape("rect", "sk-box sk-inv", `${shape("banner", "sk-inv-title", "<h3>Inventario</h3>")}<ul>${inventory.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`)}
    </div>`;
  }

  // Bloques de las páginas de detalle: [título de sección, [html de cada elemento]]
  function detailSections(d) {
    const out = [];
    const story = state.story.trim();
    if (story) out.push(["Historia", story.split(/\n\s*\n/).map((p) => `<p class="sk-story">${esc(p)}</p>`)]);
    const p = state.persona;
    const al = ALIGNMENTS.find((a) => a[0] === p.alignment);
    const pr = [["Alineamiento", al ? al[1] : ""], ["Rasgos", p.traits.filter((t) => t.trim()).join(" · ")], ["Ideal", p.ideal], ["Vínculo", p.bond], ["Defecto", p.flaw]].filter(([, v]) => v && v.trim());
    if (pr.length) out.push(["Personalidad", pr.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`)]);
    const traits = [
      ...d.raceTraits.map((t) => [t.n, t.d]),
      ...(d.sc ? d.sc.feats : []),
      ...(d.sc && d.sc.spells && d.sc.spells !== "—" ? [["Conjuros adicionales (" + d.sc.name + ")", d.sc.spells]] : []),
      ...(d.b ? [[d.b.feature.n + " (trasfondo)", d.b.feature.d]] : [])
    ];
    if (traits.length) out.push(["Rasgos en detalle", traits.map(([n, t]) => `<p><b>${esc(n)}.</b> ${esc(t)}</p>`)]);
    const spells = [...d.classSpells.cantrips, ...d.raceCantrip, ...d.classSpells.lvl1];
    if (spells.length) {
      const head = d.info && !d.info.later ? [`<p class="sk-small">CD de salvación = 8 + 2 + mod. de ${esc(d.info.ability)} · Ataque de conjuro = 2 + mod. de ${esc(d.info.ability)}</p>`] : [];
      out.push(["Conjuros", head.concat(spells.map((s) => {
        const sp = SPELLS[s];
        return `<p><b>${esc(sp.es)}</b> <em>(${esc(sp.en)}${sp.lvl === 0 ? ", truco" : ", nivel 1"})</em> — ${esc(sp.time)} · ${esc(sp.range)} · ${esc(sp.dur)}. ${esc(sp.d)}</p>`;
      }))]);
    }
    return out;
  }

  function newDetailPage(container) {
    const pg = document.createElement("div");
    pg.className = "sk-page sk-pn";
    pg.innerHTML = `<div class="sk-pn-head"><b>${esc(state.name.trim() || "Personaje")}</b> <span>· detalles</span></div><div class="sk-flow"></div>`;
    container.appendChild(pg);
    return pg.querySelector(".sk-flow");
  }

  // Construye todas las páginas dentro de container y reparte los bloques sin cortarlos
  async function buildSheet(container, forPdf) {
    let png = null;
    if (forPdf && state.avatar && (state.portraitMode === "draw" || !state.portraitImg)) { try { png = await Avatar.toPng(state.avatar, 600); } catch (e) { console.warn(e); } }
    // Las fuentes manuscritas solo se descargan al usarse: se fuerzan antes de medir
    if (document.fonts?.load) {
      try {
        await Promise.all(['15px "Patrick Hand"', '15px "Gloria Hallelujah"'].map((f) => document.fonts.load(f)));
        await document.fonts.ready;
      } catch { /* sin fuentes, se usa la de reserva */ }
    }
    const d = sheetData();
    container.innerHTML = page1HTML(d, forPdf, png);
    const sections = detailSections(d);
    if (sections.length) {
      let flow = newDetailPage(container);
      const fits = () => flow.scrollHeight <= flow.clientHeight + 1;
      for (const [title, items] of sections) {
        let box = null;
        const openBox = (cont) => {
          box = document.createElement("div");
          box.className = "sk-shape sk-sec";
          box.dataset.shape = "rect";
          box.innerHTML = `<h3>${esc(title)}${cont ? " (cont.)" : ""}</h3>`;
          flow.appendChild(box);
        };
        openBox(false);
        if (!fits()) { box.remove(); flow = newDetailPage(container); openBox(false); }
        for (const html of items) {
          const tmp = document.createElement("div");
          tmp.innerHTML = html;
          const el = tmp.firstElementChild;
          box.appendChild(el);
          if (!fits()) {
            el.remove();
            if (box.children.length <= 1) box.remove();
            flow = newDetailPage(container);
            openBox(true);
            box.appendChild(el);
          }
        }
      }
    }
    Sketch.apply(container);
  }

  async function renderSheet() {
    const missing = [];
    if (!state.name.trim()) missing.push("nombre");
    if (!raceComplete()) missing.push("raza");
    if (!state.cls) missing.push("clase");
    else if (!classComplete(state.cls, state.skills, state.subclass)) missing.push(SUBCLASSES[state.cls] ? "habilidades o " + SUBCLASSES[state.cls].label.toLowerCase() : "habilidades de clase");
    if (state.cls && !spellsComplete()) missing.push("conjuros");
    if (!state.bg) missing.push("trasfondo");
    if (!state.story.trim()) missing.push("historia");
    const note = $("#missingNote");
    note.hidden = missing.length === 0;
    note.textContent = missing.length ? `Te falta: ${missing.join(", ")}. Puedes descargarlo igualmente o volver atrás.` : "";
    const sheet = $("#sheet");
    sheet.style.transform = "";
    await buildSheet(sheet, false);
    fitSheet();
  }

  // Escala la vista previa en pantallas estrechas
  function fitSheet() {
    const wrap = $(".sheet-wrap"), sheet = $("#sheet");
    if (!wrap || !sheet) return;
    sheet.style.transform = ""; wrap.style.height = "";
    const avail = wrap.clientWidth - 8;
    if (avail > 0 && avail < PAGE_W) {
      const k = avail / PAGE_W;
      sheet.style.transformOrigin = "top left";
      sheet.style.transform = `scale(${k})`;
      wrap.style.height = sheet.offsetHeight * k + 30 + "px";
    }
  }

  async function downloadPdf() {
    const btn = $("#downloadPdf");
    if (typeof html2canvas === "undefined" || !window.jspdf) {
      alert("No se pudo cargar el generador de PDF. Revisa tu conexión e inténtalo de nuevo.");
      return;
    }
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = "Dibujando la ficha…";

    // Se monta a tamaño real en la esquina (0,0), detrás de la página, para que la captura no salga desplazada
    const holder = document.createElement("div");
    holder.className = "sk-export";
    const overlay = document.createElement("div");
    overlay.className = "sk-overlay";
    overlay.innerHTML = "<p>✎ Dibujando la ficha…</p>";
    const y = window.scrollY;
    document.body.appendChild(holder);
    document.body.appendChild(overlay);
    window.scrollTo(0, 0);
    try {
      await buildSheet(holder, true);
      const pdf = new window.jspdf.jsPDF({ unit: "px", format: [PAGE_W, PAGE_H], orientation: "portrait", hotfixes: ["px_scaling"] });
      const pages = [...holder.querySelectorAll(".sk-page")];
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], { scale: 2, backgroundColor: "#ffffff", useCORS: true, scrollX: 0, scrollY: 0, windowWidth: PAGE_W, width: PAGE_W, height: PAGE_H });
        if (i > 0) pdf.addPage([PAGE_W, PAGE_H], "portrait");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, PAGE_W, PAGE_H);
      }
      pdf.save(`${fileSlug()}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Algo falló al crear el PDF. Inténtalo otra vez.");
    } finally {
      holder.remove();
      overlay.remove();
      window.scrollTo(0, y);
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  /* ---------- Eventos ---------- */
  function bind() {
    $("#charName").value = state.name;
    $("#playerName").value = state.player;
    $("#story").value = state.story;
    updateCount();

    $("#charName").addEventListener("input", (e) => { state.name = e.target.value; save(); renderStepper(); renderFooter(); });
    $("#playerName").addEventListener("input", (e) => { state.player = e.target.value; save(); });
    $("#story").addEventListener("input", (e) => { state.story = e.target.value; save(); updateCount(); renderStepper(); });
    $("#charName").addEventListener("keydown", (e) => { if (e.key === "Enter" && stepDone(STEP.name)) goTo(STEP.race); });

    $("#storyPrompts").innerHTML = STORY_PROMPTS.map((p) => `<li tabindex="0">${esc(p)}</li>`).join("");
    $("#storyPrompts").addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const ta = $("#story");
      ta.value = (ta.value.trim() ? ta.value.replace(/\s*$/, "\n\n") : "") + li.textContent + " ";
      state.story = ta.value; save(); updateCount();
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
    });

    $("#stepper").addEventListener("click", (e) => {
      const b = e.target.closest("[data-goto]");
      if (b) goTo(+b.dataset.goto);
    });
    $("#prevBtn").addEventListener("click", () => goTo(state.step - 1));
    $("#nextBtn").addEventListener("click", () => goTo(state.step + 1));

    document.querySelectorAll(".card-grid").forEach((g) => g.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (card) openModal(card.dataset.kind, card.dataset.id);
    }));

    $("#modal").addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) return closeModal();
      const sub = e.target.closest("[data-sub]");
      if (sub) { modalCtx.subrace = sub.dataset.sub; renderModal(); return; }
      const sk = e.target.closest("[data-skill]");
      if (sk) {
        const name = sk.dataset.skill, arr = modalCtx.skills, max = CLASS_SKILLS[modalCtx.id].n;
        const i = arr.indexOf(name);
        if (i >= 0) arr.splice(i, 1); else if (arr.length < max) arr.push(name);
        const body = $(".modal-card"), top = body.scrollTop; renderModal(); body.scrollTop = top; return;
      }
      const scBtn = e.target.closest("[data-subcls]");
      if (scBtn) { const body = $(".modal-card"), top = body.scrollTop; modalCtx.subclass = scBtn.dataset.subcls; renderModal(); body.scrollTop = top; return; }
      const eqBtn = e.target.closest("[data-eq]");
      if (eqBtn) { modalCtx.equip[+eqBtn.dataset.eq] = +eqBtn.dataset.opt; renderModal(); return; }
      const ch = e.target.closest("[data-choice]");
      if (ch) { modalCtx.choice = ch.dataset.choice; renderModal(); }
    });
    $("#modalChoose").addEventListener("click", chooseFromModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

    $("#spellPicker").addEventListener("click", (e) => {
      const b = e.target.closest(".spell");
      if (b) toggleSpell(b.dataset.pick, b.dataset.slug);
    });
    $("#spellPicker").addEventListener("input", (e) => {
      const inp = e.target.closest(".spell-search");
      if (!inp) return;
      const q = inp.value.trim().toLowerCase();
      document.querySelectorAll(`.spell-group[data-group="${inp.dataset.searchFor}"] .spell`).forEach((b) => {
        b.hidden = q && !b.dataset.search.includes(q);
      });
    });

    $("#personaBox").addEventListener("click", personaClick);
    $("#personaBox").addEventListener("input", (e) => {
      const ta = e.target.closest(".persona-input");
      if (!ta) return;
      const cat = ta.dataset.cat;
      if (cat === "traits") state.persona.traits[+ta.dataset.idx] = ta.value; else state.persona[cat] = ta.value;
      autoGrow(ta);
      save(); renderStepper();
      // refleja qué opción coincide sin perder el foco
      ta.closest(".persona-card").querySelectorAll(".persona-opt").forEach((b) => {
        const t = b.textContent.replace(/^\d+/, "");
        b.classList.toggle("selected", cat === "traits" ? state.persona.traits.includes(t) : state.persona[cat] === t);
      });
    });

    $("#avatarTabs").addEventListener("click", (e) => {
      const t = e.target.closest("[data-tab]");
      if (t) { avatarTab = +t.dataset.tab; renderPortrait(); }
    });
    $("#avatarOptions").addEventListener("click", (e) => {
      const o = e.target.closest("[data-av]");
      if (o) setAvatar(o.dataset.av, o.dataset.val);
    });
    $("#avatarOptions").addEventListener("change", (e) => {
      const inp = e.target.closest("[data-avcolor]");
      if (inp) setAvatar(inp.dataset.avcolor, inp.value);
    });
    $("#avatarRandom").addEventListener("click", () => {
      state.avatar = Avatar.random(); save(); renderPortrait(); renderStepper();
      const f = $("#avatarPreview"); f.classList.remove("shuffle"); void f.offsetWidth; f.classList.add("shuffle");
    });
    $("#avatarRace").addEventListener("click", () => {
      Object.assign(avatarCfg(), Avatar.RACE_HINTS[state.race] || {}); save(); renderPortrait();
    });
    $("#avatarPng").addEventListener("click", downloadAvatarPng);
    document.querySelectorAll("[data-pmode]").forEach((b) => b.addEventListener("click", () => {
      state.portraitMode = b.dataset.pmode; save(); renderPortrait(); renderStepper();
    }));
    $("#portraitUpload").addEventListener("change", (e) => { loadPortraitFile(e.target.files[0]); e.target.value = ""; });
    $("#portraitRemove").addEventListener("click", () => { state.portraitImg = null; save(); renderPortrait(); renderStepper(); });

    $("#downloadPdf").addEventListener("click", downloadPdf);
    $("#resetAll").addEventListener("click", () => {
      if (!confirm("¿Seguro que quieres borrar este personaje y empezar de cero?")) return;
      state = blank(); save();
      $("#charName").value = ""; $("#playerName").value = ""; $("#story").value = ""; updateCount();
      renderGrids(); goTo(0);
    });
    window.addEventListener("resize", () => { if (state.step === STEP.sheet) fitSheet(); });
  }

  function updateCount() { $("#storyCount").textContent = `${$("#story").value.length} / 4000`; }

  bind();
  renderGrids();
  goTo(state.step);
})();
