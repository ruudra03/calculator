// Log
console.log("JavaScript loaded.");

// Script variables
let display = "0"; // default display value

// Select calculator element
const CALCULATOR = document.querySelector("#calculator");

// Select calculator display
const DISPLAY = CALCULATOR.querySelector("#display");
DISPLAY.textContent = display; // set display value

// Calculator operator functions

// ADD
function add(firstOperand, secondOperand) {
  let result = firstOperand + secondOperand;
  return result;
}

// SUBSTRACT
function substract(firstOperand, secondOperand) {
  let result = firstOperand - secondOperand;
  return result;
}

// MULTIPLY
function multiply(firstOperand, secondOperand) {
  let result = firstOperand * secondOperand;
  return result;
}

// DIVIDE
function divide(firstOperand, secondOperand) {
  let result = firstOperand / secondOperand;
  return result;
}
