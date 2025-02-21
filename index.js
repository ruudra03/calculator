// Log
console.log("JavaScript loaded.");

let firstOperationOperand;
let secondOperationOperand;
let operationOperator;
const DISPLAY_ERR_MESSAGE = "oops!";

// Select calculator element
const calculator = document.querySelector("#calculator");

// Select calculator display
const calculatorDisplay = calculator.querySelector("#display");
displayEntry(); // Start calculator display

// Select calculator keypad
const calculatorKeypad = calculator.querySelector("#keypad");

calculatorKeypad.querySelectorAll(".operand").forEach(function (operand) {
  operand.addEventListener("click", function (e) {
    keyInOperand(operand.value);
  });
});

calculatorKeypad.querySelectorAll(".operator").forEach(function (operator) {
  operator.addEventListener("click", function (e) {
    keyInOperator(operator.value);
  });
});

calculatorKeypad
  .querySelector(".equal")
  .addEventListener("click", function (e) {
    calculate();
  });

function keyInOperand(value) {
  // If no operator is selected and first operand exists
  if (!operationOperator) {
    firstOperationOperand = updateEntry(value, firstOperationOperand);
  } else {
    secondOperationOperand = updateEntry(value, secondOperationOperand);
  }

  displayEntry();
}

function keyInOperator(value) {
  // If second operand exists
  if (secondOperationOperand) {
    // Perform calculator operation
    let result = calculate();
    firstOperationOperand = result;
  }

  // If first operand is missing
  if (!firstOperationOperand) {
    firstOperationOperand = 0;
  }

  // Set operator
  operationOperator = value;

  // Display current operation section on keypad
  toggleActiveOperatorClass(operationOperator);

  displayEntry();
}

function calculate() {
  // When only first operand is provided and an operator is selected
  if (
    (firstOperationOperand || firstOperationOperand === 0) &&
    operationOperator &&
    (secondOperationOperand || secondOperationOperand === 0)
  ) {
    let result = operation(
      firstOperationOperand,
      secondOperationOperand,
      operationOperator
    );

    resetOperation();

    // Display result
    calculatorDisplay.textContent = result.toString();

    // Return value for successive operator calculation
    return result;
  }
}

function displayEntry() {
  let displayString;

  if (secondOperationOperand || secondOperationOperand === 0) {
    // If second operand is defined
    displayString = secondOperationOperand; // Display second operand
  } else if (firstOperationOperand || firstOperationOperand === 0) {
    displayString = firstOperationOperand; // Display first operand
  } else {
    displayString = "0"; // Default display value
  }

  calculatorDisplay.textContent = displayString;
}

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

function toggleActiveOperatorClass(operationOperator) {
  calculatorKeypad
    .querySelector(`.${operationOperator}`)
    .classList.toggle("active");
}

function resetOperation() {
  // Remove active CSS class from current operator
  toggleActiveOperatorClass(operationOperator);

  firstOperationOperand = undefined;
  secondOperationOperand = undefined;
  operationOperator = undefined;
}

function updateEntry(value, currentEntry) {
  let newEntry;

  if (currentEntry) {
    newEntry = currentEntry.toString() + value;
  } else {
    newEntry = value;
  }

  return parseFloat(newEntry);
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

// Log on keypad key click
calculatorKeypad.querySelectorAll(".keypad-btn").forEach(function (key) {
  key.addEventListener("click", function (e) {
    console.log(
      firstOperationOperand,
      secondOperationOperand,
      operationOperator
    );
    console.log(
      typeof firstOperationOperand,
      typeof secondOperationOperand,
      typeof operationOperator
    );
  });
});
