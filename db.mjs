import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config()

export const client = mysql.createPool(process.env.CONNECTION_STRING)

/********************FUNCIONARIO********************/
//Seleciona todos os funcionarios
export async function selectFuncionarios(){
    const results = await client.query("SELECT * FROM tb_funcionario;");
    return results[0];
}

//Inserir funcionario por ID
export async function insertFuncionario(Funcionario){
    const values = [Funcionario.cpf, Funcionario.nome, Funcionario.telefone, Funcionario.endereco, Funcionario.email]
    await client.query("INSERT INTO tb_funcionario(cpf, nome, telefone, endereco, email) VALUES (?,?,?,?,?)", values)
}

//Selecionar funcionario por ID
export async function selectFuncionario(id){
    const results = await client.query("SELECT * FROM tb_funcionario WHERE id_funcionario=?;", [id])
    return results[0]
}

//Utualizar um Funcionario
export async function uptadeFuncionario(id, Funcionario){
    const values = [Funcionario.id_funcionario, Funcionario.cpf, Funcionario.nome, Funcionario.telefone, Funcionario.endereco, Funcionario.email, id]
    await client.query("UPDATE tb_funcionario SET id_funcionario=?, cpf=?, nome=?, telefone=?, endereco=?, email=? WHERE id_funcionario=?", values)
}

//Deletar um Funcionario
export async function deleteFuncionario(id){
    await client.query("DELETE FROM tb_funcionario WHERE id_funcionario=?", id)
}

/********************CLIENTES********************/
//Seleciona todos os clientes
export async function selectClientes(){
    const results = await client.query('SELECT * FROM tb_cliente;')
    return results[0]
}

//seleciona o cliente por id
export async function selectCliente(id){
    const results = await client.query('SELECT * FROM tb_cliente WHERE id_cliente=?;', [id])
    return results[0]
}

//insere um novo cliente
export async function insertCliente(Cliente){
    console.log(Cliente)
    const values = [Cliente.cpf_cnpj, Cliente.nome, Cliente.telefone, Cliente.endereco, Cliente.email]
    await client.query('INSERT INTO tb_cliente(cpf_cnpj, nome, telefone, endereco, email) VALUES (?, ?, ?, ?, ?)', values)
}

//atualiza um cliente
export async function updateCliente(id, Cliente){
    const values = [Cliente.cpf_cnpj, Cliente.nome, Cliente.telefone, Cliente.endereco, Cliente.email, id]
    await client.query('UPDATE tb_cliente SET cpf_cnpj=?, nome=?, telefone=?, endereco=?, email=? WHERE id_cliente = ?', values)
}

//deletar um cliente
export async function deleteCliente(id){
    const values = [id]
    await client.query('DELETE FROM tb_funcionario WHERE id_cliente=?', values)
}

/********************VEICULOS********************/
//Selecionar todos os veiculos
export async function selectVeiculos() {
    const results = await client.query("SELECT * FROM tb_veiculo;");
    return results[0]
}

//Selecionar veiculo por placa
export async function selecionarVeiculo (id) {
    const results = await client.query("SELECT * FROM tb_veiculo WHERE id_veiculo=?", [id])
    return results[0]
}

//Inserir um veiculo 
export async function insertVeiculo(Veiculo) {
    const values =[Veiculo.placa, Veiculo.marca, Veiculo.modelo, Veiculo.ano]
    await client.query("INSERT INTO tb_veiculo(placa, marca, modelo, ano) VALUES (?,?,?,?)", values)
}

//Uptade do Veiculo
export async function uptadeVeiculo (id, Veiculo) {
    const values = [Veiculo.placa, Veiculo.marca, Veiculo.modelo, Veiculo.ano, id, Veiculo]
    await client.query("UPDATE tb_veiculo SET placa=?, marca=?, modelo=?, ano=? WHERE id_veiculo=?", values)
}

//deletar um Veiculo
export async function deleteVeiculo(Placa) {
    const values = [Placa]
    await client.query("DELETE FROM tb_veiculo WHERE Placa=?", values)
}


// Função para selecionar todos os serviços
export async function selectServicos() {
    const results = await client.query("SELECT * FROM tb_servico;");
    return results[0];
}

// Função para inserir um novo serviço
export async function insertServico(servico) {
    const values = [servico.nr_nota_fiscal, servico.id_categoria, servico.dt_servico, servico.descricao, servico.valor];
    await client.query("INSERT INTO tb_servico(nr_nota_fiscal, id_categoria, dt_servico, descricao, valor) VALUES (?, ?, ?, ?, ?)", values);
}

// Função para selecionar um serviço pelo ID
export async function selectServico(id) {
    const results = await client.query("SELECT * FROM tb_servico WHERE id_servico = ?;", [id]);
    return results[0];
}

// Função para atualizar um serviço
export async function updateServico(id, servico) {
    const values = [servico.nr_nota_fiscal, servico.id_categoria, servico.dt_servico, servico.descricao, servico.valor, id];
    await client.query("UPDATE tb_servico SET nr_nota_fiscal = ?, id_categoria = ?, dt_servico = ?, descricao = ?, valor = ? WHERE id_servico = ?", values);
}

// Função para excluir um serviço
export async function deleteServico(id) {
    const values = [id];
    await client.query("DELETE FROM tb_servico WHERE id_servico = ?", values);
}

/********************ESTOQUE********************/
//Selecionar todos os produtos
export async function selectProduto() {
    const results = await client.query("SELECT * FROM tb_produto;");
    return results[0]
}

//Selecionar produto por Id
export async function selecionarProduto (id_produto) {
    const results = await client.query("SELECT * FROM tb_produto WHERE id_produto=?", [id_produto])
    return results[0]
}

//Inserir um novo produto
export async function insertProduto(produto) {
    const values =[produto.nome, produto.un_medida, produto.qtd_estoque, produto.dt_entrada, produto.dt_validade]
    await client.query("INSERT INTO tb_produto(nome, un_medida, qtd_estoque, dt_entrada, dt_validade) VALUES (?,?,?,?,?)", values)
}

//Uptade do produto
export async function uptadeProduto (id_produto, produto) {
    const values = [produto.nome, produto.un_medida, produto.qtd_estoque, produto.dt_entrada, produto.dt_validade, id_produto, produto]
    await client.query("UPDATE tb_produto SET nome=? un_medida=?, qtd_estoque=?, dt_entrada=?, dt_validade=? WHERE id_produto=? ", values)
}

//deletar um produto
export async function deleteProduto(id_produto) {
    const values = [id_produto]
    await client.query("DELETE FROM tb_produto WHERE id_produto=?", values)
}
