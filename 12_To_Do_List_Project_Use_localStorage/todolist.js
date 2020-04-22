const items = document.querySelector('.items');
const input = document.querySelector('#input');
const searchForm = document.getElementById('searchForm');


// button click to clear all item
const buttonClear = document.querySelector('.clearitem');
buttonClear.addEventListener('click',clearFunction);

// function clear all item
function clearFunction(event){
    if(items.textContent !== ''){
        items.textContent = '';
        todoItems = [];
        // setlocalStorage(todoItems); // update local storage
        localStorage.removeItem('todoItems'); // clear key
        items.insertAdjacentHTML('beforeend','<div>Clear all !</div>');
    }
    else {
        items.insertAdjacentHTML('beforeend','<div>at least 1 item to clear !</div>');
    }
    items.firstElementChild.style.fontSize = '2rem';
    items.firstElementChild.style.color = 'lightblue';
    setTimeout(function(){    
        items.removeChild(items.firstElementChild);
    },1500)  
}

//add an item
let todoItems = [];

getlocalStorage();

const group_input = document.querySelector('.group_input');
const Form = document.querySelector('#itemForm');
Form.addEventListener('submit',setItem);
function setItem(event){

    event.preventDefault();
    const itemName = input.value;

    if(itemName === ''){
        let show = document.querySelector('.show');
        show.style.display = 'block';
        show.style.color = 'lightblue';
        show.style.fontSize = '2rem';
        setTimeout(function(){
            show.style.display = 'none';
        },2000)
    }
    else{
        todoItems.push(itemName);
        setlocalStorage(todoItems);
        addValue(items,todoItems);
    }
    
}

// function set key/value from localstorage
function setlocalStorage(todoItems){
    let JSONready = JSON.stringify(todoItems)
    localStorage.setItem('todoItems',JSONready);
}

// function get key/value from localstorage
function getlocalStorage(){
    let getlocalStorage = localStorage.getItem('todoItems');
    if(getlocalStorage === 'undefined' || getlocalStorage === null){
        todoItems = [];
    }
    else {
        todoItems = JSON.parse(getlocalStorage);
        addValue(items,todoItems);
    }
}


//function add item todolist
function addValue(todoName,todoItems){
    // Javascript Template Literals
    todoName.textContent = '';
    todoItems.forEach(function(item){
        todoName.insertAdjacentHTML('beforeend',
            `<div class='option'>
                <div class="list_item">${item}</div> 
                <div class="list_icon">
                    <i class="fa fa-check-square-o" aria-hidden="true"></i>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-minus-square-o" aria-hidden="true"></i>
                </div>
            </div>`);
    })
    input.value = '';
    
}


let edit_name = document.querySelector('.edit_name');
let get_edit_name = document.getElementById('rename_item');
let option = document.querySelectorAll('.option');

items.addEventListener('click',settingItem);
function settingItem(event){

    let checkSetting = event.target.classList;
    // find class list_item
    let checkItem = parentwithClass(event.target,"option").firstElementChild;
    let deleteItem = parentwithClass(event.target,"option");


    if(checkSetting.contains('fa-check-square-o')){
        if(checkItem.style.textDecoration === 'line-through') {
            checkItem.style.textDecoration = 'none';
            checkItem.style.opacity = '1';
            event.target.style.opacity = '1';
        }
        else{    
            checkItem.style.textDecoration = 'line-through';
            checkItem.style.opacity = '0.5';
            event.target.style.opacity = '0.5';
        }
    }
    else if(checkSetting.contains('fa-pencil-square-o')){
        edit_name.style.display = 'block';
        checkItem.classList.add('editing');
        get_edit_name.value = checkItem.textContent;
    }
    else if(checkSetting.contains('fa-minus-square-o')) {
        if(confirm('You want to delete item ?') == true){
            deleteItem.remove();
            for(let i=0;i<todoItems.length;i++){
                if(todoItems[i] === checkItem.textContent){
                    todoItems.splice(i,1);
                }
            }
            setlocalStorage(todoItems);
        }
    }
}
let clickOk = document.querySelector('.btn_confirm .btn-primary');
clickOk.addEventListener('click',Accept_rename);
let clickCancel = document.querySelector('.btn_confirm .cancel');

// function to cancel rename
clickCancel.addEventListener('click',function(){
    let option = document.querySelectorAll('.option');  

    edit_name.style.display = 'none';
    Array.from(option).forEach(function(thing){
        let findEdit = thing.firstElementChild;
        if(findEdit.classList.contains('editing')){
            findEdit.classList.remove('editing'); 
        }
    })
});

// function click OK to rename
function Accept_rename(){
    let option = document.querySelectorAll('.option');  
    // find class editing and rename
    Array.from(option).forEach(function(thing){
        let findEdit = thing.firstElementChild;
        if(findEdit.classList.contains('editing')){
            let findposEdit = document.querySelectorAll('.fa-pencil-square-o');
            for(let i=0;i<findposEdit.length;i++){
                let pre = findposEdit[i].parentElement.previousElementSibling;
                if(pre.classList.contains('editing')){
                    if(findEdit.textContent === todoItems[i]){
                        todoItems[i] = get_edit_name.value;
                        findEdit.textContent = get_edit_name.value;
                        setlocalStorage(todoItems);
                    }
                }
            }
        }
        findEdit.classList.remove('editing'); 
    })   
    edit_name.style.display = 'none';
}

// function find parent of children 
function parentwithClass(elem,nameclass){
    while(elem = elem.parentElement){
        if(elem.classList.contains(nameclass)){
            return elem;
        }
    }
}
input.addEventListener('click',function(){
    searchForm.style.width = '12%';
    searchForm.style.opacity = '0.5';
})
const searchInput = document.querySelector('#search');
const notifi = document.querySelector('.notifi');

searchForm.addEventListener('keyup',searchItem);
function searchItem(event){
    searckKey = event.target.value.toLowerCase();
    let ItemFrTodolist = document.querySelectorAll('.option');
    Array.from(ItemFrTodolist).forEach(function(item){
        if(item.firstElementChild.textContent.toLowerCase().indexOf(searckKey) != -1){
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    })
    checkNone(ItemFrTodolist);
}
function checkNone(target_selector){
    let count = 0;
    for(let i=0;i<target_selector.length;i++){
        if(target_selector[i].style.display === 'flex'){
            count++;
        }
    }
    if(count == 0){
        notifi.textContent = 'Not found !!!';
        notifi.style.fontSize = '2rem';
        notifi.style.marginTop = '2rem';
    }
    else {
        notifi.textContent = '';
    }
}

searchForm.addEventListener('click',search);
function search(){
    this.style.width = '90%';
    this.style.opacity = '1';
}