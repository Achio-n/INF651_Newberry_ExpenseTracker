document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budgetForm');  // Match form id
  const budgetTableBody = document.getElementById('budget-table-body');

  loadBudget();

  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: `${document.getElementById('budgetYear').value}-${document.getElementById('budgetMonth').value}`,
      category: document.getElementById('budgetCategory').value,
      amount: parseFloat(document.getElementById('budgetAmount').value).toFixed(2)
    };

    saveBudgetEntry(entry);
    budgetForm.reset();
    // Fix modal id here
    bootstrap.Modal.getInstance(document.getElementById('budgetModal')).hide();
    loadBudget();
  });

  function saveBudgetEntry(entry) {
    const data = JSON.parse(localStorage.getItem("budgetData")) || [];
    data.push(entry);
    localStorage.setItem("budgetData", JSON.stringify(data));
  }

  function loadBudget() {
    budgetTableBody.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("budgetData")) || [];
    data.forEach(entry => addRowToTable(entry));
  }

  function addRowToTable(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.category}</td>
      <td>$${entry.amount}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editBudget(${entry.id})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteBudget(${entry.id})">Delete</button>
      </td>
    `;
    budgetTableBody.appendChild(row);
  }

  window.deleteBudget = (id) => {
    let data = JSON.parse(localStorage.getItem("budgetData")) || [];
    data = data.filter(entry => entry.id !== id);
    localStorage.setItem("budgetData", JSON.stringify(data));
    loadBudget();
  };

  window.editBudget = (id) => {
    alert('Edit functionality coming soon!');
  };
});
