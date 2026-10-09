// ============================================================
// LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
    const loading = document.getElementById('loading-screen');
    if (!loading) return;
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 900);
});

// ============================================================
// SCROLL SUAVE
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            fecharMenu();
        }
    });
});

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const scrollProgress = document.getElementById('scroll-progress');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = percentage + '%';
    });
}

// ============================================================
// CURSOR CUSTOMIZADO
// ============================================================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const isTouchDevice = window.matchMedia('(hover: none)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cursorDot && cursorRing && !isTouchDevice && !prefersReducedMotion) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        document.body.classList.add('cursor-ready');
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll('a, button, .hero-card, .img-port, input, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-ready');
    });
}

// ============================================================
// MENU LATERAL
// ============================================================
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const menuOverlay = document.getElementById('menu-overlay');

function abrirMenu() {
    if (!sideMenu || !menuToggle) return;
    sideMenu.classList.add('open');
    menuOverlay.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
}

function fecharMenu() {
    if (!sideMenu || !menuToggle) return;
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', fecharMenu);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('open')) {
        fecharMenu();
    }
});

// ============================================================
// REVEAL ON SCROLL (Intersection Observer)
// ============================================================
const reveals = document.querySelectorAll('.reveal');

if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    reveals.forEach(el => observer.observe(el));
} else {
    reveals.forEach(el => el.classList.add('visible'));
}

// ============================================================
// TILT 3D NOS CARDS
// ============================================================
if (!isTouchDevice && !prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('.tilt');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================================
// BOTÃO VOLTAR AO TOPO
// ============================================================
const btnTopo = document.getElementById('btn-topo');

if (btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnTopo.classList.add('visivel');
        } else {
            btnTopo.classList.remove('visivel');
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// FORMULÁRIO VIA MAILTO
// ============================================================
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('campo-nome').value.trim();
        const email = document.getElementById('campo-email').value.trim();
        const whatsapp = document.getElementById('campo-whatsapp').value.trim();
        const mensagem = document.getElementById('campo-mensagem').value.trim();

        const destinatario = 'misaelandrejezieski130982@outlook.com.br';
        const assunto = `Contato do site - ${nome}`;

        const corpo = 
            `Nome: ${nome}\n` +
            `E-mail: ${email}\n` +
            `WhatsApp: ${whatsapp || '(não informado)'}\n` +
            `\n` +
            `Mensagem:\n${mensagem}`;

        const mailtoURL = 
            `mailto:${destinatario}` +
            `?subject=${encodeURIComponent(assunto)}` +
            `&body=${encodeURIComponent(corpo)}`;

        window.location.href = mailtoURL;
    });
}