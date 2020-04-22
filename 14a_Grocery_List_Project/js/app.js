//Get five elements and assign them to variables.

const form = document.getElementById('input-form');
const input = document.getElementById('input-value');
const feedback = document.querySelector('.feedback');
const listItems = document.querySelector('.list-items');
const clearBtn = document.querySelector('.clearBtn');

let listTodo = [];
document.addEventListener("DOMContentLoaded",function(){
    getlocalStorage();
})
listItems.addEventListener('click',removeItem);
function removeItem(event){
    if(event.target.classList.contains('fa-trash')){
        event.target.parentElement.parentElement.remove();
        for(let i =0;i<listTodo.length;i++){
            if(event.target.parentElement.previousElementSibling.textContent === listTodo[i]){
                listTodo.splice(i,1);
                setlocalStorage(listTodo);
            }
        }
    }
}
clearBtn.addEventListener('click',clearallItem);
function clearallItem(){
    if(listItems.textContent === ''){
        feedback.textContent = 'At least 1 item !!!';
        feedback.style.display = 'block';
        feedback.style.fontSize = '2rem';
        setTimeout(function(){
            feedback.style.display = 'none';
        },1500);
    }
    else{
        listItems.textContent = "";
        listTodo = [];
        localStorage.removeItem('listTodo');
    }
    
}
form.addEventListener('submit',getValue);
function getValue(event){
    event.preventDefault();

    if(input.value === ''){
        let notification = document.createElement('h1');
        notification.textContent = 'Cannot blank input';
        notification.style.color = '#ffffff';
        notification.style.fontSize = '2rem';
        listItems.insertBefore(notification,listItems.firstElementChild);

        setTimeout(function(){
            listItems.children[0].remove();
        },1500)
    }
    else {
        listItems.insertAdjacentHTML('beforeend',`
            <div class="item my-3 d-flex justify-content-between p-2">
                <h5 class="item-title text-capitalize">${input.value}</h5>
                <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
            </div>
        `);
            feedback.style.display = 'block';
            feedback.textContent = 'Add success !!!';
            feedback.style.fontSize = '2rem';
            setTimeout(function(){
                feedback.style.display = 'none';
            },1500);

        listTodo.push(input.value);
        setlocalStorage(listTodo);
        input.value = '';
    }
}
function setlocalStorage(valueItem){
    localStorage.setItem('listTodo',JSON.stringify(valueItem));    
}
function getlocalStorage(){
    if(localStorage.getItem('listTodo') === null){
        listTodo = [];
    }
    else {
        listTodo = JSON.parse(localStorage.getItem('listTodo'));
        listTodo.forEach(function(item){
            listItems.insertAdjacentHTML('beforeend',`
                <div class="item my-3 d-flex justify-content-between p-2">
                    <h5 class="item-title text-capitalize">${item}</h5>
                    <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
                </div>
            `);
        })
        
    }
}
