const taste = document.querySelector('.calculator');
const display = document.querySelector('.calculator-display');
const tastaAC = document.querySelector('.reset');
const tastaDEL = document.querySelector('.delete');
const tasta0 = document.querySelector('.zero');
const tasta1 = document.querySelector('.one');
const tasta2 = document.querySelector('.two');
const tasta3 = document.querySelector('.three');
const tasta4 = document.querySelector('.four');
const tasta5 = document.querySelector('.five');
const tasta6 = document.querySelector('.six');
const tasta7 = document.querySelector('.seven');
const tasta8 = document.querySelector('.eight');
const tasta9 = document.querySelector('.nine');
const tastaDot = document.querySelector('.dot');
const tastaDivide = document.querySelector('.divide');
const tastaProduct = document.querySelector('.product');
const tastaPlus = document.querySelector('.plus');
const tastaMinus = document.querySelector('.minus');
const tastaEnter = document.querySelector('.enter');
const tastaSign = document.querySelector('.sign');


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

let calc = {
  keyPressed: null,
  numberStr: '',
  operator: null,
  nr1: null,
  nr2: null,
  isDigit() {
    return digit.includes(this.keyPressed) ? true : false; 
  },
  numberOfDots() {
    let vect = [...this.numberStr];
    dotCount = 0;
    for(const el of vect) {
      if (el === '.') dotCount++
    }
    console.log(dotCount);
    return dotCount;
  },
  addDigit() {
    if (this.isDigit() && this.numberStr === '0' && this.keyPressed !=='.') return; 
    if (this.keyPressed === '.' && this.numberOfDots() > 0) return; 
    else if (this.isDigit()) this.numberStr += this.keyPressed;
  },
}




function citesteMouse(e) {
  if(display.innerText === 'NumLock is OFF!') display.innerText = '0';
    console.log(Boolean(e.target.closest('button')));
    //console.log(e.target)
    //if (e.target.closest('button') === null) return;
    calc.keyPressed = e.target.dataset.key;
    //calc.addDigit();
    console.log('click -> ', calc.keyPressed);
    console.log('calc.numberStr= ', calc.numberStr);


    
    
  }

  function citesteTastatura(e) {
    calc.keyPressed = e.key;
    calc.numberStr += calc.keyPressed;
    console.log(e);

    let numLock = e.getModifierState("NumLock"); 
    console.log('NumLock= ', numLock);
    console.log('tastatura -> ', calc.keyPressed);
    console.log('calc.numberStr= ', calc.numberStr);
  if(numLock === true)  {
    display.innerText = '0';
    if(e.key === 'q' || e.key === 'Q') {
      taste.removeEventListener('keyup', citesteTastatura, false);
    }
    if(e.key === 'Backspace') {
      tastaAC.focus();
    }
    if(e.key === 'Delete') {
      tastaDEL.focus();
    }
    if(e.key === '0') {
      tasta0.focus();
    }
    if(e.key === '1') {
      tasta1.focus();
    }
    if(e.key === '2') {
      tasta2.focus();
    }
    if(e.key === '3') {
      tasta3.focus();
    }
    if(e.key === '4') {
      tasta4.focus();
    }
    if(e.key === '5') {
      tasta5.focus();
    }
    if(e.key === '6') {
      tasta6.focus();
    }
    if(e.key === '7') {
      tasta7.focus();
    }
    if(e.key === '8') {
      tasta8.focus();
    }
    if(e.key === '9') {
      tasta9.focus();
    }
    if(e.key === '+') {
      tastaPlus.focus();
    }
    if(e.key === '-') {
      tastaMinus.focus();
    }
    if(e.key === '*') {
      tastaProduct.focus();
    }
    if(e.key === '/') {
      tastaDivide.focus();
    }
    if(e.key === 'Enter') {
      tastaEnter.focus();
    }
    if(e.key === '.') {
      tastaDot.focus();
    }
    if(e.key === 's' || e.key === 'S') {
      tastaSign.focus();
    }
  } else {
    display.innerText = 'NumLock is OFF!';
  }
    

  }
  

tastaAC.focus();
taste.addEventListener('keyup', citesteTastatura, false);
taste.addEventListener('click', citesteMouse, false);


setTimeout(() => console.log('AM APASAT -> ', calc.numberStr), 5000);

//document.addEventListener('keyup', citesteTastatura, false);
