const button = document.querySelector('.btn');
const input = document.getElementById('message');
const container = document.querySelector('.container');
const newMessage = document.getElementById('inputText');
const form = document.getElementById('form');

button.addEventListener('click',passMessage);

newMessage.textContent = 'My name is Vu.';

function passMessage(event){
    event.preventDefault();
    
    //equal value and equal type    
    if(input.value === ''){
        var appear = document.createElement('h2');
        appear.textContent = 'Please enter a value to form!!';
        appear.style.color = 'red';
        form.appendChild(appear);
        setTimeout(function(){
            form.removeChild(appear);
        },1500)
    }
    else {
        newMessage.textContent = input.value;
        newMessage.style.color = 'green';
        container.appendChild(newMessage);
    }
    input.value = '';

}



