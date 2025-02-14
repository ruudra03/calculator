// Log
console.log("JavaScript loaded.");

// Script variables
let display = "0"; // default display value

// Select calculator element
const CALCULATOR = document.querySelector("#calculator");

// Select calculator display
const DISPLAY = CALCULATOR.querySelector("#display");
DISPLAY.textContent = display; // set display value

// Select calculator keypad
const KEYPAD = CALCULATOR.querySelector("#keypad");

// Keypad key's Event Listeners
KEYPAD.querySelector(".equal").addEventListener("click", function (e) {});

// Calculator operation function
function calculate(firstOperand, secondOperand, operator) {
  let operation;

  switch (operator) {
    case "add":
      operation = add(firstOperand, secondOperand);
      break;

    case "substract":
      operation = substract(firstOperand, secondOperand);
      break;

    case "multiply":
      operation = multiply(firstOperand, secondOperand);
      break;

    case "divide":
      operation = divide(firstOperand, secondOperand);
      break;
    default:
      console.log("Invalid operator.");
  }

  let result = operation.toString();
  return result;
}

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
