const checkIconList = document.querySelectorAll('.tick') //---->[selecting all the checkboxes]
const goalList = document.querySelectorAll('.goal-input')//---->[selecting all the input fields]
const progress = document.querySelector('.progress') //---->[selecting the progress]
const goalCount = document.querySelector('.goal-count') //---->[number of goals completed displayed in progress bar]
const goalText1 = document.querySelector('#goaltext1')
const goalText2 = document.querySelector('#goaltext2')
const goalText3 = document.querySelector('#goaltext3')


//---->[green tick Images]
let greenCheck1 = document.querySelector('#greencheck1')
let greenCheck2 = document.querySelector('#greencheck2')
let greenCheck3 = document.querySelector('#greencheck3')


let count = 0
let inputCount = 0



if(localStorage.greencheck1 == 'true' ){
    greenCheck1.parentElement.classList.add('green-bg')
    greenCheck1.parentElement.nextElementSibling.classList.add('complete')
}

if(localStorage.greencheck2 == 'true' ){
    greenCheck2.parentElement.classList.add('green-bg')
    greenCheck2.parentElement.nextElementSibling.classList.add('complete')
}
if(localStorage.greencheck3 == 'true' ){
    greenCheck3.parentElement.classList.add('green-bg')
    greenCheck3.parentElement.nextElementSibling.classList.add('complete')
}



if(localStorage.countCompletedGoals>0){
    progress.classList.remove('vis')
    progress.style.width = `${localStorage.countCompletedGoals * 33.33}%`
    goalCount.innerHTML =localStorage.countCompletedGoals
    count = localStorage.countCompletedGoals
}

goalText1.value = localStorage.getItem('goaltext1') || ''
goalText2.value = localStorage.getItem('goaltext2') || ''
goalText3.value = localStorage.getItem('goaltext3') || ''


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
            localStorage.setItem('countCompletedGoals',count)
            if([...event.target.parentElement.classList].includes('green-bg')){
                localStorage.setItem(`${event.target.id}`,true)
            }
            else{
                localStorage.setItem(`${event.target.id}`,false)
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
        localStorage.setItem(`${event.target.id}`,event.target.value)
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
        localStorage.setItem(`${event.target.previousElementSibling.firstElementChild.id}`,false)
        
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



