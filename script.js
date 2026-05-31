window.addEventListener('load', () => {
const preloader = document.getElementById('sitePreloader');
window.setTimeout(() => {
if (preloader) preloader.classList.add('hide');
document.body.classList.remove('loading');
document.body.classList.add('site-ready');
}, 700);
});
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 55);
}, { passive: true });
const mobileMenu = document.getElementById('mobileMenu');
const hamburger  = document.getElementById('hamburger');
function toggleMM() {
if (!mobileMenu || !hamburger) return;
const isOpen = mobileMenu.classList.toggle('open');
hamburger.classList.toggle('open', isOpen);
hamburger.setAttribute('aria-expanded', isOpen);
document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMM() {
if (!mobileMenu || !hamburger) return;
mobileMenu.classList.remove('open');
hamburger.classList.remove('open');
hamburger.setAttribute('aria-expanded', 'false');
document.body.style.overflow = '';
}
const revEls = document.querySelectorAll('.reveal, .reveal-scale');
const revObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
});
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => revObs.observe(el));
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let navTicking = false;
function updateActiveNav() {
let current = '';
sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
navLinks.forEach(a => {
a.classList.toggle('active-nav', a.getAttribute('href') === '#' + current);
});
navTicking = false;
}
window.addEventListener('scroll', () => {
if (!navTicking) {
window.requestAnimationFrame(updateActiveNav);
navTicking = true;
}
}, { passive: true });
document.querySelectorAll('video[data-src]').forEach(video => {
const loadVideo = () => {
if (video.dataset.loaded) return;
const source = document.createElement('source');
source.src = video.dataset.src;
source.type = 'video/mp4';
source.onerror = () => {
if (video.dataset.fallbackSrc && source.src !== video.dataset.fallbackSrc) {
source.src = video.dataset.fallbackSrc;
video.load();
video.play().catch(() => {});
} else {
video.classList.add('video-poster-only');
}
};
video.appendChild(source);
video.dataset.loaded = 'true';
video.load();
};
const tile = video.closest('.g-video-tile');
if (tile) {
tile.addEventListener('click', () => {
if (!video.dataset.loaded) loadVideo();
if (video.paused) {
video.play().catch(() => {});
tile.classList.add('is-playing');
} else {
video.pause();
tile.classList.remove('is-playing');
}
});
}
});
function openLB(src) {
const lightbox = document.getElementById('lightbox');
const image = document.getElementById('lb-img');
if (!lightbox || !image) return;
image.src = src;
lightbox.classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeLB() {
const lightbox = document.getElementById('lightbox');
const image = document.getElementById('lb-img');
if (!lightbox || !image) return;
lightbox.classList.remove('open');
image.src = '';
document.body.style.overflow = '';
}
function handleLBClick(e) {
if (e.target === document.getElementById('lightbox')) closeLB();
}
document.querySelectorAll('.g-tile').forEach(tile => {
tile.addEventListener('keydown', e => {
if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tile.click(); }
});
});
function submitBooking(e) {
e.preventDefault();
const nameEl = document.getElementById('pname');
const phoneEl = document.getElementById('pphone');
const ageEl = document.getElementById('cage');
const numEl = document.getElementById('cnum');
const dateEl = document.getElementById('vdate');
const msgEl = document.getElementById('vmsg');
const name  = nameEl ? nameEl.value.trim() : '';
const phone = phoneEl ? phoneEl.value.trim() : '';
const age   = ageEl ? ageEl.value : 'Not specified';
const num   = numEl ? numEl.value : '1 Child';
const date  = dateEl && dateEl.value ? dateEl.value : 'Flexible';
const msg   = msgEl && msgEl.value.trim() ? msgEl.value.trim() : 'None';
if (!name || !phone) {
alert('Please fill in your name and phone number to continue.');
return;
}
const text =
`🎉 New Booking Request — M&M's Play Area\n\n` +
`👤 Parent: ${name}\n` +
`📞 Phone: ${phone}\n` +
`👶 Child age: ${age}\n` +
`👨‍👩‍👧 Children: ${num}\n` +
`📅 Date: ${date}\n` +
`💬 Notes: ${msg}\n\n` +
`Looking forward to visiting! 🏃‍♂️`;
window.open('https://wa.me/971502591946?text=' + encodeURIComponent(text), '_blank');
}
const vd = document.getElementById('vdate');
if (vd) vd.setAttribute('min', new Date().toISOString().split('T')[0]);
document.addEventListener('keydown', e => {
if (e.key === 'Escape') { closeLB(); closeMM(); }
});
