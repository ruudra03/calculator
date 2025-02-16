// Log
console.log("JavaScript loaded.");

// Script variables
let displayString = "0"; // default display value
let firstOperandString = ""; // operand before the operator
let operatorString = ""; // operator of choice
let secondOperandString = ""; // operand after the operator
let resultString = ""; // display value for results

// Select calculator element
const CALCULATOR = document.querySelector("#calculator");

// Select calculator display
const DISPLAY = CALCULATOR.querySelector("#display");
DISPLAY.textContent = displayString; // set display value

// Select calculator keypad
const KEYPAD = CALCULATOR.querySelector("#keypad");

// Keypad key's Event Listeners

// Listen for operand inputs and update display
KEYPAD.querySelectorAll(".operand").forEach(function (operand) {
  operand.addEventListener("click", function (e) {
    // Reset the result display string before accepting new operation
    if (resultString) {
      resultString = ""; // discard previous result
      DISPLAY.textContent = displayString; // reset display
    }

    if (!operatorString) {
      // add to first operand
      firstOperandString += e.target.value;
      displayString = firstOperandString; // set display for current operand
    } else {
      // add to second operand
      secondOperandString += e.target.value;
      displayString = secondOperandString; // set display for current operand
    }

    // Update display
    DISPLAY.textContent = displayString;
  });
});

// Listen for operator choice
KEYPAD.querySelectorAll(".operator").forEach(function (operator) {
  operator.addEventListener("click", function (e) {
    removeCurrentOperatorSelection();

    // Use last calculated result as first operand if exists
    if (resultString) {
      firstOperandString = resultString;
      resultString = ""; // reset the result
      DISPLAY.textContent = firstOperandString; // set the display to reflect current first operater after successive operations
    }

    // Check for first operand
    if (firstOperandString) {
      operatorString = e.target.value;
      // Activate active CSS class to display current operator
      e.target.classList.add("active");
    } else {
      console.log("Enter an operand first.");
    }
  });
});

// Listen for calculate operation
KEYPAD.querySelector(".equal").addEventListener("click", function (e) {
  removeCurrentOperatorSelection();

  if (!firstOperandString || !operatorString) {
    console.log("Insufficient inputs.");
    return false;
  }

  if (!secondOperandString) {
    // set second operand equal to first operand if value is not provided
    secondOperandString = firstOperandString;
  }

  let firstOperand = parseInt(firstOperandString);
  let secondOperand = parseInt(secondOperandString);

  resultString = calculate(firstOperand, secondOperand, operatorString);

  // Set result display
  DISPLAY.textContent = resultString;
  resetCalculator(); // reset calculator variables
  return true;
});

// Listen for all clear
KEYPAD.querySelector(".all-clear").addEventListener("click", function (e) {
  resetCalculator();
  // Reset result if any and display value
  resultString = "";
  DISPLAY.textContent = displayString; // set to default
  // Remove CSS classes for current operator selector if any
  removeCurrentOperatorSelection();
});

// Listen for undo
KEYPAD.querySelector(".undo").addEventListener("click", function (e) {
  if (secondOperandString) {
    // undo from the second operand
    secondOperandString = secondOperandString.slice(0, -1); // remove last character

    if (!secondOperandString) {
      // if string is empty after undo
      displayString = firstOperandString; // set display to show the value of first operand
    } else {
      displayString = secondOperandString;
    }

    // Update display
    DISPLAY.textContent = displayString;
  } else if (operatorString) {
    // undo operand selection
    removeCurrentOperatorSelection(); // remove CSS active class
    operatorString = ""; // reset operator string
  } else {
    firstOperandString = firstOperandString.slice(0, -1); // remove last character

    if (!firstOperandString) {
      // if string is empty after undo
      // Check if previous result is stored
      if (resultString) {
        displayString = resultString; // set display to show to the value of last calculated result
      } else {
        displayString = "0";
      }
    } else {
      displayString = firstOperandString;
    }

    // Update display
    DISPLAY.textContent = displayString;
  }
});

// Calculator operation function
function calculate(firstOperand, secondOperand, operatorString) {
  let operation;

  switch (operatorString) {
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

// Reset calculator variables
function resetCalculator() {
  displayString = "0";
  firstOperandString = "";
  operatorString = "";
  secondOperandString = "";
}

// Remove current selection of operator
function removeCurrentOperatorSelection() {
  let currentOperatorSelection = KEYPAD.querySelector(".active");

  if (currentOperatorSelection) {
    // Remove CSS class active from operator before calculation
    currentOperatorSelection.classList.remove("active");
  }
}
