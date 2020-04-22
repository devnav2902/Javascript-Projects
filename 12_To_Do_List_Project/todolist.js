const items = document.querySelector('.items');
const input = document.querySelector('#input');

// button click to clear all item
const buttonClear = document.querySelector('.clearitem');
buttonClear.addEventListener('click',clearFunction);
function clearFunction(event){
    let clearitem = document.querySelectorAll('.option');
    if(clearitem.length != 0){
        for(let i=0;i<clearitem.length;i++){
            clearitem[i].remove();
        }
        items.insertAdjacentHTML('beforeend','<div>Clear all !</div>');
        items.firstElementChild.style.fontSize = '2rem';
        items.firstElementChild.style.color = 'lightblue';
    
        setTimeout(function(){
            items.removeChild(items.firstElementChild);
        },1500)
    }
    else {
        items.insertAdjacentHTML('beforeend','<div>at least 1 item to clear !</div>');
        items.firstElementChild.style.fontSize = '2rem';
        items.firstElementChild.style.color = 'lightblue';
    
        setTimeout(function(){
            items.removeChild(items.firstElementChild);
        },1500)
    }
    
}

// button add item
const buttonAdd = document.querySelector('.additem');
buttonAdd.addEventListener('click',setItem);
function setItem(event){
    event.preventDefault();

    let group_input = document.querySelector('.group_input');

    if(input.value === ''){
        group_input.insertAdjacentHTML('beforebegin',
        "<div class='show'>Can not blank input! Again</div>");
        let show = document.querySelector('.show');
        show.style.color = 'lightblue';
        show.style.fontSize = '2rem';
        setTimeout(function(){
            show.remove();
        },2000)
    }
    else{
        getValue(items);
    }
    
}

// function add item todolist
function getValue(todoName){
    // Javascript Template Literals
    todoName.insertAdjacentHTML('beforeend',
        `<div class='option'>
            <div class="list_item">${input.value}</div> 
            <div class="list_icon">
                <i class="fa fa-check-circle" aria-hidden="true"></i>
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
        </div>`);
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


    if(checkSetting.contains('fa-check-circle')){
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
    else if(checkSetting.contains('fa-trash')) {
        deleteItem.remove();
    }
    
}
let clickOk = document.querySelector('.btn_confirm .btn-primary');
clickOk.addEventListener('click',Accept_rename);
let clickCancel = document.querySelector('.btn_confirm .cancel');
clickCancel.addEventListener('click',function(){
    edit_name.style.display = 'none';
});

// function click OK to rename
function Accept_rename(){
    let option = document.querySelectorAll('.option');  
    // find class editing and rename
    Array.from(option).forEach(function(editing){
        let findEdit = editing.firstElementChild;
        if(findEdit.classList.contains('editing')){
            findEdit.textContent = get_edit_name.value;
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


