async function carregarFuncionarios() {
  const response = await fetch("/sqlfuncionarios");
  const funcionarios = await response.json();
  const table = $("#tableFuncioanarios").DataTable();
  table.clear();

  funcionarios.forEach((funcionario) => {
    table.row.add([
      funcionario.cpf,
      funcionario.nome,
      funcionario.endereco,
      funcionario.telefone,
      funcionario.email,
      `<a href='#' class="edit-btn" data-id="${funcionario.id_funcionario}"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
       <a href="#" class="delete-btn" data-id="${funcionario.id_funcionario}"><i class="fa-solid fa-trash iconeTrash"></i></a>`,
    ]);
  });

  table.draw(); 
}


$(document).on("click", ".delete-btn", async function (e) {
  e.preventDefault();
  const id_funcionario = $(this).data("id");

  if (confirm("Tem certeza de que deseja excluir este funcionário?")) {
    try {
      const response = await fetch(`/sqlfuncionarios/${id_funcionario}`, { method: "DELETE" });
      if (response.ok) {
        alert("Funcionário excluído com sucesso!");
        carregarFuncionarios();
      } else {
        alert("Erro ao excluir o funcionario.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir o funcionário");
    }
  }
});


async function abrirModalEdicao(button) {
  const idFuncionario = button.getAttribute('data-id'); 

  try {

    const response = await fetch(`/sqlfuncionarios/${idFuncionario}`);
    const funcionario = await response.json();

    document.getElementById('editNome').value = funcionario.nome;
    document.getElementById('editEndereco').value = funcionario.endereco;
    document.getElementById('editCpf').value = funcionario.cpf;
    document.getElementById('editTelefone').value = funcionario.telefone;
    document.getElementById('editEmail').value = funcionario.email;


    document.getElementById('salvarEdicaoBtn').setAttribute('data-id', idFuncionario);


    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    alert('Erro ao carregar os dados do funcionário.');
  }
}


async function salvarEdicao(button) {
  const idFuncionario = button.getAttribute('data-id'); // Obtém o ID salvo
  const data = {
    nome: document.getElementById('editNome').value,
    endereco: document.getElementById('editEndereco').value,
    cpf: document.getElementById('editCpf').value,
    telefone: document.getElementById('editTelefone').value,
    email: document.getElementById('editEmail').value,
  };

  try {

    const response = await fetch(`/sqlfuncionarios/${idFuncionario}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Funcionário atualizado com sucesso!');
      document.getElementById('editModal').style.display = 'none';
      carregarFuncionarios(); // Recarrega a tabela
    } else {
      alert('Erro ao atualizar o funcionário.');
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

