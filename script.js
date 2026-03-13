// ── Drag-to-scroll slider ──
const wrap = document.getElementById('sliderWrap');
let isDown = false;
let startX;
let scrollLeft;

wrap.addEventListener('mousedown', e => {
  isDown = true;
  wrap.style.cursor = 'grabbing';
  startX = e.pageX - wrap.offsetLeft;
  scrollLeft = wrap.scrollLeft;
});
wrap.addEventListener('mouseleave', () => {
  isDown = false;
  wrap.style.cursor = 'grab';
});
wrap.addEventListener('mouseup', () => {
  isDown = false;
  wrap.style.cursor = 'grab';
});
wrap.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrap.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrap.scrollLeft = scrollLeft - walk;
});

// ── Arrow buttons ──
const SLIDE_W = 336; // 320px slide + 16px gap

document.getElementById('nextBtn').addEventListener('click', () => {
  wrap.scrollBy({ left: SLIDE_W, behavior: 'smooth' });
});
document.getElementById('prevBtn').addEventListener('click', () => {
  wrap.scrollBy({ left: -SLIDE_W, behavior: 'smooth' });
});

// ── Touch support ──
let touchStartX = 0;
wrap.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
wrap.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    wrap.scrollBy({ left: diff > 0 ? SLIDE_W : -SLIDE_W, behavior: 'smooth' });
  }
});

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-grid, .vision-inner, .gast-inner, .gallery-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ── Kontaktformular ──
const gastForm = document.getElementById('gastForm');
if (gastForm) {
  gastForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const story = document.getElementById('f-story').value.trim();

    const subject = encodeURIComponent(`Gast-Anfrage: ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nGeschichte:\n${story}`);
    window.location.href = `mailto:joscha@YOLU.ch?subject=${subject}&body=${body}`;

    // Success-State anzeigen
    gastForm.style.display = 'none';
    const successEl = document.querySelector('.form-success');
    if (successEl) successEl.style.display = 'block';
  });
}

// ── Nav "Hören" dropdown ──
const hoerenBtn = document.getElementById('hoerenBtn');
const hoerenDropdown = document.getElementById('hoerenDropdown');

hoerenBtn.addEventListener('click', e => {
  e.stopPropagation();
  hoerenDropdown.classList.toggle('open');
});
document.addEventListener('click', () => {
  hoerenDropdown.classList.remove('open');
});
