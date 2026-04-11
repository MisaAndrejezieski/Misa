// ========== MENU MOBILE ==========
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

if(btnMenu) {
    btnMenu.addEventListener('click', ()=>{
        menu.classList.add('abrir-menu')
    })
}

if(menu) {
    menu.addEventListener('click', ()=>{
        menu.classList.remove('abrir-menu')
    })
}

if(overlay) {
    overlay.addEventListener('click', ()=>{
        menu.classList.remove('abrir-menu')
    })
}

// ========== SCROLL SUAVE PARA TODOS OS LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        const target = document.querySelector(targetId)
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' })
            // Fecha o menu mobile após clicar (se estiver aberto)
            if(menu) {
                menu.classList.remove('abrir-menu')
            }
        }
    })
})

// ========== LIVRO / PÁGINAS (NOVA SEÇÃO) ==========
let paginaAtual = 1;
const totalPaginas = 5;
const paginas = document.querySelectorAll('.pagina');
const indicador = document.querySelector('.pagina-indicador');
const prevBtn = document.getElementById('prevPagina');
const nextBtn = document.getElementById('nextPagina');

function atualizarLivro() {
    // Esconde todas as páginas
    paginas.forEach(pagina => {
        pagina.classList.remove('ativa');
    });
    
    // Mostra a página atual
    const paginaSelecionada = document.getElementById(`pagina${paginaAtual}`);
    if(paginaSelecionada) {
        paginaSelecionada.classList.add('ativa');
    }
    
    // Atualiza o indicador
    if(indicador) {
        indicador.textContent = `${paginaAtual} / ${totalPaginas}`;
    }
    
    // Desabilita botões se necessário
    if(prevBtn) {
        prevBtn.style.opacity = paginaAtual === 1 ? '0.5' : '1';
        prevBtn.disabled = paginaAtual === 1;
    }
    if(nextBtn) {
        nextBtn.style.opacity = paginaAtual === totalPaginas ? '0.5' : '1';
        nextBtn.disabled = paginaAtual === totalPaginas;
    }
}

function proximaPagina() {
    if(paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarLivro();
    }
}

function paginaAnterior() {
    if(paginaAtual > 1) {
        paginaAtual--;
        atualizarLivro();
    }
}

// Eventos dos botões do livro
if(prevBtn) {
    prevBtn.addEventListener('click', paginaAnterior);
}
if(nextBtn) {
    nextBtn.addEventListener('click', proximaPagina);
}

// Inicializar o livro
if(paginas.length > 0) {
    atualizarLivro();
}

// ========== SUPORTE PARA TECLADO (SETAS) ==========
document.addEventListener('keydown', (e) => {
    // Verifica se a seção do livro está visível na tela
    const livroSection = document.getElementById('livro');
    if(livroSection) {
        const rect = livroSection.getBoundingClientRect();
        const isLivroVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if(isLivroVisible) {
            if(e.key === 'ArrowLeft') {
                paginaAnterior();
                e.preventDefault();
            } else if(e.key === 'ArrowRight') {
                proximaPagina();
                e.preventDefault();
            }
        }
    }
});

// ========== ALERTA DO FORMULÁRIO (enquanto não tem backend) ==========
const form = document.querySelector('form')
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const nomeInput = form.querySelector('input[placeholder*="nome"]')
        const nome = nomeInput ? nomeInput.value : 'amigo'
        alert(`📧 Obrigado ${nome.split(' ')[0]}! Em breve entrarei em contato. 💚`)
        form.reset()
    })
}

// ========== ANO AUTOMÁTICO NO COPYRIGHT (opcional) ==========
const anoAtual = new Date().getFullYear()
const copyright = document.querySelector('.line-footer p:last-child')
if(copyright && copyright.innerHTML.includes('2025')) {
    copyright.innerHTML = copyright.innerHTML.replace('2025', anoAtual)
}

// ========== FECHAR MENU MOBILE AO REDIMENSIONAR A TELA ==========
window.addEventListener('resize', () => {
    if(window.innerWidth > 1020) {
        if(menu) {
            menu.classList.remove('abrir-menu')
        }
    }
})
