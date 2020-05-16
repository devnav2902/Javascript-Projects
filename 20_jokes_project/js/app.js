//
const mainBtn = document.getElementById("mainBtn");
const result = document.getElementById("result");
const img = document.getElementById("img");

mainBtn.addEventListener("click", function() {
  const ajax = new XMLHttpRequest();
  const url = 'https://api.chucknorris.io/jokes/random';
  ajax.open('GET',url,true);

  ajax.onload = function(){
    if(this.status === 200){
      const data = JSON.parse(this.responseText);
      // img.src = data.icon_url;
      // result.textContent = data.value;
      const {icon_url:image,value:joke} = data;
      console.log(img)
      img.src = image;
      result.textContent = joke;
    }
  }
  ajax.onerror = function(){
    alert('can\'t not get data');
  }
  ajax.send();
});
