document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const txtAlerta = document.getElementById('texto-de-alerta');
    const botao1 = document.getElementById('botao1');
    const botao2 = document.getElementById('botao2');
    const botaoLimpar = document.getElementById('botao__limpar');
    const botaoNormal = document.getElementById('botao__normal');
    const specialCharacters = /[À-ÿA-Z]/;

    function verificadorEntrada() {
        const valorEntrada = inputField.value;

        if (specialCharacters.test(valorEntrada)) {
            txtAlerta.classList.add('texto_alerta');
            desativarBotoes();
            botaoLimpar.classList.remove('button__escondido');
            botaoNormal.classList.remove('button__escondido');
            txtAlerta.innerHTML = 'Use apenas letras minúsculas sem acentos.<br>Você pode usar o botão normalizar para converter caracteres inválidos.'
        } else if (valorEntrada === '') {
            desativarBotoes();
            botaoLimpar.classList.add('button__escondido');
            botaoNormal.classList.add('button__escondido');
            txtAlerta.innerHTML = 'Use apenas letras minúsculas sem acentos.'
        } else {
            ativarBotoes();
            botaoLimpar.classList.remove('button__escondido');
            botaoNormal.classList.add('button__escondido');
            txtAlerta.classList.remove('texto_alerta');
            txtAlerta.innerHTML = 'Use apenas letras minúsculas sem acentos.'
        }
    }

    function ativarBotoes() {
        botao1.disabled = false;
        botao2.disabled = false;
        botao1.classList.remove('button__desativado');
        botao2.classList.remove('button__desativado');
    }

    function desativarBotoes() {
        botao1.disabled = true;
        botao2.disabled = true;
        botao1.classList.add('button__desativado');
        botao2.classList.add('button__desativado');
    }

    verificadorEntrada();

    inputField.addEventListener('input', verificadorEntrada);

    window.verificadorEntrada = verificadorEntrada;
});

// Função para limpar o campo de entrada
function limparEntrada() {
    inputField.value = "";
    verificadorEntrada();
}

// Função para colar texto do clipboard
function colarClipboard() {
    navigator.clipboard.readText().then((clipText) => {
        inputField.value += clipText;
        verificadorEntrada();
    });
}

function normalizarEntrada() {
    inputField.value = inputField.value
        .normalize('NFD')              
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();         
    verificadorEntrada();
}

function redirecionar(func_tipo) {
    localStorage.setItem('text', inputField.value);
    localStorage.setItem('acionamento', func_tipo);
    window.location.href = 'result.html';
};