const buttons = document.querySelectorAll('.btn');
const artist = document.querySelector('.artist img');
const nameArtist = document.querySelector('.nameArtist');
const quote = document.querySelector('.quote');
const centerDiv = document.querySelector('.centerDiv');

centerDiv.classList.add('infinite');

const objectList = {
    'NAV':{'NAME':'Vu.','QUOTE':'Lorem ipsum dolor sit amet consectetur . Earum eos dolorum ipsam asperiores us.','IMAGE':'NAV'},
    'NATHAN':{'NAME': 'Nathan.','QUOTE':'This project can easily be completed using an array of objects','IMAGE':'NATHAN'},
    'DSK':{'NAME':'DSK.','QUOTE':'my whole life is freestyle','IMAGE':'MINH'},
    'MINH':{'NAME':'MINH.','QUOTE':'Su that la khu rung gia nhung loi noi doi tua nhu cay','IMAGE':'DSK'},
}

const arrayObjectName = ['NAV','NATHAN','MINH','DSK'];

let pos = 0;

buttons.forEach(function(button){
    button.addEventListener('click',function(){
        if(button.classList.contains('btn-right')){
            pos++;
            if(pos > arrayObjectName.length-1){
               pos = 0;
            }
            let objectElement = objectList[arrayObjectName[pos]];
            artist.src = `images/${arrayObjectName[pos]}.jpg`;
            nameArtist.textContent = objectElement['NAME'];
            quote.textContent = objectElement['QUOTE'];
        }
        if(button.classList.contains('btn-left')){
            pos--;
            if(pos < 0){
                pos = arrayObjectName.length -1;
            }
            let objectElement = objectList[arrayObjectName[pos]];
            artist.src = `images/${arrayObjectName[pos]}.jpg`;
            nameArtist.textContent = objectElement['NAME'];
            quote.textContent = objectElement['QUOTE'];
        }
    })
})