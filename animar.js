// ANIMAÇÕES DO MENU MOBILE
let btnMenu = document.getElementById('btn-menu');
let menuMobile = document.getElementById('menu-mobile');
let overlayMenu = document.getElementById('overlay-menu');

if (btnMenu) {
    btnMenu.addEventListener('click', () => {
        menuMobile.classList.add('abrir');
        overlayMenu.style.display = 'block';
    });
}

function fecharMenu() {
    menuMobile.classList.remove('abrir');
    overlayMenu.style.display = 'none';
}

if (overlayMenu) {
    overlayMenu.addEventListener('click', fecharMenu);
}

document.querySelectorAll('.menu-mobile nav a').forEach(link => {
    link.addEventListener('click', fecharMenu);
});

// SCROLL SUAVE PARA OS LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});