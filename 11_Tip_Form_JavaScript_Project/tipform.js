const inputBill = document.getElementById('inputBill');
const people = document.getElementById('people');
const select = document.getElementById('select');
const calculator = document.getElementById('cal');
const ttAmount = document.querySelector('.totalAmount');
const tipAmount = document.querySelector('.tipAmount');
const eachAmount = document.querySelector('.eachAmount');
const amount = document.querySelector('.amount')

calculator.addEventListener('click',function(){
    let floatInput = parseFloat(inputBill.value);
    let floatSelect = parseFloat(select.value);
    let peopleInt = parseInt(people.value);

    let tip = Math.round(floatSelect*floatInput*1000)/1000;
    let tt = tip+floatInput;
    let eachPerson = Math.round((tt/peopleInt)*1000)/1000;

    if(inputBill.value == '' || people.value == '' || select.value == ''){
        alert("can't not blank input");
    }
    else{
        let waiting = document.createElement('div');
            waiting.className = 'loader';
            amount.insertBefore(waiting,tipAmount);
        setTimeout(function(){
            amount.removeChild(waiting);
        },2000)
        
        setTimeout(function(){
            tipAmount.textContent = "Tip Amount $ "+ tip;
            ttAmount.textContent = "Total Amount $ "+tt
            eachAmount.textContent = "Each Person Owes $ "+ eachPerson;
            setTimeout(function(){
                tipAmount.textContent = "";
                ttAmount.textContent = "";
                eachAmount.textContent = "";
            },4300);
        },2300);
    }

})

