// Log file loading message
console.log("JavaScript loaded.");

// Calculator operation variables
let firstOperationOperand;
let secondOperationOperand;
let operationOperator;
const DISPLAY_ERR_MESSAGE = "oops!";

/*
 *Get DOM elements
 */

// Select calculator from DOM
const calculator = document.querySelector("#calculator");

// Select calculator display from caluclator
const calculatorDisplay = calculator.querySelector("#display");
displayEntry(); // Initialise calculator display

// Select calculator keypad from calculator
const calculatorKeypad = calculator.querySelector("#keypad");

/*
 *Listen for all calculator actions
 */

// Listen for operand keys
calculatorKeypad.querySelectorAll(".operand").forEach(function (operand) {
  operand.addEventListener("click", (e) => keyInOperand(operand.value));
});

// Listen for operator keys
calculatorKeypad.querySelectorAll(".operator").forEach(function (operator) {
  operator.addEventListener("click", (e) => keyInOperator(operator.value));
});

// Change operand sign
calculatorKeypad
  .querySelector(".sign")
  .addEventListener("click", (e) => changeSign());

// Calculate operand percentage
calculatorKeypad
  .querySelector(".percent")
  .addEventListener("click", (e) => getPercentage());

// Insert decimal point
calculatorKeypad
  .querySelector(".decimal")
  .addEventListener("click", (e) => addDecimalPoint());

// Calculate operation
calculatorKeypad
  .querySelector(".equal")
  .addEventListener("click", (e) => calculate());

// Clear all operation variables
calculatorKeypad
  .querySelector(".all-clear")
  .addEventListener("click", (e) => clearEntries());

// Undo last operand entry
calculatorKeypad
  .querySelector(".undo")
  .addEventListener("click", (e) => undoLastEntry());

/*
 *Calculator functions
 */

// Update current operand using the entry value
function keyInOperand(value) {
  // Check if operator is selected
  if (!operationOperator) {
    // Set or append to first operand
    firstOperationOperand = updateEntry(value, firstOperationOperand);
  } else {
    // Set or append to second operand
    secondOperationOperand = updateEntry(value, secondOperationOperand);
  }

  // Update display
  displayEntry();
}

// Set operation operator value
function keyInOperator(value) {
  // Check if second operand exists for successive operations
  if (secondOperationOperand) {
    // Calculate the operation using existing variables and assign the result to first operand
    firstOperationOperand = calculate();
  } else if (!firstOperationOperand) {
    // Check for first operand
    // Set first operand to zero if it's not defined
    firstOperationOperand = 0;
  }

  // Set operator
  operationOperator = value;

  // Display current operation section on keypad using active CSS class
  toggleActiveOperatorClass(operationOperator);

  // Update display
  displayEntry();
}

// Change current operand sign using multiplication
function changeSign() {
  // Check for second operand
  if (secondOperationOperand) {
    secondOperationOperand = multiply(secondOperationOperand, -1);
  } else if (firstOperationOperand) {
    // Check for first operand
    firstOperationOperand = multiply(firstOperationOperand, -1);
  }

  // Update display
  displayEntry();
}

// Get percentage of current operand
function getPercentage() {
  // Check for second operand
  if (secondOperationOperand) {
    secondOperationOperand = percentageOf(secondOperationOperand);
  } else if (firstOperationOperand) {
    // Check for first operand
    firstOperationOperand = percentageOf(firstOperationOperand);
  }

  // Update display
  displayEntry();
}

// Insert decimal point in the current operand
function addDecimalPoint() {
  // Check if first or second operands exists and are integers with no existing decimal points
  if (
    parseInt(secondOperationOperand) &&
    !secondOperationOperand.toString().includes(".")
  ) {
    secondOperationOperand = secondOperationOperand.toString() + ".";
  } else if (
    parseInt(firstOperationOperand) &&
    !firstOperationOperand.toString().includes(".")
  ) {
    firstOperationOperand = firstOperationOperand.toString() + ".";
  }

  // Check if first and second operands are undefined
  // Use zero as first digit of the operand before the decimal
  if (!operationOperator && !firstOperationOperand) {
    firstOperationOperand = "0.";
  } else if (operationOperator && !secondOperationOperand) {
    secondOperationOperand = "0.";
  }

  // Update display
  displayEntry();
}

