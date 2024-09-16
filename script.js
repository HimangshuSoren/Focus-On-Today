const checkbox1 = document.querySelector('.coustom-checkbox-1')
const check1 = document.querySelector('#green-check-1')
const goalText1 = document.querySelector('#goal-text-1')
const goalText2 = document.querySelector('#goal-text-2')
const goalText3 = document.querySelector('#goal-text-3')
checkbox1.addEventListener('click',()=>{
    check1.classList.toggle('vis')
    checkbox1.classList.toggle('green-bg')
    goalText1.classList.toggle('green-text')

})
const checkbox2 = document.querySelector('.coustom-checkbox-2')
const check2 = document.querySelector('#green-check-2')
checkbox2.addEventListener('click',()=>{
    check2.classList.toggle('vis')
    checkbox2.classList.toggle('green-bg')
    goalText2.classList.toggle('green-text')

})
const checkbox3 = document.querySelector('.coustom-checkbox-3')
const check3 = document.querySelector('#green-check-3')
checkbox3.addEventListener('click',()=>{
    check3.classList.toggle('vis')
    checkbox3.classList.toggle('green-bg')
    goalText3.classList.toggle('green-text')

})
