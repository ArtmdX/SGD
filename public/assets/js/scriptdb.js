const models = require('../../../Models/models')

// Função para carregar funcionários
async function carregarFuncionarios() {
    const response = await fetch('/sqlfuncionarios'); // Ajuste a URL conforme necessário
    const funcionarios = await response.json();

    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = ''; 

    funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${funcionario.id_funcionario}</strong></td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.telefone}</td>
            <td>${funcionario.endereco}</td>
            <td>${funcionario.email}</td>
            <td><a href="#"><i class="fa-solid fa-pen-to-square iconeEdit"></i></a> <a href="#"><i class="fa-solid fa-trash iconeTrash"></i></a></td>
        `;
        tabela.appendChild(tr);
    });
}

async function cadastrarFuncionarios(event) {

    const id = document.getElementById('id').value;
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;

    const funcionario = new models.Funcionario(id, cpf, nome, telefone, endereco, email);


    document.getElementById('formFuncionario').submit(); 

    return true; 
}






