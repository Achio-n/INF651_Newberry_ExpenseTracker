const incomeSources = [
  "Salary",
  "Freelance",
  "Investment Dividends",
  "Rental Income",
  "Bonus",
  "Gift"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad2(num) {
  return num.toString().padStart(2, '0');
}

function randomDate(year, month) {
  // Returns yyyy-mm-dd with a random day in the month
  const day = getRandomInt(1, 28);
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function generateDummyBudgetData() {
  const data = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-based

  for (let i = 0; i < 24; i++) {
    // Calculate year and month going backward
    let month = currentMonth - i;
    let year = currentYear;
    if (month <= 0) {
      month += 12;
      year -= 1;
    }

    let entriesCount = getRandomInt(4, 7);
    for (let j = 0; j < entriesCount; j++) {
      data.push({
        id: Date.now() + i * 100 + j,
        date: `${year}-${pad2(month)}`,  // budget uses year-month only
        category: categories[getRandomInt(0, categories.length - 1)],
        amount: (Math.random() * 1000 + 20).toFixed(2)
      });
    }
  }
  localStorage.setItem('budgetData', JSON.stringify(data));
  return data.length;
}

function generateDummyIncomeData() {
  const data = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  for (let i = 0; i < 24; i++) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month <= 0) {
      month += 12;
      year -= 1;
    }

    let entriesCount = getRandomInt(2, 4);
    for (let j = 0; j < entriesCount; j++) {
      data.push({
        id: Date.now() + 100000 + i * 100 + j,
        date: randomDate(year, month),
        source: incomeSources[getRandomInt(0, incomeSources.length - 1)],
        amount: (Math.random() * 5000 + 1000).toFixed(2)
      });
    }
  }
  localStorage.setItem('incomeData', JSON.stringify(data));
  return data.length;
}

function generateDummyExpenseData() {
  const data = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  for (let i = 0; i < 24; i++) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month <= 0) {
      month += 12;
      year -= 1;
    }

    let entriesCount = getRandomInt(5, 10);
    for (let j = 0; j < entriesCount; j++) {
      data.push({
        id: Date.now() + 200000 + i * 100 + j,
        date: randomDate(year, month),
        category: categories[getRandomInt(0, categories.length - 1)],
        amount: (Math.random() * 500 + 10).toFixed(2)
      });
    }
  }
  localStorage.setItem('expenseData', JSON.stringify(data));
  return data.length;
}

function loadDummyData() {
  const bCount = generateDummyBudgetData();
  const iCount = generateDummyIncomeData();
  const eCount = generateDummyExpenseData();

  alert(`Inserted:\n- ${bCount} Budget entries\n- ${iCount} Income entries\n- ${eCount} Expense entries`);

  location.reload();
}

function clearAllData() {
  localStorage.removeItem('budgetData');
  localStorage.removeItem('incomeData');
  localStorage.removeItem('expenseData');
  alert('All budget, income, and expense data cleared.');
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const contactLink = document.getElementById('contact-link');
  const termsLink = document.getElementById('terms-link');

  if (contactLink) {
    contactLink.addEventListener('click', e => {
      e.preventDefault();
      loadDummyData();
    });
  }

  if (termsLink) {
    termsLink.addEventListener('click', e => {
      e.preventDefault();
      clearAllData();
    });
  }
});
