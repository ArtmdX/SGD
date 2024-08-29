const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const name = document.querySelector("#name");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");
const btnClearDB = document.querySelector("#btnClearDB");

let registros = [];

function clearDB() {
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Digite a senha para limpar o banco de dados";

  const passwordForm = document.createElement("form");
  passwordForm.appendChild(passwordInput);

  const passwordDialog = document.createElement("div");
  passwordDialog.innerHTML = "Digite a senha para limpar o banco de dados";
  passwordDialog.appendChild(passwordForm);

  passwordDialog.style.position = "absolute";
  passwordDialog.style.top = "50%";
  passwordDialog.style.left = "50%";
  passwordDialog.style.transform = "translate(-50%, -50%)";
  passwordDialog.style.background = "white";
  passwordDialog.style.padding = "20px";
  passwordDialog.style.border = "1px solid black";
  passwordDialog.style.borderRadius = "10px";
  passwordDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  document.body.appendChild(passwordDialog);

  passwordInput.focus();

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === "SGD1234") {
      if (confirm("Você tem certeza que deseja limpar o banco de dados? Esta ação é irreversível!")) {
        registros = [];
        loadItems(); // Recarrega a tabela com itens vazios
      }
      document.body.removeChild(passwordDialog);
    } else {
      alert("Senha incorreta!");
    }
  });
}

btnNew.addEventListener('click', () => {
  if (descItem.value === "" || name.value === "" || type.value === "Selecione") {
    return alert("Preencha todos os campos!");
  }

  const metragemInput = document.querySelector("#metragem"); 
  const valorInput = document.querySelector("#valor"); 

  const registro = {
    name: name.value,
    type: type.value,
    desc: descItem.value,
    metragem: parseFloat(metragemInput.value) || null, 
    valor: parseFloat(valorInput.value) || null, 
    situacao: "pendente" 
  };

  registros.push(registro);

  loadItems();

  descItem.value = "";
  name.value = "";
  type.value = "Selecione";
  metragemInput.value = ""; 
  valorInput.value = ""; 
});

function confirmarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "confirmado";
  loadItems();
}

function cancelarRegistro(index) {
  const registro = registros[index];
  registro.situacao = "cancelado";
  loadItems();
}

function editarRegistro(index) {
  const registro = registros[index];
  const modal = document.getElementById("editar-modal");
  const modalContent = document.getElementById("editar-modal-content");

  // Create the modal content
  modalContent.innerHTML = `
    <div class="div11">
      <label>Cliente:</label>
      <input type="text" value="${registro.name}" id="nome-editar">
    </div>
    <br>
    <div class="div11">
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
    </div>
    <br>
    <div class="div11">
      <label class="label1">Descrição:</label>
      <textarea class="textarea" id="desc-editar">${registro.desc}</textarea>
    </div>
    <br>
    <div class="div11">
      <label>Metragem:</label>
      <input type="number" value="${registro.metragem}" id="metragem-editar">
    </div>
    <br>
    <div class="div11">
      <label>Valor:</label>
      <input type="number" value="${registro.valor}" id="valor-editar">
    </div>
    <br>
    <div class="div11">
      <button onclick="salvarEdicao(${index})">Salvar</button>
    </div>
  `;

  // Show the modal window
  modal.style.display = "block";

  // Add an event listener to close the modal when the user clicks outside
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Add an event listener to close the modal when the user clicks the close button
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    modal.style.display = "none";
  });
}

function salvarEdicao(index) {
  const registro = registros[index];
  const nomeEditar = document.getElementById("nome-editar").value;
  const typeEditar = document.getElementById("type-editar").value;
  const descEditar = document.getElementById("desc-editar").value;
  const metragemEditar = parseFloat(document.getElementById("metragem-editar").value) || null;
  const valorEditar = parseFloat(document.getElementById("valor-editar").value) || null;

  registro.name = nomeEditar;
  registro.type = typeEditar;
  registro.desc = descEditar;
  registro.metragem = metragemEditar;
  registro.valor = valorEditar;

  // Atualize o array registros com as novas informações
  registros[index] = registro;

  loadItems();

  // Close the modal window
  document.getElementById("editar-modal").style.display = "none";
}
function excluirRegistro(index) {
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Digite a senha para excluir o registro";

  const passwordForm = document.createElement("form");
  passwordForm.appendChild(passwordInput);

  const passwordDialog = document.createElement("div");
  passwordDialog.innerHTML = "Digite a senha para excluir o registro";
  passwordDialog.appendChild(passwordForm);

  passwordDialog.style.position = "absolute";
  passwordDialog.style.top = "50%";
  passwordDialog.style.left = "50%";
  passwordDialog.style.transform = "translate(-50%, -50%)";
  passwordDialog.style.background = "white";
  passwordDialog.style.padding = "20px";
  passwordDialog.style.border = "1px solid black";
  passwordDialog.style.borderRadius = "10px";
  passwordDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  document.body.appendChild(passwordDialog);

  passwordInput.focus();

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === "SGD1234") {
      const registro = registros[index];
      if (confirm(`Você tem certeza que deseja excluir o registro ${registro.name}?`)) {
        registros.splice(index, 1);
        loadItems();
      }
    } else {
      alert("Senha incorreta!");
    }
    document.body.removeChild(passwordDialog);
  });
}


function insertItem(registro, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${registro.name}</td>
    <td>${registro.type}</td>
    <td>${registro.desc}</td>
    <td>${registro.metragem !== null ? registro.metragem + " m²" : "Nulo"}</td>
    <td>${registro.valor !== null ? registro.valor : "Nulo"}</td>
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
  tbody.innerHTML = "";
  registros.forEach((registro, index) => {
    insertItem(registro, index);
  });
}

// Remove financial-related data
// const incomes = document.querySelector(".incomes");
// const expenses = document.querySelector(".expenses");
// const total = document.querySelector(".total");

// Remove updateCounts function
// function updateCounts() {
//   const registrados = registros.filter((registro) => registro.situacao === "pendente").length;
//   const confirmados = registros.filter((registro) => registro.situacao === "confirmado").length;
//   const cancelados = registros.filter((registro) => registro.situacao === "cancelado").length;

//   incomes.textContent = registrados;
//   expenses.textContent = confirmados;
//   total.textContent = cancelados;
// }

// Add event listener to clear DB button
btnClearDB.addEventListener("click", clearDB);

window.addEventListener('load', function() {
  var contentHeight = document.querySelector('.content').offsetHeight;
  var windowHeight = window.innerHeight;
  var footer = document.querySelector('footer');
  if (contentHeight < windowHeight) {
    footer.style.position = 'fixed';
    footer.style.bottom = 0;
  }
});

// Add event listener to load items on page load
window.addEventListener("load", loadItems);