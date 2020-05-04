// hide preloader
// all images links have finished loading

eventListeners();
function eventListeners(){
    const ui = new UI();
    window.addEventListener('load',function(){
        ui.hidePreloader();
    })
    // nav btn
    document.querySelector('.navBtn').addEventListener('click',function(){
        ui.showNav();
    })
    // control the video
    document.querySelector('.video_switch').addEventListener('click',function(){
        ui.videoControl();
    })
    // submit the form
    document.querySelector('.drink-form').addEventListener('submit',function(event){
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;
        let value = ui.checkEmpty(name,lastName,email);
        
        if(value){
            ui.showFeedBack('customer added to the list','success');
            let customer = new Customer(name,lastName,email);
            ui.addCustomer(customer);
            ui.clearFields();
        }
        else {
            ui.showFeedBack('some form values empty','error');
        }
    })
    // display modal
    const links = document.querySelectorAll('.work-item');
    Array.from(links).forEach(function(item){
        item.addEventListener('click',function(event){
            ui.showModal(event);
        })
    })
    // hide modal
    document.querySelector('.work-modal__close').addEventListener('click',function(){
        ui.hideModal();
    })
}

// constructor function
function UI(){}
// hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display = 'none';
}
// show nav
UI.prototype.showNav = function(){
    document.querySelector('.nav').classList.toggle('nav-show');
}
// play/pause the video
UI.prototype.videoControl = function(){
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide');
        document.querySelector('.video_item').pause();
    }
    else {
        btn.classList.remove('btnSlide');
        document.querySelector('.video_item').play();
    }
}
// check empty form
UI.prototype.checkEmpty = function(name,lastname,email){
    let result;
    if(name === ''||lastname ===''||email === ''){
        result = false;
    }
    else {
        result = true;
    }
    return result;
}
// showFeedBack
UI.prototype.showFeedBack = function(text,classname){
    const feedback = document.querySelector('.drink-form_feedback');

    if(classname === 'success'){
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    }
    else if(classname === 'error'){
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}
// remove alert
UI.prototype.removeAlert = function(className){
    setTimeout(function(){
        document.querySelector('.drink-form_feedback').classList.remove(className);
    },2500);
}
//add customer
UI.prototype.addCustomer = function(customer){
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random()*images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `
    <img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_lastname">${customer.lastname}</h4>
    `;
    document.querySelector('.drink-card_list').appendChild(div);
}
// clear fields
UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}
// show modal
UI.prototype.showModal = function(event){
    event.preventDefault();

    if(event.target.parentElement.classList.contains('work-item__icon')){
        let id = event.target.parentElement.dataset.id;

        const modal = document.querySelector('.work-modal');
        const modalItem = document.querySelector('.work-modal__item');

        modal.classList.add('work-modal--show');
        modalItem.style.backgroundImage = `url(../img/work-${id}.jpeg)`;
    
    }
}
// hide modal
UI.prototype.hideModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal--show');
}
// customer constructor
function Customer(name,lastname,email){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}