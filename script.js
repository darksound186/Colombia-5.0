/* ============================================================
   Colombia 5.0 — script.js
   ============================================================ */

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor grow on interactive elements
document.querySelectorAll('button, a, [data-tab]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursorTrail.style.width  = '48px';
    cursorTrail.style.height = '48px';
    cursorTrail.style.borderColor = 'rgba(124,58,237,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    cursorTrail.style.width  = '32px';
    cursorTrail.style.height = '32px';
    cursorTrail.style.borderColor = 'rgba(57,255,20,0.3)';
  });
});

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero reveals immediately on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade, .conf-hero .reveal-up').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// ── "Ver Conferencias" button (solo index.html) ──
const btnVer = document.getElementById('btnVerConferencias');
if (btnVer) {
  btnVer.addEventListener('click', () => {
    document.getElementById('conferences').scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Tabs principales (index.html) ──
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = btn.dataset.tab;
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    tabPanels.forEach(p => p.classList.remove('active'));
    document.querySelector(`.tab-panel[data-panel="${idx}"]`).classList.add('active');
  });
});

// ── Opinion Tabs (páginas de conferencia) ──
document.querySelectorAll('.opinion-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const wrapper = tab.closest('.opinion-tabs');
    const tabs   = [...wrapper.querySelectorAll('.opinion-tab')];
    const panels = [...wrapper.querySelectorAll('.opinion-panel')];
    const idx    = tabs.indexOf(tab);

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    if (panels[idx]) panels[idx].classList.add('active');
  });
});