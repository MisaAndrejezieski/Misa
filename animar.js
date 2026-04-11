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

// ========== SCROLL SUAVE PARA LINKS DO MENU ==========
document.querySelectorAll('header a[href^="#"], .menu-mobile a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        const target = document.querySelector(targetId)
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' })
            if(menu) {
                menu.classList.remove('abrir-menu')
            }
        }
    })
})

// ========== LIVRO COM EFEITO 3D ==========
const paginas = [
    {
        imagem: 'images/jf001.jpg',
        titulo: '🌅 O INÍCIO',
        texto: 'Um computador, uma paixão por tecnologia e muito café. Foi amor à primeira linha de código.'
    },
    {
        imagem: 'images/me.jpg',
        titulo: '💻 APRENDIZADO',
        texto: 'Primeiras linhas de código. Bugs, aprendizado e evolução constante. Cada erro foi um degrau na escada do conhecimento.'
    },
    {
        imagem: 'images/japan001.jpg',
        titulo: '🚀 PROJETOS',
        texto: 'Projetos incríveis nascem. Criatividade e técnica se encontram para criar experiências digitais memoráveis.'
    },
    {
        imagem: 'images/game-web-design.jpg',
        titulo: '🎮 INOVAÇÃO',
        texto: 'Design e inovação. Transformando ideias em experiências digitais que conectam pessoas e negócios.'
    },
    {
        imagem: 'images/cip-benco.png',
        titulo: '🏆 FUTURO',
        texto: 'O futuro é agora. Pronto para o próximo desafio e para criar soluções que transformam o mundo.'
    }
]

let paginaIndex = 0
const totalPaginas = paginas.length
let isAnimating = false

const paginaWrapper = document.getElementById('paginaWrapper')
const paginaFrente = document.getElementById('paginaFrente')
const paginaVerso = document.getElementById('paginaVerso')
const scrollProgress = document.getElementById('scrollProgress')
const paginaAtualSpan = document.getElementById('paginaAtual')
const totalPaginasSpan = document.getElementById('totalPaginas')

if(totalPaginasSpan) {
    totalPaginasSpan.textContent = totalPaginas
}

function atualizarConteudoPagina(elemento, index) {
    const pagina = paginas[index]
    const imagemDiv = elemento.querySelector('.pagina-imagem')
    const tituloH2 = elemento.querySelector('.pagina-texto h2')
    const textoP = elemento.querySelector('.pagina-texto p')
    
    if(imagemDiv) imagemDiv.style.backgroundImage = `url('${pagina.imagem}')`
    if(tituloH2) tituloH2.textContent = pagina.titulo
    if(textoP) textoP.textContent = pagina.texto
}

function atualizarIndicador() {
    if(paginaAtualSpan) {
        paginaAtualSpan.textContent = paginaIndex + 1
    }
    if(scrollProgress) {
        const percent = (paginaIndex / (totalPaginas - 1)) * 100
        scrollProgress.style.height = `${percent}%`
    }
}

function virarPagina(direcao) {
    if(isAnimating) return
    
    const novaPagina = paginaIndex + direcao
    if(novaPagina < 0 || novaPagina >= totalPaginas) return
    
    isAnimating = true
    
    // Prepara o verso com o próximo conteúdo
    const proximoIndex = novaPagina
    atualizarConteudoPagina(paginaVerso, proximoIndex)
    
    // Adiciona classe para animação
    paginaWrapper.classList.add('virando')
    
    setTimeout(() => {
        // Atualiza a frente com o conteúdo do verso
        atualizarConteudoPagina(paginaFrente, proximoIndex)
        
        // Remove a animação
        paginaWrapper.classList.remove('virando')
        
        // Atualiza o índice
        paginaIndex = proximoIndex
        atualizarIndicador()
        
        isAnimating = false
    }, 800)
}

// Scroll na área do livro
const livroSection = document.getElementById('livro')
let scrollTimeout = null
let lastScrollTime = 0

if(livroSection) {
    livroSection.addEventListener('wheel', (e) => {
        const now = Date.now()
        if(now - lastScrollTime < 800) return
        
        if(e.deltaY > 0) {
            virarPagina(1)
        } else if(e.deltaY < 0) {
            virarPagina(-1)
        }
        
        lastScrollTime = now
        e.preventDefault()
    }, { passive: false })
}

// Inicializa o livro
atualizarConteudoPagina(paginaFrente, 0)
atualizarConteudoPagina(paginaVerso, 1)
atualizarIndicador()

// ========== ALERTA DO FORMULÁRIO ==========
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

// ========== ANO AUTOMÁTICO ==========
const anoAtual = new Date().getFullYear()
const copyright = document.querySelector('.line-footer p:last-child')
if(copyright && copyright.innerHTML.includes('2025')) {
    copyright.innerHTML = copyright.innerHTML.replace('2025', anoAtual)
}

// ========== FECHAR MENU AO REDIMENSIONAR ==========
window.addEventListener('resize', () => {
    if(window.innerWidth > 1020) {
        if(menu) {
            menu.classList.remove('abrir-menu')
        }
    }
})

// ========== HEADER DINÂMICO ==========
const header = document.querySelector('header')
if(header) {
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)'
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)'
        }
    })
}
