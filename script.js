// 1. Preloader
window.addEventListener('load', () => {
    document.body.classList.remove('loading');

    const preloader = document.getElementById('sitePreloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
});

// 2. Sticky Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Mobile Menu
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');

function toggleMM() {
    if (!mobileMenu) return;

    mobileMenu.classList.toggle('open');

    if (hamburger) {
        const isOpen = mobileMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

function closeMM() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove('open');

    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// Close mobile menu with ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMM();
        closeLB();
    }
});

// 4. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// 5. Lightbox for Gallery
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');

function openLB(src) {
    if (!lightbox || !lbImg) return;

    lbImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLB() {
    if (!lightbox || !lbImg) return;

    lightbox.classList.remove('active');

    setTimeout(() => {
        lbImg.src = '';
    }, 300);

    document.body.style.overflow = '';
}

function handleLBClick(e) {
    if (e.target === lightbox) {
        closeLB();
    }
}

// 6. Lazy Load Gallery Videos
const galleryVideos = document.querySelectorAll('.js-gallery-video');

const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const video = entry.target;
        const videoSrc = video.getAttribute('data-src');

        if (videoSrc && !video.getAttribute('src')) {
            video.setAttribute('src', videoSrc);
            video.load();

            video.play().catch(() => {
                // Browser may block autoplay; this is normal.
            });
        }

        observer.unobserve(video);
    });
}, {
    threshold: 0.25
});

galleryVideos.forEach(video => videoObserver.observe(video));

// 7. WhatsApp Booking Form
function submitBooking(e) {
    e.preventDefault();

    const name = document.getElementById('pname')?.value.trim() || '';
    const phone = document.getElementById('pphone')?.value.trim() || '';
    const age = document.getElementById('cage')?.value || '';
    const num = document.getElementById('cnum')?.value || '';
    const date = document.getElementById('vdate')?.value || 'Flexible';
    const msg = document.getElementById('vmsg')?.value.trim() || 'None';

    const text = `🎉 New Booking Request — M&M's Play Area

👤 Parent: ${name}
📞 Phone: ${phone}
👶 Child age: ${age}
👨‍👩‍👧 Children: ${num}
📅 Date: ${date}
💬 Notes: ${msg}`;

    window.open(
        'https://wa.me/971502591946?text=' + encodeURIComponent(text),
        '_blank'
    );
}
