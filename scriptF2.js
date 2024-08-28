const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const name = document.querySelector("#name");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");
const btnClearDB = document.querySelector("#btnClearDB");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let registros = [];

function clearDB() {
  const password = prompt('Digite a senha para limpar o banco de dados:');
  if (password === 'SGD1234') {
    if (confirm('Você tem certeza que deseja limpar o banco de dados?')) {
      localStorage.clear();
      loadItems(); // Recarrega a tabela com itens vazios
    } else {
      // Se o usuário cancelar, não faça nada
      return;
    }
  } else {
    alert('Senha incorreta!');
  }
}

btnNew.addEventListener('click', () => {
  if (descItem.value === "" || name.value === "" || type.value === "Selecione") {
    return alert("Preencha todos os campos!");
  }

  const metragemInput = document.querySelector("#metragem"); // Adicione um ID "metragem" ao seu campo de entrada de metragem
  const valorInput = document.querySelector("#valor"); // Adicione um ID "valor" ao seu campo de entrada de valor

  const registro = {
    name: name.value,
    type: type.value,
    desc: descItem.value,
    metragem: parseFloat(metragemInput.value), // Obtenha o valor da metragem do campo de entrada
    valor: parseFloat(valorInput.value), // Obtenha o valor do campo de entrada
    situacao: "pendente" // Inicialmente, o registro está pendente
  };

  registros.push(registro);

  setItemsDB();

  loadItems();

  descItem.value = "";
  name.value = "";
  type.value = "Selecione";
  metragemInput.value = ""; // Limpe o campo de entrada de metragem
  valorInput.value = ""; // Limpe o campo de entrada de valor
});

function confirmarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "confirmado";
  setItemsDB();
  loadItems();
}

function cancelarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "cancelado";
  setItemsDB();
  loadItems();
}

function editarRegistro(index) {
  const registro = registros[index];
  // Crie um formulário para editar o registro
  const form = document.createElement("form");
  form.innerHTML = `
    <label>Cliente:</label>
    <input type="text" value="${registro.name}" id="nome-editar">
    <br>
    <label>Tipo:</label>
    <select id="type-editar">
                  <option value="Selecione" ${registro.type === "Selecione" ? "selected" : ""}>Selecione</option>
                  <option value="Dedetização" ${registro.type === "Dedetização" ? "selected" : ""}>Dedetização</option>
                  <option value="Desinsetização" ${registro.type === "Desinsetização" ? "selected" : ""}>Desinsetização</option>
                  <option value="Desratização" ${registro.type === "Desratização" ? "selected" : ""}>Desratização</option>
                  <option value="Descupinização" ${registro.type === "Descupinização" ? "selected" : ""}>Descupinização</option>
                  <option value="Sanitização" ${registro.type === "Sanitização" ? "selected" : ""}>Sanitização</option>
                  <option value="Controle de Pragas" ${registro.type === "Controle de Pragas" ? "selected" : ""}>Controle de Pragas</option>
    </select>
    <br>
    <label>Descrição:</label>
    <textarea id="desc-editar">${registro.desc}</textarea>
    <br>
    <label>Metragem:</label>
    <input type="number" value="${registro.metragem}" id="metragem-editar">
    <br>
    <label>Valor:</label>
    <input type="number" value="${registro.valor}" id="valor-editar">
    <br>
    <button onclick="salvarEdicao(${index})">Salvar</button>
  `;

  // Adicione o formulário ao HTML
  const editarContainer = document.getElementById("editar-container");
  editarContainer.appendChild(form);
}

function salvarEdicao(index) {
  const registro = registros[index];
  const nome = document.getElementById("nome-editar").value;
  const tipo = document.getElementById("type-editar").value;
  const desc = document.getElementById("desc-editar").value;
  const metragem = parseFloat(document.getElementById("metragem-editar").value); // Converte para número
  const valor = parseFloat(document.getElementById("valor-editar").value); // Converte para número

  // Atualize o registro na lista registros com os novos valores
  registros[index] = {
    name: nome,
    type: tipo,
    desc: desc,
    metragem: metragem,
    valor: valor,
    situacao: registro.situacao // Manter a situação do registro
  };

  // Salve as alterações no banco de dados
  setItemsDB();

  // Feche o formulário de edição
  const editarContainer = document.getElementById("editar-container");
  editarContainer.innerHTML = "";

  // Recarregue a tabela para refletir as alterações
  loadItems();
}

function excluirRegistro(index) {
  const registro = registros[index];
  if (confirm(`Você tem certeza que deseja excluir o registro ${registro.name}?`)) {
    registros.splice(index, 1);
    setItemsDB();
    loadItems();
  }
}

function insertItem(registro, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${registro.name}</td>
    <td>${registro.type}</td>
    <td>${registro.desc}</td>
    <td>${registro.metragem} m²</td>
    <td>R$ ${registro.valor}</td>
    <td>${registro.situacao}</td>
    <td class="columnAction">
      <button class="btn-confirmar" onclick="confirmarRegistro(${index})">Confirmar</button>
      <button class="btn-cancelar" onclick="cancelarRegistro(${index})">Cancelar</button>
      <button class="btn-editar" onclick="editarRegistro(${index})">Editar</button>
      <button class="btn-excluir" onclick="excluirRegistro(${index})">Excluir</button>
    </td>
  `;

  tbody.appendChild(tr);
}

function loadItems() {
  registros = getItemsDB();
  tbody.innerHTML = "";
  registros.forEach((registro, index) => {
    insertItem(registro, index);
  });

  // Atualizar contagens na tela
  updateCounts();
}

function updateCounts() {
  const registrados = registros.filter((registro) => registro.situacao === "pendente").length;
  const confirmados = registros.filter((registro) => registro.situacao === "confirmado").length;
  const cancelados = registros.filter((registro) => registro.situacao === "cancelado").length;

  incomes.textContent = registrados;
  expenses.textContent = confirmados;
  total.textContent = cancelados;
}

const getItemsDB = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItemsDB = () => localStorage.setItem("db_items", JSON.stringify(registros));

// Adicionando evento de carregamento de página
window.addEventListener("load", loadItems);

btnClearDB.addEventListener("click", clearDB); // Adicionando evento de limpar o banco de dados