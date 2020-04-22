const name_item = document.querySelectorAll('.name_item');
const search_item = document.getElementById('search-item');
const element_cakes = document.querySelectorAll('.element_cakes');
const filter_button = document.querySelectorAll('#filter_button .btn');
const h1_price = document.querySelectorAll('h1.price');

search_item.addEventListener('keyup',getItem);
search_item.addEventListener('click',reset);

function reset(){
    for(let i=0;i<filter_button.length;i++){
        filter_button[i].classList.remove('active');
    }
    Array.from(element_cakes).forEach(function(element){
        element.style.display = 'block';
    })
    filter_button[0].classList.add('active');
    
}



// search item
var h1Text = document.getElementById('showtext');

const infor = document.querySelectorAll('.infor');
function getItem(event){

    let lower_item = search_item.value.toLowerCase();
    Array.from(infor).forEach(function(cake){
        let item_Name = cake.firstElementChild.textContent;
        if(item_Name.toLowerCase().indexOf(lower_item) != -1){
            cake.parentElement.style.display = 'block';
        }
        else {            
            cake.parentElement.style.display = 'none';
            
        }
    })
    
    checkNone(infor);
}

// function check if all infor[] has display none => textContent = 'can't find'
function checkNone(target_element){
    var sum=0;
    for(let i=0;i<target_element.length;i++){
        if(target_element[i].parentElement.style.display === 'block'){
            sum++;
        }
    }
    if(sum==0){
        h1Text.textContent = "can't find.";
    }
    else {
        h1Text.textContent = "";
    }
}

// filter
Array.from(filter_button).forEach(function(button){
    button.addEventListener('click',function(event){

        for(let i=0;i<filter_button.length;i++){
            filter_button[i].classList.remove('active');
        }
        this.classList.add('active');

        let buttonAttr = event.target.dataset.filter;
        // let buttonAttr = button.getAttribute('data-filter');
        Array.from(element_cakes).forEach(function(element){
            let elementAttr = element.dataset.item; // lấy giá trị data-* dùng getAttribute hoặc dataset
            if(buttonAttr===elementAttr  || buttonAttr === 'all'){
                element.style.display = 'block';
            }   
            else {
                element.style.display = 'none';
            }
        })
    })
})



// function reverseString(str){
//     return str.split("").reverse().join("");
// }

// modal box

const arrayImg = ['cake-1','cake-2','cake-3','cupcake-1','cupcake-2','cupcake-3',
'doughnut-1','doughnut-2','doughnut-3','sweets-1','sweets-2','sweets-3'];
const modal_div = document.getElementById('modal');
const imgBox = document.querySelector('.lightbox');

let pos = 0;
Array.from(element_cakes).forEach(function(cake){
    cake.addEventListener('click',function(){
        let srcImg = this.firstElementChild.getAttribute('src');
        
        for(let i=0;i<arrayImg.length;i++){
            if(srcImg.indexOf(arrayImg[i]) != -1){
                modal_div.style.display = 'block';
                imgBox.style.backgroundImage = `url(images/${arrayImg[i]}.jpeg)`;
                imgBox.style.backgroundSize = 'cover';
                imgBox.style.backgroundPosition = 'center';
                pos = i;
            }
        }
        // let imgThis = `images/${}.jpeg`; 
    })
})
// button modal box
const leftBt = document.querySelector('.fa-caret-left');
const rightBt = document.querySelector('.fa-caret-right');

leftBt.addEventListener('click',slidePre);
function slidePre(){
    pos--;
    if(pos < 0){
        pos = arrayImg.length - 1;
    }
    imgBox.style.backgroundImage = `url(images/${arrayImg[pos]}.jpeg)`;
}
rightBt.addEventListener('click',slideNext);
function slideNext(){
    pos++;
    if(pos > arrayImg.length-1){
        pos = 0;
    }
    imgBox.style.backgroundImage = `url(images/${arrayImg[pos]}.jpeg)`;
}

modal_div.addEventListener('click',function(event){
    let eventButton = event.target.classList;
    if(eventButton.contains('fa-caret-left') || eventButton.contains('fa-caret-right')){
        this.style.display = 'block';
    }
    else{
        this.style.display = 'none';
    }
})
