const checkIconList = document.querySelectorAll('.tick') //---->[selecting all the checkboxes]
const goalList = document.querySelectorAll('.goal-input')//---->[selecting all the input fields]


checkIconList.forEach((element) => { //---->[function for all 3 checkboxes]
    element.addEventListener('click', (event) => {
        if ([...goalList].every((inputField) => {return inputField.value.trim()})) {
            document.querySelector('.error-label').classList.add('vis')
            event.target.parentElement.classList.toggle('green-bg')
            event.target.parentElement.nextElementSibling.classList.toggle('complete')
        }
        else {
            document.querySelector('.error-label').classList.remove('vis')
        }
        // console.dir(event.target.parentElement.nextElementSibling)
    })
})


goalList.forEach((goal)=>{
    goal.addEventListener('input',(event)=>{
        event.stopPropagation()
        event.target.classList.remove('complete')
        event.target.parentElement.firstElementChild.classList.remove('green-bg')
    })
})



