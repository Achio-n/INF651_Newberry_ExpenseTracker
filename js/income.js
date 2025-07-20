document.addEventListener('DOMContentLoaded', () => {
  const incomeForm = document.getElementById('income-form');
  const incomeTableBody = document.getElementById('income-table-body');

  loadIncome();

  incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: document.getElementById('income-date').value,
      source: document.getElementById('income-source').value,
      amount: parseFloat(document.getElementById('income-amount').value).toFixed(2)
    };

    saveIncomeEntry(entry);
    incomeForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('addIncomeModal')).hide();
    loadIncome();
  });

  function saveIncomeEntry(entry) {
    const data = JSON.parse(localStorage.getItem("incomeData")) || [];
    data.push(entry);
    localStorage.setItem("incomeData", JSON.stringify(data));
  }

  function loadIncome() {
    incomeTableBody.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("incomeData")) || [];
    data.forEach(entry => addRowToTable(entry));
  }

  function addRowToTable(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.source}</td>
      <td>$${entry.amount}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editIncome(${entry.id})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteIncome(${entry.id})">Delete</button>
      </td>
    `;
    incomeTableBody.appendChild(row);
  }

  window.deleteIncome = (id) => {
    let data = JSON.parse(localStorage.getItem("incomeData")) || [];
    data = data.filter(entry => entry.id !== id);
    localStorage.setItem("incomeData", JSON.stringify(data));
    loadIncome();
  };

  window.editIncome = (id) => {
    alert('Edit functionality coming soon!'); // You can implement modal editing here later
  };
});
