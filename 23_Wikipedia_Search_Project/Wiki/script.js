const formSubmit = document.querySelector('.form');
const gif = document.querySelector('.wait-icon');
const main_search = document.querySelector('.main-search');

formSubmit.addEventListener("submit",event => {
    event.preventDefault();
    const value = main_search.value;
    if(value === ''){
        showFeedback('please input keywork for search');
    }
    else{
        main_search.value = '';

        const url = 'https://en.wikipedia.org/w/api.php';
        const search = `?action=query&format=json&origin=*&list=search&utf8=1&srsearch=${value}`;
        const wikiUrl = `${url}${search}`;

        gif.classList.add('show');
        const results = document.querySelector('.results');
        results.style.display = 'none';

        asyncCall(value)
            .then(data => displayData(data))
            .catch(error => console.log(data));
        // fetch(wikiUrl)
        //     .then(data => data.json())
        //     .then(data => displayData(data))
        //     .catch(error => console.log(error));  
    }
})
const asyncCall = async function(value){
    const url = 'https://en.wikipedia.org/w/api.php';
    const search = `?action=query&format=json&origin=*&list=search&utf8=1&srsearch=${value}`;
    const wikiUrl = `${url}${search}`;

    const reponse = await fetch(wikiUrl);
    const data = await reponse.json();
    // console.log(data);
    
    return data;
}
function showFeedback(text){
    const feedback = document.querySelector('.feedback');
    feedback.classList.add('show');
    feedback.textContent = text;

    setTimeout(() => {
        feedback.classList.remove('show');
    },2000)
}
function displayData(data){
    gif.classList.remove('show');

    const results = document.querySelector('.results');
    results.style.display = 'block';

    const items = data.query['search'];

    let output = '';

    items.forEach(item => {
        // console.log(item);
        const {
            title,
            snippet,
            pageid
        } = item;
        output +=`
        <li class="search-item">
        <h2 class="search-item__title">${title}</h2>
        <p class="search-item__text">${snippet}</p>
        <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank" class="search-item__link">read more ...</a>
        </li>
        `;
    });
    
    results.innerHTML = output;
}