const buttonIn = document.querySelector('.increase');
const buttonDe = document.querySelector('.decrease');
const input    = document.getElementById('input');
const select   = document.getElementById('selectStep');
const h1_number = document.getElementById('number');
const resetNum = document.querySelector('.resetNum');
const notify   = document.querySelector('#notify');

buttonIn.addEventListener('click',increaseNum);
var sum = 0;

function increaseNum(){

    if(select.value === "1"){
        sum++;input.value
        h1_number.textContent = sum;
    }
    else if(select.value === "2"){
        sum+=2;
        h1_number.textContent = sum;
    }
    else if(select.value === "5"){
        sum+=5
        h1_number.textContent = sum;
    }
    else if(select.value === "10"){
        sum+=10
        h1_number.textContent = sum;
    }
    else{
        if(input.value == '' || input.value != parseInt(input.value)){
            notify.textContent = 'Please enter 1 value number !';
            notify.style.color = 'yellow';
            setTimeout(function(){
                notify.textContent = '';
            },1500)
            input.value = '';
        }
        else{        
            select.selectedIndex = "1";
 
            sum += parseInt(input.value);
            h1_number.textContent = sum;
        }
    }
}

buttonDe.addEventListener('click',decreaseNum);
function decreaseNum(){

    if(select.value === "1"){
        sum--;
        h1_number.textContent = sum;
    }
    else if(select.value === "2"){
        sum-=2;
        h1_number.textContent = sum;
    }
    else if(select.value === "5"){
        sum-=5
        h1_number.textContent = sum;
    }
    else if(select.value === "10"){
        sum-=10;
        h1_number.textContent = sum;
    }
    else {
        if(input.value == '' || input.value != parseInt(input.value)){
            notify.textContent = 'Please enter 1 value number !';
            notify.style.color = 'yellow';
            setTimeout(function(){
                notify.textContent = '';
            },1500)
            input.value = '';
        }
        else{        
                
            sum -= parseInt(input.value);
            h1_number.textContent = sum;
        }
    }
}

resetNum.addEventListener('click',resetNumber);
function resetNumber(){
    sum = 0;
    h1_number.textContent = 0;
    select.value = '';
    input.value = '';
}




