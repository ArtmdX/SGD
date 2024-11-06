import mysql from "mysql2/promise"
import dotenv from 'dotenv'
import { Veiculo } from "./Models/models.mjs";
dotenv.config()

export const client = mysql.createPool(process.env.CONNECTION_STRING)

export async function selectFuncionarios(){
    const results = await client.query("SELECT * FROM tb_funcionario;");
    return results[0];
}

export async function insertFuncionario(Funcionario){
    const values = [Funcionario.id_funcionario, Funcionario.cpf, Funcionario.nome, Funcionario.telefone, Funcionario.endereco, Funcionario.email]
    await client.query("INSERT INTO tb_funcionario(id_funcionario, cpf, nome, telefone, endereco, email) VALUES (?,?,?,?,?,?)", values)
}

export async function selectFuncionario(id){
    const results = await client.query("SELECT * FROM tb_funcionario WHERE id_funcionario=?;", [id])
    return results[0]
}

export async function uptadeFuncionario(id, Funcionario){
    const values = [Funcionario.id_funcionario, Funcionario.cpf, Funcionario.nome, Funcionario.telefone, Funcionario.endereco, Funcionario.email, id]
    await client.query("UPDATE tb_funcionario SET id_funcionario=?, cpf=?, nome=?, telefone=?, endereco=?, email=? WHERE id_funcionario=?", values)
}

export async function deleteFuncionario(id){
    const values = [id]
    await client.query("DELETE FROM tb_funcionario WHERE id_funcionario=?", values)
}


//Veiculos
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

