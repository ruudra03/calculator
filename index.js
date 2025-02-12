// Log
console.log("JavaScript loaded.");

// Script variables
let displayValue = "0"; // default display value

// Select calculator element
const calculator = document.querySelector("#calculator");

// Select calculator display
const display = calculator.querySelector("#display");
display.textContent = displayValue; // set display value
