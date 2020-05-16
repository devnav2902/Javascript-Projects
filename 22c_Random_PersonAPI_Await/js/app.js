const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  getData().then(data => showData(data)).catch(error => console.log(error));
});

const showData = function(data) {
  
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

const getData = async function () {
  const url = 'https://randomuser.me/api/';
  const result = await fetch(url);
  const response = await result.json();
  return response;
}