const InputText = document.getElementById("input")
const ulElement = document.getElementById("list")
const actionPanel1Element = document.getElementById('actionPanel1')
const actionPanel2Element = document.getElementById('actionPanel2')

let todoList=[]

// Панель с действимя изначальна не видна
actionPanel2Element.style.display = 'none'

// Если строка не пустая и нажимаем Enter, то заносим строку в todoList
InputText.addEventListener('keydown', event => {
    if((event.key==="Enter" || event.keyCode === 13) && InputText.value)
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

// Вывод всех задач
function upgradeTask(){
    ulElement.innerHTML = ''

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
        }
        labelElement.setAttribute('for', 'item' + index)
        labelElement.innerText = item.content

        // Если задача не выполнена, то отображается только кнопка "Done"
        if(!item.done){
            const buttonDoneElement = document.createElement('button')
            divElement.append(buttonDoneElement)
            buttonDoneElement.type = 'button'
            buttonDoneElement.className = 'btn btn-primary'
            buttonDoneElement.innerText = 'Done'
            buttonDoneElement.style = 'float: right'

            buttonDoneElement.addEventListener('click', () => {
                item.done = !item.done 
                upgradeTask()
            })
        }
        // Иначе отображается только кнопка "Remove"
        else{
            const buttonRemoveElement = document.createElement('button')
            divElement.append(buttonRemoveElement)
            buttonRemoveElement.type = 'button'
            buttonRemoveElement.className = 'btn btn-danger'
            buttonRemoveElement.innerText = 'Remove'
            buttonRemoveElement.style = 'float: right'
            
            buttonRemoveElement.addEventListener('click', () => {
                    todoList = todoList.filter(i => i != item)
                    upgradeTask()
                })
        }
        
        checkboxElement.addEventListener('change', () => {
            item.selected = checkboxElement.checked
            upgradeTask()
        })
    }

    // Если выбран хотя бы один элемент, то панель с действиями появляется
    if(todoList.some(i => i.selected)) {
        actionPanel2Element.style.display = 'block' 
    } else {
        actionPanel2Element.style.display = 'none'   
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
    
    // const quantityItems = todoList.length
    
    // for(let index = quantityItems-1; index >= 0; index--){
    //     const item = todoList[index]

    //     if(item.selected){  
    //         todoList.splice(index, 1)
    //     } 
    // }

    todoList = todoList.filter(i => !i.selected)

    upgradeTask()
})

document.getElementById('test').addEventListener('click', () => {
    todoList.forEach(item => {
        item.selected = true;
    });

    upgradeTask()
})