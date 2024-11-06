async function carregarFuncionarios() {
    const response = await fetch('/sqlfuncionarios'); // Ajuste a URL conforme necessário
    const funcionarios = await response.json();

    const table = $('#tableFuncioanarios').DataTable();
    table.clear(); // Limpa a tabela existente

    funcionarios.forEach(funcionario => {
        table.row.add([
            `<strong>${funcionario.id_funcionario}</strong>`,
            funcionario.cpf,
            funcionario.nome,
            funcionario.endereco,
            funcionario.telefone,
            funcionario.email,
            `<a href="#"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
             <a href="#"><i class="fa-solid fa-trash iconeTrash"></i></a>`
        ]);
    });

    table.draw(); // Atualiza a tabela com os novos dados
}

async function carregarVeiculos() {
    const response = await fetch('/sqlVeiculo');
    const veiculos = await response.json()

    const table = $('#tableVeiculos').DataTable();
    table.clear();

    veiculos.forEach(veiculo => {
        table.row.add([
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            `<span data-veiculo-id="${veiculo.id_veiculo}">${veiculo.placa}</span>`,
            `<a href="#"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
             <a href="#"><i class="fa-solid fa-trash iconeTrash"></i></a>`
        ])
    })
    table.draw()
}


