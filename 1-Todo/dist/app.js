const item = document.querySelector("#item");
const toDoBox = document.getElementById("to-do-box");

item.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {

        addToDo(this.value)
        this.value = "";
    }
})

const addToDo = (item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = item;


    // listItem.addEventListener("click", () => {
    //     this.classList.toggle("done");
    // })

    // listItem.querySelector("i").addEventListener("click", () => {
    //     listItem.remove();
    // })
    toDoBox.appendChild(listItem);
}