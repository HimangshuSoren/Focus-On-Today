const checkIconList = document.querySelectorAll('.tick') //---->[selecting all the checkboxes]
const goalList = document.querySelectorAll('.goal-input')//---->[selecting all the input fields]
const progress = document.querySelector('.progress') //---->[selecting the progress]
const goalCount = document.querySelector('.goal-count') //---->[number of goals completed displayed in progress bar]

let count = 0
let inputCount = 0

checkIconList.forEach((element) => {
    if (localStorage[element.id] == 'true') {
        element.parentElement.classList.add('green-bg')
        element.parentElement.nextElementSibling.classList.add('complete')
    }
})

if (localStorage.countCompletedGoals > 0) {
    progress.classList.remove('vis')
    progress.style.width = `${localStorage.countCompletedGoals * 33.33}%`
    goalCount.innerHTML = localStorage.countCompletedGoals
    count = localStorage.countCompletedGoals
}

goalList.forEach((element) => {
    if (`${localStorage[element.id]}`.trim() != '') {
        element.value = `${localStorage.getItem(`${element.id}`)}`.trim()
        if (`${element.value}` == 'null' ) {
            element.value = ''
        }
    }
    else {
        element.value = ''
    }
})


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
            event.target.classList.toggle('checked')
            event.target.parentElement.nextElementSibling.classList.toggle('complete')
            localStorage.setItem('countCompletedGoals', count)
            if ([...event.target.parentElement.classList].includes('green-bg')) {
                localStorage.setItem(`${event.target.id}`, true)
            }
            else {
                localStorage.setItem(`${event.target.id}`, false)
            }
        }
        else {
            document.querySelector('.error-label').classList.remove('vis')
        }
    })
})


goalList.forEach((goal) => {
    goal.addEventListener('input', (event) => {
        event.stopPropagation()
        event.target.classList.remove('complete')
        event.target.parentElement.firstElementChild.classList.remove('green-bg')
        localStorage.setItem(`${event.target.id}`, event.target.value)
        if (count > 0 && inputCount != 1) {
            count--
            goalCount.innerHTML = count
            progress.style.width = `${count * 33.33}%`
            inputCount++
            localStorage.countCompletedGoals--
        }
        if (count == 0) {
            progress.classList.add('vis')
        }
        localStorage.setItem(`${event.target.previousElementSibling.firstElementChild.id}`, false)
    })
})

goalList.forEach((goal) => {
    goal.addEventListener('focus', (e) => {
        if ([...e.currentTarget.parentElement.firstElementChild.classList].includes('green-bg')) {
            inputCount = 0
        }
        else {
            inputCount = 1
        }
    })
})



