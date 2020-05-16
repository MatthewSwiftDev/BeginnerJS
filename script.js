console.log("lolol");

const selectAllButton = document.getElementById("test");
const InputText = document.getElementById("input")
const ulElement = document.getElementById("list")

let todoList=[]

// При нажатии на клавишу, 
function pressButtonFunc() {
    console.log("Pressed the button");
}
selectAllButton.addEventListener('click', pressButtonFunc)

InputText.addEventListener('keydown', event => {
    if(event.key==="Enter" || event.keyCode === 13)
    {
        todoList.push(InputText.value)
        InputText.value = "";      
        upgradeTask()
    }
})

function upgradeTask(){
    ulElement.innerHTML = ''
    for(item of todoList)
    {
        const liElement = document.createElement('li')
        liElement.className = 'list-group-item'
        ulElement.append(liElement)

        const divElement = document.createElement('div')
        divElement.className = 'form-group form-check'
        liElement.append(divElement)

        const checkboxElement = document.createElement('input') 
        divElement.append(checkboxElement)
        checkboxElement.type = 'checkbox'
        checkboxElement.className = 'form-check-input'

        const labelElement = document.createElement('label')
        divElement.append(labelElement)
        labelElement.className = 'form-check-label'
        labelElement.setAttribute('for', 'examplecheck1')
        labelElement.innerText = item

        const buttonDone = document.createElement('button')
        divElement.append(buttonDone)
        buttonDone.type = 'button'
        buttonDone.className = 'btn btn-primary'
        buttonDone.innerText = 'Done'

        const buttonRemove = document.createElement('button')
        divElement.append(buttonRemove)
        buttonRemove.type = 'button'
        buttonRemove.className = 'btn btn-danger'
        buttonRemove.innerText = 'Remove'
    }
}