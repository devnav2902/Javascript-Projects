// select element
const loading = document.querySelector('.loading');
const searchForm = document.querySelector('#searchForm');
const output = document.querySelector('.output');
const search = document.querySelector('#search');
const feedback = document.querySelector('.feedback');

const base = 'https://en.wikipedia.org/w/api.php';
const url = '?action=query&format=json&list=search&origin=*&srlimit=15&srsearch=';

searchForm.addEventListener('submit',function(event){
  event.preventDefault();
  const value = search.value;

  if(value === ''){
    showFeedback('please enter a value');   
  }
  else{
    // ajax
    ajaxWiki(value);
    search.value = '';
  }
})
// show feedback
function showFeedback(text){
  feedback.classList.add('showItem');
  feedback.innerHTML =`<p>${text}</p>`
  setTimeout(()=>{feedback.classList.remove('showItem')},2000);
}
// ajax wiki
function ajaxWiki(search){
  output.innerHTML = '';
  loading.classList.add('showItem');
  // setTimeout(()=>loading.classList.remove('showItem'),2000);
  const wikiUrl = `${base}${url}${search}`;

  fetch(wikiUrl).then(data => data.json()).then(data => displayData(data)).catch(e => console.log(e));

}
function displayData(data){
  loading.classList.remove('showItem');
  console.log(data);
  const {search:results} = data['query'];
  console.log(results);
  
  let info = '';
  results.forEach(result => {
    const pageID = 'http://en.wikipedia.org/?curid=';
    const {title,snippet,pageid} = result;
        
    info += `
    <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card card-body">
        <h1 class="card-title blueText">${title}</h1>
        <p>${snippet}</p>
        <a href="${pageID}${pageid}" target="_blank" class="my-2 text-capitalize">read more...</a>
      </div>
    </div>`
    });

    output.innerHTML = info;
}