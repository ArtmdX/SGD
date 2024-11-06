import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as db from './db.mjs';
import * as models from './Models/models.mjs'

//services********************************************************************************************************************
import express from 'express';
import {
    selectServicos,
    insertServico,
    selectServico,
    updateServico,
    deleteServico
} from './path/to/your/serviceFunctions'; // Ajuste o caminho conforme necessário
//services********************************************************************************************************************

dotenv.config();

const app = express()
app.use(express.json())

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));

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
    console.log('Rodando!')
));