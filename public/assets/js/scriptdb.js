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

// Inicializa o DataTables quando o documento estiver pronto
$(document).ready(function() {
    $('#tableFuncioanarios').DataTable();
    carregarFuncionarios(); // Chama a função para carregar os dados
});



