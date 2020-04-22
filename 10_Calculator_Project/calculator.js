const buttons = document.querySelectorAll('.btn');
const inputValue = document.getElementById('calInput');

let valueCal = 0;
Array.from(buttons).forEach(function(key){
    key.addEventListener('click',function(){
        let keyClass = key.classList;
        if(!keyClass.contains('equal') && !keyClass.contains('clear')){
            inputValue.value += key.dataset.button; 
            console.log(inputValue.value);
        }
        else if(key.dataset.button == '+'){
            valueCal += inputValue.value;
        }
        else if(key.dataset.button == '-'){
            valueCal -= inputValue.value;
        }
        else if(key.dataset.button == '*'){
            valueCal *= inputValue.value;
        }
        else if(key.dataset.button == '/'){
            valueCal /= inputValue.value;
        }
        else if(key.classList.contains('equal')){
            if(inputValue.value == ''){
                inputValue.value = 'Enter value to calculator !!!';
                setTimeout(function(){
                    inputValue.value = '';
                },1000)
            }
            else{
                inputValue.value = eval(inputValue.value);
                setTimeout(function(){
                    if(confirm("do you want to clear?")==true){
                        inputValue.value = '';
                    }  
                },1000)
            }
        }
        else if(key.classList.contains('clear')){
            inputValue.value = '';
        }


        // inputValue.value += valueData;
        // if(key.classList.contains('equal')){
        //     inputValue.value = parseInt(valueData);
        // }
        // if(key.classList.contains('clear')){
        //     inputValue.value = '';
        // }

    })
})

console.log("9"+"9")
