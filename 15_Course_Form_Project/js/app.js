(function(){
// check fields and hide the submit
document.addEventListener('DOMContentLoaded',function(){
    const display = new Display();
    display.checkFields();
    // mỗi hàm có 1 chức năng kh viết chung
    display.hideSubmit();
})
// add customer on submit
document.getElementById('customer-form').addEventListener('submit',
function(event){
    event.preventDefault();
    const name = this.querySelector('#name');
    const course = this.querySelector('#course');
    const author = this.querySelector('#author');

    const customer = new Customer(name.value,course.value,author.value);
    const display = new Display();

    display.feedBack(customer);
    display.clearFields();
})


// display
function Display(){
    this.name = document.getElementById('name');
    this.course = document.getElementById('course');
    this.author = document.getElementById('author');
    this.customers = document.querySelector('.customer-list');
}
// check field
Display.prototype.checkFields = function(){
    console.log(this);
    this.name.addEventListener('blur',this.validateField);
    this.course.addEventListener('blur',this.validateField);
    this.author.addEventListener('blur',this.validateField);
}
// validate field
Display.prototype.validateField = function(){
    console.log(this);
    if(this.value === ''){
        this.classList.remove('complete');
        this.classList.add('fail');
    }
    else {
        this.classList.remove('fail');
        this.classList.add('complete');
    }
    const complete = document.querySelectorAll('.complete');
    if(complete.length === 3){
        document.querySelector('.submitBtn').disabled = false;
    }
    else {
        document.querySelector('.submitBtn').disabled = true;
    }
}
Display.prototype.hideSubmit = function(){
    const btn = document.querySelector('.submitBtn');
    btn.disabled = true;
}
// loading and feedback
Display.prototype.feedBack = function(customer){
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');
    
    loading.classList.add('showItem');
    feedback.classList.add('showItem','alert','alert-succes');  

    const self = this;
    self.hideSubmit();
    console.log(self);
    console.log(this);

    setTimeout(function(){
        loading.classList.remove('showItem');
        feedback.classList.remove('showItem','alert','alert-succes');        
        // this.addCustomer(customer); nếu dùng this ở đây sẽ là window object
        self.addCustomer(customer);
    },2000)
}
// add customer
Display.prototype.addCustomer = function(customer){
    const div = document.createElement('div');
    div.classList.add('col-11','mx-auto','col-md-6','col-lg-4','my-3');
    const number = this.randomNumber();
    div.innerHTML = `
        <div class="card text-left">
        <img src="img/cust-${number}.jpg" class="card-img-top" alt="">
        <div class="card-body">
            <!-- customer name -->
            <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer.name}</span></h6>
            <!-- end of customer name -->
            <!-- customer name -->
            <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
            ${customer.course}
            </span></h6>
            <!-- end of customer name -->
            <!-- customer name -->
            <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author"> ${customer.author}</span></h6>
            <!-- end of customer name -->
        </div>
    `;
    this.customers.appendChild(div);
}
// clearFields
Display.prototype.clearFields = function(){
    console.log(this);
    this.name.value = '';
    this.course.value = '';
    this.author.value = '';

    this.name.classList.remove('complete','fail');
    this.course.classList.remove('complete','fail');
    this.author.classList.remove('complete','fail');
    
}
// customer constructor
function Customer(name,course,author){
    this.name = name;
    this.course = course;
    this.author = author;
}

Display.prototype.randomNumber = function(){
    return Math.floor(Math.random()*6);
}

})()

