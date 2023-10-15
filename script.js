const itemArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):
[]

console.log(itemArray)

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})
function createItem (item){
    itemArray.push(item.value)
    localStorage.setItem("items",JSON.stringify(itemArray))
    location.reload()
}
function displayItems(){
    if(itemArray.length === 0){
        document.querySelector(".to-do-list").innerHTML = `<div class="non">
        <h1>Nothing is here!!<br> you need to put some thing</h1>
    </div>`
    } else {
        let items = ""
        for(let i=0;i<itemArray.length ;++i ) {
            items += `
            <div class="item">
                <div class="inputcontroller">
                <h3 style="width: 100%; margin-bottom: 0px;margin-top: 10px;"><textarea disabled>${itemArray[i]}</textarea></h3>
                    <div class="editcontroller">
                        <i class="deletebtn fa-regular fa-square-check"></i>
                        <i class="editbtn fa-regular fa-pen-to-square"></i>
                    </div>
                </div>
                <div class="updatecontroller">
                <div class="buttonss">
                <button class="savebtn">save</button>
                <button class="cancelbtn">cancel</button>
            </div>
                </div>
            </div>`
        }
        document.querySelector(".to-do-list").innerHTML = items
        activateDeleteListioners()
        activateEditListioners()
        activateSaveListioners()
        activateCancelListioners()
    }
}
function activateDeleteListioners() {
    let deletebtn =  document.querySelectorAll(".deletebtn")
    deletebtn.forEach((db, i) => {
        db.addEventListener('click', () => { deleteItem(i)})
    })
}
function deleteItem(i){
    itemArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemArray))
    location.reload()  
}

function activateEditListioners(){
    const editbtn = document.querySelectorAll(".editbtn")
    const updatecontroller = document.querySelectorAll(".updatecontroller")
    const inputs = document.querySelectorAll(".inputcontroller textarea")
    editbtn.forEach((eb, i)=>{
        eb.addEventListener ("click" , ()=>{
            updatecontroller[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}
function activateSaveListioners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".inputcontroller textarea")
    saveBtn.forEach((sb, i) =>{
        sb.addEventListener("click", () =>{
            updateItem(inputs[i].value , i)
        })
    })
}
function activateCancelListioners(){
    const cancelBtns=document.querySelectorAll('.cancelbtn')
    const updatecontroller = document.querySelectorAll(".updatecontroller")
    const inputs = document.querySelectorAll(".inputcontroller textarea")
    cancelBtns .forEach ((cb, i)=> {
        cb.addEventListener ('click' , ()=> {
            updatecontroller [i].style.display = 'none'
            inputs[i].disabled = true 
        })
    })
}
function updateItem(text, i){
    itemArray[i] = text 
    localStorage.setItem ("items", JSON.stringify(itemArray))
    location.reload()
}
function displaydate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[0]+" "+date[1]+" "+date[2]+" "+date[3]
}
 
window.onload = function(){
    displaydate()
    displayItems()
}