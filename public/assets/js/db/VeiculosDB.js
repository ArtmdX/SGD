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
      `<a href="#" class="edit-btn" data-id="${veiculo.id_veiculo}" onclick="abrirModalEdicao(this, 'veiculo')"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
       <a href="#" class="delete-btn" data-id="${veiculo.id_veiculo}><i class="fa-solid fa-trash iconeTrash"></i></a>`,
    ]);
  });
  table.draw();
}
