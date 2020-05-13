console.log("lolol");

const selectAllButton = document.getElementById("test");
const InputText = document.getElementById("input")

let todoList=[]

function pressButtonFunc() {
    console.log("Pressed the button");
}
selectAllButton.addEventListener('click', pressButtonFunc)

InputText.addEventListener('keydown', event => {
    if(event.key==="Enter" || event.keyCode === 13)
    {
        todoList.push(InputText.value)
        InputText.value = "";   
    }
})