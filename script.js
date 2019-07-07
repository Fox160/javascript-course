let a = prompt("Введите первое число", "");
let b = prompt("Введите второе число", "");
let operator = prompt("Введите знак операции", "");
let operatorsArray = ["+", "-", "*", "/", "%", "^"];

calculate(a, b, operator);

function calculate(a, b, operator) {
    if (!checkFields(a, b, operator)) {
        return;
    }
    let firstDigit = +a;
    let secondDigit = +b;
    let result = 0;

    if (operator === "+") {
        result = sum(firstDigit, secondDigit);
    } else if (operator === "-") {
        result = subtraction(+irstDigit, secondDigit);
    } else if (operator === "*") {
        result = multiplication(firstDigit, secondDigit);
    } else if (operator === "/") {
        if (secondDigit == 0) {
            alert("Нельзя делить на 0");
            return;
        }
        result = division(firstDigit, secondDigit);
    } else if (operator === "%") {
        result = modulo(firstDigit, secondDigit);
    } else if (operator === "^") {
        result = pow(firstDigit, secondDigit);
    }
    alert(+result.toFixed(10));
}

function checkFields(a, b, operator) {
    let result = true;
    if (!isNumeric(a) || !isNumeric(b)) {
        alert("Поля для чисел заполнены неверно");
        result = false;
    }

    if (!operatorsArray.includes(operator)) {
        alert("Операция введена неверно");
        result = false;
    }

    return result;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function sum(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function pow(a, b) {
    return Math.pow(a, b);
}
