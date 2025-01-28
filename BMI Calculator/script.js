
const btm= document.getElementById('calculate');
const result=document.querySelector('#result');

btm.addEventListener('click',(e)=>{
    e.preventDefault();
    const height=parseInt(document.getElementById('inputHeight').value);
    const weight=parseInt(document.getElementById('inputWeight').value);
    result.classList.add('result');
    
    if(height===''||height<0 ||isNaN(height)){
        result.innerHTML='please give a valid Height... $(height)';
    }
    else if(weight===''||weight<0 ||isNaN(weight)){
        result.innerHTML='please give a valid Weight... $(weight)';
    }
    else{
       const bmi=( weight/((height*height)/10000)).toFixed(2);
       result.innerHTML=bmi;
    }
});