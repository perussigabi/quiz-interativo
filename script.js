
const perguntas = [

    // HTML E CSS - FÁCIL

    {
        pergunta: "Qual linguagem estrutura uma página web?",
        alternativas: ["CSS", "HTML", "Python", "SQL"],
        respostaCorreta: 1,
        categoria: "HTML e CSS",
        dificuldade: "fácil"
    },

    {
        pergunta: "Qual tecnologia é responsável pela estilização?",
        alternativas: ["JavaScript", "HTML", "CSS", "C#"],
        respostaCorreta: 2,
        categoria: "HTML e CSS",
        dificuldade: "fácil"
    },

    // HTML E CSS - MÉDIO

    {
        pergunta: "Qual propriedade CSS altera a cor do texto?",
        alternativas: ["background", "font-size", "color", "border"],
        respostaCorreta: 2,
        categoria: "HTML e CSS",
        dificuldade: "médio"
    },

    // HTML E CSS - DIFÍCIL

    {
        pergunta: "Qual seletor CSS seleciona um elemento pelo seu ID?",
        alternativas: [".", "#", "*", ":"],
        respostaCorreta: 1,
        categoria: "HTML e CSS",
        dificuldade: "difícil"
    },

    // JAVASCRIPT - FÁCIL

    {
        pergunta: "Qual linguagem é executada diretamente no navegador?",
        alternativas: ["Python", "JavaScript", "C#", "Java"],
        respostaCorreta: 1,
        categoria: "JavaScript",
        dificuldade: "fácil"
    },

    {
        pergunta: "Qual palavra-chave declara uma variável que pode mudar de valor?",
        alternativas: ["const", "let", "class", "return"],
        respostaCorreta: 1,
        categoria: "JavaScript",
        dificuldade: "fácil"
    },

    // JAVASCRIPT - MÉDIO

    {
        pergunta: "Qual comando permite percorrer um array?",
        alternativas: ["for", "SELECT", "CREATE", "DROP"],
        respostaCorreta: 0,
        categoria: "JavaScript",
        dificuldade: "médio"
    },

    // JAVASCRIPT - DIFÍCIL

    {
        pergunta: "Qual operador compara valor e tipo em JavaScript?",
        alternativas: ["=", "==", "===", "!="],
        respostaCorreta: 2,
        categoria: "JavaScript",
        dificuldade: "difícil"
    },

    // BANCO DE DADOS - FÁCIL

    {
        pergunta: "Qual linguagem é utilizada para consultar bancos de dados relacionais?",
        alternativas: ["HTML", "CSS", "SQL", "JavaScript"],
        respostaCorreta: 2,
        categoria: "Banco de Dados",
        dificuldade: "fácil"
    },

    {
        pergunta: "Qual comando SQL consulta informações de uma tabela?",
        alternativas: ["SELECT", "DELETE", "DROP", "INSERT"],
        respostaCorreta: 0,
        categoria: "Banco de Dados",
        dificuldade: "fácil"
    },

    // BANCO DE DADOS - MÉDIO

    {
        pergunta: "Qual comando SQL adiciona registros em uma tabela?",
        alternativas: ["UPDATE", "INSERT INTO", "SELECT", "DROP"],
        respostaCorreta: 1,
        categoria: "Banco de Dados",
        dificuldade: "médio"
    },

    // BANCO DE DADOS - DIFÍCIL

    {
        pergunta: "Qual é a função de uma chave estrangeira?",
        alternativas: [
            "Excluir uma tabela",
            "Armazenar imagens",
            "Relacionar tabelas",
            "Alterar o nome do banco"
        ],
        respostaCorreta: 2,
        categoria: "Banco de Dados",
        dificuldade: "difícil"
    }

];


// VARIÁVEIS DO QUIZ

let perguntaAtual = 0;
let pontuacao = 0;

let perguntasFiltradas = [];

let tempoRestante = 15;
let temporizador;

let respostaRespondida = false;


// ELEMENTOS HTML

const elementoPergunta = document.getElementById("pergunta");

const elementoAlternativas = document.getElementById("alternativas");

const elementoResultado = document.getElementById("resultado");

const elementoProgresso = document.getElementById("progresso");

const elementoTempo = document.getElementById("tempo");

const botaoProxima = document.getElementById("btnProxima");

const elementoCategoria = document.getElementById("categoriaAtual");


// INICIAR QUIZ

function iniciarQuiz() {

    const categoriaEscolhida =
        document.getElementById("categoria").value;

    const dificuldadeEscolhida =
        document.getElementById("dificuldade").value;


    // FILTRAR PERGUNTAS

    perguntasFiltradas = perguntas.filter(pergunta => {

        const categoriaCorreta =
            categoriaEscolhida === "todas" ||
            pergunta.categoria === categoriaEscolhida;

        const dificuldadeCorreta =
            dificuldadeEscolhida === "todas" ||
            pergunta.dificuldade === dificuldadeEscolhida;

        return categoriaCorreta && dificuldadeCorreta;

    });


    // VERIFICAR SE EXISTEM PERGUNTAS

    if (perguntasFiltradas.length === 0) {

        alert("Não existem perguntas para essa combinação!");

        return;

    }


    // REINICIAR VARIÁVEIS

    perguntaAtual = 0;
    pontuacao = 0;


    // TROCAR TELAS

    document.getElementById("telaInicial").style.display = "none";

    document.getElementById("telaFinal").style.display = "none";

    document.getElementById("areaPergunta").style.display = "block";


    carregarPergunta();

}


// CARREGAR PERGUNTA

