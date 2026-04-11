// ========== MENU MOBILE (seu código original) ==========
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

// ========== NOVIDADES ABAIXO ==========

// 1. SCROLL SUAVE para todos os links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' })
            // Fecha o menu mobile após clicar (se estiver aberto)
            menu.classList.remove('abrir-menu')
        }
    })
})

// 2. ANO AUTOMÁTICO no copyright (opcional)
const anoAtual = new Date().getFullYear()
const copyright = document.querySelector('.line-footer p:last-child')
if(copyright) {
    copyright.innerHTML = copyright.innerHTML.replace('2025', anoAtual)
}

// 3. PREVENIR ENVIO DO FORMULÁRIO (enquanto não tem backend)
const form = document.querySelector('form')
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        alert('📧 Em breve entrarei em contato! Obrigado pela mensagem, ' + form.querySelector('input[placeholder*="nome"]').value.split(' ')[0] + '!')
        form.reset()
    })
}