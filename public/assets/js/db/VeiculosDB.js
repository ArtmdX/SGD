async function carregarVeiculos() {
  const response = await fetch("/sqlVeiculo");
  const veiculos = await response.json();

  const table = $("#tableVeiculos").DataTable();
  table.clear();

  veiculos.forEach((veiculo) => {
    table.row.add([
      veiculo.marca,
      veiculo.modelo,
      veiculo.ano,
      veiculo.placa,
      `<a href="#" class="edit-btn" data-id="${veiculo.id_veiculo}"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
       <a href="#" class="delete-btn" data-id="${veiculo.id_veiculo}"><i class="fa-solid fa-trash iconeTrash"></i></a>`,
    ]);
  });
  table.draw();
}


$(document).on("click", ".delete-btn", async function (e) {
  e.preventDefault();
  const id_veiculo = $(this).data("id");

  if (confirm("Tem certeza de que deseja excluir este veiculo?")) {
    try {
      const response = await fetch(`/sqlVeiculo/${id_veiculo}`, { method: "DELETE" });
      if (response.ok) {
        alert("Veiculo excluído com sucesso!");
        carregarVeiculos();
      } else {
        alert("Erro ao excluir o veiculo.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir o veiculo.");
    }
  }
});



async function abrirModalEdicao(button) {
  const id_veiculo = button.getAttribute('data-id'); 

  try {

    const response = await fetch(`/sqlVeiculo/${id_veiculo}`);
    const veiculo = await response.json();
    console.log(veiculo)

    document.getElementById('editMarca').value = veiculo.marca;
    document.getElementById('editModelo').value = veiculo.modelo;
    document.getElementById('editAno').value = veiculo.ano;
    document.getElementById('editPlaca').value = veiculo.placa;

    document.getElementById('salvarEdicaoBtn').setAttribute('data-id', id_veiculo);


    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    alert('Erro ao carregar os dados do veiculo.');
  }
}


async function salvarEdicao(button) {
  const id_veiculo = button.getAttribute('data-id'); // Obtém o ID salvo
  const data = {
    marca: document.getElementById('editMarca').value,
    modelo: document.getElementById('editModelo').value,
    ano: document.getElementById('editAno').value,
    placa: document.getElementById('editPlaca').value,
  };

  try {

    const response = await fetch(`/sqlVeiculo/${id_veiculo}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Veiculo atualizado com sucesso!');
      document.getElementById('editModal').style.display = 'none';
      carregarVeiculos(); // Recarrega a tabela
    } else {
      alert('Erro ao atualizar o veiculo.');
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
