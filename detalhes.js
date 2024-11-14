const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const idLimite = parseInt(sessionStorage.getItem("idLimite"));
const container = document.getElementById("container");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    return await resposta.json();
}

const verificaId = () => id > idLimite || id < 1;

const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

const montaPagina = async (dados) => {
    if (!sessionStorage.getItem('login')) {
        document.body.innerHTML = '<h1 class="semPermissao">Você precisa estar logado para ter acesso</h1>';
        return;
    }

    if (verificaId()) {
        document.body.innerHTML = '<h1 class="semPermissao">ID não encontrado</h1>';
        return;
    }

    container.innerHTML = '';

    const createAndAppend = (tag, parent, className, innerHTML) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        parent.appendChild(element);
        return element;
    }

    const nome = createAndAppend('h1', container, 'nome-content', dados.nome);
    nome.style.fontFamily = "font-family: Verdana, Geneva, Tahoma, sans-serif";
    nome.style.fontSize = '24px';

    const card = createAndAppend('div', container, 'card');
    const infoContainer = createAndAppend('div', card, 'info-container');
    const imagem = createAndAppend('img', infoContainer, 'imagem');
    imagem.alt = 'imagem do atleta';
    imagem.src = dados.imagem;

    createAndAppend('p', infoContainer, 'content-descricao', dados.detalhes);

    const statsContainer = createAndAppend('div', card, 'stats-container');
    const stats = [
        `Número de jogos: ${dados.n_jogos}`,
        `Elenco: ${dados.elenco}`,
        `No time desde: ${dados.no_botafogo_desde}`,
        `Posição: ${dados.posicao}`,
        `Naturalidade: ${dados.naturalidade}`,
        `Nascimento: ${dados.nascimento}`,
        `Altura: ${dados.altura}`
    ];

    stats.forEach(stat => createAndAppend('p', statsContainer, 'stats', stat));

    const botao = createAndAppend('button', container, 'botao-voltar content', 'Voltar');
    botao.onclick = () => window.location.href = 'index.html';
}

pega_json(`${urlBase}${id}`).then(montaPagina);


