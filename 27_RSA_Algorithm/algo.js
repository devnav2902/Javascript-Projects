const textM = document.querySelector('.textM');
const textE = document.querySelector('.textE');
const textP = document.querySelector('.textP');
const textQ = document.querySelector('.textQ');
const cal = document.querySelector('.cal');
const wrap = document.querySelector('.wrap');
const resultN = document.querySelector('.result_n');
const resultPhi = document.querySelectorAll('.result_phi');
const resultD = document.querySelector('.result_d');
const resultPub = document.querySelector('.result_public');
const resultPri = document.querySelector('.result_private');
const valueE = document.querySelectorAll('.e');
const valueP = document.querySelectorAll('.p');
const valueQ = document.querySelectorAll('.q');
const valueN = document.querySelectorAll('.n');
const valueD = document.querySelectorAll('.d');
const plainttextM = document.querySelectorAll(".plainttextM");
const textC = document.querySelector(".textC");
const valueC = document.querySelectorAll('.valueC');
const valueM = document.querySelectorAll('.valueM');
wrap.addEventListener('submit',calculator);

function calculator(event){    
    event.preventDefault();
    // textE.value === '' ||
    if(textM.value === '' || textP.value === '' || textQ.value === ''){
        document.querySelector('.alert').style.display = 'block';
        setTimeout(function(){
            document.querySelector('.alert').style.display = 'none';
        },3000)
    }
    else {
        let m = parseInt(textM.value);
        // let e = parseInt(textE.value);
        let p = parseInt(textP.value);
        let q = parseInt(textQ.value);
        
        let n = p*q;
        let phi = (p-1)*(q-1);
    

        let e=7;
        while(e<phi) {
            let track = gcd(e,phi);
            if(track === 1){        
                break;
            }
            else
                e++;
        }

        console.log(e);

        valueP.forEach(item => item.textContent = p);
        valueQ.forEach(item => item.textContent = q);
        resultN.textContent = n;
        resultPhi.forEach(item => item.textContent = phi);
        for(let d = 0;d<10000;d++){
            if(d*e%phi === 1 && d < phi){
                resultD.textContent = d;
                valueD.forEach(item => item.textContent = d);
                break;
            }
        }
    
        valueE.forEach(item => item.textContent = e);
        valueN.forEach(item => item.textContent = n);
    
        let resultCipher = Math.pow(m,e)%n;
        // plaintext.textContent = m;
    
        valueM.forEach(item => item.textContent = m);
        plainttextM.forEach(item => item.textContent = m);
       
        valueC.forEach(item => item.textContent = resultCipher);
        textC.textContent = resultCipher;
        
        const loading = document.querySelector('.loading');
        loading.style.display = 'block';
    
        setTimeout(function(){
            loading.style.display = 'none';
    
    
            const divCal = document.querySelector('.calcu');        
            divCal.classList.add('active');
    
            textM.value = '';
            // textE.value = '';
            textP.value = '';
            textQ.value = '';
        },2000)



        
    }


}

function gcd(a,b){
    let t;
    while(1){
        t = a%b;
        if(t===0){
            return b;
        }
        a = b;
        b = t;
    }
}

 