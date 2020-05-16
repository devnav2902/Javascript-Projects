//get elements
// const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

// const url = 'https://5eb3bae5974fee0016ecd8e2.mockapi.io/items';
httpForm.addEventListener('submit',submitItem);
function submitItem(event){
    event.preventDefault();
    const itemValue = itemInput.value;
    const imageValue = imageInput.value;
    if(itemValue.length === 0 || imageValue.length === 0){
        showFeedback('please enter valid values');
    }
    else {
        postItemAPI(imageValue,itemValue);
        imageInput.value = '';
        itemInput.value = '';
    }
}
// feed back
function showFeedback(text){
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(()=>{
        feedback.classList.remove('showItem');
    },3000)
}

// load item
document.addEventListener("DOMContentLoaded",function(){
    getItemsAPI(showItems);
})
// get item
function getItemsAPI(cb){
    const url = 'https://5eb3bae5974fee0016ecd8e2.mockapi.io/articles';

    const ajax = new XMLHttpRequest();

    ajax.open('GET',url,true);


    ajax.onload = function(){
        if(this.status === 200){
            cb(this.responseText);
        }
        else {
            console.log('something went wrong')
        }
    }
    ajax.onerror = function(){
        alert('error');
    }
    ajax.send();
}
// show item
function showItems(data){
    const dataItems = JSON.parse(data);
    // console.log(items);
    let info = '';
    dataItems.forEach(item => {
        info += `
        <!-- single item -->
        <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
         <img src="${item.avatar}" id='itemImage' class='itemImage img-thumbnail' alt="">
         <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
         <div class="icons">
  
          <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
           <i class="fas fa-edit"></i>
          </a>
          <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </li>
        <!-- end of single item -->
        `
    })
    items.innerHTML = info;
}
// post item
function postItemAPI(img,itemName){
    const avatar = `img/${img}.jpeg`;
    const name = itemName;
    const url = 'https://5eb3bae5974fee0016ecd8e2.mockapi.io/articles';

    const ajax = new XMLHttpRequest();

    ajax.open('POST',url,true);

    ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    ajax.onload = function(){
        getItemsAPI(showItems);
    }
    ajax.onerror = function(){
        alert('error');
    }

    ajax.send(`avatar=${avatar}&name=${name}`);
}

items.addEventListener('click',getIcons);
function getIcons(event){
    event.preventDefault();

    const itemID = event.target.parentElement.dataset.id;

    if(event.target.classList.contains('fa-trash')){
        // console.log(itemID);
        deleteItemAPI(itemID);
    }
    else if(event.target.classList.contains('fa-edit')){
        const parent = 
        event.target.parentElement.parentElement.parentElement;
        const img = parent.querySelector('#itemImage').src;
        const name = parent.querySelector('#itemName').textContent;
        editItemUI(parent,itemID,name,img);
    }
}
function deleteItemAPI(id){
    const url = `https://5eb3bae5974fee0016ecd8e2.mockapi.io/articles/${id}`;

    const ajax = new XMLHttpRequest();

    ajax.open('DELETE',url,true);


    ajax.onload = function(){
        if(this.status === 200){
            console.log(this.responseText);
            getItemsAPI(showItems);
        }
        else {
            console.log('something went wrong');
        }
    }
    ajax.onerror = function(){
        alert('error');
    }
    ajax.send();
}
function editItemUI(parent,id,name,img){
    items.removeChild(parent);
    const jpegIndex = img.indexOf('.jpeg');
    const imgIndex = img.indexOf('img/')
    const image = img.slice(imgIndex+4,jpegIndex);
    // console.log(name)
    itemInput.value = name.trim();
    imageInput.value = image;

    editedItemID = id;
    submtiBtn.textContent = 'Edit item';
    httpForm.removeEventListener('submit',submitItem);
    httpForm.addEventListener('submit',editItemAPI);
    // deleteItemAPI(id);
}
// function edit item api
function editItemAPI(event){
    event.preventDefault();
    const img = `img/${imageInput.value}.jpeg`;
    const name = itemInput.value;
    const id = editedItemID;

    const url = `https://5eb3bae5974fee0016ecd8e2.mockapi.io/articles/${id}`;

    const ajax = new XMLHttpRequest();

    ajax.open('PUT',url,true);

    ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    ajax.onload = function(){
        if(this.status === 200){
            loadData();
        }
        else {
            console.log('something went wrong')
        }
    }
    ajax.onerror = function(){
        alert('error');
    }
    ajax.send(`avatar=${img}&name=${name}`);
}
function loadData(){
    imageInput.value = '';
    itemInput.value = '';
    submtiBtn.textContent = 'Add item';
    httpForm.removeEventListener('submit',editItemAPI);
    httpForm.addEventListener('submit',submitItem);
    getItemsAPI(showItems);
}