function carregarPergunta() {

    clearInterval(temporizador);

    respostaRespondida = false;

    const pergunta = perguntasFiltradas[perguntaAtual];


    // ATUALIZAR TEXTO

    elementoPergunta.textContent = pergunta.pergunta;


    // ATUALIZAR PROGRESSO

    elementoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasFiltradas.length}`;


    // MOSTRAR CATEGORIA E DIFICULDADE

    elementoCategoria.textContent =
        `${pergunta.categoria} | ${pergunta.dificuldade.toUpperCase()}`;


    // LIMPAR ELEMENTOS ANTERIORES

    elementoAlternativas.innerHTML = "";

    elementoResultado.textContent = "";

    elementoResultado.classList.remove("tempo-esgotado");


    // DESABILITAR BOTÃO

    botaoProxima.disabled = true;


    // CRIAR ALTERNATIVAS

    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.classList.add("alternativa");


        botao.onclick = function() {

            verificarResposta(indice, botao);

        };


        elementoAlternativas.appendChild(botao);

    });


    // INICIAR TEMPORIZADOR

    iniciarTemporizador();

}


// TEMPORIZADOR

function iniciarTemporizador() {

    clearInterval(temporizador);

    tempoRestante = 15;

    elementoTempo.textContent = tempoRestante;

    document.getElementById("temporizador")
        .classList.remove("tempo-esgotado");


    temporizador = setInterval(() => {

        tempoRestante--;

        elementoTempo.textContent = tempoRestante;


        // AVISO NOS ÚLTIMOS 5 SEGUNDOS

        if (tempoRestante <= 5) {

            document.getElementById("temporizador")
                .classList.add("tempo-esgotado");

        }


        // TEMPO ESGOTADO

        if (tempoRestante <= 0) {

            clearInterval(temporizador);

            tempoEsgotado();

        }

    }, 1000);

}


// VERIFICAR RESPOSTA

function verificarResposta(indice, botao) {

    // IMPEDIR RESPOSTAS REPETIDAS

    if (respostaRespondida) {
        return;
    }

    respostaRespondida = true;

    clearInterval(temporizador);


    const pergunta = perguntasFiltradas[perguntaAtual];

    const botoes = document.querySelectorAll(".alternativa");


    // DESABILITAR TODAS AS ALTERNATIVAS

    botoes.forEach(botao => {

        botao.disabled = true;

    });


    // VERIFICAR SE ESTÁ CORRETA

    if (indice === pergunta.respostaCorreta) {

        pontuacao++;

        botao.classList.add("correta");

        elementoResultado.textContent =
            "Resposta correta! Parabéns!";

        elementoResultado.style.color = "#22c55e";

    } else {

        botao.classList.add("incorreta");

        botoes[pergunta.respostaCorreta]
            .classList.add("correta");

        elementoResultado.textContent =
            "Resposta incorreta!";

        elementoResultado.style.color = "#ef4444";

    }


    botaoProxima.disabled = false;

}


// TEMPO ESGOTADO

function tempoEsgotado() {

    if (respostaRespondida) {
        return;
    }

    respostaRespondida = true;

    const pergunta = perguntasFiltradas[perguntaAtual];

    const botoes = document.querySelectorAll(".alternativa");


    // DESABILITAR ALTERNATIVAS

    botoes.forEach(botao => {

        botao.disabled = true;

    });


    // MOSTRAR RESPOSTA CORRETA

    botoes[pergunta.respostaCorreta]
        .classList.add("correta");


    elementoResultado.textContent =
        "Tempo esgotado! Você não pontuou nesta pergunta.";

    elementoResultado.style.color = "#ef4444";


    botaoProxima.disabled = false;

}


// PRÓXIMA PERGUNTA

function proximaPergunta() {

    if (!respostaRespondida) {
        return;
    }

    clearInterval(temporizador);

    perguntaAtual++;


    if (perguntaAtual < perguntasFiltradas.length) {

        carregarPergunta();

    } else {

        finalizarQuiz();

    }

}


// FINALIZAR QUIZ

function finalizarQuiz() {

    clearInterval(temporizador);


    // ESCONDER TELA DAS PERGUNTAS

    document.getElementById("areaPergunta").style.display = "none";


    // MOSTRAR TELA FINAL

    document.getElementById("telaFinal").style.display = "block";


    // CALCULAR RESULTADO

    const total = perguntasFiltradas.length;

    const porcentagem = Math.round(
        (pontuacao / total) * 100
    );


    // MOSTRAR PONTUAÇÃO

    document.getElementById("pontuacaoFinal").textContent =
        `Você acertou ${pontuacao} de ${total} perguntas!`;


    document.getElementById("porcentagem").textContent =
        `Seu aproveitamento foi de ${porcentagem}%`;


    // MENSAGENS PERSONALIZADAS

    const mensagem = document.getElementById("mensagemFinal");


    if (porcentagem === 100) {

        mensagem.textContent =
            "Perfeito! Você acertou todas as perguntas!";

    } else if (porcentagem >= 75) {

        mensagem.textContent =
            "Excelente! Você demonstrou muito conhecimento!";

    } else if (porcentagem >= 50) {

        mensagem.textContent =
            "Muito bem! Você está no caminho certo!";

    } else if (porcentagem >= 25) {

        mensagem.textContent =
            "Bom começo! Continue praticando e aprendendo!";

    } else {

        mensagem.textContent =
            "Não desanime! Revise os conteúdos e tente novamente!";

    }

}


// VOLTAR AO INÍCIO

function voltarInicio() {

    clearInterval(temporizador);


    // REINICIAR VARIÁVEIS

    perguntaAtual = 0;

    pontuacao = 0;

    tempoRestante = 15;

    respostaRespondida = false;


    // TROCAR TELAS

    document.getElementById("telaFinal").style.display = "none";

    document.getElementById("areaPergunta").style.display = "none";

    document.getElementById("telaInicial").style.display = "block";

}

