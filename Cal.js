let firstNum = "";
let scndNum = "";
let currentSymbol = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[Number]");
const operatorButtons = document.querySelectorAll("[Operators]");
const equalsButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const pointButton = document.getElementById("pointBtn");

const lastScreen = document.getElementById("lastScreen");
const currentScreen = document.getElementById("currentScreen");

window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setSymbol(button.textContent));
});

function appendNumber(number) {
  if (currentScreen.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  currentScreen.textContent += number;
}

function resetScreen() {
  currentScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentScreen.textContent = "0";
  lastScreen.textContent = "";
  firstNum = "";
  scndNum = "";
  currentSymbol = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentScreen.textContent === "") {
    currentScreen.textContent = "0";
  }
  if (currentScreen.textContent.includes(".")) return;
  currentScreen.textContent += ".";
}

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -2);
}

function setSymbol(symbol) {
  if (currentSymbol !== null) evaluate();
  firstNum = currentScreen.textContent;
  currentSymbol = symbol;
  lastScreen.textContent = `${firstNum} ${currentSymbol}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentSymbol === null || shouldResetScreen) return;
  if (currentSymbol === "÷" && currentScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  scndNum = currentScreen.textContent;
  currentScreen.textContent = roundResult(
    operate(currentSymbol, firstNum, scndNum)
  );

  lastScreen.textContent = `${firstNum} ${currentSymbol} ${scndNum} =`;
  currentSymbol = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setSymbol(convertOperator(e.key));
  }
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
