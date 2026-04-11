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

// ========== ANO AUTOMÁTICO NO COPYRIGHT ==========
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

// ========== EFECTO DE SCROLL NO HEADER (muda transparência) ==========
const header = document.querySelector('header')
if(header) {
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)'
            header.style.backdropFilter = 'blur(10px)'
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)'
            header.style.backdropFilter = 'blur(10px)'
        }
    })
}

// ========== ANIMAÇÃO AO SCROLL PARA AS SEÇÕES ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate')
        }
    })
}, observerOptions)

// Seleciona todos os elementos que terão animação
const animateElements = document.querySelectorAll('.especialidades-box, .img-port, .txt-sobre, .img-sobre, .formulario form')
animateElements.forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
})

// Adiciona classe animate para aplicar os estilos
const style = document.createElement('style')
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`
document.head.appendChild(style)
