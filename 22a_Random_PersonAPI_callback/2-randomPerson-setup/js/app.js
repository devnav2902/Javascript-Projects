const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  getPerson(getData);
});

function getPerson(cb) {
  const ajax = new XMLHttpRequest();
  const url = 'https://randomuser.me/api/';
  ajax.open('GET',url,true);

  ajax.onload = function(){
    if(this.status === 200){
      cb(this.responseText,showData);
    }
    else{
      console.log('something wrong');
    }
  }
  ajax.onerror = function(){
    alert('something wrong');
  }

  ajax.send();
}

function getData(response,cb) {
  const data = JSON.parse(response);
  console.log(data)

  const {
    name:{first},
    name:{last},
    location:{country},
    phone,
    email,
    picture:{large}
  } = data['results'][0];
  cb(first,last,country,phone,email,large);
}
function showData(first,last,country,phone,email,picture) {
  document.querySelector('#first').textContent = first;
  document.querySelector('#last').textContent = last;
  document.querySelector('#street').textContent = country;
  document.querySelector('#phone').textContent = phone;
  document.querySelector('#email').textContent = email;
  document.querySelector('#photo').src = picture;       
}
// const btn = document.getElementById("btn");
// btn.addEventListener("click", function () {
//     getPerson().then(response => {
//       const formatedData = getData(response);
//       showData(formatedData);
//     }).catch(alert);
// });

// const getPerson = new Promise((resolve, reject) => {
//     const ajax = new XMLHttpRequest();
//     const url = "https://randomuser.me/api/";
//     ajax.open("GET", url, true);

//     ajax.onload = function () {
//         if (this.status === 200) {
//             resolve(JSON.parse(this.responseText));
//         } else {
//             reject("something wrong");
//         }
//     };
//     ajax.onerror = function () {
//         reject("something wrong");
//     };

//     ajax.send();
// });

// function getData(data) {
//     const {
//         name: { first },
//         name: { last },
//         location: { country },
//         phone,
//         email,
//         picture: { large }
//     } = data["results"][0];
//     return { first, last, country, phone, email, large };
// }
// function showData({ first, last, country, phone, email, picture }) {
//     document.querySelector("#first").textContent = first;
//     document.querySelector("#last").textContent = last;
//     document.querySelector("#street").textContent = country;
//     document.querySelector("#phone").textContent = phone;
//     document.querySelector("#email").textContent = email;
//     document.querySelector("#photo").src = picture;
// }