const url = "https://botafogo-atletas.mange.li/2024-1/";
const idLimite = 60;
sessionStorage.setItem('idLimite', idLimite);

const container = document.getElementById("container");
const divBotoes = document.getElementById("divBotoes");

const manipulaCLick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    document.cookie = `id=${id}`;
    document.cookie = `nJogos=${e.currentTarget.dataset.nJogos}`;

    const dados = JSON.stringify(e.currentTarget.dataset);
    localStorage.setItem('id', id);
    localStorage.setItem('dados', dados);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('dados', dados);

    window.location.href = url;
    console.log(e.currentTarget);
}

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");

    nome.innerText = atleta.nome;
    nome.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;

    cartao.onclick = manipulaCLick;

    return cartao;
}

const carregaAtletas = (endpoint) => {
    pega_json(`${url}${endpoint}`).then(
        (r) => {
            container.innerHTML = "";
            r.forEach(
                (ele) => container.appendChild(montaCard(ele))
            )
        }
    );
}

//BOTOES
const botaoMasc = () => carregaAtletas('masculino');
const botaoFem = () => carregaAtletas('feminino');
const botaoAll = () => carregaAtletas('all');

// LOGIN
const criaBotoesTimes = () => {
    const botoes = document.createElement("div");
    botoes.id = "botoes";
    botoes.innerHTML = `
    <div class="botao-selecao">
        <div id="teamSelection">
            <button id="botaoMasculino">Time Masculino</button>
            <button id="botaoFeminino">Time Feminino</button>
            <button id="botaoAll">Todos os Atletas</button>
        </div>
        <input type="text" id="busca" placeholder="Insira Busca">
    </div>
    `;
    return botoes;
}

const criaSelectTimes = () => {
    const select = document.createElement("select");
    select.id = "teamSelection";
    select.className = "dropdown";
    select.innerHTML = `
        <option value="masculino">Time Masculino</option>
        <option value="feminino">Time Feminino</option>
        <option value="all">Todos os Atletas</option>
    `;
    select.onchange = (e) => {
        const value = e.target.value;
        if (value === "masculino") botaoMasc();
        else if (value === "feminino") botaoFem();
        else if (value === "all") botaoAll();
    };
    return select;
}

const configuraBotoesTimes = () => {
    if (sessionStorage.getItem('login')) {
        const teamSelection = document.getElementById("teamSelection");
        if (window.innerWidth <= 768) {
            teamSelection.replaceWith(criaSelectTimes());
        } else {
            document.getElementById("botaoMasculino").onclick = botaoMasc;
            document.getElementById("botaoFeminino").onclick = botaoFem;
            document.getElementById("botaoAll").onclick = botaoAll;
        }
    }
}

const loginValido = () => {
    container.innerHTML = "";
    divBotoes.appendChild(criaBotoesTimes());

    setTimeout(configuraBotoesTimes, 300);

    const input = document.getElementById('busca');
    input.addEventListener('input', () => {
        const termo = input.value.toLowerCase();
        const cartoes = container.getElementsByTagName('article');

        for (let i = 0; i < cartoes.length; i++) {
            const cartao = cartoes[i];
            const nome = cartao.getElementsByTagName('h1')[0].innerText.toLowerCase();

            if (nome.includes(termo)) {
                cartao.style.display = 'block';
            } else {
                cartao.style.display = 'none';
            }
        }
    });
}

const manipulaBotaoLogin = () => {
    const texto = document.getElementById("senha").value;
    document.getElementById("senha").value = "";

    if (hex_sha256(texto) === "8ff576f9c1f4130066da185a946c4d6a7438b2bf1715fa6c28ab1b514bf41aa1") {
        sessionStorage.setItem('login', true);

        document.getElementById("botaoLogin").style.display = "none";
        document.getElementById("senha").style.display = "none";
        document.getElementById("mostraSenha").style.display = "none";
        document.getElementById("card-login").style.display = "none";
        document.getElementById("logout").style.display = "block";

        if (sessionStorage.getItem('login')) {
            loginValido();
        }
    } else {
        alert("Senha incorreta");
    }
}

document.getElementById("botaoLogin").onclick = manipulaBotaoLogin;

// LOGOUT
document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem('login');
    container.innerHTML = "";
    divBotoes.innerHTML = "";

    document.getElementById("botaoLogin").style.display = "inline";
    document.getElementById("senha").style.display = "inline";
    document.getElementById("mostraSenha").style.display = "block";
    document.getElementById("card-login").style.display = "flex";
    document.getElementById("logout").style.display = "none";
}

window.addEventListener('resize', () => {
    if (sessionStorage.getItem('login')) {
        const teamSelection = document.getElementById("teamSelection");
        if (window.innerWidth <= 768 && teamSelection.tagName !== "SELECT") {
            teamSelection.replaceWith(criaSelectTimes());
        } else if (window.innerWidth > 768 && teamSelection.tagName === "SELECT") {
            teamSelection.replaceWith(criaBotoesTimes().querySelector("#teamSelection"));
            configuraBotoesTimes();
        }
    }
});

const checkLoginStatus = () => {
    if (sessionStorage.getItem('login')) {
        document.getElementById("botaoLogin").style.display = "none";
        document.getElementById("senha").style.display = "none";
        document.getElementById("mostraSenha").style.display = "none";
        document.getElementById("card-login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        loginValido();
    }
}

document.addEventListener('DOMContentLoaded', checkLoginStatus);