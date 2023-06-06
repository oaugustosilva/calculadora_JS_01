const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""
    }

    //add digit to calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen()
    }

    // Processing operations
    processOperation(operation) {
        console.log(operation);

        //Check if the current value is empty. Because if it is empty, it means the person only wants to change the operation.
        //For example: 2+2=4 -> *5 .. at the *5 step, the calcultador would show Infinity. To get off this, we create a code to
        //identify if the current value is empty.
        if (this.currentOperationText.innerText === "" && operation !== "C") { //check if the current is empty
            //Change operation
            if (this.previousOperationText.innerText !== "") { //check if the previous IS NOT empty. If it is, it means the person is trying to do something impossible..for example click on the operator at first.
                this.changeOperation(operation);
            }
            return;
        }

        //Get current and previous values
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0]; //tem que adicionar o split para poder pegar somente o número para utilizar na próxima operação.
        //senão, vai tentar realizer a próxima operação com o simbolo da operação anterior junto
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "CE":
                this.processClearOperator();
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "C":
                this.processClearAllOperator();
                break;
            case "=":
                this.processResult();
                break;
            default:
                return;
        }
    }

    //change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText +=
                this.currentOperation; //vai concatenar o valor que está sendo digitado
            // no valor que está sendo mostrado.
            console.log("concatenando numero");
        } else {
            //Check if value is zero, if it is, just add current value.
            if (previous === 0) {
                operationValue = current;
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    //CE Button -> clear the current numbers
    processClearOperator() {
        this.currentOperationText.innerText = "";
    }

    processClearAllOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processResult() {
        let operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => { //faz um for em cada botão.
    btn.addEventListener("click", (e) => { //adiciona um evento em cada botão, e seleciona esse evento (e) para uma função anonima
        const value = e.target.innerText; /* Permite que o valor em HTML seja transformado em numero e colocado na variavel value */

        if (+value >= 0 || value === ".") { //para separar quando é número e quando é operador. Se o botão (transformado em numero pelo +value) for maior ou igual a zero, ou for
            //ponto alguma coisa .293173987, vai ser número.
            calc.addDigit(value); // aqui vai imprimir os numeros
        } else {
            calc.processOperation(value); //aqui vai imprimir os operadores
        }
    });
});