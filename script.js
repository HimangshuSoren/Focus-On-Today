const checkIconList = document.querySelectorAll('.tick')
const goalList = document.querySelectorAll('.goal-input')


checkIconList.forEach((element)=>{
        element.addEventListener('click',(event)=>{
            event.target.parentElement.classList.toggle('green-bg')
            event.target.parentElement.nextElementSibling.classList.toggle('complete')

            // console.dir(event.target.parentElement.nextElementSibling)

        })
})


