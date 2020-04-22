const name_item = document.querySelectorAll('.name_item');
const search_item = document.getElementById('search-item');
const element_cakes = document.querySelectorAll('.element_cakes');
const filter_button = document.querySelectorAll('#filter_button .btn');
const h1_price = document.querySelectorAll('h1.price');

search_item.addEventListener('keyup',getItem);
search_item.addEventListener('click',reset);

// when click to search filter => all to search
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
const h1Text = document.getElementById('showtext');
const infor = document.querySelectorAll('.infor');
function getItem(event){
    // convert text to lowerCase to search 
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
        // when click filter current button has class active 
        for(let i=0;i<filter_button.length;i++){
            filter_button[i].classList.remove('active');
        }
        this.classList.add('active');

        let buttonAttr = event.target.dataset.filter; // get data of filter
        // let buttonAttr = button.getAttribute('data-filter');
        Array.from(element_cakes).forEach(function(element){
            let elementAttr = element.dataset.item; // get value data-* use getAttribute or dataset
            if(buttonAttr === elementAttr  || buttonAttr === 'all'){
                element.style.display = 'block';
            }   
            else {
                element.style.display = 'none';
            }
        })
    })
})


// modal box
const arrayImg = ['cake-1','cake-2','cake-3','cupcake-1','cupcake-2','cupcake-3',
'doughnut-1','doughnut-2','doughnut-3','sweets-1','sweets-2','sweets-3'];
const modal_div = document.getElementById('modal');
const imgBox = document.querySelector('.lightbox');

const shopping_cart = document.querySelector('.shoppingCart'); 
let notifi = document.querySelector('.notification'); // notification if no element in cart
let priceAll = document.querySelector('.priceProduct'); // update price after click buy

shopping_cart.addEventListener('click',deleteItem);
function deleteItem(){
    let trash = document.querySelectorAll('.fa-trash');
    let div_name = event.target.parentElement.querySelector('.item-text');

    // find button trash to remove item and update local Storage
    if(event.target.classList.contains('fa-trash')){
        if(confirm('Are you sure ?')==true){
            div_name.firstElementChild.classList.add('clicked');
            for(let i = 0;i<StorageItems.length;i++){
                let find_class_clicked = trash[i].parentElement.querySelector('.item-text');
                // find index of element has class clicked and remove 
                if(find_class_clicked.firstElementChild.classList.contains('clicked')){
                    StorageItems.splice(i,1); // delete it
                    div_name.classList.remove('clicked');
                    count--; // decrease count and update
                    if(count == 0){
                        notifi.style.display = 'block';
                    }
                    else {
                        notifi.style.display = 'none';
                    }
                }
            }
            bought.textContent = count; // update count after when click remove
            let price_item = div_name.lastElementChild.textContent; // get value of element 
            price_all_sum -= parseFloat(price_item);
            priceAll.textContent = roundNumber(price_all_sum);
            event.target.parentElement.remove(); // remove item has class clicked

            // update localStorage
            localStorage.setItem('Items',JSON.stringify(StorageItems));
            let objectPriceAndCount = {'priceAll':roundNumber(price_all_sum),'count':count};
            StoragePriceAndCount = [];
            StoragePriceAndCount.push(objectPriceAndCount);
            localStorage.setItem('Price_Count',JSON.stringify(StoragePriceAndCount));
        }
    }
    
}

let StorageItems = [];
let StoragePriceAndCount = [];
let pos = 0; // this is position of slide current
let count = 0; // this is number  when you click buy it will decrease or increase
let sumPrice = 0; // sum of item you click buy
let price_all_sum = 0; // make round price 
let bought = document.querySelector('.count');


