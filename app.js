// Simple SPA + mock actions
const views = {
  home: document.getElementById('view-home'),
  gateway: document.getElementById('view-gateway'),
  dashboard: document.getElementById('view-dashboard'),
};
const setView = (v) => {
  Object.values(views).forEach(el => el.classList.remove('active'));
  views[v].classList.add('active');
  document.querySelectorAll('nav .link').forEach(btn => btn.classList.remove('active'));
  document.getElementById('nav-' + v).classList.add('active');
};
document.getElementById('nav-home').onclick = () => setView('home');
document.getElementById('nav-gateway').onclick = () => setView('gateway');
document.getElementById('nav-dashboard').onclick = () => setView('dashboard');
document.getElementById('goShopping').onclick = () => setView('gateway');

const picksRow = document.getElementById('picksRow');
const recRow = document.getElementById('recommendedRow');
const trendRow = document.getElementById('trendingRow');
const catChips = document.getElementById('categoryChips');
const catResults = document.getElementById('categoryResults');
const { categories, partners } = window.JODA_PARTNERS;

function card(p) {
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <div class="store"><div class="badge">${p.category}</div><strong>${p.name}</strong></div>
    <div class="muted">Reward: ${p.cashback}</div>
    <div class="button-row">
      <button class="btn primary" data-url="${p.url}">Shop Now</button>
      <button class="btn" data-fav="${p.name}">♡</button>
    </div>
  `;
  el.querySelector('[data-url]').onclick = () => window.open(p.url, '_blank', 'noopener');
  return el;
}
partners.filter(p => p.recommended).slice(0,3).forEach(p => picksRow.appendChild(card(p)));
partners.filter(p => p.recommended).slice(0,5).forEach(p => recRow.appendChild(card(p)));
partners.filter(p => p.trending).slice(0,5).forEach(p => trendRow.appendChild(card(p)));

let activeCat = 'All';
function renderCats() {
  catChips.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'chip' + (activeCat === 'All' ? ' active' : '');
  all.textContent = 'All';
  all.onclick = () => { activeCat = 'All'; renderCats(); renderCatResults(); };
  catChips.appendChild(all);
  categories.forEach(c => {
    const b = document.createElement('button');
    b.className = 'chip' + (activeCat === c ? ' active' : '');
    b.textContent = c;
    b.onclick = () => { activeCat = c; renderCats(); renderCatResults(); };
    catChips.appendChild(b);
  });
}
function renderCatResults() {
  catResults.innerHTML = '';
  partners.filter(p => activeCat === 'All' || p.category === activeCat)
          .forEach(p => catResults.appendChild(card(p)));
}
renderCats(); renderCatResults();

document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  catResults.innerHTML = '';
  partners.filter(p => (activeCat === 'All' || p.category === activeCat))
          .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
          .forEach(p => catResults.appendChild(card(p)));
});

const activity = [
  { when: 'Today', what: 'Amazon purchase confirmed', delta: '+45.00 JODA' },
  { when: '2d ago', what: 'Booking.com pending', delta: '+120.00 JODA (pending)' },
  { when: '6d ago', what: 'Referral bonus from Ada', delta: '+25.00 JODA' },
];
const ul = document.getElementById('activityList');
activity.forEach(a => {
  const li = document.createElement('li');
  li.innerHTML = `<span>${a.what} — <small>${a.when}</small></span><strong>${a.delta}</strong>`;
  ul.appendChild(li);
});

document.getElementById('withdrawBtn').onclick = () => {
  const addr = (document.getElementById('walletInput').value || '').trim();
  const msg = document.getElementById('withdrawMsg');
  if (!addr.startsWith('0x') || addr.length < 16) { msg.textContent = 'Please enter a valid BEP-20 address.'; return; }
  msg.textContent = 'Withdrawal request submitted. You will receive a confirmation email shortly.';
};
