// const buttonLeft = document.querySelector('.btn-left');
// const buttonRight = document.querySelector('.btn-right');
const centerDiv = document.querySelector('.centerDiv');



// buttonLeft.addEventListener('click',prevImg);
// buttonRight.addEventListener('click',nextImg);

// const listNameImg = ['images/manbun.jpg','images/longhair.jpg','images/dsk.jpg']; // button next
const objectListName = ['manbun','longhair','dsk']; // for button previous

let pos = 0;

// function nextImg(){
//     pos++;
//     if(pos > listNameImg.length - 1){
//         pos = 0;
//     }
//     centerDiv.style.backgroundImage = "url("+listNameImg[pos]+")";
//     centerDiv.style.backgroundSize = 'cover';
//     centerDiv.style.backgroundPosition = 'center';
// }
// function prevImg(){
//     pos--;
//     if(pos < 0){
//         pos = listNameImg.length-1;
//     }
//     centerDiv.style.backgroundImage = `url('images/${objectListName[pos]}.jpg')`;
// }

const buttons = document.querySelectorAll('.btn');

buttons.forEach(function(button){
    button.addEventListener('click',function(event){
        if(button.classList.contains('btn-left')){
            pos--;
            if(pos<0){
                pos = objectListName.length-1;
            }
            centerDiv.style.backgroundImage = `url('images/${objectListName[pos]}.jpg')`;
        }
        if(button.classList.contains('btn-right')){
            pos++;
            if(pos > objectListName.length-1){
                pos = 0;
            }
            centerDiv.style.backgroundImage = `url('images/${objectListName[pos]}.jpg')`;
        }
    })
})