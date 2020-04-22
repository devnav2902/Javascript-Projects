const button = document.querySelector('.btn');
const backgrColor = document.querySelector('.hexaColor');
button.addEventListener('click',hexaColorChange);

// var objectColorRR = {
//     'color1': 'A','color2': 'B','color3': 'C','color4':0,'color5':8
// }
// var objectColorGG = {
//     'color1': '1','color2': '2','color3': 'D','color4':9,'color5':4
// }
// var objectColorBB = {
//     'color1': 'B','color2': 'C','color3': 'F','color4':5,'color5':'E'
// }

// var array_objectColor = ['color1','color2','color3','color4','color5'];

var text_h3 = document.getElementById('hexa');
text_h3.style.textTransform = 'uppercase';

// function hexaColorChange(){
//     var rgb1 = objectColorBB[array_objectColor[randomColor(array_objectColor)]];
//     var rgb2 = objectColorRR[array_objectColor[randomColor(array_objectColor)]];
//     var rgb3 = objectColorGG[array_objectColor[randomColor(array_objectColor)]];
//     var rgb4 = objectColorRR[array_objectColor[randomColor(array_objectColor)]];
//     var rgb5 = objectColorBB[array_objectColor[randomColor(array_objectColor)]];
//     var rgb6 = objectColorGG[array_objectColor[randomColor(array_objectColor)]];
    
//     backgrColor.style.backgroundColor = '#'+rgb1+rgb2+rgb3+rgb4+rgb5+rgb6;

//     var text = document.getElementById('text');
//     text.textContent = ' '+'#'+rgb1+rgb2+rgb3+rgb4+rgb5+rgb6;
// }

const text = document.getElementById('text');

function hexaColorChange(){
    var arrayHexColor = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let hex = '#';
    for(let i=0 ; i < 6;i++){
        hex+= arrayHexColor[randomColor(arrayHexColor)];
    }
    backgrColor.style.backgroundColor = hex;
    text.textContent = hex;
}
function randomColor(color){
    return Math.floor(Math.random()*color.length);
}