async function carregarEstoque() {
  const response = await fetch("/sqlProduto");
  const produtos = await response.json();
  const table = $("#tableEstoque").DataTable();
  table.clear();

  produtos.forEach((produto) => {
    table.row.add([
      produto.nome,
      produto.qtd_estoque,
      produto.un_medida,
      `<a href="#" class="edit-btn" data-id="${produto.id_produto}"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
       <a href="#" class="delete-btn" data-id="${produto.id_produto}"><i class="fa-solid fa-trash iconeTrash"></i></a>`,
    ]);
  });
  table.draw();
}

$(document).on("click", ".delete-btn", async function (e) {
  e.preventDefault();
  const id_produto = $(this).data("id");

  if (confirm("Tem certeza de que deseja excluir este produto?")) {
    try {
      const response = await fetch(`/sqlProduto/${id_produto}`, { method: "DELETE" });
      if (response.ok) {
        alert("produto excluído com sucesso!");
        carregarEstoque();
      } else {
        alert("Erro ao excluir o produto.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir o produto.");
    }
  }
});



async function abrirModalEdicao(button) {
  const id_produto = button.getAttribute('data-id'); 

  try {

    const response = await fetch(`/sqlProduto/${id_produto}`);
    const produto = await response.json();

    document.getElementById('editNome').value = produto.nome;
    document.getElementById('editUnMedida').value = produto.un_medida;
    document.getElementById('editQtdEstoque').value = produto.qtd_estoque;

    document.getElementById('salvarEdicaoBtn').setAttribute('data-id', id_produto);


    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    alert('Erro ao carregar os dados do produto.');
  }
}


async function salvarEdicao(button) {
  const id_produto = button.getAttribute('data-id'); // Obtém o ID salvo
  const data = {
    nome: document.getElementById('editNome').value,
    un_medida: document.getElementById('editUnMedida').value,
    qtd_estoque: document.getElementById('editQtdEstoque').value,
  };

  try {

    const response = await fetch(`/sqlProduto/${id_produto}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
      document.getElementById('editModal').style.display = 'none';
      carregarEstoque(); // Recarrega a tabela
    } else {
      alert('Erro ao atualizar o produto.');
    }
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    alert('Erro ao salvar as alterações.');
  }
}


document.addEventListener('click', (event) => {
  if (event.target.closest('.edit-btn')) {
    event.preventDefault();
    abrirModalEdicao(event.target.closest('.edit-btn'));
  }
});

document.getElementById('salvarEdicaoBtn').addEventListener('click', function () {
  salvarEdicao(this);
});


document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
  });
});
