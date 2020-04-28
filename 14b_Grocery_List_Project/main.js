const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

// event listeners

submit.addEventListener('click',addItem);
document.addEventListener("DOMContentLoaded",displayStorage);
clear.addEventListener("click",removeItems);
list.addEventListener('click',removeSingleItem);

// functions

function addItem(event){
    event.preventDefault();
    let value = input.value;
    if(value === ''){
        showAction(addItemsAction,'Please add grocery item',false);
    }
    else{
        showAction(displayItemsAction,`${value} added to the list`,true);
        createItem(value);
        updateStorage(value);
    }
}
function showAction(element,text,value){
    if(value === true){
        element.classList.add('success');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('success');
        },3000)
    }
    else {
        element.classList.add('alert');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('alert');
        },3000)
    }
}
// create item 
function createItem(value){
    let parent = document.createElement('div');
    parent.classList.add('grocery-item');

    parent.innerHTML = `
    <h4 class="grocery-item_title">${value}</h4>
    <a href="#" class="grocery-item_link">
        <i class="fa fa-trash" aria-hidden="true"></i>
    </a>
    `;
    
    list.appendChild(parent);
}
// update storage
function updateStorage(value){
    let groceryList;
    // let exists = localStorage.getItem('groceryList');

    groceryList = localStorage.getItem('groceryList') ? JSON.parse
    (localStorage.getItem('groceryList')) : [];

    // if(exists){
    //     groceryList = JSON.parse(localStorage.getItem('groceryList'));
    // }
    // else {
    //     groceryList = [];
    // }

    groceryList.push(value);
    localStorage.setItem('groceryList',JSON.stringify(groceryList));
}

// localStorage.clear();

// display local storage
function displayStorage(){
    let exists = localStorage.getItem('groceryList');

    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function(element){
            createItem(element);
        })
    }
    
}

function removeItems(){
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        showAction(displayItemsAction,'All items delected',false);
        items.forEach(function(element){
            list.removeChild(element);
        })
    }
    else {
        showAction(displayItemsAction,'no more Item to delete',true);
    }
}
// remove single item
function removeSingleItem(event){
    event.preventDefault();
    let link = event.target.parentElement;
    if(link.classList.contains('grocery-item_link')){
        let groceryItem = event.target.parentElement.parentElement;
        let text = link.previousElementSibling.textContent;
        // remove from the lish
        list.removeChild(groceryItem);
        showAction(displayItemsAction,`${text} removed from list `,true)
        // remove from local storage
        editStorage(text);
    }
}
function editStorage(item){
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItems.indexOf(item);

    groceryItems.splice(index,1);
    localStorage.removeItem('groceryList');
    // update local storage after delete
    localStorage.setItem('groceryList',JSON.stringify(groceryItems));
}