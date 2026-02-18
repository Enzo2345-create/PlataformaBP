const posts = [
    {
        titulo: "A influência africana na cultura brasileira",
        conteudo: "A música, culinária e religião brasileira possuem fortes raízes africanas.",
        categoria: "afro",
        curtidas: 0
    },
    {
        titulo: "Diversidade cultural e desenvolvimento cognitivo",
        conteudo: "Ambientes culturalmente diversos estimulam maior flexibilidade cognitiva.",
        categoria: "dados",
        curtidas: 0
    },
    {
        titulo: "Povos indígenas e preservação ambiental",
        conteudo: "As comunidades indígenas desempenham papel fundamental na proteção da biodiversidade.",
        categoria: "indigena",
        curtidas: 0
    },
    {
        titulo: "Imigração e formação da identidade brasileira",
        conteudo: "Italianos, japoneses, árabes e outros povos contribuíram para nossa cultura.",
        categoria: "imigracao",
        curtidas: 0
    }
];

function renderPosts(lista) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    lista.forEach((post, index) => {
        feed.innerHTML += `
            <div class="post">
                <h3>${post.titulo}</h3>
                <p>${post.conteudo}</p>
                <button onclick="curtirPost(${index})">
                    ❤️ Curtir (${post.curtidas})
                </button>
            </div>
        `;
    });
}

function curtirPost(index) {
    posts[index].curtidas++;
    renderPosts(posts);
}

function filtrarPosts(categoria) {
    if (categoria === "todos") {
        renderPosts(posts);
    } else {
        const filtrados = posts.filter(post => post.categoria === categoria);
        renderPosts(filtrados);
    }
}

function pesquisarPost() {
    const termo = document.getElementById("searchInput").value.toLowerCase();

    const filtrados = posts.filter(post =>
        post.titulo.toLowerCase().includes(termo) ||
        post.conteudo.toLowerCase().includes(termo)
    );

    renderPosts(filtrados);
}

window.onload = () => {
    renderPosts(posts);
};