// Perform operation calculation
function calculate() {
  // Check for both operands and operator selection
  // Also check for zero as operands
  if (
    (firstOperationOperand || firstOperationOperand === 0) &&
    operationOperator &&
    (secondOperationOperand || secondOperationOperand === 0)
  ) {
    // Get result from operation
    let result = operation(
      parseFloat(firstOperationOperand),
      parseFloat(secondOperationOperand),
      operationOperator
    );

    // Reset operation variables and also remove active CSS class selections for operator
    resetOperation();

    // Display result
    calculatorDisplay.textContent = result.toString();

    // Return result for successive operations
    return result;
  }
}

// Reset all operation variables, remove active CSS class selection, and update display at last
function clearEntries() {
  resetOperation();
  displayEntry();
}

// Remove last entry from the current operand
function undoLastEntry() {
  // Check for second operand
  if (secondOperationOperand) {
    // Undo from second operand
    secondOperationOperand = secondOperationOperand.toString().slice(0, -1);

    // Check if operand is empty after last character is removed
    if (!secondOperationOperand) {
      // Reset to default
      secondOperationOperand = undefined;
    }
  } else if (firstOperationOperand) {
    // Check for first operand
    // Undo from first operand
    firstOperationOperand = firstOperationOperand.toString().slice(0, -1);

    // Check if operand is empty after last character is removed
    if (!firstOperationOperand) {
      // Reset to default
      firstOperationOperand = undefined;
    }
  }

  // Update display
  // Display default value of zero if first operand is completely removed and first operand if second operand is completely removed
  displayEntry();
}

// Display current entry on the calculator display
function displayEntry() {
  let displayString;

  // Check for second operand
  if (secondOperationOperand || secondOperationOperand === 0) {
    // If second operand is defined
    displayString = secondOperationOperand; // Display second operand
  } else if (firstOperationOperand || firstOperationOperand === 0) {
    // Check for first operand
    // If first operand is defined
    displayString = firstOperationOperand; // Display first operand
  } else {
    // Initial display value when both operands are undefined
    displayString = "0"; // Default display value
  }

  calculatorDisplay.textContent = displayString;
}

// Append entry to current operand
function updateEntry(value, currentEntry) {
  let newEntry;

  // Check if the current operand is defined
  if (currentEntry) {
    // Append to existing operand entry
    newEntry = currentEntry.toString() + value;
  } else {
    // Start new operand entry
    newEntry = value;
  }

  return parseFloat(newEntry);
}

// Reset alll operation variables
function resetOperation() {
  // Remove active CSS class from current operator if it exists
  if (operationOperator) {
    toggleActiveOperatorClass(operationOperator);
  }

  // Reset all variables to default
  firstOperationOperand = undefined;
  secondOperationOperand = undefined;
  operationOperator = undefined;
}

// Toggle active CSS class from operator elements to display current selection
function toggleActiveOperatorClass(operationOperator) {
  calculatorKeypad
    .querySelector(`.${operationOperator}`)
    .classList.toggle("active");
}

/*
 * Calculator operator functions
 */

// OPERATION
function operation(firstOperand, secondOperand, operater) {
  let result;

  switch (operater) {
    case "add":
      result = add(firstOperand, secondOperand);
      break;

    case "substract":
      result = substract(firstOperand, secondOperand);
      break;

    case "multiply":
      result = multiply(firstOperand, secondOperand);
      break;

    case "divide":
      result = divide(firstOperand, secondOperand);
      break;
  }

  if (result === null) {
    return DISPLAY_ERR_MESSAGE;
  } else {
    return result;
  }
}

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
  // Check for zero
  if (secondOperand === 0) {
    return null;
  }

  let result = firstOperand / secondOperand;
  return result;
}

// PERCENT
function percentageOf(operand) {
  let result = operand / 100;
  return result;
}
