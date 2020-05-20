//DOM
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');



const randomFunc = {
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbols
};


generateEl.addEventListener('click', () => {
    const length = parseInt(lengthEl.value);

    const hasLower = lowercaseEl.checked; //boolean
    const hasUpper =  uppercaseEl.checked; //boolean
    const hasNumber = numbersEl.checked; //boolean
    const hasSymbol = symbolsEl.checked; //boolean

   resultEl.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length);

});

clipboard.addEventListener('click',()=>{
    const textArea  = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return "";
    }
    else{
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        alert("Password copied to clipboard");
    }
});



function copyPassword(){

}



//Gernerates PassWord Function
function generatePassword(lower,upper,number,symbol,length){
     // 1.initialize a password variable
     //2 filter out unchecked types
     //3 loop over the length and call a genrator function for each type
     // 4 return  the final password

    let genratedPassword='';
    const typesCount  = lower + upper + number + symbol; //if all are true returns 4

    const typeArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0]);
    
    if(typesCount ===0){
        return '';
    }
    else{
        for(let i=0;i<length;i+=typesCount){
            typeArr.forEach(type => { //type = {lower}
                let funcName = Object.keys(type)[0]; //lower or upper
                genratedPassword += randomFunc[funcName]();
            });
        }

    }
    const finalPassword = genratedPassword.slice(0,length);
    return finalPassword;

    
    //filter removes objects that return false
    //Input : var check = ['x', 'y', 'z'];  || item = {lower}
    //console.log(Object.values(check));    ||Object.values(item)
    //Output : ARR ["x", "y", "z"]          || [true]
    // [                                    ||Object.values(item)[0] => true
    //     {
    //         lower:true
    //     }
    //     {
    //          upper:true
    //      }    
    // ]


}







//Generator Functions
//--https://www.net-comber.com/charset.html
function getRandomLower(){
    //small letters are from 97 to 122 codes
    //math random gives 0 to 1
    let random = (Math.floor(Math.random()*26)+97);//98 gives b
    return String.fromCharCode(random);
}
function getRandomUpper(){
    //capital letters are from 65 
    //math random gives 0 to 1
    let random = (Math.floor(Math.random()*26)+65);
    return String.fromCharCode(random);
}

function getRandomNumber(){
    //numbers are from 0 to 9 which is 48 to 57 codes
    let random = (Math.floor(Math.random()*10)+48);
    return String.fromCharCode(random);
}
function getRandomSymbols(){
    const symbols = `!@#$^&(){}[]=<>/,.`;
    let random = Math.floor(((Math.random()*symbols.length)));
    console.log(symbols[random]);
    return symbols[random];
}