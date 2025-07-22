// overview.js

function getMonthName(monthNumber) {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber] || "";
}

function getDataTotals() {
  const budgetData = JSON.parse(localStorage.getItem('budgetData')) || [];
  const incomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
  const expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];

  const selectedMonth = parseInt(document.getElementById('month-select').value);
  const selectedYear = parseInt(document.getElementById('year-select').value);

  // Sum budgets for the selected month/year
  const totalBudget = budgetData.reduce((sum, entry) => {
    if (!entry.date) return sum;
    const date = new Date(entry.date);
    if (date.getFullYear() === selectedYear && (date.getMonth() + 1) === selectedMonth) {
      return sum + parseFloat(entry.amount);
    }
    return sum;
  }, 0);

  // Sum income for selected month/year
  const totalIncome = incomeData.reduce((sum, entry) => {
    if (!entry.date) return sum;
    const date = new Date(entry.date);
    if (date.getFullYear() === selectedYear && (date.getMonth()) === selectedMonth) {
      return sum + parseFloat(entry.amount);
    }
    return sum;
  }, 0);

  // Sum expenses for selected month/year
  const totalExpenses = expenseData.reduce((sum, entry) => {
    if (!entry.date) return sum;
    const date = new Date(entry.date);
    if (date.getFullYear() === selectedYear && (date.getMonth()) === selectedMonth) {
      return sum + parseFloat(entry.amount);
    }
    return sum;
  }, 0);

  return { totalBudget, totalIncome, totalExpenses, selectedMonth, selectedYear };
}

function updateOverviewSummary() {
  const { totalBudget, totalIncome, totalExpenses, selectedMonth, selectedYear } = getDataTotals();
  const summaryElement = document.getElementById('overview-summary');

  const balance = totalIncome - totalExpenses ;

  // Determine color based on balance
  let colorClass = '';
  if (balance > 0) {
    colorClass = 'text-success';  // green
  } else if (balance < 200 && balance > 0) {
    colorClass = 'text-warning';  // yellow
  } else  {
    colorClass = 'text-danger';   // red
  }

  const monthName = getMonthName(selectedMonth);
  summaryElement.className = `fs-5`;
  let net = totalBudget - totalExpenses;
summaryElement.innerHTML = `
  <div class="mb-2 fw-bold">Summary for <strong>${monthName} ${selectedYear}</strong></div>
  <div > Income: $${totalIncome.toFixed(2)}'</span></div>  
  <hr>
  <div class="text-end">Expense Budget: $${totalBudget.toFixed(2)}</div> 
  <div class="text-end">Expenses: $${totalExpenses.toFixed(2)}</div>
  <div class="text-end">Net Expenses: $${net.toFixed(2)} </div>
  <div class="text-end"><span class="${colorClass} fw-bold">Net Balance: $${balance.toFixed(2)}</span></div>`
;
}

// Initialize on DOM load and update on month/year change
document.addEventListener('DOMContentLoaded', () => {
  updateOverviewSummary();

  document.getElementById('month-select').addEventListener('change', updateOverviewSummary);
  document.getElementById('year-select').addEventListener('change', updateOverviewSummary);
});

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("refreshOverview") === "true") {
    renderOverview(); 
    sessionStorage.removeItem("refreshOverview");
  }
});