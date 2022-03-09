let totalRecorrente = 0;
let entradaUser = "0";
let operadorAnt = null;
const screen = document.querySelector(".display-calc");

document.querySelector(".botoes-calc").addEventListener("click", function (event) {
    botaoClick(event.target.innerText); // innerText obtem o valor do HTML, value do Input pelo usuario
});

function atualizar() {
    screen.innerText = entradaUser;
}
function manterNumero(value) {
    if (entradaUser === "0") {
        entradaUser = value
    } else {
        entradaUser += value
    }
    atualizar();
}

function manterOperador(value) {
    switch (value) {
        case 'C':
            entradaUser = "0";
            totalRecorrente = 0;
            operadorAnt = null;
            break;

        case "=":
            if (operadorAnt === null) {
                return;
            }
            flushOperation(parseInt(entradaUser));
            entradaUser = null;
            entradaUser = "" + totalRecorrente;
            totalRecorrente = 0;
            break;

        case "←":
            if (entradaUser.length === 1) {
                entradaUser = "0";
            } else {
                entradaUser = entradaUser.substring(0, entradaUser.length - 1)
            }
            break;
        default:
            utilizarOp(value);
            break;
    }
}
function utilizarOp(value) {
    const intNumUser = parseInt(entradaUser) // intNumUser = Entrada do usuario
    if (totalRecorrente === 0) {
        totalRecorrente = intNumUser;
    } else {
        flushOperation(intNumUser);
    }
    operadorAnt = value;
    entradaUser = "0";
}

function flushOperation(intNumUser) {
    if (operadorAnt === "+") {
        totalRecorrente += intNumUser;
    } else if (operadorAnt === "-") {
        totalRecorrente -= intNumUser;
    } else if (operadorAnt === "X") {
        totalRecorrente *= intNumUser;
    } else {
        totalRecorrente /= intNumUser;
    }
}
function botaoClick(value) {
    if (isNaN(parseInt(value))) {
        manterOperador(value);
    } else {
        manterNumero(value);
    }
    atualizar();
}