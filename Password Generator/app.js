const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numberCheck = document.querySelector('#numbers');
const symbolCheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generateButton');
const allcheckBox = document.querySelectorAll('input[type=checkbox]')
const str = "!@#$%^&*()~`=+_\\-/?{}[]\"'|:;";

let password = '';
let passwordLength = 10;
let checkCount = 0;

handleSlider();

setIndicator("#ccc");

function shufflePassword(arr){

    for(let i=0;i<arr.length;i++){
        let randIdx = getRandomInt(0,arr.length);
        let temp = arr[i];
        arr[i] = arr[randIdx];
        arr[randIdx] = temp;
    }
    let str = toString(arr);
    return str;
}

inputSlider.addEventListener('input',function(e){
    passwordLength = e.target.value;
    handleSlider();
},false);

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
    
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // indicator.style.shadow = color;
}

function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInt(0,10);
}

function generateLowerCase(){
    const num = getRandomInt(97,123);
    return String.fromCharCode(num);
}

function generateUpperCase(){
    const num = getRandomInt(65,91);
    return String.fromCharCode(num);
}

function generateSymbol(){
    const num = getRandomInt(0,str.length);
    return str[num];
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if(uppercaseCheck.checked) hasUpper = false;
    if(lowercaseCheck.checked) hasLower = false;
    if(numberCheck.checked) hasNumber = false;
    if(symbolCheck.checked) hasSymbol = false;

    if(hasLower && hasUpper && hasNumber || hasSymbol && passwordLength>=8){
        setIndicator('#0f0');
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = 'copied';
    }
    catch(e){
        copyMsg.innerHTML = 'failed';
    }

    copyMsg.classList.add('active');
    setTimeout( () => {
        copyMsg.classList.remove('active');
        // copyMsg.style.diplay = 'none';
    }, 2000);
}

copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value){
        copyContent();
    }
},false);

function handleCheckBoxChange(){
    checkCount = 0;
    allcheckBox.forEach(function(box){
        if(box.checked) checkCount++;
    });
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handleCheckBoxChange);
})

generateBtn.addEventListener('click',function(e){

    if(checkCount<=0) return;



    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = '';

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    for(let i=0;i<passwordLength-funcArr.length;i++){

        let randIdx = getRandomInt(0,funcArr.length);

        password += funcArr[randIdx]();
    }

    console.log(password);

    // password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    
    calcStrength();

},false);

