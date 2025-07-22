// categorySpending.js
updateSpendingByCategory();

// Function to get total spending by category for the given month and year
function getSpendingByCategory(month, year) {
  const expenses = JSON.parse(localStorage.getItem("expenseData")) || [];
  
  // Filter expenses by month and year
const filtered = expenses.filter((expense) => {
  const [expYear, expMonth] = expense.date.split("-").map(Number);
  return expYear === year && expMonth === (month + 1);
});
console.log(`Filtering for year: ${year}, month: ${month}`);
console.log("Filtered expenses:", filtered);
const today = new Date();
const currentMonth = today.getMonth(); // 0 = Jan
const currentYear = today.getFullYear();

  // Sum amounts per category
  const spending = {};
  filtered.forEach(({ category, amount }) => {
    const amt = parseFloat(amount) || 0;
    spending[category] = (spending[category] || 0) + amt;
  });

  return spending; // { categoryName: totalAmount, ... }
  
}

// Function to display spending breakdown in the "Spending by Category" panel
function displaySpendingByCategory(spending) {
  // Find the panel, or create container if needed
  let panel = document.getElementById("spending-category-panel");

  if (!panel) {
    // Find the existing placeholder div with the text
    const placeholder = Array.from(document.querySelectorAll('main .panel'))
      .find(div => div.textContent.includes('Spending by Category'));
    
    if (!placeholder) {
      console.error("Spending by Category panel not found in DOM.");
      return;
    }

    // Clear placeholder and assign an id for future updates
    placeholder.textContent = "";
    placeholder.id = "spending-category-panel";
    panel = placeholder;
  } else {
    panel.textContent = ""; // clear existing
  }

  // Create a table to show spending by category
  const table = document.createElement("table");
  table.className = "table table-sm table-bordered";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Category</th>
      <th class="text-end">Amount</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  // Convert spending object to array and sort descending by amount
  const sortedSpending = Object.entries(spending)
    .sort((a, b) => b[1] - a[1]);

  if (sortedSpending.length === 0) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `<td colspan="2" class="text-center">No spending data for selected period.</td>`;
    tbody.appendChild(noDataRow);
  } else {
    sortedSpending.forEach(([category, amount]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="text-start">${category}</td>
        <td class="text-end">$${amount.toFixed(2)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  table.appendChild(tbody);
  panel.appendChild(table);
}

// Called on page load and on change of month/year dropdowns
function updateSpendingByCategory() {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");

  if (!monthSelect || !yearSelect) {
    console.warn("Month or Year select elements not found.");
    return;
  }

  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);

  const spending = getSpendingByCategory(month, year);
  displaySpendingByCategory(spending);
}


// Hook into DOMContentLoaded and dropdown change events
document.addEventListener("DOMContentLoaded", () => {
  updateSpendingByCategory();

  document.getElementById("month-select").addEventListener("change", updateSpendingByCategory);
  document.getElementById("year-select").addEventListener("change", updateSpendingByCategory);
});


