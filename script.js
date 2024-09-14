const message = document.querySelector('.message')
const today = document.querySelector('.today')
today.addEventListener('click',()=>{
    message.classList.toggle('visible')
})