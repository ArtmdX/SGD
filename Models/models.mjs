export class Produto {
  constructor(nome, un_medida, qtd_estoque) {
    this.nome = nome;
    this.un_medida = un_medida;
    this.qtd_estoque = qtd_estoque;

    // Definindo uma propriedade chamada 'produto' com getter e setter
    Object.defineProperty(this, "produto", {
      get: () => {
        return {
          nome: this.nome,
          un_medida: this.un_medida,
          qtd_estoque: this.qtd_estoque,
        };
      },
      set: (newProduto) => {
        this.nome = newProduto.nome;
        this.un_medida = newProduto.un_medida;
        this.qtd_estoque = newProduto.qtd_estoque;
      },
    });
  }
}

export class Fornecedor {
  constructor(cnpj, fornecedor, telefone, email) {
    this.cnpj = cnpj;
    this.fornecedor = fornecedor;
    this.telefone = telefone;
    this.email = email;
    // Definindo uma propriedade chamada 'fornecedores' com getter e setter
    Object.defineProperty(this, "fornecedores", {
      get: () => {
        return {
          cnpj: this.cnpj,
          fornecedor: this.fornecedor,
          telefone: this.telefone,
          email: this.email,
        };
      },
      set: (newFornecedor) => {
        this.cnpj = newFornecedor.cnpj;
        this.fornecedor = newFornecedor.fornecedor;
        this.telefone = newFornecedor.telefone;
        this.email = newFornecedor.email;
      },
    });
  }
}

export class Cliente {
  constructor(cpf_cnpj, nome, telefone, endereco, email) {
    this.cpf_cnpj = cpf_cnpj;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.email = email;

    // Definindo uma propriedade chamada 'cliente' com getter e setter
    Object.defineProperty(this, "cliente", {
      get: () => {
        return {
          cpf_cnpj: this.cpf_cnpj,
          nome: this.nome,
          telefone: this.telefone,
          endereco: this.endereco,
          email: this.email,
        };
      },
      set: (newCliente) => {
        this.cpf_cnpj = newCliente.cpf_cnpj;
        this.nome = newCliente.nome;
        this.telefone = newCliente.telefone;
        this.endereco = newCliente.endereco;
        this.email = newCliente.email;
      },
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
    Object.defineProperty(this, "compra", {
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
      },
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
    Object.defineProperty(this, "nota_fiscal", {
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
      },
    });
  }
}

export class Servico {
  constructor(nr_nota_fiscal, id_categoria, dt_servico, descricao, valor) {
    this.nr_nota_fiscal = nr_nota_fiscal;
    this.id_categoria = id_categoria;
    this.dt_servico = dt_servico;
    this.descricao = descricao;
    this.valor = valor;

    // Definindo uma propriedade chamada 'servico' com getter e setter
    Object.defineProperty(this, "servico", {
      get: () => {
        return {
          nr_nota_fiscal: this.nr_nota_fiscal,
          id_categoria: this.id_categoria,
          dt_servico: this.dt_servico,
          descricao: this.descricao,
          valor: this.valor,
        };
      },
      set: (newServico) => {
        this.nr_nota_fiscal = newServico.nr_nota_fiscal;
        this.id_categoria = newServico.id_categoria;
        this.dt_servico = newServico.dt_servico;
        this.descricao = newServico.descricao;
        this.valor = newServico.valor;
      },
    });
  }
}

export class Funcionario {
  constructor(cpf, nome, telefone, endereco, email) {
    this.cpf = cpf;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.email = email;

    // Definindo uma propriedade chamada 'funcionario' com getter e setter
    Object.defineProperty(this, "funcionario", {
      get: () => {
        return {
          cpf: this.cpf,
          nome: this.nome,
          telefone: this.telefone,
          endereco: this.endereco,
          email: this.email,
        };
      },
      set: (newFuncionario) => {
        this.cpf = newFuncionario.cpf;
        this.nome = newFuncionario.nome;
        this.telefone = newFuncionario.telefone;
        this.endereco = newFuncionario.endereco;
        this.email = newFuncionario.email;
      },
    });
  }
}

export class Veiculo {
  constructor(placa, marca, modelo, ano) {
    this.placa = placa;
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;

    // Definindo uma propriedade chamada 'veiculo' com getter e setter
    Object.defineProperty(this, "veiculo", {
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
      },
    });
  }
}
