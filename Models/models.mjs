import { client } from "../db.mjs";

export class Produto {
    constructor(id_produto, nome_Produto, un_medida, qtd_estoque) {
        this.id_produto = id_produto;
        this.nome_Produto = nome_Produto;
        this.un_medida = un_medida;
        this.qtd_estoque = qtd_estoque;

        // Definindo uma propriedade chamada 'produto' com getter e setter
        Object.defineProperty(this, 'produto', {
            get: () => {
                return {
                    id_produto: this.id_produto,
                    nome_Produto: this.nome_Produto,
                    un_medida: this.un_medida,
                    qtd_estoque: this.qtd_estoque
                };
            },
            set: (newProduto) => {
                this.id_produto = newProduto.id_produto;
                this.nome_Produto = newProduto.nome_Produto;
                this.un_medida = newProduto.un_medida;
                this.qtd_estoque = newProduto.qtd_estoque;
            }
        });
    }
}

export class Fornecedor {
    constructor(id_fornecedor, cnpj, fornecedor, telefone, email) {
        this.id_fornecedor = id_fornecedor;
        this.cnpj = cnpj;
        this.fornecedor = fornecedor;
        this.telefone = telefone;
        this.email = email;
        // Definindo uma propriedade chamada 'fornecedores' com getter e setter
        Object.defineProperty(this, 'fornecedores', {
            get: () => {
                return {
                    id_fornecedor: this.id_fornecedor,
                    cnpj: this.cnpj,
                    fornecedor: this.fornecedor,
                    telefone: this.telefone,
                    email: this.email
                };
            },
            set: (newFornecedor) => {
                this.id_fornecedor = newFornecedor.id_fornecedor;
                this.cnpj = newFornecedor.cnpj;
                this.fornecedor = newFornecedor.fornecedor;
                this.telefone = newFornecedor.telefone;
                this.email = newFornecedor.email;
            }
        });
    }
}

export class Cliente {
    constructor (id_cliente, cpf_cnpj, nome, telefone, endereco, email){
        this.id_cliente = id_cliente;
        this.cpf_cnpj = cpf_cnpj;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.email = email;
        
        // Definindo uma propriedade chamada 'clientes' com getter e setter
        Object.defineProperty(this, 'clientes', {
            get: () => {
                return {
                    id_cliente: this.id_cliente,
                    cpf_cnpj: this.cpf_cnpj,
                    nome: this.nome,
                    telefone: this.telefone,
                    endereco: this.endereco,
                    email: this.email,
                };
            },
            set: (newCliente) => {
                this.id_cliente = newCliente.id_cliente;
                this.cpf_cnpj = newCliente.cpf_cnpj;
                this.nome = newCliente.nome;
                this.telefone = newCliente.telefone;
                this.endereco = newCliente.endereco;
                this.email = newCliente.email;
            }
        });
    }
}

export class Compra {
    constructor(nr_compra, dt_entrada, valor_total, id_fornecedor) {
        this.nr_compra = nr_compra;
        this.dt_entrada = dt_entrada;
        this.valor_total = valor_total;
        this.id_fornecedor = id_fornecedor;

        // Definindo uma propriedade chamada 'Compra' com getter e setter
        Object.defineProperty(this, 'compra', {
            get: () => {
                return {
                    nr_compra: this.nr_compra,
                    dt_entrada: this.dt_entrada,
                    valor_total: this.valor_total,
                    id_fornecedor: this.id_fornecedor,
                };
            },
            set: (newCompra) => {
                this.nr_compra = newCompra.nr_compra;
                this.dt_entrada = newCompra.dt_entrada;
                this.valor_total = newCompra.valor_total;
                this.id_fornecedor = newCompra.id_fornecedor;
            }
        });
    }
}

