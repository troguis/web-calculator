// Selectores de botones numéricos y inputs de números
const btnNumeros = document.querySelectorAll('.btnNro');
const inputsNros = document.querySelectorAll('#numero1, #numero2');
const btnOperBasica = document.querySelectorAll('.btnOper');
const valorResultado = document.querySelector('#resultado');
const otrosOpera = document.querySelectorAll('.otrasOpe');

// Variable que almacenará el id del input enfocado
let focusedInput = null;

// variables que guardan el valor de los inputs
let input1 = document.querySelector('#numero1').value;
let input2 = document.querySelector('#numero2').value;



// Evento que se ejecuta cuando el documento está completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Establece el id del input enfocado cuando se selecciona
    inputsNros.forEach(input => {
        input.addEventListener('focus', () => {
            // Guarda el id del input enfocado
            focusedInput = input.id;
        });
    });

    // Asigna el valor del botón al input enfocado cuando se hace clic en un botón numérico
    btnNumeros.forEach(btn => {
        const valorBtnNro = btn.value;
        btn.addEventListener('click', () => {
            // Llama a la función manejaEntrada con el valor del botón
            manejaEntrada(valorBtnNro);
        });
    });

    // Restringe la entrada de caracteres en los inputs para permitir solo números y un único punto decimal
    inputsNros.forEach(input => {
        input.addEventListener('keypress', event => {
            const valor = event.key;
            if (!soloNumeros(input, valor)) {
                // Bloquea cualquier carácter que no sea número o punto
                event.preventDefault();
            }

        });
    });

    // Asigna la operación que tenía el btn presionado
    btnOperBasica.forEach(btn => {
        btn.addEventListener('click', () => {
            // Pasar el signo de la operación a la función operBasica
            operBasica(btn.value);
        })
    });

    // Se ejecuta si se presiona las otras operaciones
    otrosOpera.forEach(otrosBtn => {
        otrosBtn.addEventListener('click', () => {
            operDiferentes(otrosBtn.value);
        });
    });

});

// Función que valida si un valor es un número o un punto decimal
function soloNumeros(input, valor) {
    const esNumero = !isNaN(valor) && valor !== ' ';
    const esPunto = valor === '.';
    const hayPunto = input.value.includes('.');
    const esGuion = valor === '-';
    const hayGuion = input.value.includes('-');

    // Si no es un número ni un punto, devuelve false
    if (!esNumero && !esPunto && !esGuion) {
        return false;
    }

    // Si es un punto y ya hay uno en el input, devuelve false
    if (esPunto && hayPunto) {
        return false;
    }

    // Si es un guion y ya hay uno en el input, devuelve false
    if (esGuion && hayGuion) {
        return false;
    }

    // Si es un número o un punto válido, devuelve true
    return true;
}

// Función que maneja la entrada de valores en los inputs
function manejaEntrada(valor) {
    if (focusedInput) { // Si existe un input enfocado
        const inputEnfocado = document.querySelector(`#${ focusedInput}`)
        if (soloNumeros(inputEnfocado, valor)) {
            // Agrega el valor al input enfocado si es válido
            inputEnfocado.value += valor;

        }

        // Mantén el foco en el input
        inputEnfocado.focus();
    } else {
        console.log('no hay foco');
    }


}

// Función que realiza operación básica
function operBasica(signo) {
    const input1 = parseInt(document.querySelector('#numero1').value);
    const input2 = parseInt(document.querySelector('#numero2').value);

    let resultado;
    // console.log(resultado);

    if (isNaN(input2)) {
        alert('Por favor, ingrese valores en ambos campos.');
        return;
    } else {
        switch (signo) {
            case '+':
                resultado = input1 + input2;
                break;

            case '-':
                resultado = input1 - input2;
                break;

            case '*':
                resultado = input1 * input2;
                break;

            case '/':
                resultado = input1 / input2;
                break;
            case 'borrar':
                limpiartInputs();
                return;

            default:
                break;
        }

        mostrarResultado(resultado);
        // console.log(resultado);

    }
}


function mostrarResultado(resultado) {
    valorResultado.value = resultado;
}

function limpiartInputs() {
    // Aquí seleccionamos a todos los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    // valorResultado.value = '';
}

function operDiferentes(valor) {
    // console.log(valor);
    let inputUno = parseInt(document.querySelector('#numero1').value);
    let inputDos = parseInt(document.querySelector('#numero2').value);
    let inputResultado = parseFloat(document.querySelector('#resultado').value);

    let resultado;

    switch (valor) {
        case '√':
            resultado = Math.sqrt(inputDos);
            mostrarResultado(resultado);
            break;

        case '^':
            resultado = Math.pow(inputUno, inputDos);
            mostrarResultado(resultado);
            break;

        case 'absoluto':
            resultado = Math.abs(inputDos);
            mostrarResultado(resultado);
            break;

        case 'random':
            inputDos = inputDos + 1;
            resultado = Math.floor(Math.random() * (inputDos - inputUno) + inputUno);
            mostrarResultado(resultado);
            break;

        case 'round':
            resultado = Math.round(inputResultado);
            mostrarResultado(resultado);
            break;

        case 'floor':
            resultado = Math.floor(inputResultado)
            mostrarResultado(resultado);
            break;

        case 'cell':
            resultado = Math.ceil(inputResultado)
            mostrarResultado(resultado);
            break;

        default:
            break;
    }
}