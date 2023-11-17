'use strict';
let numberStr = '';
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operator = ['+', '-', '*', '/'];

const vect = [null, null];
let prev = null;
let enter = null;

let result = null;

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

function calculeaza(operand1, operation, operand2) {
  switch (operation) {
    case '+': {
      return operand1 + operand2;
    }
    case '-': {
      return operand1 - operand2;
    }
    case '*': {
      return operand1 * operand2;
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
        return operand1 / operand2;
      }
    }
  }
}

function citesteTastatura(e) {
  let key = e.key;
  //console.log(key);
  console.log(numberStr, ' ', key);

  // acumulez numarul <numberStr - String()> cat timp se apasa (0-9)
  if (isDigit(key)) {
    numberStr += key;

    console.log(vect);
  }
  //prima data cand se apasa o tasta operator(+ - * /)
  if (isOperator(key) && vect[0] === null) {
    vect[0] = Number(numberStr);
    vect[1] = key;
    console.log(vect);
    numberStr = '';
  }
  //cand nu este prima data cand se apasa o tasta operator
  if (isOperator(key) && vect[0] !== null) {
    result = calculeaza(vect[0], vect[1], Number(numberStr));
    vect[0] = result;
    vect[1] = key;
    console.log(vect);
    numberStr = '';
  }
  //daca este apasata tasta 'Enter' - calculez si afisez resultatul
  if (key === 'Enter') {
    console.log('result', calculeaza(vect[0], vect[1], Number(numberStr)));
  }
  //opresc la apasarea tastei 'q'
  if (key === 'q' || key === 'Q') {
    document.removeEventListener('keyup', citesteTastatura);
    console.log('Terminat!');
  }
}
document.addEventListener('keyup', citesteTastatura, false);
