document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const txtAlerta = document.getElementById('texto-de-alerta');
    const botao1 = document.getElementById('botao1');
    const botao2 = document.getElementById('botao2');
    const botaoLimpar = document.getElementById('botao__limpar');
    const botaoNormal = document.getElementById('botao__normal');
    const respostaResultado = document.getElementById('resposta_resultado');
    const specialCharacters = /[À-ÿA-Z]/;

    carregarConfiguracoes();

    inputField.addEventListener('input', verificadorEntrada);

    function carregarConfiguracoes() {
        const textoSalvo = localStorage.getItem('text');
        const acaoSalva = localStorage.getItem('acionamento');

        if (textoSalvo) {
            inputField.value = textoSalvo;
        }

        if (acaoSalva === "criptor") {
            ativarBotaoCriptografar();

        } else if (acaoSalva === "emcriptor") {
            ativarBotaoDescriptografar();
        } else {
            inputField.value = '';
            respostaResultado.innerText = 'Digite uma mensagem para ser criptografada ou descriptografada!';
        }

        verificadorEntrada();

        localStorage.setItem('acionamento', '');
        localStorage.setItem('text', '');
    }

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

    // Função para criptografar
    function ativarBotaoCriptografar() {
        const texto = inputField.value;
        let mensagemResposta = '';

        for (const char of texto) {
            switch (char) {
                case 'a':
                    mensagemResposta += 'ai';
                    break;
                case 'e':
                    mensagemResposta += 'enter';
                    break;
                case 'i':
                    mensagemResposta += 'imes';
                    break;
                case 'o':
                    mensagemResposta += 'ober';
                    break;
                case 'u':
                    mensagemResposta += 'ufat';
                    break;
                default:
                    mensagemResposta += char;
            }
        }

        respostaResultado.innerText = mensagemResposta;
    }

    // Função para descriptografar
    function ativarBotaoDescriptografar() {
        let texto = inputField.value;

        texto = texto.replace(/ai/g, 'a')
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');

        respostaResultado.innerText = texto;
    }

    function copiarMensagem() {
        const copyText = respostaResultado.innerText;
        navigator.clipboard.writeText(copyText);
    }

    window.verificadorEntrada = verificadorEntrada;
    window.copiarMensagem = copiarMensagem;
    window.ativarBotaoCriptografar = ativarBotaoCriptografar;
    window.ativarBotaoDescriptografar = ativarBotaoDescriptografar;
});

function limparEntrada() {
    inputField.value = "";
    verificadorEntrada();
}

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