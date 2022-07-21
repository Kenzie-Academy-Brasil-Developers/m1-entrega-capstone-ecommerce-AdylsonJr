let vitrine = document.querySelector(".vitrine")
let listaVitrine = document.createElement("ul")

listaVitrine.classList.add("listaVitrine")

vitrine.appendChild(listaVitrine)

function criarCardVitrine(lista){


    let cardVitrine = document.createElement("li")
    let boxImg = document.createElement("div")
    let imagem = document.createElement("img")
    let categoria = document.createElement("a")
    let nome = document.createElement("h3")
    let descricao = document.createElement("p")
    let preco = document.createElement("strong")
    let boxBtn = document.createElement("span")
    let btnAdicionar = document.createElement("button")

    boxImg.classList.add("imgCard")
    boxBtn.classList.add("btnCarrinho")

    imagem.src = lista.img
    imagem.alt = lista.nameItem
    categoria.innerText = lista.tag
    nome.innerText = lista.nameItem
    descricao.innerText = lista.description
    preco.innerText = `R$${lista.value},00`
    btnAdicionar.id = lista.id
    btnAdicionar.innerText = "Adicionar ao carrinho"

    listaVitrine.appendChild(cardVitrine)
    cardVitrine.appendChild(boxImg)
    boxImg.appendChild(imagem)
    cardVitrine.appendChild(categoria)
    cardVitrine.appendChild(nome)
    cardVitrine.appendChild(descricao)
    cardVitrine.appendChild(preco)
    cardVitrine.appendChild(boxBtn)
    boxBtn.appendChild(btnAdicionar)
}

function listarCardVitrine (produto){
    listaVitrine.innerHTML = ""
    for (let i = 0; i < produto.length; i++){
        let itemVitrine = produto[i]
        criarCardVitrine (itemVitrine)
    }
}

listarCardVitrine(data)

let inputBusca = document.querySelector(".campoBusca input")
let btnBusca = document.querySelector(".campoBusca button")

btnBusca.addEventListener("click", function(){

    let inputUsuario = inputBusca.value
    let resultadoDaBusca = busca(inputUsuario.toLowerCase().trim())
    
    inputBusca.value = ""
    
    if(resultadoDaBusca != []){
        
    listarCardVitrine(resultadoDaBusca)
    }
    
})

function busca (valorPesquisa){

    let resultBusca = []

    for (let i = 0; i < data.length; i++){

        if(valorPesquisa == data[i].nameItem.toLowerCase().trim()){
            resultBusca.push(data[i])
        }
        if(valorPesquisa == ""){
            resultBusca.push(data[i])
        }
    }

    return resultBusca
    
}

let carrinho = document.querySelector(".carrinhoDeCompras")
let tituloCarrinho = document.createElement("h1")
let listaCarrinho = document.createElement("ul")

tituloCarrinho.innerText = "Carrinho de Compras"

carrinho.appendChild(tituloCarrinho)
carrinho.appendChild(listaCarrinho)

function criarCardCarrinho(lista){

    let cardCarrinho = document.createElement("li")
    let imagemCarrinho = document.createElement("img")
    let boxCarrinho = document.createElement("div")
    let tituloListaCarrinho = document.createElement("h3")
    let precoCarrinho = document.createElement("p")
    let btnRemover = document.createElement("button")

    imagemCarrinho.src = lista.img
    imagemCarrinho.alt = lista.nameItem
    tituloListaCarrinho.innerText = lista.nameItem
    precoCarrinho.innerText = `R$${lista.value},00`
    btnRemover.id = lista.id
    btnRemover.innerText = "Remover Produto"

    listaCarrinho.appendChild(cardCarrinho)
    cardCarrinho.appendChild(imagemCarrinho)
    cardCarrinho.appendChild(boxCarrinho)
    boxCarrinho.appendChild(tituloListaCarrinho)
    boxCarrinho.appendChild(precoCarrinho)
    boxCarrinho.appendChild(btnRemover)
}

function listarCardCarrinho (produto){
    listaCarrinho.innerHTML = ""
    for (let i = 0; i < produto.length; i++){
        let itemCarrinho = produto[i]
        criarCardCarrinho (itemCarrinho)
    }
}

let boxQuantidade = document.createElement("div")
let quantidade = document.createElement("h3")
let quantidadeValor = document.createElement("p")
let boxTotal = document.createElement("div")
let total = document.createElement("h3")
let totalValor = document.createElement("p")

boxQuantidade.classList.add("carrinhoQuantidade")
quantidade.innerText = "Quantidade"
boxTotal.classList.add("carrinhoTotal")
total.innerText = "Total"

carrinho.appendChild(boxQuantidade)
boxQuantidade.appendChild(quantidade)
boxQuantidade.appendChild(quantidadeValor)
carrinho.appendChild(boxTotal)
boxTotal.appendChild(total)
boxTotal.appendChild(totalValor)

listaVitrine.addEventListener("click", intercptandoItemVitrine)

let carrinhoCompras = []

quantidadeValor.innerText = carrinhoCompras.length

function intercptandoItemVitrine (event){
    let btnAddCarrinho = event.target
    let idProduto = btnAddCarrinho.id
    let produto = data.find(function(produto){
        if (produto.id == idProduto){
            return produto
        }
    })
    
    adicionarCarrinho(produto) 
}

function adicionarCarrinho(produto){
    if(produto !== undefined){
        carrinhoCompras.push(produto)

        listarCardCarrinho(carrinhoCompras)
    }
    quantidadeValor.innerText = carrinhoCompras.length
    totalValor.innerText = `R$${carrinhoCompras.reduce((preVal, elem) => preVal + elem.value, 0)},00`
}

listaCarrinho.addEventListener("click", intercptandoItemCarrinho)

function intercptandoItemCarrinho (event){
    let btnRemover = event.target
    let idProduto = btnRemover.id
    let produto = data.find(function(produto){
        if (produto.id == idProduto){
            return produto
        }
    })
    
    removerCarrinho(produto) 
}

function removerCarrinho(produto){
    if(produto !== undefined){
        carrinhoCompras.splice(produto, 1)
        listarCardCarrinho(carrinhoCompras)
    }
    quantidadeValor.innerText = carrinhoCompras.length
    totalValor.innerText = `R$${carrinhoCompras.reduce((preVal, elem) => preVal - elem.value, 0) * (-1)},00`
} 
