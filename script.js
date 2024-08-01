let expensesList = [];

document.getElementById('add-expense').addEventListener('click', addExpense);
document.getElementById('filter-category').addEventListener('change', filterExpenses);

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const price = parseFloat(document.getElementById('expense-price').value);
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;

    if (name && price && date) {
        const expense = { id: Date.now(), name, price, date, category };
        expensesList.push(expense);
        renderExpenses(expensesList);
        updateTotal();
        clearInputs();
    } else {
        alert("Please fill in all fields");
    }
}

function renderExpenses(expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.price.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-price').value = '';
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').value = 'Food';
}

function deleteExpense(id) {
    expensesList = expensesList.filter(exp => exp.id !== id);
    renderExpenses(expensesList);
    updateTotal();
}

function editExpense(id) {
    const expense = expensesList.find(exp => exp.id === id);

    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-price').value = expense.price;
    document.getElementById('expense-date').value = expense.date;
    document.getElementById('expense-category').value = expense.category;

    deleteExpense(id);
}

function updateTotal() {
    const total = expensesList.reduce((sum, exp) => sum + exp.price, 0);
    document.getElementById('total-expenses').textContent = total.toFixed(2);
}

function filterExpenses() {
    const category = document.getElementById('filter-category').value;
    const filteredExpenses = category === 'All' ? expensesList : expensesList.filter(exp => exp.category === category);
    renderExpenses(filteredExpenses);
}
