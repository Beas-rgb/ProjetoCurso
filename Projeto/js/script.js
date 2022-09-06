let xhttp = new XMLHttpRequest();
let lsProduto = [];

function buscarProduto(){
  xhttp.open("GET","https://pascoa-chiquinha.herokuapp.com/produto/");
  xhttp.send();
  xhttp.onload = function(){
    lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    montarListaProdutosHtml(lsProduto);
    
  }
}

function montarListaProdutosHtml(lsProduto){
  let listaProduto = "";
  let i = 0;
  for (produto of lsProduto) {
    listaProduto += `
    <div class="ls-produto">
    <div class="produto">
       <img src="${produto.imagem} alt="">
       <p class="nome">${produto.nome}</p>
       <p class="descricao">${produto.descricao}</p>
       <p class="valor">R$: ${produto.valor.toFixed(2)} <span class="btadd"><i class="material-icons" onclick="addProdutoCarrinho(${i})">&#xe8cc;</i></span></p></span></p>
    </div> 
   </div>`;
   i++;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
  document.getElementById("listaProduto").style.display = '';
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

}

buscarProduto();