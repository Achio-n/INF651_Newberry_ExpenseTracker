
//array of categories. This could also be stored in localstorage. An upgrade would be to allow user to add or delete categories. Have I mentioned I miss working with databases?
//This page simply builds the list of categories in to a select list for budget and expenses modals
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
