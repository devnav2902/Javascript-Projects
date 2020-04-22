const button = document.querySelector('.btn');
button.addEventListener('click',changeColor);
function changeColor(){
    const color = ['red','blue','green','pink','black','yellow','lightblue','purple','gray','white'];
    const bgrColor = document.querySelector('.color');
    bgrColor.style.backgroundColor = color[parseInt(Math.random()*color.length)];
    console.log(parseInt(Math.random()*color.length));
}
// function randomColor(colorRandom){
//     return Math.floor(Math.random()*colorRandom.length);
// }
// or use parseInt(Math.random()*color.length)