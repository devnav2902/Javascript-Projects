const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  fetch('https://randomuser.me/api')
    .then(data => data.json())
    .then(result => showData(result))
    .catch(error => console.log(error));
});
// const ajax = new Promise((resolve,reject)=>{
//   const xhr = new XMLHttpRequest();
//   const url = 'https://randomuser.me/api';
//   xhr.open('GET',url,true);
//   xhr.onload = () =>{
//     if(xhr.status === 200){
//       console.log(xhr.responseText);
//       resolve(xhr.responseText);
//     }
//     else {
//       reject(Error(xhr.statusText));
//     }
//   }
//   xhr.onerror = ()=>{
//     reject(Error('something wrong'));
//   }
//   xhr.send();
// });
function showData(data) {
  console.log(data);
  const {
    name: { first },
    dob: { age },
    picture: {large}
  } = data.results[0];

  document.querySelector('#photo').src = large;       
  document.getElementById("first").textContent = first;
  document.getElementById("dob").textContent = age;
}