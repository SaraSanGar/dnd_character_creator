(() => {
  "use strict";

  const STEPS = ["Nombre", "Raza", "Clase", "Trasfondo", "Historia", "Pergamino"];
  const STORAGE_KEY = "forja-heroes-v1";
  const STORY_PROMPTS = [
    "¿De dónde viene tu personaje?",
    "¿Quién es la persona más importante de su vida?",
    "¿Qué le empujó a la aventura?",
    "¿Qué es lo que más teme?",
    "¿Qué secreto guarda?",
    "¿Qué sueña con conseguir?"
  ];

  const blank = () => ({ step: 0, name: "", player: "", race: null, subrace: null, raceChoice: null, cls: null, equip: [], bg: null, story: "" });
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
      return raw ? Object.assign(blank(), JSON.parse(raw)) : null;
    } catch { return null; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* sin almacenamiento */ }
  }

  /* ---------- Stepper ---------- */
  function stepDone(i) {
    switch (i) {
      case 0: return state.name.trim().length > 0;
      case 1: return raceComplete();
      case 2: return !!state.cls;
      case 3: return !!state.bg;
      case 4: return state.story.trim().length > 0;
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
    if (state.step === 5) renderSheet();
    renderStepper();
    renderFooter();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderFooter() {
    $("#prevBtn").style.visibility = state.step === 0 ? "hidden" : "visible";
    const next = $("#nextBtn");
    next.style.visibility = state.step === STEPS.length - 1 ? "hidden" : "visible";
    const canNext = state.step === 4 || stepDone(state.step);
    next.disabled = !canNext;
    next.textContent = state.step === 4 ? "Ver pergamino →" : "Siguiente →";

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
      equip: kind === "class" ? normalizePicks(id, state.cls === id ? state.equip : []) : []
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
    }
    if (kind === "class") { state.cls = id; state.equip = modalCtx.equip.slice(); }
    if (kind === "bg") state.bg = id;
    save();
    closeModal();
    renderGrids();
    renderStepper();
    renderFooter();
  }

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

  /* ---------- Hoja final ---------- */
  function sheetHTML() {
    const r = findRace(state.race), c = findClass(state.cls), b = findBg(state.bg);
    const sub = r?.subraces?.find((s) => s.id === state.subrace);
    const ch = r?.choices?.find((x) => x.id === state.raceChoice);
    const name = state.name.trim() || "Sin nombre";

    const raceBlock = r ? `
      <div class="sheet-section">
        <h4>Rasgos de ${esc(r.name.toLowerCase())}</h4>
        <dl>
          <dt>Características</dt><dd>${esc(r.asi)}${sub && sub.asi !== r.asi ? `; ${esc(sub.asi)}` : ""}</dd>
          <dt>Tamaño</dt><dd>${esc(r.size)}</dd>
          <dt>Velocidad</dt><dd>${esc(r.speed)}</dd>
          ${ch ? `<dt>${esc(r.choiceLabel)}</dt><dd>${esc(ch.name)}: ${esc(ch.d)}</dd>` : ""}
        </dl>
        <div style="margin-top:8px">${traitsHTML(r.traits)}${sub ? traitsHTML(sub.traits) : ""}</div>
      </div>` : "";

    const classBlock = c ? `
      <div class="sheet-section">
        <h4>Clase: ${esc(c.name)}</h4>
        <dl>
          <dt>Principal</dt><dd>${esc(c.primary)}</dd>
          <dt>Dado de golpe</dt><dd>${esc(c.hitDie)}</dd>
          <dt>Salvaciones</dt><dd>${esc(c.saves)}</dd>
          <dt>Armaduras</dt><dd>${esc(c.armor)}</dd>
          <dt>Armas</dt><dd>${esc(c.weapons)}</dd>
          <dt>Herramientas</dt><dd>${esc(c.tools)}</dd>
          <dt>Habilidades</dt><dd>${esc(c.skills)}</dd>
          <dt>Nivel 1</dt><dd>${esc(c.features.join(", "))}</dd>
        </dl>
      </div>
      <div class="sheet-section">
        <h4>Equipo de ${esc(c.name.toLowerCase())}</h4>
        <ul class="sheet-list">${chosenEquipment(c.id, state.equip).map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
      </div>` : "";

    const bgBlock = b ? `
      <div class="sheet-section">
        <h4>Trasfondo: ${esc(b.name)}</h4>
        <dl>
          <dt>Habilidades</dt><dd>${esc(b.skills)}</dd>
          <dt>Herramientas</dt><dd>${esc(b.tools)}</dd>
          <dt>Idiomas</dt><dd>${esc(b.languages)}</dd>
          <dt>Equipo</dt><dd>${esc(b.equipment)}</dd>
        </dl>
        <p class="trait" style="margin-top:6px"><b>${esc(b.feature.n)}.</b> ${esc(b.feature.d)}</p>
      </div>` : "";

    return `
      <div class="frame"></div>
      <span class="corner tl">❦</span><span class="corner tr">❦</span><span class="corner bl">❦</span><span class="corner br">❦</span>
      <div class="sheet-head">
        <div class="kicker">Pergamino de aventurera</div>
        <h1>${esc(name)}</h1>
        <div class="subtitle">${[r && raceLabel(), c?.name, b?.name].filter(Boolean).map(esc).join(" · ") || "&nbsp;"}</div>
        ${state.player.trim() ? `<div class="subtitle" style="font-size:12px;margin-top:2px">Jugadora: ${esc(state.player.trim())}</div>` : ""}
        <div class="divider">✦ ─────── ❧ ─────── ✦</div>
      </div>
      <div class="sheet-trio">
        <div class="sheet-box"><div class="label">Raza</div><div class="value">${r ? esc(r.name) : "—"}<small>${sub && r.subraces.length > 1 ? esc(sub.name) : ch ? "Dragón " + esc(ch.name.toLowerCase()) : r ? esc(r.en) : ""}</small></div></div>
        <div class="sheet-box"><div class="label">Clase</div><div class="value">${c ? esc(c.name) : "—"}<small>${c ? "Nivel 1 · Dado de golpe " + esc(c.hitDie) : ""}</small></div></div>
        <div class="sheet-box"><div class="label">Trasfondo</div><div class="value">${b ? esc(b.name) : "—"}<small>${b ? esc(b.en) : ""}</small></div></div>
      </div>
      <div class="sheet-cols">
        <div>${raceBlock}</div>
        <div>${classBlock}${bgBlock}</div>
      </div>
      <div class="sheet-section" style="margin-top:6px">
        <h4>Historia</h4>
        <div class="sheet-story">${esc(state.story.trim()) || "<i>Aún por escribir…</i>"}</div>
      </div>
      <div class="sheet-foot">Datos de dnd5e.wikidot.com · Forja de Héroes</div>`;
  }

  function renderSheet() {
    $("#sheet").innerHTML = sheetHTML();
    const missing = [];
    if (!state.name.trim()) missing.push("nombre");
    if (!raceComplete()) missing.push("raza");
    if (!state.cls) missing.push("clase");
    if (!state.bg) missing.push("trasfondo");
    if (!state.story.trim()) missing.push("historia");
    const note = $("#missingNote");
    note.hidden = missing.length === 0;
    note.textContent = missing.length ? `Te falta: ${missing.join(", ")}. Puedes descargarlo igualmente o volver atrás.` : "";
    fitSheet();
  }

  // Escala la vista previa en pantallas estrechas
  function fitSheet() {
    const wrap = $(".sheet-wrap"), sheet = $("#sheet");
    if (!wrap || !sheet) return;
    sheet.style.transform = ""; sheet.style.transformOrigin = ""; wrap.style.height = "";
    const avail = wrap.clientWidth - 8;
    if (avail < 794) {
      const k = avail / 794;
      sheet.style.transformOrigin = "top left";
      sheet.style.transform = `scale(${k})`;
      sheet.style.marginLeft = "4px";
      wrap.style.height = sheet.offsetHeight * k + 30 + "px";
    } else {
      sheet.style.marginLeft = "";
    }
  }

  async function downloadPdf() {
    const btn = $("#downloadPdf");
    if (typeof html2pdf === "undefined") {
      alert("No se pudo cargar el generador de PDF. Revisa tu conexión e inténtalo de nuevo.");
      return;
    }
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = "Inscribiendo el pergamino…";

    // Clon sin escalar fuera de pantalla para exportar a tamaño A4 real
    const holder = document.createElement("div");
    holder.style.cssText = "position:fixed;left:-10000px;top:0;";
    const clone = document.createElement("div");
    clone.className = "sheet exporting";
    clone.innerHTML = sheetHTML();
    holder.appendChild(clone);
    document.body.appendChild(holder);

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const fname = (state.name.trim() || "personaje").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "personaje";
      await html2pdf().set({
        margin: 0,
        filename: `${fname}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#f6ead0", windowWidth: 794 },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
        pagebreak: { mode: ["css", "avoid-all"], avoid: [".sheet-section", ".sheet-box", ".trait"] }
      }).from(clone).save();
    } catch (err) {
      console.error(err);
      alert("Algo falló al crear el PDF. Inténtalo otra vez.");
    } finally {
      holder.remove();
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
    $("#charName").addEventListener("keydown", (e) => { if (e.key === "Enter" && stepDone(0)) goTo(1); });

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
      const eqBtn = e.target.closest("[data-eq]");
      if (eqBtn) { modalCtx.equip[+eqBtn.dataset.eq] = +eqBtn.dataset.opt; renderModal(); return; }
      const ch = e.target.closest("[data-choice]");
      if (ch) { modalCtx.choice = ch.dataset.choice; renderModal(); }
    });
    $("#modalChoose").addEventListener("click", chooseFromModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

    $("#downloadPdf").addEventListener("click", downloadPdf);
    $("#resetAll").addEventListener("click", () => {
      if (!confirm("¿Seguro que quieres borrar este personaje y empezar de cero?")) return;
      state = blank(); save();
      $("#charName").value = ""; $("#playerName").value = ""; $("#story").value = ""; updateCount();
      renderGrids(); goTo(0);
    });
    window.addEventListener("resize", () => { if (state.step === 5) fitSheet(); });
  }

  function updateCount() { $("#storyCount").textContent = `${$("#story").value.length} / 4000`; }

  bind();
  renderGrids();
  goTo(state.step);
})();
