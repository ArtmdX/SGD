const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");
const btnClear = document.querySelector("#btnClear");

let items = [];

function clearDB() {
  // Password Modal
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
      // Open confirmation modal
      const confirmDialog = document.createElement("div");
      confirmDialog.innerHTML = "Você tem certeza que deseja limpar o banco de dados? Esta ação é irreversível!";
      confirmDialog.style.position = "absolute";
      confirmDialog.style.top = "50%";
      confirmDialog.style.left = "50%";
      confirmDialog.style.transform = "translate(-50%, -50%)";
      confirmDialog.style.background = "white";
      confirmDialog.style.padding = "30px";
      confirmDialog.style.border = "1px solid black";
      confirmDialog.style.borderRadius = "15px";
      confirmDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

      const confirmButton = document.createElement("button");
      confirmButton.onclick = () => {
        items = []; // Clear items array
        loadItens(); // Reload table with empty items
        getTotals(); // Update counts after clearing the database
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };
      confirmButton.textContent = "Sim, limpar";
      confirmButton.style.background = "BLUE"; // Green background
      confirmButton.style.color = "#FFFFFF"; // White text
      confirmButton.style.border = "none";
      confirmButton.style.padding = "10px 20px";
      confirmButton.style.borderRadius = "5px";
      confirmButton.style.cursor = "pointer";
      confirmButton.style.margin = "10px"; /* Add margin to the buttons */
      

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar/Sair";
      cancelButton.style.background = "BLUE"; // Orange background
      cancelButton.style.color = "#FFFFFF"; // White text
      cancelButton.style.border = "none";
      cancelButton.style.padding = "10px 20px";
      cancelButton.style.borderRadius = "5px";
      cancelButton.style.cursor = "pointer";
      cancelButton.onclick = () => {
        document.body.removeChild(passwordDialog);
        document.body.removeChild(confirmDialog);
      };

      // Add margin to the buttons
      confirmButton.style.marginRight = "10px"; // Add 10px margin to the right of the confirm button
      cancelButton.style.marginLeft = "10px"; // Add 10px margin to the left of the cancel button

      confirmDialog.appendChild(confirmButton);
      confirmDialog.appendChild(cancelButton);

      document.body.appendChild(confirmDialog);
    } else {
      alert("Senha incorreta!");
    }
  });
}

btnNew.addEventListener('click', () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  items.push({
    desc: descItem.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
  });

  loadItens();

  descItem.value = "";
  amount.value = "";
});

function deleteItem(index) {
  // Create a confirmation modal
  const confirmDialog = document.createElement("div");
  confirmDialog.innerHTML = "Você tem certeza que deseja excluir este item?";
  confirmDialog.style.position = "absolute";
  confirmDialog.style.top = "50%";
  confirmDialog.style.left = "50%";
  confirmDialog.style.transform = "translate(-50%, -50%)";
  confirmDialog.style.background = "white";
  confirmDialog.style.padding = "30px";
  confirmDialog.style.border = "1px solid black";
  confirmDialog.style.borderRadius = "15px";
  confirmDialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  const confirmButton = document.createElement("button");
  confirmButton.onclick = () => {
    items.splice(index, 1); // Remove item from array
    loadItens(); // Reload table with updated items
    getTotals(); // Update counts after deleting the item
    document.body.removeChild(confirmDialog);
  };
  confirmButton.textContent = "Sim, excluir";
  confirmButton.style.background = "BLUE"; // Green background
  confirmButton.style.color = "#FFFFFF"; // White text
  confirmButton.style.border = "none";
  confirmButton.style.padding = "10px 20px";
  confirmButton.style.borderRadius = "5px";
  confirmButton.style.cursor = "pointer";
  confirmButton.style.margin = "10px"; /* Add margin to the buttons */
  

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar/Sair";
  cancelButton.style.background = "BLUE"; // Orange background
  cancelButton.style.color = "#FFFFFF"; // White text
  cancelButton.style.border = "none";
  cancelButton.style.padding = "10px 20px";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.cursor = "pointer";
  cancelButton.onclick = () => {
    document.body.removeChild(confirmDialog);
  };

  // Add margin to the buttons
  confirmButton.style.marginRight = "10px"; // Add 10px margin to the right of the confirm button
  cancelButton.style.marginLeft = "10px"; // Add 10px margin to the left of the cancel button

  confirmDialog.appendChild(confirmButton);
  confirmDialog.appendChild(cancelButton);

  document.body.appendChild(confirmDialog);
}

function loadItens() {
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.desc}</td>
      <td>R$ ${item.amount}</td>
      <td class="columnType">${
        item.type === "Entrada"
          ? '<i class="bx bxs-chevron-up-circle"></i>'
          : '<i class="bx bxs-chevron-down-circle"></i>'
      }</td>
      <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    tbody.appendChild(row);
  });
  getTotals();
}

function getTotals() {
  const totalIncomes = items.reduce((acc, item) => {
    if (item.type === "Entrada") {
      return acc + parseFloat(item.amount);
    }
    return acc;
  }, 0);

  const totalExpenses = items.reduce((acc, item) => {
    if (item.type === "Saída") {
      return acc + parseFloat(item.amount);
    }
    return acc;
  }, 0);

  const totalBalance = totalIncomes - totalExpenses;

  incomes.textContent = `R$ ${totalIncomes.toFixed(2)}`;
  expenses.textContent = `R$ ${totalExpenses.toFixed(2)}`;
  total.textContent = `R$ ${totalBalance.toFixed(2)}`;
}

btnClear.addEventListener('click', clearDB);