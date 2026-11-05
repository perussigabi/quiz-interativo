
const perguntas = [

    {
        pergunta: "Qual linguagem é executada diretamente no navegador?",
        alternativas: ["Python", "JavaScript", "C#", "Java"],
        respostaCorreta: 1
    },

    {
        pergunta: "Qual tecnologia é responsável pela estilização de páginas web?",
        alternativas: ["HTML", "SQL", "CSS", "Java"],
        respostaCorreta: 2
    },

    {
        pergunta: "O que significa HTML?",
        alternativas: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Tool Markup Language"
        ],
        respostaCorreta: 0
    },

    {
        pergunta: "Qual comando é utilizado para declarar uma variável em JavaScript?",
        alternativas: ["print", "SELECT", "let", "INSERT"],
        respostaCorreta: 2
    },

    {
        pergunta: "Qual banco de dados estamos utilizando no PostgreSQL?",
        alternativas: ["Excel", "PostgreSQL", "Word", "PowerPoint"],
        respostaCorreta: 1
    },

    {
        pergunta: "Qual símbolo representa uma comparação de igualdade estrita em JavaScript?",
        alternativas: ["=", "===", "!=", "+"],
        respostaCorreta: 1
    },

    {
        pergunta: "Qual linguagem é utilizada no desenvolvimento com .NET?",
        alternativas: ["C#", "HTML", "CSS", "SQL"],
        respostaCorreta: 0
    },

    {
        pergunta: "Para que serve o CSS?",
        alternativas: [
            "Armazenar dados",
            "Criar bancos de dados",
            "Estilizar páginas web",
            "Executar consultas SQL"
        ],
        respostaCorreta: 2
    }

];


let perguntaAtual = 0;
let pontuacao = 0;


const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoResultado = document.getElementById("resultado");
const elementoProgresso = document.getElementById("progresso");
const botaoProxima = document.getElementById("btnProxima");



function carregarPergunta() {


    const pergunta = perguntas[perguntaAtual];


    elementoPergunta.textContent = pergunta.pergunta;

    elementoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    elementoAlternativas.innerHTML = "";


    elementoResultado.textContent = "";


    botaoProxima.disabled = true;


    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");


        botao.onclick = function() {
            verificarResposta(indice, botao);
        };

        elementoAlternativas.appendChild(botao);

    });

}



function verificarResposta(indice, botao) {

    const pergunta = perguntas[perguntaAtual];


    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });


    if (indice === pergunta.respostaCorreta) {

        pontuacao++;

        botao.classList.add("correta");

        elementoResultado.textContent = "Resposta correta! Parabéns!";
        elementoResultado.style.color = "green";

    } else {

        botao.classList.add("incorreta");

        botoes[pergunta.respostaCorreta].classList.add("correta");

        elementoResultado.textContent = "Resposta incorreta!";
        elementoResultado.style.color = "red";

    }


    botaoProxima.disabled = false;

}


function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        carregarPergunta();

    } else {

        finalizarQuiz();

    }

}


function finalizarQuiz() {

    document.getElementById("areaPergunta").style.display = "none";

    document.getElementById("telaFinal").style.display = "block";

    document.getElementById("progresso").style.display = "none";

    document.getElementById("pontuacaoFinal").textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    const mensagem = document.getElementById("mensagemFinal");

    if (pontuacao === 8) {

        mensagem.textContent = "Excelente! Você acertou todas as perguntas!";

    } else if (pontuacao >= 5) {

        mensagem.textContent = "Muito bem! Você tem bons conhecimentos!";

    } else if (pontuacao >= 3) {

        mensagem.textContent = "Bom esforço! Continue estudando!";

    } else {

        mensagem.textContent = "Continue praticando! Você vai melhorar!";

    }

}


function reiniciarQuiz() {

    perguntaAtual = 0;
    pontuacao = 0;

    document.getElementById("areaPergunta").style.display = "block";

    document.getElementById("telaFinal").style.display = "none";

    document.getElementById("progresso").style.display = "block";

    carregarPergunta();

}


carregarPergunta();
