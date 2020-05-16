class ZOMATO {
    constructor(){
        this.apiKey = '0966a7b6aff356d7444effa472398ef6';
        this.header = {
            method : 'GET',
            headers : {
                "user-key" : this.apiKey,
                "Content-Type" : "application/json"
            },
            credentials : "same-origin"
        };
    }
    async searchAPI(city,categoryID){
        //category URL 
        const categoryURL = 'https://developers.zomato.com/api/v2.1/categories';
        
        // category data
        const categoryInfo = await fetch(categoryURL, this.header);
        const categoryJson = await categoryInfo.json(); // 
        const categories   = await categoryJson['categories'];

        // console.log(categories);
        // city URl
        const categoryCityURL = `https://developers.zomato.com/api/v2.1/cities?q=`;
        // city data
        const categoryCity = `${categoryCityURL}${city}`;
        const cityInfo = await fetch(categoryCity, this.header);
        const cityJSON = await cityInfo.json();
        const responseCity = await cityJSON.location_suggestions;

        console.log(responseCity);
        
        let ID = 0;

        if(responseCity.length > 0){
            ID = await responseCity[0].id; // check value from array with index[0]
        }
        // console.log(ID);
        

        // search restaurant
        
        const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${ID}&category=${categoryID}&entity_type=city&sort=rating`
        const restaurantInfo = await fetch(restaurantURL,this.header);
        const restaurantJSON = await restaurantInfo.json();
        const restaurants = await restaurantJSON.restaurants;
        
        return {
            categories,
            ID,
            restaurants
        };
    }
}
class UI {
    constructor(){
        this.loader = document.querySelector('.loader');
        this.restaurantList = document.getElementById('restaurant-list');
    }
    addSelectOption(categories){
        const searchCategory = document.querySelector('#searchCategory');
        let output = `<option value="0" selected>select category</option>`
    
        categories.forEach(element => {
            output += `<option value="${element.categories.id}">${element.categories.name}</option>`
        });
        searchCategory.innerHTML = output;
    }
    showFeedback(text){
        const feedback = document.querySelector('.feedback');
        feedback.textContent = text;
        feedback.classList.add('showItem');

        setTimeout(()=>{
            feedback.classList.remove('showItem');
        },2000)
    }
    showLoader(){
        this.loader.classList.add('showItem');
    }
    hideLoader(){
        this.loader.classList.remove('showItem');
    }
    getRestaurants(restaurants){
        this.hideLoader();
        if(restaurants.length === 0){
            this.showFeedback('no such categories exist in the selected');
        }
        else {
            console.log(restaurants);
            
            this.restaurantList.innerHTML = '';
            restaurants.forEach(restaurant => {
                const {
                    thumb:img,
                    name,
                    location: {address},
                    user_rating :{aggregate_rating},
                    cuisines,
                    average_cost_for_two:cost,
                    menu_url,
                    url
                } = restaurant.restaurant;
                if(img !==  ''){
                    this.showRestaurant(img,name,address,aggregate_rating,cuisines,cost,menu_url,url);
                }  
            })
            
        }
    }
    showRestaurant(img,name,address,aggregate_rating,cuisines,cost,menu_url,url){
        const div = document.createElement('div');
        div.classList.add('col-11','mx-auto','my-3','col-md-4');
        div.innerHTML = `
        <div class="card">
        <div class="card">
        <div class="row p-3">
            <div class="col-5">
            <img src="${img}" class="img-fluid img-thumbnail" alt="">
            </div>
            <div class="col-5 text-capitalize">
            <h6 class="text-uppercase pt-2 redText">${name}</h6>
            <p>${address}</p>
            </div>
            <div class="col-1">
            <div class="badge badge-success">
            ${aggregate_rating}
            </div>
            </div>
        </div>
        <hr>
        <div class="row py-3 ml-1">
            <div class="col-5 text-uppercase ">
            <p>cousines :</p>
            <p>cost for two :</p>
            </div>
            <div class="col-7 text-uppercase">
            <p>${cuisines}</p>
            <p>${cost}</p>
            </div>
        </div>
        <hr>
        <div class="row text-center no-gutters pb-3">
            <div class="col-6">
            <a href="${menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> menu</a>
            </div>
            <div class="col-6">
            <a href="${url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> website</a>
            </div>
        </div>
        </div>
        `
        this.restaurantList.appendChild(div);
    }
}

(function(){
    const searchForm = document.getElementById('searchForm');
    const searchCity = document.getElementById('searchCity');
    const searchCategory = document.getElementById('searchCategory');
    const zomato = new ZOMATO();
    const ui = new UI();

    document.addEventListener("DOMContentLoaded",()=>{
        // then(data => console.log(data)); "return" call
        zomato.searchAPI().then(data => ui.addSelectOption(data.categories));
    })
    // submit form
    searchForm.addEventListener("submit",event => {
        event.preventDefault();
        const city = searchCity.value.toLowerCase();
        const categoryID = parseInt(searchCategory.value);
        
        if(city === '' || categoryID === 0){
            ui.showFeedback('please enter name city and select in category');
        }
        else {
            zomato.searchAPI(city).then(data => {
                if(data.ID === 0){
                    ui.showFeedback('please enter a valid city')
                }
                else{
                    ui.showLoader();
                    zomato.searchAPI(city,categoryID)
                        .then(data => ui.getRestaurants(data.restaurants)) 
                        .catch(error => console.log(error));
                }
            });
        }
        
    })
})()