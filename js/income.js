document.addEventListener('DOMContentLoaded', () => {
  const incomeForm = document.getElementById('income-form');
  const incomeTableBody = document.getElementById('income-table-body');

  function resetPage(){//once total are changed, reload the page to show new $
    sessionStorage.setItem("refreshOverview", "true");//reload the page to see changes
    window.location.href = "index.html"; // redirect back to dashboard
  }

  loadIncome();
  updateIncomeSummary();

  document.getElementById('month-select').addEventListener('change', () => {
  loadIncome();
  updateIncomeSummary();
});

document.getElementById('year-select').addEventListener('change', () => {
  loadIncome();
  updateIncomeSummary();
});



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
    updateIncomeSummary();
    sessionStorage.setItem("refreshOverview", "true");//reload the page to see changes
    window.location.href = "index.html"; // redirect back to dashboard
  });

  function saveIncomeEntry(entry) {
    const data = JSON.parse(localStorage.getItem("incomeData")) || [];
    data.push(entry);
    localStorage.setItem("incomeData", JSON.stringify(data));
    resetPage();
  }

  function loadIncome() {
  incomeTableBody.innerHTML = "";

  const selectedMonth = parseInt(document.getElementById('month-select').value);
  const selectedYear = parseInt(document.getElementById('year-select').value);
  const data = JSON.parse(localStorage.getItem("incomeData")) || [];

  const filtered = data.filter(entry => {
    const date = new Date(entry.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    );
  });

  filtered.forEach(entry => addRowToTable(entry));
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
    resetPage();
  };

  window.editIncome = (id) => {
    alert('Edit functionality coming soon!'); // You can implement modal editing here later
  };
});

function updateIncomeSummary() {
  const selectedMonth = parseInt(document.getElementById('month-select').value);
  const selectedYear = parseInt(document.getElementById('year-select').value);
  const data = JSON.parse(localStorage.getItem("incomeData")) || [];

  const filtered = data.filter(entry => {
    const date = new Date(entry.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    );
  });

  const total = filtered.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

  const summaryElement = document.getElementById('incomeTotal');
  if (summaryElement) {
    summaryElement.textContent = `$${total.toFixed(2)}`;
  }
}
 renderOverview();
