import mysql from "mysql2/promise"
import dotenv from 'dotenv'
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
