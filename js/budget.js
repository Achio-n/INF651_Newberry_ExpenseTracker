document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budgetForm');  // Match form id
  const budgetTableBody = document.getElementById('budget-table-body');

  function resetPage(){//once total are changed, reload the page to show new $
    sessionStorage.setItem("refreshOverview", "true");//reload the page to see changes
    window.location.href = "index.html"; // redirect back to dashboard
  }
  
  //if year or month is changed, reload the data
  document.getElementById('month-select').addEventListener('change', () => {
    loadBudget();
    updateBudgetSummary();
  });

  document.getElementById('year-select').addEventListener('change', () => {
    loadBudget();
    updateBudgetSummary();
  });


loadBudget();
updateBudgetSummary();


budgetForm.addEventListener('submit', (e) => {
e.preventDefault();
const budgetMonth = parseInt(document.getElementById('month-select').value);
const budgetYear = document.getElementById('year-select').value;



  const entry = {
  id: Date.now(),
  date: `${budgetYear}-${String(budgetMonth + 1).padStart(2, '0')}-01`, // FIXED: Added day and corrected month
  category: document.getElementById('budgetCategory').value,
  amount: parseFloat(document.getElementById('budgetAmount').value)
  };



  saveBudgetEntry(entry);
  budgetForm.reset();

  bootstrap.Modal.getInstance(document.getElementById('budgetModal')).hide();
  loadBudget();
  updateBudgetSummary();
});
  //save new entry and reload the page so panels have updated data
  function saveBudgetEntry(entry) {
    const data = JSON.parse(localStorage.getItem("budgetData")) || [];
    data.push(entry);
    localStorage.setItem("budgetData", JSON.stringify(data));
    resetPage();
  }
  //build dataset for budget
  function loadBudget() {
    const budgetTableBody = document.getElementById('budget-table-body');
    budgetTableBody.innerHTML = "";

    const selectedMonth = parseInt(document.getElementById('month-select').value) -1;
    const selectedYear = parseInt(document.getElementById('year-select').value);
    const data = JSON.parse(localStorage.getItem("budgetData")) || [];

    const filtered = data.filter(entry => {
      const date = new Date(entry.date);

     
      return (
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      );
});


  filtered.forEach(entry => addBudgetRowToTable(entry));
}

  //write the data to the output panel
  function addBudgetRowToTable(entry) {
  const budgetTableBody = document.getElementById('budget-table-body');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.date || `${entry.month}/${entry.year}`}</td>
    <td>${entry.category}</td>
    <td>$${parseFloat(entry.amount).toFixed(2)}</td>
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
    resetPage();
  };

  window.editBudget = (id) => {
    alert('Edit functionality coming soon!');
  };
});
//update summary total in h5 div
function updateBudgetSummary() {
  const selectedMonth = parseInt(document.getElementById('month-select').value) -1;
  const selectedYear = parseInt(document.getElementById('year-select').value);
  const data = JSON.parse(localStorage.getItem("budgetData")) || [];

  const filtered = data.filter(entry => {
    if (entry.date) {
      const date = new Date(entry.date);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    } else {
      // For older entries that might store month/year as numbers (1-based)
      return (entry.month - 1) === selectedMonth && entry.year === selectedYear;
    }
});


  const total = filtered.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

  const summaryElement = document.getElementById('budgetTotal');
  if (summaryElement) {
    summaryElement.textContent = `$${total.toFixed(2)}`;
  }
}
