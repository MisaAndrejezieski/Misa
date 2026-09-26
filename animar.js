// ============================================================
// MENU MOBILE
// ============================================================
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const overlayMenu = document.getElementById('overlay-menu');

function abrirMenu() {
    menuMobile.classList.add('abrir-menu');
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'true');
}

function fecharMenu() {
    menuMobile.classList.remove('abrir-menu');
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
}

if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', () => {
        if (menuMobile.classList.contains('abrir-menu')) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });
}

if (overlayMenu) {
    overlayMenu.addEventListener('click', fecharMenu);
}

// Fecha o menu ao clicar em qualquer link dentro dele
document.querySelectorAll('.menu-mobile nav a').forEach(link => {
    link.addEventListener('click', fecharMenu);
});

// Fecha o menu com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuMobile.classList.contains('abrir-menu')) {
        fecharMenu();
    }
});

// ============================================================
// SCROLL SUAVE PARA OS LINKS INTERNOS
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