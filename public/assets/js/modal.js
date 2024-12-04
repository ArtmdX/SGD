// Capturando o modal
var modal = document.getElementById("myModal");

// Capturando o botão de abrir o modal
var btn = document.getElementById("botaoAdd");

// Capturando o X que fecha o modal
var span = document.getElementsByClassName("close-modal")[0];

//capturando botão de voltar
var closebtn = document.getElementsByClassName("closebtn")[0];

// Configurando o botão cadastrar para abrir o modal
btn.onclick = function () {
  modal.style.display = "block";
};

closebtn.onclick = function () {
  modal.style.display = "none";
};

// Configurando o <span> X para fechar o modal
span.onclick = function () {
  modal.style.display = "none";
};

// Configurando para que o modal feche caso o usuario clique em algum lugar da tela
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
