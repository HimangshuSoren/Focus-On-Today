const checkIconList = document.querySelectorAll('.tick') //---->[selecting all the checkboxes]
const goalList = document.querySelectorAll('.goal-input')//---->[selecting all the input fields]
const progress = document.querySelector('.progress') //---->[selecting the progress]
const goalCount = document.querySelector('.goal-count') //---->[number of goals completed displayed in progress bar]
const goalCountSpan = document.querySelector('#goal-count-span') //---->[span tag where no of goals completed is dispalyed]

let count = 0  //---->[number of goals completed ]
let inputCount = 0 //---->[to stop the input event listener from functioning  if already triggered]

checkIconList.forEach((element) => { //---->[set the button checked or unchecked according to the local storage]
    if (localStorage[element.id] == 'true') {
        element.parentElement.classList.add('green-bg')
        element.parentElement.nextElementSibling.classList.add('complete')
    }
})

if (localStorage.countCompletedGoals > 0) { //---->[set the width of progress bar according to the no of goals completed before refreshing the tab]
    progress.classList.remove('vis')
    setTimeout(() => {
        goalCountSpan.classList.remove('goal-count-statement')
    }, 350)
    progress.style.width = `${localStorage.countCompletedGoals * 33.33}%`
    goalCount.innerHTML = localStorage.countCompletedGoals
    count = localStorage.countCompletedGoals
}

goalList.forEach((element) => {  //---->[set the saved data of input stored in local storage]
    if (`${localStorage[element.id]}`.trim() != '') {
        element.value = `${localStorage.getItem(`${element.id}`)}`.trim()
        if (`${element.value}` == 'null') {
            element.value = ''
        }
    }
    else {
        element.value = ''
    }
})

checkIconList.forEach((element) => { //---->[function (click event listener) for all 3 checkboxes]
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
                setTimeout(() => {
                    goalCountSpan.classList.remove('goal-count-statement')
                }, 350)
            }
            if (count == 0) {
                goalCountSpan.classList.add('goal-count-statement')
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


goalList.forEach((goal) => { //---->[mark the checkbox unchecked if any new input is entered]
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
            goalCountSpan.classList.add('goal-count-statement')
            progress.classList.add('vis')
        }
        localStorage.setItem(`${event.target.previousElementSibling.firstElementChild.id}`, false)
    })
})

goalList.forEach((goal) => { //---->[event Listener to check if the checkbox corresponding to the focused input field is checked or unchecked]
    goal.addEventListener('focus', (e) => {
        if ([...e.currentTarget.parentElement.firstElementChild.classList].includes('green-bg')) {
            inputCount = 0
        }
        else {
            inputCount = 1
        }
    })
})