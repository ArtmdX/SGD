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
    const novoFuncionario = new models.Funcionario(cpf, nome, telefone, endereco, email)
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
    response.json(results[0]);
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
app.get('/sqlcliente', async (request, response) => {
    const results = await db.selectClientes();
    response.json(results)
})

//Rota para listar um cliente por id
app.get('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectCliente(id);
    response.json(results[0])
})

//Rota para inserir um cliente
app.post('/sqlcliente', async(request, response) => {
    const {cpf_cnpj, nome, telefone, email, endereco} = request.body;
    const novocliente = new models.Cliente(cpf_cnpj, nome, telefone, endereco, email)
    await db.insertCliente(novocliente.cliente)
    response.redirect('/clientes')
})

//Rota para atualizar um cliente
app.patch('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const cliente = request.body;
    await db.updateCliente(id, cliente)
    response.sendStatus(200)
})

//Rota para deletar um cliente
app.delete('/sqlcliente/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteCliente(id);
    response.sendStatus(204);
})
//--------------------CRUD VEICULOS---------------------
// Rota POST para inserir um Veiculo
app.post("/sqlVeiculo", async (request, response) =>{
    const {placa, marca, modelo, ano,} = request.body;
    const novoVeiculo = new models.Veiculo(placa,marca,modelo,ano)
    await db.insertVeiculo(novoVeiculo.veiculo)
    response.redirect("/veiculos");
})

//Rota PATCH para atualizar um Veiculo
app.patch("/sqlVeiculo/:id_veiculo", async (request, response) =>{
    const id = parseInt(request.params.id_veiculo)
    const veiculo = request.body
    await db.uptadeVeiculo(id, veiculo)
    response.sendStatus(200)
})

// Rota GET para selecionar um Veiculo
app.get("/sqlVeiculo/:id_veiculo", async (request, response) =>{
    const id = parseInt(request.params.id_veiculo);
    const results = await db.selecionarVeiculo(id);
    response.json(results[0]);
})

// Rota GET para selecionar todos os veiculo
app.get("/sqlVeiculo", async (request, response) =>{
    const results = await db.selectVeiculos();
    response.json(results)
})

// Rota DELETE para excluir um Veiculo
app.delete("/sqlVeiculo/:id_veiculo", async (request, response) =>{
    const id = parseInt(request.params.id_veiculo);
    await db.deleteVeiculo(id);
    response.sendStatus(204);
})

/*-----------ROTAS ESTOQUE------------------*/
// Rota POST para inserir um Produto
app.post("/sqlProduto", async (request, response) =>{
    const {nome, un_medida, qtd_estoque} = request.body;
    const novoProduto = new models.Produto(nome, un_medida, qtd_estoque)
    await db.insertProduto(novoProduto.produto)
    response.redirect('/estoque');
})

//Rota PATCH para atualizar um Produto
app.patch("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto)
    const produto = request.body
    await db.uptadeProduto(id_produto, produto)
    response.sendStatus(200);
})

// Rota GET para selecionar um Produto
app.get("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto);
    const results = await db.selecionarProduto(id_produto);
    response.json(results[0]);
})

// Rota GET para selecionar todos os Produtos
app.get("/sqlProduto", async (request, response) =>{
    const results = await db.selectProduto();
    response.json(results)
})

// Rota DELETE para excluir um Produto
app.delete("/sqlProduto/:id_produto", async (request, response) =>{
    const id_produto = parseInt(request.params.id_produto);
    await db.deleteProduto(id_produto);
    response.sendStatus(200);
})
//serviços**************************************************************************************************************************
// Rota para obter todos os serviços
app.get('/services', async (req, res) => {
    try {
        const services = await selectServicos();
        res.json(services);
    } catch (error) {
        console.error('Erro ao obter serviços:', error);
        res.status(500).json({ message: 'Erro ao obter serviços' });
    }
});

// Rota para inserir um novo serviço
app.post('/services', async (req, res) => {
    try {
        const servico = req.body;
        await insertServico(servico);
        res.status(201).json({ message: 'Serviço inserido com sucesso' });
    } catch (error) {
        console.error('Erro ao inserir serviço:', error);
        res.status(500).json({ message: 'Erro ao inserir serviço' });
    }
});

// Rota para obter um serviço pelo ID
app.get('/services/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const service = await selectServico(id);
        if (service.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.json(service[0]);
    } catch (error) {
        console.error('Erro ao obter serviço:', error);
        res.status(500).json({ message: 'Erro ao obter serviço' });
    }
});

// Rota para atualizar um serviço
app.patch('/services/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const servico = req.body;
        await updateServico(id, servico);
        res.json({ message: 'Serviço atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).json({ message: 'Erro ao atualizar serviço' });
    }
});

// Rota para excluir um serviço
app.delete('/services/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deleteServico(id);
        res.json({ message: 'Serviço excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        res.status(500).json({ message: 'Erro ao excluir serviço' });
    }
});
//serviços**************************************************************************************************************************

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
    console.log('Rodando: http://localhost:3000')
));