const params = new URLSearchParams(window.location.search);

const id = parseInt(params.get("id"));
const idLimite = parseInt(sessionStorage.getItem("idLimite"));

const container = document.getElementById("container");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const verificaId = () => {
    if (id > idLimite || id < 1) {
        return true;
    } else {
        return false;
    }
}

const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

const dadosSessionStorage = sessionStorage.getItem('dados');

const montaPagina = async (dados) => {
    if (sessionStorage.getItem('login')) {
        if (verificaId()) {
            document.body.innerHTML = '<h1 class="semPermissao">ID não encontrado</h1>';
        } else {
            const container = document.getElementById('container');
            container.innerHTML = '';

            const nome = document.createElement('h1');
            nome.innerHTML = dados.nome;
            nome.className = 'nome-content';
            nome.style.fontFamily = 'Arial, sans-serif';
            nome.style.fontSize = '24px'; // Change the font size
            container.appendChild(nome);

            const card = document.createElement('div');
            card.className = 'card';
            container.appendChild(card);

            const infoContainer = document.createElement('div');
            infoContainer.className = 'info-container';
            card.appendChild(infoContainer);

            const imagem = document.createElement('img');
            imagem.alt = 'imagem do atleta';
            imagem.src = dados.imagem;
            imagem.className = 'imagem';
            infoContainer.appendChild(imagem);

            const descricao = document.createElement('p');
            descricao.innerHTML = dados.detalhes;
            descricao.className = 'content-descricao';
            infoContainer.appendChild(descricao);

            const statsContainer = document.createElement('div');
            statsContainer.className = 'stats-container';
            card.appendChild(statsContainer);

            const nJogos = document.createElement('p');
            nJogos.innerText = `Número de jogos: ${dados.n_jogos}`;
            nJogos.className = 'stats';
            statsContainer.appendChild(nJogos);

            const elenco = document.createElement('p');
            elenco.innerText = `Elenco: ${dados.elenco}`;
            elenco.className = 'stats';
            statsContainer.appendChild(elenco);

            const noTimeDesde = document.createElement('p');
            noTimeDesde.innerText = `No time desde: ${dados.no_botafogo_desde}`;
            noTimeDesde.className = 'stats';
            statsContainer.appendChild(noTimeDesde);

            const posicao = document.createElement('p');
            posicao.innerText = `Posição: ${dados.posicao}`;
            posicao.className = 'stats';
            statsContainer.appendChild(posicao);

            const naturalidade = document.createElement('p');
            naturalidade.innerText = `Naturalidade: ${dados.naturalidade}`;
            naturalidade.className = 'stats';
            statsContainer.appendChild(naturalidade);

            const nascimento = document.createElement('p');
            nascimento.innerText = `Nascimento: ${dados.nascimento}`;
            nascimento.className = 'stats';
            statsContainer.appendChild(nascimento);

            const altura = document.createElement('p');
            altura.innerText = `Altura: ${dados.altura}`;
            altura.className = 'stats';
            statsContainer.appendChild(altura);

            const botao = document.createElement('button');
            botao.className = 'botao-voltar content';
            botao.innerText = 'Voltar';
            botao.onclick = () => {
                window.location.href = 'index.html';
            }
            container.appendChild(botao);
        }
    } else {
        document.body.innerHTML = '<h1 class="semPermissao">Você precisa estar logado para ter acesso</h1>';
    }
}

pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    (r) => montaPagina(r)
);


