let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');
const totalImages = 12; // Número total de imagens
const background = document.querySelector('.background');
const navLinks = document.querySelectorAll('.nav-link');
let timeout;

// Função para mostrar a página atual
function showPage(index) {
    pages.forEach((page, i) => {
        if (i === index) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    // Atualiza o link ativo no menu
    navLinks.forEach((link, i) => {
        if (i === index) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Função para carregar imagens de fundo dinamicamente
function loadBackground() {
    const imageNumber = (currentPageIndex % totalImages) + 1; // Alterna entre as 12 imagens
    const imageUrl = `images/a${imageNumber.toString().padStart(3, '0')}.jpg`;
    console.log(`Carregando imagem: ${imageUrl}`); // Log para depuração

    // Pré-carrega a imagem para evitar atrasos
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        background.style.backgroundImage = `url('${imageUrl}')`;
    };
    img.onerror = () => {
        console.error(`Erro ao carregar a imagem: ${imageUrl}`); // Log de erro
    };
}

// Controle de scroll personalizado com debounce
window.addEventListener('wheel', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const currentPage = pages[currentPageIndex];
        const isScrollingDown = e.deltaY > 0;
        const isAtTop = currentPage.scrollTop === 0;
        const isAtBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight;

        if (isScrollingDown && isAtBottom) {
            currentPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
            showPage(currentPageIndex);
            loadBackground();
        } else if (!isScrollingDown && isAtTop) {
            currentPageIndex = Math.max(currentPageIndex - 1, 0);
            showPage(currentPageIndex);
            loadBackground();
        }
    }, 100); // Ajuste o tempo conforme necessário
});

// Suporte para dispositivos touch
let startY;
window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});
window.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    if (Math.abs(deltaY) > 50) { // Sensibilidade do swipe
        if (deltaY > 0) {
            // Swipe para cima
            currentPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
        } else {
            // Swipe para baixo
            currentPageIndex = Math.max(currentPageIndex - 1, 0);
        }
        showPage(currentPageIndex);
        loadBackground();
    }
});

// Navegação pelo menu
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentPageIndex = index;
        showPage(currentPageIndex);
        loadBackground();
    });
});

// Inicialização
window.addEventListener('load', () => {
    showPage(currentPageIndex);
    loadBackground();
});