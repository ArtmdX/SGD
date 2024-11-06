import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as db from './db.mjs';
import * as models from './Models/models.mjs'

dotenv.config();

const app = express()
app.use(express.json())

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));

/*-----------ROTAS FUNCIONARIO------------------*/
// Rota POST para inserir um funcionário
app.post("/sqlfuncionarios", async (request, response) =>{
    const {nome, endereco, cpf, telefone, email} = request.body;
    const novoFuncionario = await models.Funcionario.criar(cpf, nome, telefone, endereco, email)
    await db.insertFuncionario(novoFuncionario.funcionario)
    response.redirect("/funcionarios");
})

// Rota PATCH para atualizar um funcionário pelo ID
app.patch("/sqlfuncionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id)
    const funcionario = request.body
    await db.uptadeFuncionario(id, funcionario)
    response.sendStatus(200)
})

// Rota GET para selecionar um funcionário pelo ID
app.get("/sqlfuncionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    const results = await db.selectFuncionario(id);
    response.json(results);
})

// Rota GET para selecionar todos os funcionários
app.get("/sqlfuncionarios", async (request, response) =>{
    const results = await db.selectFuncionarios();
    response.json(results)
})

// Rota DELETE para excluir um funcionário pelo ID
app.delete("/sqlfuncionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    await db.deleteFuncionario(id);
    response.sendStatus(204);
})

/*-----------ROTAS CLIENTE------------------*/
//Rota para listar todos os clientes
app.get('/sqlclientes', async (request, response) => {
    const results = await db.selectClientes();
    response.json(results)
})

//Rota para listar um cliente por id
app.get('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectCliente();
    response.json(results)
})

//Rota para inserir um cliente
app.post('/sqlcliente', async(request, response) => {
    const {nome, cpf_cnpj, telefone, endereco, email} = request.body;
    const novocliente = await models.Cliente.criar(nome, cpf_cnpj, telefone, endereco, email)
    await db.insertCliente(novocliente.Cliente)
    response.redirect('/clientes')
})

//Rota para atualizar um cliente
app.patch('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const cliente = request.body;
    await db.updateCliente(id, Cliente)
    response.sendStatus(200)
})

//Rota para deletar um cliente
app.delete('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteCliente(id);
    response.sendStatus(204);
})
/*-----------ROTAS VEICULO------------------*/
// Rota POST para inserir um Veiculo
app.post("/sqlVeiculo", async (request, response) =>{
    const {placa, marca, modelo, ano,} = request.body;
    const novoVeiculo = await models.Veiculo.criar(placa,marca,modelo,ano)
    await db.insertVeiculo(novoVeiculo.Veiculo)
    response.redirect("/Veiculo");
})

//Rota PATCH para atualizar um Veiculo
app.patch("/sqlVeiculo/:placa", async (request, response) =>{
    const placa = parseInt(request.params.placa)
    const veiculo = request.body
    await db.uptadeVeiculo(placa, veiculo)
    response.sendStatus(200)
})

// Rota GET para selecionar um Veiculo
app.get("/sqlVeiculo/:placa", async (request, response) =>{
    const placa = parseInt(request.params.placa);
    const results = await db.selectVeiculo(placa);
    response.json(results);
})

// Rota GET para selecionar todos os veiculo
app.get("/sqlVeiculo", async (request, response) =>{
    const results = await db.selectVeiculo();
    response.json(results)
})

// Rota DELETE para excluir um Veiculo
app.delete("/sqlVeiculo/:placa", async (request, response) =>{
    const placa = parseInt(request.params.placa);
    await db.deleteVeiculo(placa);
    response.sendStatus(204);
})

/*-----------ROTAS ESTOQUE------------------*/
// Rota POST para inserir um Produto
app.post("/sqlProduto", async (request, response) =>{
    const {id_produto, un_medida, qtd_estoque} = request.body;
    const novoProduto = await models.Produto.criar(id_produto, un_medida, qtd_estoque)
    await db.insertVeiculo(novoProduto.Produto)
    response.redirect("/Produto");
})

//Rota PATCH para atualizar um Produto
app.patch("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto)
    const produto = request.body
    await db.uptadeProduto(id_produto, produto)
    response.sendStatus(200)
})
// Rota GET para selecionar um Produto
app.get("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto);
    const results = await db.selectProduto(id_produto);
    response.json(results);
})

// Rota GET para selecionar todos os veiculo
app.get("/sqlProduto", async (request, response) =>{
    const results = await db.selectProduto();
    response.json(results)
})

// Rota DELETE para excluir um Veiculo
app.delete("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto);
    await db.deleteProduto(id_produto);
    response.sendStatus(204);
})

//Paginas
app.get("/home", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'home.html')
    response.sendFile(page)
});
app.get("/", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'home.html')
    response.sendFile(page)
});
app.get("/chamados", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'chamados.html')
    response.sendFile(page)
});
app.get("/clientes", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'clientes.html')
    response.sendFile(page)
});
app.get("/funcionarios", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'funcionarios.html')
    response.sendFile(page)
});
app.get("/veiculos", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'veiculos.html')
    response.sendFile(page)
});
app.get("/estoque", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'estoque.html')
    response.sendFile(page)
});
app.get("/financeiro", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'financeiro.html')
    response.sendFile(page)
});
app.get("/usuarios", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'usuarios.html')
    response.sendFile(page)
});
app.get("/registro", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'registro.html')
    response.sendFile(page)
});
app.get("/login", (request, response, next) => {
    const page = path.join(path.resolve(),'public', 'login.html')
    response.sendFile(page)
});

app.listen(process.env.PORT, () =>(
    console.log('Rodando!')
));