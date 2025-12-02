// ===== Mobile Menu Toggle (used from HTML) =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// ===== Lightbox (Gallery) =====
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    if (!lightbox || !img || !cap) return;

    lightbox.classList.add('active');
    img.src = src;
    cap.textContent = caption;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
}

// ===== Contact Form =====
function handleSubmit(event) {
    event.preventDefault();
    alert("Thank you! We'll get back to you soon.");
    if (event.target) event.target.reset();
}

// ===== Main Interactions =====
document.addEventListener('DOMContentLoaded', () => {
    // --- Active nav link based on path ---
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && current === href) {
            link.classList.add('active');
        }

        // Close mobile menu when clicking a link
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // --- Scroll reveal animations (fade-up) ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => obs.observe(el));
    }

    // --- Testimonials staggered delay ---
    const testimonialCards = document.querySelectorAll('.testimonial-stagger');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.15) + 's';
    });

    // --- Hero heading word-by-word animation ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.textContent.trim().split(' ');
        heroTitle.textContent = '';
        words.forEach((word, idx) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.animationDelay = (idx * 0.12) + 's';
            heroTitle.appendChild(span);
            if (idx !== words.length - 1) {
                heroTitle.appendChild(document.createTextNode(' '));
            }
        });
    }

    // --- Sticky CTA: label tweak on small screens ---
    const stickyBtn = document.querySelector('.sticky-btn');
    function updateCta() {
        if (!stickyBtn) return;
        if (window.innerWidth <= 768) {
            stickyBtn.textContent = '📞 Call Now';
        } else {
            stickyBtn.textContent = '📞 Book a Table';
        }
    }
    updateCta();
    window.addEventListener('resize', updateCta);

    // --- Close lightbox on backdrop click / ESC ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // --- Menu page scrollspy for sidebar ---
    const menuSidebarLinks = document.querySelectorAll('.menu-sidebar .menu-item');
    const menuSections = document.querySelectorAll('.menu-section');

    if (menuSidebarLinks.length && menuSections.length) {
        // Smooth scroll with offset for sticky navbar
        menuSidebarLinks.forEach(link => {
            link.addEventListener('click', e => {
                const targetId = link.getAttribute('href').replace('#', '');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const top = targetEl.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

        function updateMenuActive() {
            const scrollPos = window.scrollY;
            let currentId = null;

            menuSections.forEach(section => {
                const offsetTop = section.offsetTop - 130;  // slightly above heading
                if (scrollPos >= offsetTop) {
                    currentId = section.id;
                }
            });

            if (!currentId) return;

            menuSidebarLinks.forEach(link => {
                const match = link.getAttribute('href') === `#${currentId}`;
                link.classList.toggle('active', match);
            });
        }

        // Initial state + on scroll
        updateMenuActive();
        window.addEventListener('scroll', updateMenuActive);
        window.addEventListener('resize', updateMenuActive);
    }
});
