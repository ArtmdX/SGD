const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const name = document.querySelector("#name");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");
const btnClearDB = document.querySelector("#btnClearDB");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

function clearDB() {
    localStorage.clear();
    loadItems(); // Recarrega a tabela com itens vazios
}

btnNew.onclick = () => {
    if (descItem.value === "" || name.value === "" || type.value === "Selecione") {
        return alert("Preencha todos os campos!");
    }

    items.push({
        desc: descItem.value,
        name: name.value,
        type: type.value,
        status: "Registrado" // Definindo o status como "Registrado" por padrão
    });

    setItemsDB();

    loadItems();

    descItem.value = "";
    name.value = "";
};

function confirmItem(index) {
    items[index].status = "Confirmado"; // Alterando o status para "Confirmado"
    setItemsDB();
    loadItems();
}

function cancelItem(index) {
    items[index].status = "Cancelado"; // Alterando o status para "Cancelado"
    setItemsDB();
    loadItems();
}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.desc}</td>
        <td>${item.status}</td>
        <td class="columnAction">
            <button class="confirmar" onclick="confirmItem(${index})">Confirmar</button>
            <button class="cancelar" onclick="cancelItem(${index})">Cancelar</button>
        </td>
    `;

    tbody.appendChild(tr);
}

function loadItems() {
    items = getItemsDB();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });

    // Atualizar contagens na tela
    updateCounts();
}

function updateCounts() {
    const registeredCount = items.filter(item => item.status === "Registrado").length;
    const confirmedCount = items.filter(item => item.status === "Confirmado").length;
    const canceledCount = items.filter(item => item.status === "Cancelado").length;

    incomes.textContent = registeredCount;
    expenses.textContent = confirmedCount;
    total.textContent = canceledCount;
}

const getItemsDB = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItemsDB = () => localStorage.setItem("db_items", JSON.stringify(items));

loadItems();

btnClearDB.addEventListener("click", clearDB); // Adicionando evento de limpar o banco de dados