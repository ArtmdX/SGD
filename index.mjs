import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as db from './db.mjs';

dotenv.config();

const app = express()
app.use(express.json())

// Rota POST para inserir um funcionário
app.post("/funcionarios", async (request, response) =>{
    const funcionario = request.body;
    await db.insertFuncionario(funcionario)
    response.sendStatus(201);
})

// Rota PATCH para atualizar um funcionário pelo ID
app.patch("/funcionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id)
    const funcionario = request.body
    await db.uptadeFuncionario(id, funcionario)
    response.sendStatus(200)
})

// Rota GET para selecionar um funcionário pelo ID
app.get("/funcionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    const results = await db.selectFuncionario(id);
    response.json(results);
})

// Rota GET para selecionar todos os funcionários
app.get("/funcionarios", async (request, response) =>{
    const results = await db.selectFuncionarios();
    response.json(results)
})

// Rota DELETE para excluir um funcionário pelo ID
app.delete("/funcionarios/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    await db.deleteFuncionario(id);
    response.sendStatus(204);
})

// Rota GET para servir o arquivo home.html
app.get("/", (request, response, next) => {
    const homePage = path.join(path.resolve(),'public', 'home.html')
    response.sendFile(homePage)
});

app.listen(process.env.PORT, () =>(
    console.log('Rodando!')
));