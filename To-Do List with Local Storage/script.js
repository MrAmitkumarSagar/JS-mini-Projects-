const inputBox=document.getElementById('inputBox');
const todoList=document.getElementById('todoList');
const AddBtn=document.getElementById('AddBtn') ;

let editTodo = null;

const populateafterRefresh = ()=>
{
    let LocalData=getFromLocalStorage();
    if(LocalData.length>0)
    {
        LocalData.forEach((todo)=>{
            addTodoItemList(todo);
        })
    }
}

const getFromLocalStorage=()=>
{
    const LocalData = localStorage.getItem("MyTodo"); 
    if(!LocalData){
        let MyData=[]
        return MyData;
    }
    return  Array.from(JSON.parse(LocalData));
}


const setToLocalStorage=(todo)=>
{
    let MyData= getFromLocalStorage(); 
    MyData.push(todo);
    localStorage.setItem("MyTodo", JSON.stringify(MyData)); 
}

const deleteLocalStorage=(e)=>{
    const textValue =e.target.parentElement.previousSibling.innerHTML;
    let LocalArray=getFromLocalStorage();
    let removeIndex=LocalArray.indexOf(textValue);
    LocalArray.splice(removeIndex,1);
    localStorage.clear();
    localStorage.setItem("MyTodo", JSON.stringify(LocalArray));
}



const addTodoItemList=(data)=>{
    const li =document.createElement("li");

    const p=document.createElement("p");
    p.innerHTML=data;
    li.appendChild(p);

    const div=document.createElement("div");

    const deleteButton= document.createElement("button");
    deleteButton.innerText='Remove';
    deleteButton.classList.add('buttons');
    div.appendChild(deleteButton);

    const editButton= document.createElement("button");
    editButton.innerText='Edit';
    editButton.classList.add('buttons');
    div.appendChild(editButton);

    li.appendChild(div);
    todoList.appendChild(li);
}


const addTodo =()=>{
    let data =inputBox.value.trim();
    if(!data){
        alert('Please Enter the details to Add')
        return
    }
    if(AddBtn.value==='Edit'){
        console.log(editTodo.target.parentElement.previousSibling.innerText);
        console.log(data);
        editTodo.target.parentElement.previousSibling.innerText=data;
        AddBtn.value= "Add";
        inputBox.value="";
        return;
    }

    addTodoItemList(data);
    inputBox.value="";
    setToLocalStorage(data);
}

const removeData=(e)=>{
    const li =e.target.parentElement.parentElement;
    todoList.removeChild(li);
    deleteLocalStorage(e);
}

const editData=(e)=>{
    const textValue =e.target.parentElement.previousSibling.innerHTML;
    inputBox.value= textValue; 
    inputBox.focus();
    AddBtn.value='Edit';
    editTodo=e;
}

const updateTodo=(e)=>{
    const clickedItem=e.target.innerText; 
    if(clickedItem ==="Remove" ||clickedItem==="Edit"){
        console.log();
       
        clickedItem==='Remove'?removeData(e):editData(e);
    }
    else{
        return};
   
}

populateafterRefresh();

AddBtn.addEventListener('click',addTodo);
todoList.addEventListener('click', updateTodo);
