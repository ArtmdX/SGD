async function carregarClientes() {
  const response = await fetch("/sqlCliente");
  const clientes = await response.json();

  const table = $("#tableClientes").DataTable();
  table.clear();

  clientes.forEach((cliente) => {
    table.row.add([
      cliente.nome,
      cliente.cpf_cnpj,
      cliente.telefone,
      cliente.endereco,
      cliente.email,
      `<a href="#" class="edit-btn" data-id="${cliente.id_cliente}"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
       <a href="#" class="delete-btn" data-id="${cliente.id_cliente}"><i class="fa-solid fa-trash iconeTrash"></i></a>`,
    ]);
  });
  table.draw();
}

$(document).on("click", ".delete-btn", async function (e) {
  e.preventDefault();
  const id_cliente = $(this).data("id");

  if (confirm("Tem certeza de que deseja excluir este cliente?")) {
    try {
      const response = await fetch(`/sqlcliente/${id_cliente}`, { method: "DELETE" });
      if (response.ok) {
        alert("Cliente excluído com sucesso!");
        carregarClientes();
      } else {
        alert("Erro ao excluir o cliente.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir o cliente.");
    }
  }
});




async function abrirModalEdicao(button) {
  const id_cliente = button.getAttribute('data-id'); 

  try {

    const response = await fetch(`/sqlcliente/${id_cliente}`);
    const cliente = await response.json();

    document.getElementById('editNome').value = cliente.nome;
    document.getElementById('editCpfCnpj').value = cliente.cpf_cnpj;
    document.getElementById('editTelefone').value = cliente.telefone;
    document.getElementById('editEmail').value = cliente.email;
    document.getElementById('editEndereco').value = cliente.endereco;

    document.getElementById('salvarEdicaoBtn').setAttribute('data-id', id_cliente);


    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    alert('Erro ao carregar os dados do cliente.');
  }
}


async function salvarEdicao(button) {
  const id_cliente = button.getAttribute('data-id'); // Obtém o ID salvo
  const data = {
    nome: document.getElementById('editNome').value,
    cpf_cnpj: document.getElementById('editCpfCnpj').value,
    telefone: document.getElementById('editTelefone').value,
    endereco: document.getElementById('editEndereco').value,
    email: document.getElementById('editEmail').value,
  };

  try {

    const response = await fetch(`/sqlcliente/${id_cliente}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Cliente atualizado com sucesso!');
      document.getElementById('editModal').style.display = 'none';
      carregarClientes(); // Recarrega a tabela
    } else {
      alert('Erro ao atualizar o cliente.');
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
