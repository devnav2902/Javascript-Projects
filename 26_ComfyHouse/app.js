// variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//cart
let cart = [];
// buttons
let buttonsDOM = [];

//  getting the products
class Products {
    async getProducts(){
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data['items'];
            products = products.map(item => {
                const {title,price} = item['fields'];
                const image = item.fields.image.fields.file['url'];
                const {id} = item["sys"];
                return {title,price,image,id};
            });
            return products;
        }
        catch(error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products){
        let output = '';
        products.forEach(product => {
            output += `
            <!-- single product -->
            <article class="product">
              <div class="img-container">
                <img src="${product.image}" alt="product" class="product-img">
                <button class="bag-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to bag
                </button>
              </div>
              <h3>${product.title}</h3>
              <h4>$${product.price}</h4>
            </article>
            <!-- end single product -->
            `;
        });
        productsDOM.innerHTML = output;
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            
            let id = button.dataset.id;
                button.addEventListener('click',event => {   
                                                         
                    event.target.textContent = "In Cart";
                    event.target.disabled = true;

                    // get product from product
                    let cartItem = {...Storage.getProducts(id),amount:1};
                    
                    // add product to the cart
                    cart = [...cart,cartItem];
                    // console.log(cart);
                    
                    // save cart in local storage
                    Storage.saveCart(cart);
                    // set cart values
                    this.setCartValues(cart);
                    // display cart item
                    this.addCartItem(cartItem);
                    // show cart
                    this.showCart();
                })
        })
        
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemTotal = 0;
        cart.map(item => {
            tempTotal += item.price*item.amount;
            itemTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemTotal;
    }
    addCartItem(item){
        console.log(item);
        
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
                <img src="${item.image}" alt="product">
                <div>
                  <h4>${item.title}</h4>
                  <h5>$${item.price}</h5>
                  <span class="remove-item" data-id="${item.id}">remove</span>
                </div>
                <div>
                  <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                  <p class="item-amount">${item.amount}</p>
                  <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                </div>
        `;
        cartContent.appendChild(div);
        console.log(cartContent);
        
    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        // console.log(cart);
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic(){
        // clear cart button
        clearCartBtn.addEventListener('click',() => {
            this.clearCart();
        });
        //cart function
        cartContent.addEventListener("click",event => {
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target;
                let getId = removeItem.dataset.id;


                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(getId);
            }
            else if(event.target.classList.contains('fa-chevron-up')){
                let increase = event.target;
                let incr = parseInt(increase.nextElementSibling.textContent);
                incr++;
                increase.nextElementSibling.textContent = incr;
                
                let id = increase.dataset.id;
                let tempItem = cart.find(item => item.id===id);
                tempItem.amount = incr;
                
                // console.log(cart);
                
                Storage.saveCart(cart);
                this.setCartValues(cart);
                                
            }
            else if(event.target.classList.contains('fa-chevron-down')){
                let decrease = event.target;
                let id = decrease.dataset.id
                let decr = parseInt(decrease.previousElementSibling.textContent);
                let tempItem = cart.find(item => item.id===id);

                decr--;
                tempItem.amount = decr;
                if(decr>0){
                    decrease.previousElementSibling.textContent = decr;

                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                }
                else {
                    cartContent.removeChild(decrease.parentElement.parentElement);
                    cart.forEach((item,index) => {
                        if(item.id === id){
                            cart.splice(index,1);
                        }
                    });
                    Storage.saveCart(cart);
                    this.setCartValues(cart);

                    let button = this.getSingleButton(id);

                    button.disabled = false;                    
                    button.innerHTML = `<i class="fas fa-shopping-cart"></i>Add to bag`;
                }
            }
        })
    }
    clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children);
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0]);
        }
    }
    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>Add to bag`;

    }
    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);
    }
    
}

// localstorage
class Storage {
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProducts(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded",() => {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();
    //get all product
    products.getProducts()
        .then(data => {
            ui.displayProducts(data)
            Storage.saveProducts(data)
        })
        .then(() => {
            ui.getBagButtons();
            ui.cartLogic();
        })
})

