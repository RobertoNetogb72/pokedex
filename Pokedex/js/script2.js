$(document).ready(function () {
    // Função para carregar exemplos de Pokémon na tela inicial
    async function CarregarPokemons() {
        const pokemons = $("#pokemons");
 
          // Lista de IDs dos primeiros 150 Pokémon em ordem crescente
          const pokemonsinicial = Array.from({ length: 150 }, (_, i) => i + 1);
 
        for (let i = 0; i < pokemonsinicial.length; i++) {
            const pokemonId = pokemonsinicial[i];
 
            try {
                // Fazer uma requisição à API PokeAPI para obter informações do Pokémon
                const response = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const item = response;
 
                const name = item.name;
                const id = item.id;
                const type = item.types[0].type.name;
                const imageUrl = item.sprites.front_default;
 
                // Verificar se o Pokémon já foi adicionado para evitar duplicação
                if (!$(`#pokemons div:contains(${name})`).length) {
                    // Criar um item de lista com informações do Pokémon (apenas nome e imagem)
                    const example = `
                        <div class="poke">
                            <h3>${name}</h3>
                            <p>ID: ${id}</p>
                            <p>Type: ${type}</p>
                           
                            <img src="${imageUrl}" alt="${name}">
                        </div>
                    `;
 
                    // Adicionar exemplos à primeira linha
                    pokemons.append(example);
 
                    // Adicionar evento de clique para exibir mais detalhes
                    $(example).click(function () {
                        displayPokemonDetails(item);
                    });
                }
            } catch (error) {
                console.error("Erro na requisição à API: " + error);
            }
        }
    }
 
    CarregarPokemons();
 

    // Função para pesquisar um Pokémon
    function ProcurarPoke(procurar) {
        // Limpar informações anteriores
        $("#pokemonInfo").empty();
 
        // Ocultar exemplos iniciais
        $("#pokedex").hide();
 
        // Remover os exemplos iniciais do DOM
        $(".listapoke").remove();
 
        // Fazer uma requisição à API PokeAPI
        $.get(`https://pokeapi.co/api/v2/pokemon/${procurar.toLowerCase()}`)
            .done(function (item) {
                displayPokemonDetails(item);
            })
            .fail(function (error) {
                // Exibir mensagem de erro
                const mensageErro = "<p class='mensageErro'>Este Pokémon não existe.</p>";
                $("#pokemonInfo").html(mensageErro);
            });
    }
 
    $("#searchButton").click(function () {
        const procurar = $("#input").val();
        ProcurarPoke(procurar);
    });
 
    $("#input").keypress(function (e) {
        if (e.key === "Enter") {
            const procurar = $("#input").val();
            ProcurarPoke(procurar);
        }
    });
});