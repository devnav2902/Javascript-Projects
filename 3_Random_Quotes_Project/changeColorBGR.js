const button = document.querySelector('.btn');
const h2 = document.getElementById('quote');
const quoteDIV = document.getElementById('quotes');

button.addEventListener('click',randomQuote);

const listQuote = {
    'NAME' : ['STEPHENKING','EDISON','STEVEJOBS','KEVINBACON'],
    'STEPHENKING' : ' "Get busy living or get busy dying" — Stephen King',
    'EDISON' : ' "Many of life’s failures are people who did not realize how close they were to success when they gave up." – Thomas A. Edison',
    'STEVEJOBS' : ' "Our time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking." – Steve Jobs ',
    'KEVINBACON' : ' "One of the top comments I get from people is, Oh my God, youre like a regular person! Thats kind of a bizarre thing to live with. I know a lot of famous people, and their lives may not be regular, but they are regular people." - Kevin Bacon ',
}

function randomQuote(){

    let card = listQuote['NAME'][randomNumber(listQuote['NAME'])];

    let imgCard = document.getElementById('imgQuote');
    imgCard.style.width = '250px';
    imgCard.src = `images/${card}.jpg`;

    quoteDIV.appendChild(imgCard);
    h2.textContent = listQuote[card];
    h2.style.paddingTop = '1rem';
    h2.style.paddingBottom = '1rem';
    h2.style.textAlign= 'left';


}

function randomNumber(anything) {
    return Math.floor(Math.random()*anything.length);
}