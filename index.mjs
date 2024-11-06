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