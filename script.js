const checkIconList = document.querySelectorAll('.tick') //---->[selecting all the checkboxes]
const goalList = document.querySelectorAll('.goal-input')//---->[selecting all the input fields]
const progress = document.querySelector('.progress') //---->[selecting the progress]
const goalCount = document.querySelector('.goal-count') //---->[number of goals completed displayed in progress bar]
let count = 0
let inputCount = 0

checkIconList.forEach((element) => { //---->[function for all 3 checkboxes]
    element.addEventListener('click', (event) => {
        if ([...goalList].every((inputField) => { return inputField.value.trim() })) {
            progress.classList.remove('vis')
            if ([...event.target.parentElement.classList].includes('green-bg')) {
                count--
                progress.style.width = `${count * 33.33}%`
                goalCount.innerHTML = count
            }
            else {
                count++
                goalCount.innerHTML = count
                progress.style.width = `${count * 33.33}%`
            }
            if (count == 0) {
                progress.classList.add('vis')
            }
            inputCount = 0
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


goalList.forEach((goal) => {
    goal.addEventListener('input', (event) => {
        event.stopPropagation()
        event.target.classList.remove('complete')
        event.target.parentElement.firstElementChild.classList.remove('green-bg')
        if (count > 0 && inputCount != 1) {
            count--
            goalCount.innerHTML = count
            progress.style.width = `${count * 33.33}%`
            inputCount++
        }
        if (count == 0) {
            progress.classList.add('vis')
        }

    })
})

goalList.forEach((goal) => {
    goal.addEventListener('focus', (e) => {
        if([...e.currentTarget.parentElement.firstElementChild.classList].includes('green-bg')){
            inputCount = 0

        }
        else{
            inputCount = 1
        }
        
    })
})



