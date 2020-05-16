class AjaxWeather {
    constructor(){
        this.apiKey = '480b216ae430f8a0862d7cd28040ad49';
    }
    async getWheather(city){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
}
class Display {
    constructor(){
        this.results = document.querySelector('.results')
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemp = document.getElementById('cityTemp');
        this.cityHumidity = document.getElementById('cityHumidity');
    }
    showWeather(data){
        this.results.style.display = 'block';
        console.log(data);
        const {
            name,
            sys:{country},
            main:{humidity,temp},
        } = data;
        const {icon} = data.weather[0];
        console.log(icon);
        
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;
        this.cityIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
}


(function(){
    const form = document.getElementById('weatherForm');
    const cityInput = document.querySelector('#cityInput');
    const feedback = document.querySelector('.feedback');
// class
    const ajax = new AjaxWeather();
    const display = new Display();

    form.addEventListener("submit",event => {
        event.preventDefault();
        const city = cityInput.value;
        if(city === ''){
            showFeedback('city value cannot be empty');
        }
        else{
            ajax.getWheather(city)
                .then(data => {
                    if(data.message === "city not found"){
                        alert('city with name cannot be found');
                    }
                    else {
                        display.showWeather(data);
                    }
                });
        }
    });
    


    function showFeedback(text){
        feedback.classList.add('showItem');
        feedback.innerHTML = `<p>${text}</p>`;

        setTimeout(()=>{
            feedback.classList.remove("showItem");
        },2000)
    }
})();