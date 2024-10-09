class Produto {
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
const mataRato =  new Produto(3, `Mato Rato`, `4L`, 50)
console.log(mataRato)

class Fornecedor {
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
const juliano =  new Fornecedor(3, `123546`, `juliano`, `389988115385`, `velosoale456@gmail.com`)
console.log(juliano)

class Cliente {
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
const alessandro =  new Cliente(3, `123546`, `alessandro`, `389988115385`, `rua zeca mendees`, `veloalexandre456@gmail.com`)
console.log(alessandro)

class Compra {
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
const primeira =  new Compra(50, `10/04/2021`, `502.25`, 3)
console.log(primeira)

class Tb_nota_fiscal {
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
const nota02 =  new Tb_nota_fiscal(50, `10/04/2021`, `502.25`, 3)
console.log(nota02)

class Servico {
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
const servico03 =  new Servico(50, 45, 65, `12/10/2002`, `hellanzinho lins do 06`, `45.56`)
console.log(servico03)

class Funcionario {
    constructor (id_funcionario, cpf, nome, telefone, endereco, email) {
        this.id_funcionario = id_funcionario;
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
}
const hellanzinho =  new Funcionario(50, `999.999.999-99`, `hellanzinho`, `61985638595`, `taguantinda sul`, `emailhellan45@gmail.com`)
console.log(hellanzinho)

class Tb_veiculo {
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
const veiculo =  new Tb_veiculo(`JJJ-3606`, `fiat`, `uno`, `1990`)
console.log(veiculo)