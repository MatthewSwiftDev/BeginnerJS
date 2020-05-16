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
        todoList.unshift({
            content: InputText.value,
            done: false,
            selected: false            
        })

        InputText.value = "";    

        upgradeTask()
    }
})

function upgradeTask(){
    ulElement.innerHTML = ''
    //for(const item of todoList)
    for(let index = 0; index < todoList.length; index++)
    {
        const item = todoList[index]

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
        checkboxElement.id = 'item' + index
        checkboxElement.checked = item.selected
       
        const labelElement = document.createElement('label')
        divElement.append(labelElement)
        labelElement.className = 'form-check-label'
        if(item.done){
            labelElement.className += ' todoDone'
            //console.log(item.content, labelElement.className)
        }
        labelElement.setAttribute('for', 'item' + index)
        labelElement.innerText = item.content

        const buttonDoneElement = document.createElement('button')
        divElement.append(buttonDoneElement)
        buttonDoneElement.type = 'button'
        buttonDoneElement.className = 'btn btn-primary'
        buttonDoneElement.innerText = 'Done'

        const buttonRemoveElement = document.createElement('button')
        divElement.append(buttonRemoveElement)
        buttonRemoveElement.type = 'button'
        buttonRemoveElement.className = 'btn btn-danger'
        buttonRemoveElement.innerText = 'Remove'

        buttonDoneElement.addEventListener('click', () => {
            item.done = !item.done 
            upgradeTask()
        })

        checkboxElement.addEventListener('change', () => {
            item.selected = checkboxElement.checked
        })
    }
}

document.getElementById('doneAction').addEventListener('click', () => {
    for(const item of todoList){
        if(item.selected){
            item.done = true
            item.selected = false
        } 
    }

    upgradeTask()
})

document.getElementById('restoreAction').addEventListener('click', () => {
    for(const item of todoList){
        if(item.selected){
            item.done = false
            item.selected = false
        } 
    }

    upgradeTask()
})

document.getElementById('removeAction').addEventListener('click', () => {
    const quantityItems = todoList.length
    
    for(let index = quantityItems-1; index >= 0; index--){
        const item = todoList[index]

        if(item.selected){  
            todoList.splice(index, 1)
        } 
    }

    upgradeTask()
})