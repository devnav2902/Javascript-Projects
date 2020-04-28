const showBtn = document.getElementById("show-btn");
const questionCard = document.querySelector(".question-card");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("question-form");
const feedback = document.querySelector(".feedback");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const questionList = document.getElementById("questions-list");
const submitBtn = document.querySelector('.submitBtn');
const editBtn = document.querySelector('.editBtn');

// let data = [];
// let id = 1;
document.addEventListener("DOMContentLoaded",displayStorage);

showBtn.addEventListener('click',showInputQuestion);
function showInputQuestion(){
    // if(questionCard.style.display === 'block'){
    //     questionCard.style.display = 'none';
    // }
    // else {
        questionCard.style.display = 'block';
        submitBtn.disabled = false;
        editBtn.disabled = true;
    // }
}
closeBtn.addEventListener('click',hideInputQuestion);
questionList.addEventListener('click',showAnswer);
function showAnswer(event){
    event.preventDefault();

    const element = event.target;
    const parentDiv = element.parentElement.parentElement;
    const divAnswer = parentDiv.querySelector('.answer');
    const divQuestion = parentDiv.firstElementChild;

    if(event.target.classList.contains('edit-flashcard')){   
        submitBtn.disabled = true;
        editBtn.disabled = false;
    
        parentDiv.classList.add('editing');
        questionInput.value = divQuestion.textContent;
        answerInput.value = divAnswer.textContent;     
        
        questionCard.style.display = 'block';

    }   
    else if(event.target.classList.contains('delete-flashcard')){
        let listStorage = JSON.parse(localStorage.getItem('questionList'));

        listStorage.forEach(function(ele,index){            
            if(divQuestion.textContent === ele.question){
                listStorage.splice(index,1);
                localStorage.setItem('questionList',JSON.stringify(listStorage));
            }
        })

        parentDiv.parentElement.remove();
        
    }
    else if(event.target.classList.contains('show-answer')){
        const showAnser = event.target.nextElementSibling;
        if(showAnser.style.display === 'block'){
            showAnser.style.display = 'none'
        }
        else {
            showAnser.style.display = 'block';
        }
    }
}
function hideInputQuestion(){
    questionCard.style.display = 'none';
}
submitBtn.addEventListener('click',submitQuestion);
function submitQuestion(event){
    event.preventDefault();
    const display = new Display();
    if(display.question === '' && display.answer !== ''){
        display.showAlert('please add a question !!!',true);
    }
    else if(display.answer === '' && display.question !== ''){
        display.showAlert('please add an answer !!!',true);
    }
    else if(display.question === '' && display.answer === ''){
        display.showAlert('Question and Answer can\'t blank!!!',false);
    }
    else {
        display.showQuestion();
        display.clearInput();
    }
    console.log(display);

    updateStorage(display);

    hideInputQuestion();
}
editBtn.addEventListener('click',editQuestion);
function editQuestion(event){
    event.preventDefault();
    questionCard.style.display = 'none';

    const divEdit = document.querySelectorAll('.flashcard');

    const display = new Display();

    Array.from(divEdit).forEach(function(div,index){
        if(div.classList.contains('editing')){
            div.firstElementChild.textContent = questionInput.value;
            const answer = div.querySelector('.answer');
            answer.textContent = answerInput.value;

            // update local storage
            let listStorage = JSON.parse(localStorage.getItem('questionList'));
            listStorage.splice(index,1,display);
            // listStorage[index]['answer'] = answer.textContent;
            // listStorage[index]['question'] = div.firstElementChild.textContent;
            // localStorage.setItem('questionList',JSON.stringify(listStorage));
            localStorage.setItem('questionList',JSON.stringify(listStorage));

        }
        div.classList.remove('editing');
    })

    display.clearInput();
}
function updateStorage(value){
    let listStorage;
    let exists = localStorage.getItem('questionList');
    if(exists){
        listStorage = JSON.parse(localStorage.getItem('questionList'));
    }
    else {
        listStorage = [];
    }
    listStorage.push(value);
    localStorage.setItem('questionList',JSON.stringify(listStorage));

}
function displayStorage(){
    let exists = localStorage.getItem('questionList');
    if(exists){
        let listStorage = JSON.parse(localStorage.getItem('questionList'));
        listStorage.forEach(function(ele){
            questionList.insertAdjacentHTML('beforeend',`
            <div class="col-md-4">
                <div class="card card-body flashcard my-3">
                <h4 class="text-capitalize">${ele.question}</h4>
                <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
                <h5 class="answer mb-3">${ele.answer}</h5>
                <div class="flashcard-btn d-flex justify-content-between">
                    <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
                    <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
                </div>
                </div>
            </div>
            `);
        });
    }
}
// get input constructor
function Display(){
    this.question = questionInput.value;
    this.answer = answerInput.value;
} 
// show alert
Display.prototype.showAlert = function(message,bool){
    feedback.style.display = 'block';
    if(bool === true){
        feedback.textContent = message;
        feedback.style.color = 'black';
    }
    else if(bool === false){
        feedback.textContent = message;
        feedback.style.color = 'red';
    }
    setTimeout(function(){
        feedback.textContent = '';
        feedback.style.display = 'none';
    },2000)
}
// display question and answer
Display.prototype.showQuestion = function(){
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML = `
    <div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${this.question}</h4>
        <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
        <h5 class="answer mb-3">${this.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
            <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
            <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
        </div>
    </div>
    `;
    questionList.appendChild(div);
}
// clear input 
Display.prototype.clearInput = function(){
    questionInput.value = '';
    answerInput.value = '';
}
