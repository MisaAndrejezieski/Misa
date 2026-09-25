// ============================================================
// DICAS.JS — Lógica da página de dicas (estilo Site-Bonito)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.dicas-nav-link');
    const cards = document.querySelectorAll('.dicas-lista-card[data-target]');
    let currentPageIndex = 0;
    let timeout;

    // ----------------------------------------------------------
    // Mostra a página pelo índice
    // ----------------------------------------------------------
    function showPage(index) {
        if (index < 0 || index >= pages.length) return;

        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });

        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });

        currentPageIndex = index;
        history.replaceState(null, '', '#' + pages[index].id);
        pages[index].scrollTop = 0;
    }

    // ----------------------------------------------------------
    // Navegação por clique no menu
    // ----------------------------------------------------------
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(index);
        });
    });

    // ----------------------------------------------------------
    // Navegação por clique nos cards (lista)
    // ----------------------------------------------------------
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const target = parseInt(card.dataset.target, 10);
            showPage(target);
        });
    });

    // ----------------------------------------------------------
    // Links internos (voltar pra lista, etc.)
    // ----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const targetId = href.substring(1);
            const targetIndex = Array.from(pages).findIndex(p => p.id === targetId);

            if (targetIndex !== -1) {
                e.preventDefault();
                showPage(targetIndex);
            }
        });
    });

    // ----------------------------------------------------------
    // Navegação por scroll (mouse) — debounce
    // ----------------------------------------------------------
    window.addEventListener('wheel', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const currentPage = pages[currentPageIndex];
            const isScrollingDown = e.deltaY > 0;
            const isAtTop = currentPage.scrollTop === 0;
            const isAtBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight - 2;

            if (isScrollingDown && isAtBottom && currentPageIndex < pages.length - 1) {
                showPage(currentPageIndex + 1);
            } else if (!isScrollingDown && isAtTop && currentPageIndex > 0) {
                showPage(currentPageIndex - 1);
            }
        }, 80);
    }, { passive: true });

    // ----------------------------------------------------------
    // Navegação por swipe (touch) — só dispara no topo/fim
    // ----------------------------------------------------------
    let startY = 0;
    window.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;

        if (Math.abs(deltaY) < 80) return;

        const currentPage = pages[currentPageIndex];
        const isAtTop = currentPage.scrollTop === 0;
        const isAtBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight - 2;

        if (deltaY > 0 && isAtBottom && currentPageIndex < pages.length - 1) {
            showPage(currentPageIndex + 1);
        } else if (deltaY < 0 && isAtTop && currentPageIndex > 0) {
            showPage(currentPageIndex - 1);
        }
    }, { passive: true });

    // ----------------------------------------------------------
    // Suporte a #hash na URL ao carregar a página
    // ----------------------------------------------------------
    const hash = window.location.hash.substring(1);
    if (hash) {
        const index = Array.from(pages).findIndex(p => p.id === hash);
        if (index !== -1) {
            showPage(index);
            return;
        }
    }

    // Inicialização
    showPage(0);
});