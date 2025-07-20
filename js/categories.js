
window.categories = [
  "Mortgage",
  "Rent",
  "Electricity",
  "Water",
  "Natural Gas",
  "Internet",
  "Cellular",
  "Gasoline",
  "Groceries",
  "Dining Out",
  "Health Insurance",
  "Auto Insurance",
  "Home Insurance",
  "Healthcare",
  "Credit Card",
  "Ally",
  "Fidelity",
  "Entertainment",
  "Education",
  "Clothing",
  "Subscriptions",
  "Miscellaneous"
];


function populateCategoryDropdown(dropdownId) {
  const select = document.getElementById(dropdownId);
  if (!select) return;

  select.innerHTML = ''; // Clear existing options

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '-- Select Category --';
  select.appendChild(defaultOption);

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateCategoryDropdown('expense-category');
  populateCategoryDropdown('budget-category');
});
