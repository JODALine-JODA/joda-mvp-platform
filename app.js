// app.js
import { categories, partners } from "./partners.js";

// -------- Navigation (optional: keeps your tab buttons working) -------
const views = {
  home: document.getElementById("view-home"),
  gateway: document.getElementById("view-gateway"),
  dashboard: document.getElementById("view-dashboard"),
};

function show(viewKey) {
  Object.values(views).forEach(v => v && v.classList.remove("active"));
  if (views[viewKey]) views[viewKey].classList.add("active");

  // highlight nav buttons if they exist
  ["home", "gateway", "dashboard"].forEach(k => {
    const btn = document.getElementById(`nav-${k}`);
    if (btn) btn.classList.toggle("active", k === viewKey);
  });
}

// attach handlers if buttons exist
["home","gateway","dashboard"].forEach(k => {
  const btn = document.getElementById(`nav-${k}`);
  if (btn) btn.addEventListener("click", () => show(k));
});

// default to Home (or Gateway if you prefer)
// show("home");

// ---------------- Shop (Gateway) rendering ----------------------------
const chipsEl = document.getElementById("categoryChips");
const listEl  = document.getElementById("partnerList");

// start with first category selected
let activeCategory = categories[0]?.id || null;

function labelFromId(id) {
  return categories.find(c => c.id === id)?.label || id;
}

function renderChips() {
  if (!chipsEl) return;
  chipsEl.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `chip ${activeCategory === cat.id ? "active" : ""}`;
    btn.textContent = cat.label;
    btn.onclick = () => {
      activeCategory = cat.id;
      renderChips();
      renderPartners();
    };
    chipsEl.appendChild(btn);
  });
}

function renderPartners() {
  if (!listEl) return;
  listEl.innerHTML = "";

  const items = partners.filter(p => !activeCategory || p.category === activeCategory);

  if (items.length === 0) {
    listEl.innerHTML = `<div class="note">No partners in this category (yet).</div>`;
    return;
  }

  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="store" style="gap:8px; padding:12px 12px 0;">
        <div class="badge">${labelFromId(p.category)}</div>
        <h3>${p.name}</h3>
      </div>
      <div class="button-row" style="margin:12px">
        <a class="btn primary" href="${p.url}" target="_blank" rel="noopener">Go shopping</a>
        <button class="btn" title="MVP placeholder">Track</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

// init Shop widgets if present
renderChips();
renderPartners();
