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
        }
    });
});

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const reveals = document.querySelectorAll('.reveal');
const isTouchDevice = window.matchMedia('(hover: none)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reveals.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
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
// TILT 3D NOS CARDS — só desktop, sutil
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
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
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