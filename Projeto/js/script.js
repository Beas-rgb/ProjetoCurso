let xhttp = new XMLHttpRequest();

function buscarProduto(){
  xhttp.open("GET","https://pascoa-chiquinha.herokuapp.com/produto/");
  xhttp.send();
  xhttp.onload = function(){
    let lsProduto = this.response;
    lsProduto = JSON.parse(lsProduto);
    montarListaProdutosHtml(lsProduto);
    
  }
}

function montarListaProdutosHtml(lsProduto){
  let listaProduto = "";
  for (produto of lsProduto) {
    listaProduto += `
    <div class="ls-produto">
    <div class="produto">
       <img src="https://img.elo7.com.br/product/original/17B1547/camisa-sublimacao-poliester.jpg" alt="">
       <p class="nome">${produto.nome}</p>
       <p class="descricao">Descrição</p>
       <p class="valor">R$: 100 <span class="btadd"><i class="material-icons">&#xe8cc;</i></span></p></span></p>
    </div> 
   </div>`;
  }
  document.getElementById("listaProduto").innerHTML = listaProduto;
}
buscarProduto();