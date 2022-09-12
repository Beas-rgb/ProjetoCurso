let xhttp = new XMLHttpRequest();
let lsProduto = [];

function buscarProduto(){
  xhttp.open("GET","https://api-loja-de-camiseta.herokuapp.com/produto/");
  xhttp.send();
  xhttp.onload = function(){
    lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    montarListaProdutosHtml(lsProduto);
    marcarProdutosSelecionadosLocalStorage();
    
  }
}



function montarListaProdutosHtml(lsProduto){
  let listaProduto = "";
  let i = 0;
  for (produto of lsProduto) {
    listaProduto += `
    <div class="ls-produto">
    <div class="produto">
       <img src="${produto.imagem}" alt="">
       <p class="nome">${produto.nome}</p>
       <p class="valor">R$: ${produto.valor.toFixed(2)} <span class="btadd"><i class="material-icons" onclick="addProdutoCarrinho(${i})">&#xe8cc;</i></span></p></span></p>
    </div> 
   </div>`;
   i++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
  document.getElementById("listaProduto").style.display = '';
}

function marcarProdutosSelecionadosLocalStorage(){
  let lista = localStorage.getItem("listaProdutoLocalStorage");
  lista = JSON.parse(lista);
  for (i in lista) {
      if(lista[i].carrinho){
          addProdutoCarrinho(i);
      }
  }
}

function addProdutoCarrinho(i){
  let produto = lsProduto[i];
  if(produto.carrinho == undefined || produto.carrinho == false){
  produto.carrinho = true;
  document.getElementsByClassName("material-icons")[i].style.color = "#e66b6b";
  }else{
    produto.carrinho = false;
    document.getElementsByClassName("material-icons")[i].style.color = "#0000007d";
  }
  localStorage.setItem("listaProdutoLocalStorage",JSON.stringify(lsProduto));
}

let verCarrinho = false;

function verListaProdutoSelecionado(){
  if(verCarrinho){
    buscarProduto();
    verCarrinho = false;
  }else{
    verCarrinho = true;
  }
  let listaProduto = "";
  document.getElementById("listaProduto").innerHTML = "";
  let i = 0;
  let j = 0;
  for (produto of lsProduto) {
    if(produto.carrinho){
      produto.quantidade = 1;
      listaProduto += `
    <div class="ls-produto">
    <div class="produto">
       <img src="${produto.imagem} alt="">
       <p class="nome">${produto.nome}</p>
       <p class="valor">R$: ${produto.valor.toFixed(2)} 
       </p>

       <span class="btMaisMenos">
         <span class="btMais" onclick="add(1,${i},${j})">+</span>
          <span class="btMenos" onclick="add(-1,${i},${j})">-</span>
       </span>

         <span class="quantidade">${produto.quantidade}</span>

    </div> 
   </div>`;
   i++;
  }
  j++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
  document.getElementById("formulario").style.display = "grid";
}

function add(qt, i, j){
  lsProduto[j].quantidade += qt;
  if(lsProduto[j].quantidade == 0){
    lsProduto[j].quantidade = 1;
    return;
  }
  document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}

function enviarPedido(){
  let pedido = '';
  let total = 0;
  for (produto of lsProduto) {
    if(produto.carrinho){
      let subtotal = produto.quantidade * produto.valor;
      pedido += `${produto.nome} ${produto.quantidade} x ${produto.valor} = ${subtotal}`;
      total += subtotal;
    }
  }
  let nome = document.getElementById('nome').value;
  let endereco = document.getElementById('endereco').value;
  let msg = `Olá gostaria de fazer o seguinte pedido:\n ${pedido} \nTotal: ${total} \nNome: ${nome} \nEndereço:${endereco}`;
  msg = encodeURI(msg);
  let fone = '5561985314554';
  link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
  window.open(link, '_blank');

}

buscarProduto();