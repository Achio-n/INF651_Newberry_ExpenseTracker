document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseTableBody = document.getElementById('expenses-table-body');

  loadExpenses();

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: document.getElementById('expense-date').value,
      category: document.getElementById('expense-category').value,
      amount: parseFloat(document.getElementById('expense-amount').value).toFixed(2)
    };

    saveExpenseEntry(entry);
    expenseForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('addExpenseModal')).hide();
    loadExpenses();
  });

  function saveExpenseEntry(entry) {
    const data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data.push(entry);
    localStorage.setItem("expenseData", JSON.stringify(data));
  }

  function loadExpenses() {
    expenseTableBody.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data.forEach(entry => addRowToTable(entry));
  }

  function addRowToTable(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.category}</td>
      <td>$${entry.amount}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editExpense(${entry.id})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${entry.id})">Delete</button>
      </td>
    `;
    expenseTableBody.appendChild(row);
  }

  window.deleteExpense = (id) => {
    let data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data = data.filter(entry => entry.id !== id);
    localStorage.setItem("expenseData", JSON.stringify(data));
    loadExpenses();
  };

  window.editExpense = (id) => {
    alert('Edit functionality coming soon!');
  };
});
