import mysql from "mysql2/promise"
import dotenv from 'dotenv'
import { Produto, Veiculo } from "./Models/models.mjs";
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
    const values = [Funcionario.id_funcionario, Funcionario.cpf, Funcionario.nome, Funcionario.telefone, Funcionario.endereco, Funcionario.email]
    await client.query("INSERT INTO tb_funcionario(id_funcionario, cpf, nome, telefone, endereco, email) VALUES (?,?,?,?,?,?)", values)
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
    const values = [id]
    await client.query("DELETE FROM tb_funcionario WHERE id_funcionario=?", values)
}

/********************CLIENTES********************/
//Seleciona todos os clientes
export async function selectClientes(){
    const results = await client.query('SELECT * FROM tb_clientes;')
    return results[0]
}

//seleciona o cliente por id
export async function selectCliente(id){
    const results = await client.query('SELECT * FROM tb_cliente WHERE id_cliente=?;', [id])
    return results[0]
}

//insere um novo cliente
export async function insertCliente(Cliente){
    const values = [Cliente.id_cliente, Cliente.cpf_cnpj, Cliente.nome, Cliente.telefone, Cliente.endereco, Cliente.email]
    const results = await client.query('INSERT INTO tb_cliente(id_cliente, cpf_cnpj, nome, telefone, endereco, email) VALUES (?, ?, ?, ?, ?, ?)', values)
}

//atualiza um cliente
export async function updateCliente(id, Cliente){
    const values = [Cliente.id_cliente, Cliente.cpf_cnpj, Cliente.nome, Cliente.telefone, Cliente.endereco, Cliente.email, id]
    const results = await cliente.query('UPDATE tb_cliente SET id_cliente=?, cpf_cnpj=?, nome=?, telefone=?, endereco=?, email=?', values)
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
    return results
}

//Selecionar veiculo por placa
export async function selecionarVeiculo (Placa) {
    const results = await client.query("SELECT * FROM tb_veiculo WHERE Placa=?", [Placa])
    return results[0]
}

//Inserir um veiculo 
export async function insertVeiculo(Veiculo) {
    const values =[Veiculo.placa, Veiculo.marca, Veiculo.modelo, Veiculo.ano]
    await client.query("INSERT INTO tb_veiculo(placa, marca, modelo, ano) VALEUS (?,?,?,?)", values)
}

//Uptade do Veiculo
export async function uptadeVeiculo (Placa, Veiculo) {
    const values = [Veiculo.placa, Veiculo.marca, Veiculo.modelo, Veiculo.ano, Placa, Veiculo]
    await client.query("UPDATE tb_veiculo SET placa=?, marca=?, modelo=?, ano=?", values)
}

//deletar um Veiculo
export async function deleteVeiculo(Placa) {
    const values = [Placa]
    await client.query("DELETE FROM tb_veiculo WHERE Placa=?", values)
}

/********************ESTOQUE********************/
//Selecionar todos os produtos
export async function selectProduto() {
    const results = await client.query("SELECT * FROM tb_produto;");
    return results
}

//Selecionar produto por Id
export async function selecionarProduto (id_produto) {
    const results = await client.query("SELECT * FROM tb_produto WHERE id_produto=?", [id_produto])
    return results[0]
}

//Inserir um novo produto
export async function insertProduto(produto) {
    const values =[produto.id, produto.un_medida, produto.qtd_estoque]
    await client.query("INSERT INTO tb_veiculo(id_produto, un_medida, qtd_estoque) VALEUS (?,?,?,?)", values)
}

//Uptade do produto
export async function uptadeProduto (id_produto, produto) {
    const values = [produto.id, produto.un_medida, produto.qtd_estoque, id_produto, produto]
    await client.query("UPDATE tb_produto SET id_produto=?, un_medida=?, qtd_estoque=?", values)
}

//deletar um produto
export async function deleteProduto(id_produto) {
    const values = [id_produto]
    await client.query("DELETE FROM tb_produto WHERE id_produto=?", values)
}