// MENU MOBILE
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

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' })
            menu.classList.remove('abrir-menu')
        }
    })
})

// ALERT DO FORMULÁRIO
const form = document.querySelector('form')
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const nome = form.querySelector('input[placeholder*="nome"]')?.value || 'amigo'
        alert(`📧 Obrigado ${nome.split(' ')[0]}! Em breve entrarei em contato. 💚`)
        form.reset()
    })
}
