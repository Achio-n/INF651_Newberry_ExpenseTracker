document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseTableBody = document.getElementById('expenses-table-body');
  
  function resetPage(){//once total are changed, reload the page to show new $
    sessionStorage.setItem("refreshOverview", "true");//reload the page to see changes
    window.location.href = "index.html"; // redirect back to dashboard
  }
  //load expenses and summary. Listen for a month or year to be changed and then update again.
  loadExpenses();
  updateExpenseSummary()
  document.getElementById('month-select').addEventListener('change', () => {
  loadExpenses();
  updateExpenseSummary();
});

document.getElementById('year-select').addEventListener('change', () => {
  loadExpenses();
  updateExpenseSummary();
});
//listen for a submit and then reload data again to show new values instantly.
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
    updateExpenseSummary();
  });
//save new expense entry and reload the page. 
  function saveExpenseEntry(entry) {
    const data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data.push(entry);
    localStorage.setItem("expenseData", JSON.stringify(data));
    resetPage();
  }
//load expenses by pulling the expense data and filtering by month and year
 function loadExpenses() {
  const expenseTableBody = document.getElementById('expenses-table-body');
  expenseTableBody.innerHTML = "";

  const selectedMonth = parseInt(document.getElementById('month-select').value);
  const selectedYear = parseInt(document.getElementById('year-select').value);
  const data = JSON.parse(localStorage.getItem("expenseData")) || [];

  const filtered = data.filter(entry => {
    const date = new Date(entry.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    );
  });

  filtered.forEach(entry => addRowToTable(entry));

}

  //load each row of data once it has been filtered. added edit and delete but only delete is set up.
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
//when deleting, reload data and page.
  window.deleteExpense = (id) => {
    let data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data = data.filter(entry => entry.id !== id);
    localStorage.setItem("expenseData", JSON.stringify(data));
    loadExpenses();
    resetPage();
  };
//remove when edit feature is complete. 
  window.editExpense = (id) => {
    alert('Edit functionality coming soon!');
  };
});
//update expenses total.
function updateExpenseSummary() {
  const selectedMonth = parseInt(document.getElementById('month-select').value);
  const selectedYear = parseInt(document.getElementById('year-select').value);
  const data = JSON.parse(localStorage.getItem("expenseData")) || [];

  const filtered = data.filter(entry => {
    const date = new Date(entry.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    );
  });

  const total = filtered.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

  const summaryElement = document.getElementById('expenseTotal');
  if (summaryElement) {
    summaryElement.textContent = `$${total.toFixed(2)}`;
  }
}
