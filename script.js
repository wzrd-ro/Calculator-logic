'use strict';

let numberStr = '';
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operator = ['+', '-', '*', '/'];

// vect[0] === operand1; vect[1] === operatorul '+, -, * sau /'
const vect = [null, null];

let result = null;
let lastKey = null;

function isDigit(key) {
  return digit.includes(key);
}
function isOperator(key) {
  return operator.find((el) => el === key);
}
function potCalcula() {
  if (
    typeof vect[0] === 'number' &&
    typeof vect[1] === 'string' &&
    typeof vect[2] === 'number'
  ) {
    return true;
  }
}

function removeLastChar(str) {
  str = str.slice(0, -1);
  return str;
}

function precisionRoundMod(number, precision) {
  var factor = 10 ** precision;
  var n = precision < 0 ? number : 0.01 / factor + number;
  return Math.round( n * factor) / factor;
}

function calculeaza(operand1, operation, operand2) {
  switch (operation) {
    case '+': {
      return precisionRoundMod(operand1 + operand2, 10);
    }
    case '-': {
      return precisionRoundMod(operand1 - operand2, 10);
    }
    case '*': {
      return precisionRoundMod(operand1 * operand2, 10);
    }
    case '/': {
      if (operand2 === 0) {
        console.log('Nu se poate');
        vect[1] = null;
        vect[0] = null;
        numberStr = '';
        result = null;
        return null;
      } else {
        return precisionRoundMod(operand1 / operand2, 6);
      }
    }
  }
}

function areMaiMultePuncte(str) {
  const vect = [...str];
  let gasit = 0;
  for(const el of vect) {
    if(el === '.') {
      gasit++;
    }
  }
  if(gasit > 1) {
    return true;
  } else {
    return false;
  }
}

function areMulteZeroInFataNumarul(str) {
  str = '0' + str.replace( /^0{1,}/g, '');
  if(str[0] === '0') {
    str = str.slice(1);
  }

  return str;
}

function citesteTastatura(e) {
  let key = e.key;
  //console.log(key);
  console.log(numberStr, ' ', key);
  if(key === 'Backspace') {
  resetAC();
  lastKey = 'Backspace';
  return;
  }
  console.log(vect, ' ', lastKey);
 
  
  // acumulez numarul <numberStr - String()> cat timp se apasa (0-9)
  if (isDigit(key)) {
    numberStr += key;
    numberStr = areMulteZeroInFataNumarul(numberStr);
    
    //console.log(numberStr, ' ', key);

    if(lastKey === 'Enter') {
      vect[0] = null;
      vect[1] = null;
      lastKey = null;
    }

    // verifica daca are mai multe puncte numarul
    if(areMaiMultePuncte(numberStr)) {
      let  numberVect = [...numberStr];
      numberVect.pop();
      numberStr = numberVect.join('');
      //console.log('am scos punctul', numberStr);
    }
    //console.log('if 1');
    //console.log(vect);
  }
  // sterg ultimul caracter din numar
  if(key === 'Delete') {
    numberStr = removeLastChar(numberStr);
  }
  
  //console.log(numberStr, ' ', key);
  //prima data cand se apasa o tasta operator(+ - * /)
  if (isOperator(key) && vect[0] === null) {
    //console.log('if 2');
    //console.log(vect);
    vect[0] = Number(numberStr);
    vect[1] = key;
    //console.log(vect);
    numberStr = '';
    return;
  }
  //cand nu este prima data cand se apasa o tasta operator
  if (isOperator(key) && vect[0] !== null && isOperator(vect[1])) {
    //daca ultima tasta apasata este 'Enter'
    if(lastKey === 'Enter') {
      vect[1] = key;
      numberStr = '';
      lastKey = null;
      return;
    }
    result = calculeaza(vect[0], vect[1], Number(numberStr));
    vect[0] = result;
    vect[1] = key;
    //console.log('if 3');
    console.log(vect);
    numberStr = '';  
    return;
  }
  
  //daca este apasata tasta 'Enter' - calculez si afisez resultatul
  if (key === 'Enter') {
    result = calculeaza(vect[0], vect[1], Number(numberStr));
    console.log(`${vect[0]} ${vect[1]} ${Number(numberStr)} = ${result}`);
    vect[0] = result;
    //console.log('if enter');
    //console.log(vect);
    numberStr = '';
    lastKey = 'Enter';
    return;
  
  }
  //opresc la apasarea tastei 'q'
  if (key === 'q' || key === 'Q') {
    document.removeEventListener('keyup', citesteTastatura);
    console.log('Terminat!');
    return;
  }
function resetAC() {
  // resetare
    vect[0] = null;
    vect[1] = null;
    numberStr = '';
    result = null;
    //console.log(vect);
    return;
}
  
}
document.addEventListener('keyup', citesteTastatura, false);
