
function adicionarAoCarrinho(nome, preco) {

    var carrinho = [];

    if (sessionStorage.getItem('carrinho')) { //O sessionStorage objeto permite armazenar pares chave/valor no navegador.

        carrinho = JSON.parse(sessionStorage.getItem('carrinho')); //JSON.parse() para converter texto em um objeto JavaScript

    }

    carrinho.push({ nome, preco });

    sessionStorage.setItem('carrinho', JSON.stringify(carrinho)); //JSON.stringify() para convertê-lo em uma string.

    atualizarCarrinho();

}

function calcularTotal(carrinho) {

    var total = 0;

    carrinho.forEach(item => {

        total = total + parseFloat(item.preco);

    });

    return total.toFixed(2); // Arredonda para duas casas decimais

}

function atualizarCarrinho() {

    var carrinho;

    if (sessionStorage.getItem('carrinho')) {

        carrinho = JSON.parse(sessionStorage.getItem('carrinho'));

    } else {

        carrinho = [];

    }

    var listaCarrinho = document.getElementById('lista-carrinho');
    
    var totalCarrinho = document.getElementById('total-carrinho');

    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => { //O forEach()método chama uma função (uma função de retorno de chamada) uma vez para cada elemento do array.

        var li = document.createElement('li');

        li.textContent = item.nome + ' - R$ ' + item.preco;

        listaCarrinho.appendChild(li);

    });

    totalCarrinho.textContent = `Total: R$ ${calcularTotal(carrinho)}`;
}

document.addEventListener('DOMContentLoaded', function() { ////O addEventListener() método anexa um manipulador de eventos a um elemento.

    var carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || []; 

    if (carrinho.length > 0) { //A length propriedade retorna o comprimento de uma string.

        atualizarCarrinho();
        
    }
});

document.querySelectorAll('.adicionar-carrinho').forEach(btn => { //O querySelectorAll() método retorna todos os elementos que correspondem a um(s) seletor(es) CSS.

    btn.addEventListener('click', function () { 

        var nome = this.getAttribute('data-nome'); //this palavra-chave refere-se a um objeto 

        var preco = this.getAttribute('data-preco'); //O getAttribute() método retorna o valor do atributo de um elemento.

        adicionarAoCarrinho(nome, preco);

    });
});
