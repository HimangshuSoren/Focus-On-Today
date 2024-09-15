const checkbox = document.querySelector('.checkbox')
const check = document.querySelector('.tick')
checkbox.addEventLAllistener('click',()=>{
    check.classList.toggle('vis')

})