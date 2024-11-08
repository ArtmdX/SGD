async function carregarFuncionarios() {
    const response = await fetch('/sqlfuncionarios'); // Ajuste a URL conforme necessário
    const funcionarios = await response.json();
    const table = $('#tableFuncioanarios').DataTable();
    table.clear(); // Limpa a tabela existente

    funcionarios.forEach(funcionario => {
        table.row.add([
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
async function carregarClientes() {
    const response = await fetch('/sqlCliente');
    const clientes = await response.json()

    const table = $('#tableClientes').DataTable();
    table.clear();

    clientes.forEach(cliente => {
        table.row.add([
            cliente.nome,
            cliente.cpf_cnpj,
            cliente.telefone,
            cliente.endereco,
            cliente.email,
            `<a href="#"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
             <a href="#"><i class="fa-solid fa-trash iconeTrash"></i></a>`
        ])
    })
    table.draw()
}

async function carregarEstoque(){
    const response = await fetch('/sqlProduto');
    const produtos = await response.json();
    const table = $('#tableEstoque').DataTable();
    table.clear();

    produtos.forEach(produto => {
        table.row.add([
            produto.nome,
            produto.qtd_estoque,
            produto.un_medida,
            produto.dt_entrada,
            produto.dt_validade,
            `<a href="#"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> 
             <a href="#"><i class="fa-solid fa-trash iconeTrash"></i></a>`
        ])
    })
    table.draw()
}
