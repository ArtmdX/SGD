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
      `<a href="#" class="edit-btn" data-id="${cliente.id_cliente}" onclick="abrirModalEdicao(this, 'cliente')"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
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