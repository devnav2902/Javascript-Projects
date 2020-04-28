
document.addEventListener("DOMContentLoaded",eventListeners);

function eventListeners(){
    // displayStorage();


    const showBtn = document.getElementById("show-btn");
    const questionCard = document.querySelector(".question-card");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("question-form");
    const feedback = document.querySelector(".feedback");
    const questionInput = document.getElementById("question-input");
    const answerInput = document.getElementById("answer-input");
    const questionList = document.getElementById("questions-list");
    let data = [];
    let id = 1;

    //new ui instance
    const ui = new UI();
    // show question form
    showBtn.addEventListener('click',function(){
        ui.showQuestion(questionCard);
    })
    // close question form
    closeBtn.addEventListener('click',function(){
        ui.hideQuestion(questionCard);
    })
    // add question
    form.addEventListener('submit',function(event){
        event.preventDefault();
        if(questionInput.value === '' || answerInput.value === ''){
            feedback.classList.add('alert-danger','showItem');
            feedback.innerText = 'Please input question and value';

            setTimeout(function(){
                feedback.classList.remove('alert-danger','showItem');
            },3000)
        }
        else {
            const question = new Question(id,questionInput.value,answerInput.value);
            id++;
            data.push(question);
            ui.addQuestion(questionList,question);
            ui.clearInput(questionInput,answerInput);

            ui.hideQuestion(questionCard);

            // updateStorage(question);
        }
    })
    // work with a question
    questionList.addEventListener('click',function(event){
        event.preventDefault();

        if(event.target.classList.contains('delete-flashcard')){
            let id = event.target.dataset.id;
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement);

            // rest of data
            const tempData = data.filter(function(item){
                return item.id !== parseInt(id);
            })

            data = tempData;
        }
        else if(event.target.classList.contains('show-answer')){
            event.target.nextElementSibling.classList.toggle('showItem');
        }
        else if(event.target.classList.contains('edit-flashcard')){
            let id = event.target.dataset.id;
            // delete question from the dom
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement);
            // show the question
            ui.showQuestion(questionCard);
            // specific question
            const tempQuestion = data.filter(function(item){
                return item.id === parseInt(id);
            })
            questionInput.value = tempQuestion[0].title;
            answerInput.value = tempQuestion[0].answer;
            // rest of data
            const tempData = data.filter(function(item){
                return item.id !== parseInt(id);
            })

            data = tempData;
            

        }
    })

}
// ui constructor
function UI(){}
UI.prototype.showQuestion = function(element){
    element.classList.add('showItem');
}
UI.prototype.hideQuestion = function(element){
    element.classList.remove('showItem');
}
UI.prototype.clearInput = function(question,answer){
    question.value = '';
    answer.value = '';
}
UI.prototype.addQuestion = function(element,question){
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML = `
    <div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${question.title}</h4>
        <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
        <h5 class="answer mb-3">${question.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
        <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
        <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
        </div>
    </div>
    `;
    element.appendChild(div);
}
// question constructor
function Question(id,title,answer){
    this.id = id;
    this.title = title;
    this.answer = answer;
}
// function updateStorage(value){
//     let listQuestion;
//     let exists = localStorage.getItem('listQuestion');
//     if(exists){
//         listQuestion = JSON.parse(localStorage.getItem('listQuestion'));
//     }
//     else {
//         listQuestion = [];
//     }
//     listQuestion.push(value);
//     localStorage.setItem('listQuestion',JSON.stringify(listQuestion));
// }
// function displayStorage(element){
//     const questionList = document.getElementById("questions-list");

//     let exists = localStorage.getItem('listQuestion');
//     if(exists){
//         let listQuestion = JSON.parse(localStorage.getItem('listQuestion'));
//         listQuestion.forEach(function(item){
//             questionList.insertAdjacentHTML('beforeend',`
//             <div class="col-md-4">
//                 <div class="card card-body flashcard my-3">
//                 <h4 class="text-capitalize">${item.title}</h4>
//                 <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
//                 <h5 class="answer mb-3">${item.answer}</h5>
//                 <div class="flashcard-btn d-flex justify-content-between">

//                 <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${item.id}">edit</a>
//                 <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${item.id}">delete</a>
//                 </div>
//                 </div>
//             </div>

//             `)
//         })
//     }
// }