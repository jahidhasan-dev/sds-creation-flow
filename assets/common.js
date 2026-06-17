/* ============================================================
   ExactSDS demo — shared shell, state & helpers
   ============================================================ */

/* ---------- state ---------- */
const STORE_KEY = "exactsds_demo_v1";
const State = {
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { this.data = {}; }
    this.data.chemicals ||= [];
    this.data.section1 ||= {};
    this.data.section9 ||= {};
    this.data.section14 ||= {};
    this.data.finalHazard ||= null;
    return this.data;
  },
  save() { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); },
  reset() { localStorage.removeItem(STORE_KEY); this.load(); },
};
State.load();

/* ---------- icons ---------- */
const I = {
  logo: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><rect x="12.1" y="1.2" width="9.8" height="9.8" rx="2" transform="rotate(45 17 6.1)" fill="#f7c948"/><rect x="4.6" y="8.7" width="9.8" height="9.8" rx="2" transform="rotate(45 9.5 13.6)" fill="#f5a623"/><rect x="19.6" y="8.7" width="9.8" height="9.8" rx="2" transform="rotate(45 24.5 13.6)" fill="#8b93fb"/><rect x="12.1" y="16.2" width="9.8" height="9.8" rx="2" transform="rotate(45 17 21.1)" fill="#3f43af"/></svg>`,
  wordmark: `<svg width="118" height="34" viewBox="0 0 118 34" fill="none"><rect x="12.1" y="1.2" width="9.8" height="9.8" rx="2" transform="rotate(45 17 6.1)" fill="#f7c948"/><rect x="4.6" y="8.7" width="9.8" height="9.8" rx="2" transform="rotate(45 9.5 13.6)" fill="#f5a623"/><rect x="19.6" y="8.7" width="9.8" height="9.8" rx="2" transform="rotate(45 24.5 13.6)" fill="#8b93fb"/><rect x="12.1" y="16.2" width="9.8" height="9.8" rx="2" transform="rotate(45 17 21.1)" fill="#3f43af"/><text x="40" y="18" font-family="Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="5" fill="#5c67f9">SDS</text><text x="40.5" y="29" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" letter-spacing="2.6" fill="#8b93fb">MANAGER</text></svg>`,
  collapse: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16"/><path d="M10 12h10"/><path d="m14 8 4 4-4 4"/></svg>`,
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 8.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V8.5L12 3Z"/></svg>`,
  doc: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8 9h8M8 13h5"/><path d="M8 17h3"/></svg>`,
  library: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a1 1 0 0 1 1-1h5v16H5a1 1 0 0 1-1-1V5Z"/><path d="M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5V4Z"/><path d="M10 4h4"/></svg>`,
  upload: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V5"/><path d="m7 9 5-4.5L17 9"/><path d="M5 19h14"/></svg>`,
  crown: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 8 4 4 4-7 4 7 4-4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/></svg>`,
  gift: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="4"/><rect x="6" y="12" width="12" height="8"/><path d="M12 8v12"/><path d="M12 8c-1.5 0-4-.5-4-2.5C8 4 9 3.5 10 3.5c1.8 0 2 2.5 2 4.5Zm0 0c1.5 0 4-.5 4-2.5 0-1.5-1-2-2-2-1.8 0-2 2.5-2 4.5Z"/></svg>`,
  chevron: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  pencil: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 18.5 9.5 8 20H4v-4L14.5 5.5Z"/><path d="m13 7 4 4"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/><path d="M10 11v6M14 11v6"/></svg>`,
  flask: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4"/><path d="M10 3v6L4.7 18a2 2 0 0 0 1.8 3h11a2 2 0 0 0 1.8-3L14 9V3"/><path d="M7.5 15h9"/></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8.4 7 9.5 4-1.1 7-5 7-9.5V6l-7-3Z"/></svg>`,
  shieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8.4 7 9.5 4-1.1 7-5 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4.5"/></svg>`,
  warn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4"/><path d="M12 17.2v.05"/></svg>`,
  warnCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V13"/><path d="M12 16.4v.05"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4.5 4.5L19 7"/></svg>`,
  checkbox: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="m9 12.5 2.2 2.2L15.5 10"/></svg>`,
  lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  play: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>`,
  fileText: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>`,
  preset: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 14h5l1.5 2h3L15 14h5"/></svg>`,
  help: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5.1.8c0 1.7-2.6 2.2-2.6 3.6"/><path d="M12 17v.05"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>`,
  emptyDoc: `<svg width="74" height="64" viewBox="0 0 74 64" fill="none"><rect x="12" y="6" width="44" height="52" rx="6" fill="#e8ebf2"/><rect x="20" y="2" width="44" height="52" rx="6" fill="#f2f4f9"/><rect x="27" y="12" width="22" height="3.5" rx="1.75" fill="#cfd6e4"/><rect x="27" y="20" width="30" height="3.5" rx="1.75" fill="#dde2ed"/><rect x="27" y="28" width="26" height="3.5" rx="1.75" fill="#dde2ed"/><circle cx="42" cy="44" r="9" fill="#8b93fb"/><path d="M42 40v8M38 44h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
};

const TONE_CLASS = { indigo: "hz-indigo", green: "hz-green", red: "hz-red" };
const hzBadge = (code, tone) => `<span class="hz ${TONE_CLASS[tone] || "hz-indigo"}">${code}</span>`;

/* ---------- shell ---------- */
const STEPS = [
  { label: "Product Details", href: "section-1.html" },
  { label: "Ingredient Details", href: "section-3.html" },
  { label: "Physical Properties", href: "section-9.html" },
  { label: "Transport Information", href: "section-14.html" },
];

function fmtToday() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).replace(" ", ", ").replace(",,", ",");
}

/**
 * opts: { step: 0..3, header: 'breadcrumb'|'welcome', crumb: 'Product Details' }
 */
function renderShell(opts) {
  const collapseBtn = `<button class="w-8 h-8 rounded-full border border-[#e2e5e9] bg-white flex items-center justify-center text-[#727284] hover:text-[#5c67f9] hover:border-[#c7cdf9] transition-colors shadow-sm" title="Collapse">${I.collapse}</button>`;
  const headerLeft =
    opts.header === "welcome"
      ? `<div class="flex items-center gap-3">
           <a href="dashboard.html" class="anim-fade-in">${I.logo}</a>
           ${collapseBtn}
           <h1 class="text-[19px] font-semibold text-[#1f1f26]">Welcome to ExactSDS, Jahid</h1>
           <span class="text-[12px] text-[#727284] mt-[3px]">${fmtToday()}</span>
         </div>`
      : `<div class="flex items-center gap-3">
           <a href="dashboard.html" class="anim-fade-in">${I.logo}</a>
           ${collapseBtn}
           <span class="text-[11px] text-[#727284]"><a href="dashboard.html" class="hover:text-[#5c67f9] transition-colors">Dashboard</a>&nbsp; &gt; ${opts.crumb || ""}</span>
         </div>`;

  document.getElementById("app-header").innerHTML = `
    <div class="flex items-center justify-between px-5 h-[62px] bg-white border-b border-[#e2e5e9] relative z-10">
      ${headerLeft}
      <div class="flex items-center gap-3">
        <button class="btn-secondary !py-2" onclick="toast('Demo: a sales specialist will reach out!','success')">Book a Demo</button>
        <div class="w-px h-6 bg-[#e2e5e9]"></div>
        <button class="btn-secondary !py-2 flex items-center gap-2">🇺🇸 English ${I.chevron}</button>
        <button class="btn-secondary !p-2.5" title="Rewards">${I.gift}</button>
        <div class="flex items-center gap-1.5 cursor-pointer group">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#5c67f9] to-[#8b93fb] flex items-center justify-center text-white text-[13px] font-semibold ring-2 ring-white shadow group-hover:scale-105 transition-transform">J</div>
          <span class="text-[#727284] group-hover:text-[#1f1f26] transition-colors">${I.chevron}</span>
        </div>
      </div>
    </div>`;

  // icon rail
  const railEl = document.getElementById("app-rail");
  if (railEl) {
    const rail = [
      { icon: I.home, active: true, title: "SDS Authoring", href: "dashboard.html" },
      { icon: I.doc, title: "My SDS Library" },
      { icon: I.library, title: "Substance Library" },
      { icon: I.upload, title: "Import SDS" },
    ];
    railEl.innerHTML = `
      <div class="flex flex-col items-center justify-between h-full py-4">
        <div class="flex flex-col gap-2">
          ${rail.map((r) => r.href
            ? `<a href="${r.href}" class="rail-btn ${r.active ? "active" : ""}" title="${r.title}">${r.icon}</a>`
            : `<button class="rail-btn" title="${r.title}" onclick="toast('Demo: ${r.title} is outside this flow')">${r.icon}</button>`).join("")}
        </div>
        <button class="rail-btn !bg-[#eef0fe] !text-[#5c67f9] ring-1 ring-[#d2d3fe]" style="animation: floaty 3s ease-in-out infinite" title="Upgrade">${I.crown}</button>
      </div>`;
  }

  // stepper
  const stepEl = document.getElementById("app-steps");
  if (stepEl) {
    stepEl.innerHTML = STEPS.map((s, i) => {
      const cls = i < opts.step ? "done" : i === opts.step ? "active" : "";
      const txt =
        i === opts.step
          ? "text-[#5c67f9] font-semibold"
          : i < opts.step
          ? "text-[#1f1f26] font-medium"
          : "text-[#98989b] font-medium";
      return `
        <div class="step ${cls}">
          <a href="${s.href}" class="flex items-center gap-3 group">
            <div class="step-dot">${i < opts.step ? `<span class="text-white">${I.check}</span>` : `<span class="core"></span>`}</div>
            <span class="text-[16px] leading-6 ${txt} group-hover:text-[#5c67f9] transition-colors">${s.label}</span>
          </a>
          ${i < STEPS.length - 1 ? `<div class="step-line"></div>` : ""}
        </div>`;
    }).join("");
  }

  // tutorial card
  const tut = document.getElementById("app-tutorial");
  if (tut && opts.tutorial) {
    tut.innerHTML = `
      <div class="anim-fade-up delay-3 relative" id="tutorial-card">
        <button class="absolute -top-1 right-0 text-[#98989b] hover:text-[#1f1f26] transition-colors" onclick="dismissTutorial()">${I.x}</button>
        <h3 class="text-[18px] font-semibold text-[#1f1f26] pr-7">How to fill in Section ${opts.tutorial} of your SDS</h3>
        <p class="text-[12px] leading-4 text-[#727284] mt-1.5">Follow this step-by-step tutorial to complete Section 1 of your SDS, including product details, company info, regulations, and emergency contacts.</p>
        <div class="video-thumb mt-4 h-[185px]" onclick="playTutorial(this)">
          <svg viewBox="0 0 334 186" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#3c4a63"/><stop offset=".55" stop-color="#5b6d8c"/><stop offset="1" stop-color="#8fa0b8"/>
              </linearGradient>
            </defs>
            <rect width="334" height="186" fill="url(#vg)"/>
            <rect x="18" y="60" width="120" height="86" rx="6" fill="#c9d2de"/>
            <rect x="26" y="68" width="104" height="30" rx="4" fill="#94a3b8"/>
            <circle cx="44" cy="116" r="7" fill="#ef4444"/><circle cx="64" cy="116" r="7" fill="#f7c948"/>
            <rect x="84" y="108" width="44" height="16" rx="3" fill="#64748b"/>
            <path d="M225 58c-10 0-18 9-18 22v66h52v-66c0-13-8-22-18-22h-16z" fill="#27364d"/>
            <circle cx="233" cy="44" r="13" fill="#e8c39e"/>
            <path d="M220 36c0-7 6-12 13-12s13 5 13 12l-4 4h-18l-4-4z" fill="#f1f5f9"/>
            <rect x="186" y="92" width="34" height="6" rx="3" fill="#1e293b" transform="rotate(18 186 92)"/>
            <rect x="166" y="98" width="40" height="26" rx="3" fill="#cbd5e1"/>
            <rect x="170" y="102" width="32" height="14" rx="2" fill="#475569"/>
          </svg>
          <span class="absolute top-2.5 left-2.5 text-[10px] font-semibold text-[#5c67f9] bg-[#d2d3fe] px-2 py-1 rounded-md">Tutorial</span>
          <div class="play">${I.play}</div>
          <div class="absolute bottom-0 inset-x-0 px-3 pb-2.5 pt-6 bg-gradient-to-t from-black/55 to-transparent flex items-center gap-2">
            <span class="text-[9px] text-white font-medium" id="vid-time">0.00</span>
            <div class="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden"><div class="h-full bg-[#5c67f9] rounded-full transition-all duration-300" id="vid-bar" style="width:6%"></div></div>
            <span class="text-[9px] text-white font-medium">1.04</span>
          </div>
        </div>
      </div>`;
  }
}

let _vidTimer = null;
function playTutorial(el) {
  const bar = document.getElementById("vid-bar");
  const time = document.getElementById("vid-time");
  if (_vidTimer) { clearInterval(_vidTimer); _vidTimer = null; toast("Tutorial paused"); return; }
  let p = 6;
  toast("Playing tutorial…", "success");
  _vidTimer = setInterval(() => {
    p += 1.6;
    if (p >= 100) { p = 100; clearInterval(_vidTimer); _vidTimer = null; }
    bar.style.width = p + "%";
    const secs = Math.round((p / 100) * 64);
    time.textContent = `0.${String(secs).padStart(2, "0")}`;
  }, 120);
}
function dismissTutorial() {
  const c = document.getElementById("tutorial-card");
  c.style.transition = "opacity .3s, transform .3s";
  c.style.opacity = 0; c.style.transform = "translateX(20px)";
  setTimeout(() => c.remove(), 320);
}

/* ---------- toast ---------- */
function toast(msg, type = "") {
  let root = document.getElementById("toast-root");
  if (!root) { root = document.createElement("div"); root.id = "toast-root"; document.body.appendChild(root); }
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `${type === "success" ? I.check : type === "warn" ? I.warn : I.checkbox}<span>${msg}</span>`;
  root.appendChild(t);
  setTimeout(() => { t.classList.add("leaving"); setTimeout(() => t.remove(), 350); }, 2600);
}

/* ---------- modal helpers ---------- */
function openOverlay(html, { drawer = false } = {}) {
  const ov = document.createElement("div");
  ov.className = `overlay ${drawer ? "drawer-overlay" : ""}`;
  ov.innerHTML = html;
  ov.addEventListener("mousedown", (e) => { if (e.target === ov) closeOverlay(ov); });
  document.body.appendChild(ov);
  document.body.style.overflow = "hidden";
  return ov;
}
function closeOverlay(ov, cb) {
  if (!ov || ov._closing) return;
  ov._closing = true;
  ov.classList.add("closing");
  setTimeout(() => { ov.remove(); document.body.style.overflow = ""; cb && cb(); }, 260);
}

/* ---------- H-code autocomplete ---------- */
/**
 * Attaches an animated suggestion dropdown to a code input.
 * onPick(code, {text, tone}) is called when a suggestion is chosen
 * or Enter is pressed on a custom code.
 */
function attachCodeSuggest(input, onPick) {
  const wrap = input.closest(".relative") || input.parentElement;
  wrap.style.position = "relative";
  let pop = null;
  let items = [];
  let active = -1;

  const hide = () => { if (pop) { pop.remove(); pop = null; items = []; active = -1; } };

  const highlight = (text, q) => {
    const idx = text.toUpperCase().indexOf(q.toUpperCase());
    if (idx < 0) return esc(text);
    return esc(text.slice(0, idx)) + "<b>" + esc(text.slice(idx, idx + q.length)) + "</b>" + esc(text.slice(idx + q.length));
  };

  const pick = (code, entry) => {
    hide();
    input.value = "";
    input.focus();
    onPick(code, entry);
  };

  const render = () => {
    const q = input.value.trim();
    if (!q) { hide(); return; }
    const Q = q.toUpperCase();
    const matches = Object.entries(CODE_LIBRARY)
      .filter(([code, e]) => code.includes(Q) || e.text.toUpperCase().includes(Q))
      .sort(([a], [b]) => (b.startsWith(Q) ? 1 : 0) - (a.startsWith(Q) ? 1 : 0))
      .slice(0, 6);

    hide();
    pop = document.createElement("div");
    pop.className = "suggest-pop";
    if (matches.length) {
      pop.innerHTML =
        `<div class="sg-head">Suggested codes</div>` +
        matches.map(([code, e]) => `
          <div class="suggest-item" data-code="${code}">
            ${hzBadge(code, e.tone)}
            <span class="sg-text">${highlight(e.text, q)}</span>
            <span class="sg-add">${I.plus}</span>
          </div>`).join("");
      items = [...pop.querySelectorAll(".suggest-item")];
      items.forEach((el) => {
        // mousedown so it wins over input blur
        el.addEventListener("mousedown", (ev) => {
          ev.preventDefault();
          const code = el.dataset.code;
          pick(code, CODE_LIBRARY[code]);
        });
        el.addEventListener("mouseenter", () => setActive(items.indexOf(el)));
      });
    } else {
      pop.innerHTML = `
        <div class="suggest-empty">${I.search}<span>No match for “${esc(q)}” — press <b style="color:#5c67f9">Enter</b> to add it as a custom code</span></div>`;
      items = [];
    }
    active = -1;
    wrap.appendChild(pop);
  };

  const setActive = (i) => {
    active = i;
    items.forEach((el, n) => el.classList.toggle("active", n === active));
    if (items[active]) items[active].scrollIntoView({ block: "nearest" });
  };

  input.addEventListener("input", render);
  input.addEventListener("focus", () => { if (input.value.trim()) render(); });
  input.addEventListener("blur", () => setTimeout(hide, 140));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && items.length) { e.preventDefault(); setActive(Math.min(active + 1, items.length - 1)); }
    else if (e.key === "ArrowUp" && items.length) { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
    else if (e.key === "Escape") { hide(); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && items[active]) {
        const code = items[active].dataset.code;
        pick(code, CODE_LIBRARY[code]);
      } else {
        const code = input.value.trim().toUpperCase();
        if (!code) return;
        pick(code, CODE_LIBRARY[code] || { text: "Custom hazard statement", tone: "indigo" });
      }
    }
  });
}

/* ---------- branded loaders ---------- */
const Loader = {
  // 4-diamond brand spinner — for panels & overlays
  diamond: (size = "") => `<span class="ldr-diamond ${size}"><i></i><i></i><i></i><i></i></span>`,
  // bouncing dots — for busy buttons (inherits currentColor)
  dots: () => `<span class="ldr-dots"><i></i><i></i><i></i></span>`,
  // indeterminate bar — for panel tops
  bar: () => `<div class="ldr-bar"><i></i></div>`,
};
// set a button to busy state, returns a restore() fn
function btnBusy(btn, label) {
  const prev = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="inline-flex items-center gap-2.5">${Loader.dots()}<span>${label}</span></span>`;
  return () => { btn.disabled = false; btn.innerHTML = prev; };
}

/* ---------- misc ---------- */
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function fmtCreated(ts) {
  const d = new Date(ts);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return { date: `${date},`, time };
}
function uid() { return Math.random().toString(36).slice(2, 9); }

// signature of the current chemical list — used to detect newly added chemicals
function chemSignature() {
  return (State.data.chemicals || []).map((c) => c.id).sort().join(",");
}

// group hazard codes by GHS family for the saved-hazard panel / final page
function groupHazardCodes(codes) {
  const fam = (code) => {
    const m = String(code).match(/H(\d)/);
    return m && ["2", "3", "4"].includes(m[1]) ? m[1] : "2";
  };
  return {
    "2": (codes || []).filter((c) => fam(c.code) === "2"),
    "3": (codes || []).filter((c) => fam(c.code) === "3"),
    "4": (codes || []).filter((c) => fam(c.code) === "4"),
  };
}