getlocalStorage(); // when you open page this has mission get value from localStorage
Array.from(element_cakes).forEach(function(cake){
    cake.addEventListener('click',function(){
        // get value of Attribute src of img you clicked and push into localStorage
        let srcImg = this.firstElementChild.getAttribute('src');
        
        let clickBuy = event.target.classList;
        if(clickBuy.contains('buy')){
            count++;

            if(count != 0){
                notifi.style.display = 'none';
            }
            
            // fint name, price of item you click buy
            let siblingclickBuy = event.target.previousElementSibling;
            let nameofitem = siblingclickBuy.firstElementChild.textContent;
            let divofprice = siblingclickBuy.lastElementChild;
            let priceofitem = divofprice.textContent;
            
            bought.textContent = count;

            sumPrice = parseFloat(priceofitem);
            price_all_sum += sumPrice;

            priceAll.textContent = roundNumber(price_all_sum);

            setlocalStorage(srcImg,nameofitem,priceofitem,roundNumber(price_all_sum),count);
            // add content into div use template literals javascript
            shopping_cart.insertAdjacentHTML('beforeend',`<div class="cart_item">
            <div class="cart_img_item">
                <img src=${srcImg} alt="">
            </div>
            <div class="item-text">
                <p class="cart-item-title">${nameofitem}</p>
                <div class="item-price">
                    <span id="cart-item-price">${priceofitem}</span>
                </div>
            </div>
            <i class="fa fa-trash" style="align-items: center;display: flex;" aria-hidden="true">
            </i>
            </div>`)
            
            // when lick buy text will appear with content "...";
            let moved = document.createElement('div');
            moved.textContent = `moved ${nameofitem} to cart`;
            moved.style.position = 'relative';
            moved.style.top = '19.5%';
            moved.style.fontSize = '1.125rem';
            moved.style.color = 'blue';
            event.target.parentElement.appendChild(moved);

            setTimeout(function(){
                cake.lastElementChild.remove()
            },2000)
            
        }
        else {
            for(let i=0;i<arrayImg.length;i++){
                if(srcImg.indexOf(arrayImg[i]) != -1){
                    modal_div.style.display = 'block';
                    imgBox.style.backgroundImage = `url(images/${arrayImg[i]}.jpeg)`;
                    imgBox.style.backgroundSize = 'cover';
                    imgBox.style.backgroundPosition = 'center';
                    pos = i;
                }
            }
        }
    })
})

function setlocalStorage(src_Img,name_item,price_item,price_all,count_item){
    let objectItems = {'src_Img':src_Img,'name_item':name_item,'price_item':price_item};
    let objectPriceAndCount = {'priceAll':price_all,'count':count_item};
    StorageItems.push(objectItems);
    StoragePriceAndCount = [];
    StoragePriceAndCount.push(objectPriceAndCount);
    localStorage.setItem('Items',JSON.stringify(StorageItems));
    localStorage.setItem('Price_Count',JSON.stringify(StoragePriceAndCount));
}
function getlocalStorage(){
    if(localStorage.getItem('Items') == null || localStorage.getItem('Items') == undefined){
        StorageItems = [];
        StoragePriceAndCount = [];
    }
    else{
        getFromLocalStorage = JSON.parse(localStorage.getItem('Items'));
        StorageItems = getFromLocalStorage;
        getPriceAndCount = JSON.parse(localStorage.getItem('Price_Count'));
        StoragePriceAndCount = getPriceAndCount;
        // add item from StorageItems if has value
        for(let i=0;i<StorageItems.length;i++){
            shopping_cart.insertAdjacentHTML('beforeend',
            `<div class="cart_item">
                <div class="cart_img_item">
                    <img src=${StorageItems[i]['src_Img']} alt="">
                </div>
                <div class="item-text">
                    <p class="cart-item-title">${StorageItems[i]['name_item']}</p>
                    <div class="item-price">
                        <span id="cart-item-price">${StorageItems[i]['price_item']}</span>
                    </div>
                </div>
                <i class="fa fa-trash" style="align-items: center;display: flex;" aria-hidden="true">
                </i>
            </div>`)
        }
        // get count and price from StoragePriceAndCount and update on div
        count = StoragePriceAndCount[0]['count'];
        price_all_sum = StoragePriceAndCount[0]['priceAll'];

        notifi.style.display = 'none';
        bought.textContent = count;  

        priceAll.textContent = roundNumber(price_all_sum); 
    }
}
function roundNumber(number){
    return Math.round(number*1000)/1000;
}


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

const buttonTop = document.querySelector('.button');
buttonTop.addEventListener('click',getProduct);
// function has mission check style of class shopping cart to show content or not
function getProduct(){
    if(shopping_cart.style.display === 'none'){
        shopping_cart.style.display = 'block';
        if(count == 0){
            notifi.style.display = 'block';
        }
        else {
            notifi.style.display = 'none';
        }
    }
    else {
        shopping_cart.style.display = 'none';
    }
}

// function to find parent of child
function getParent(childOfparent,nameclass){
    while(childOfparent = childOfparent.parentElement){
        if(childOfparent.classList.contains(nameclass)){
            return childOfparent;
        }
    }
}