export class NotaFiscal {
    constructor(nr_nota_fiscal, dt_venda, valor, id_cliente) {
        this.nr_nota_fiscal = nr_nota_fiscal;
        this.dt_venda = dt_venda;
        this.valor = valor;
        this.id_cliente = id_cliente;

        // Definindo uma propriedade chamada 'nota_fiscal' com getter e setter
        Object.defineProperty(this, 'nota_fiscal', {
            get: () => {
                return {
                    nr_nota_fiscal: this.nr_nota_fiscal,
                    dt_venda: this.dt_venda,
                    valor: this.valor,
                    id_cliente: this.id_cliente,
                };
            },
            set: (newNota) => {
                this.nr_nota_fiscal = newNota.nr_nota_fiscal;
                this.dt_venda = newNota.dt_venda;
                this.valor = newNota.valor;
                this.id_cliente = newNota.id_cliente;
            }
        });
    }
}

export class Servico {
    constructor (id_servico, nr_nota_fiscal, id_categoria, dt_servico,
    descricao, valor) 
    {
        this.id_servico = id_servico;
        this.nr_nota_fiscal = nr_nota_fiscal;
        this.id_categoria = id_categoria;
        this.dt_servico = dt_servico;
        this.descricao = descricao;
        this.valor = valor;

        // Definindo uma propriedade chamada 'servico' com getter e setter
        Object.defineProperty(this, 'servico', {
            get: () => {
                return {
                    id_servico: this.id_servico,
                    nr_nota_fiscal: this.nr_nota_fiscal,
                    id_categoria: this.id_categoria,
                    dt_servico: this.dt_servico,
                    descricao: this.descricao,
                    valor: this.valor,
                };
            },
            set: (newServico) => {
                this.id_servico = newServico.id_servico;
                this.nr_nota_fiscal = newServico.nr_nota_fiscal;
                this.id_categoria = newServico.id_categoria;
                this.dt_servico = newServico.dt_servico;
                this.descricao = newServico.descricao;
                this.valor = newServico.valor;
            }
        });
   }
}

async function idJaExiste(id) {
    const result = await client.query("SELECT COUNT(*) FROM tb_funcionario WHERE id_funcionario = ?", [id]);
    const count = (result[0][0]['COUNT(*)'])
    return count > 0;
}

async function gerarIdUnico() {
    let id;
    let existe;
    do {
        id = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório entre 1 e 100
        existe = await idJaExiste(id); // Verifica no banco de dados se já existe
    } while (existe); // Se o ID já existe, gera outro
    return id;
}

export class Funcionario {
    constructor (id_funcionario,cpf, nome, telefone, endereco, email) {
        this.id_funcionario = id_funcionario
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.email = email;

        // Definindo uma propriedade chamada 'funcionario' com getter e setter
        Object.defineProperty(this, 'funcionario', {
            get: () => {
                return {
                    id_funcionario: this.id_funcionario,
                    cpf: this.cpf,
                    nome: this.nome,
                    telefone: this.telefone,
                    endereco: this.endereco,
                    email: this.email,
                };
            },
            set: (newFuncionario) => {
                this.id_funcionario = newFuncionario.id_funcionario;
                this.cpf = newFuncionario.cpf;
                this.nome = newFuncionario.nome;
                this.telefone = newFuncionario.telefone;
                this.endereco = newFuncionario.endereco;
                this.email = newFuncionario.email;
            }
        });
    }
   
    // Método estático para criar um funcionário de forma assíncrona
    static async criar(cpf, nome, telefone, endereco, email) {
        const id_funcionario = await gerarIdUnico(); // Gera o ID único
        return new Funcionario(id_funcionario, cpf, nome, telefone, endereco, email); // Retorna o objeto criado
    }
}

export class Veiculo {
    constructor (placa, marca, modelo, ano){
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;

        // Definindo uma propriedade chamada 'veiculos' com getter e setter
        Object.defineProperty(this, 'veiculos', {
            get: () => {
                return {
                    placa: this.placa,
                    marca: this.marca,
                    modelo: this.modelo,
                    ano: this.ano,
                };
            },
            set: (newVeiculo) => {
                this.placa = newVeiculo.placa;
                this.marca = newVeiculo.marca;
                this.modelo = newVeiculo.modelo;
                this.ano = newVeiculo.ano;
            }
        });
    }
}
