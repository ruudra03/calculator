// Log
console.log("JavaScript loaded.");

// Script variables
let display = "0"; // default display value

// Select calculator element
const CALCULATOR = document.querySelector("#calculator");

// Select calculator display
const DISPLAY = CALCULATOR.querySelector("#display");
DISPLAY.textContent = display; // set display value
