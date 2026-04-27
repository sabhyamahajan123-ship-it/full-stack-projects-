const readline = require('readline');

// ─────────────────────────────────────────
//  Setup
// ─────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let employees = [];

// Helper: wrap rl.question in a Promise so we can use async/await
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ─────────────────────────────────────────
//  Menu
// ─────────────────────────────────────────

async function menu() {
  console.log(`
=== Employee Management System ===
  1. Add Employee
  2. List Employees
  3. Update Employee
  4. Delete Employee
  5. Exit
`);

  const choice = (await ask('Select an option: ')).trim();

  switch (choice) {
    case '1': await addEmployee();    break;
    case '2': await listEmployees();  break;
    case '3': await updateEmployee(); break;
    case '4': await deleteEmployee(); break;
    case '5':
      console.log('Goodbye!');
      rl.close();
      return;
    default:
      console.log('Invalid option. Please choose 1–5.');
      await menu();
  }
}

// ─────────────────────────────────────────
//  Add Employee
// ─────────────────────────────────────────

async function addEmployee() {
  const name = (await ask('Employee Name: ')).trim();
  if (!name) {
    console.log('Error: Name cannot be empty.');
    return menu();
  }

  const position = (await ask('Position: ')).trim();
  if (!position) {
    console.log('Error: Position cannot be empty.');
    return menu();
  }

  const salaryInput = await ask('Salary: ');
  const salary = parseFloat(salaryInput);
  if (isNaN(salary) || salary < 0) {
    console.log('Error: Please enter a valid salary.');
    return menu();
  }

  const newEmployee = {
    id: Date.now(),
    name,
    position,
    salary,
  };

  employees.push(newEmployee);
  console.log(`\n✓ Employee "${name}" added successfully!`);

  return menu();
}

// ─────────────────────────────────────────
//  List Employees
// ─────────────────────────────────────────

async function listEmployees() {
  if (employees.length === 0) {
    console.log('\nNo employees on record.');
    return menu();
  }

  console.log('\n── Employee List ──────────────────────');
  employees.forEach((emp, i) => {
    console.log(`
  #${i + 1}
  ID       : ${emp.id}
  Name     : ${emp.name}
  Position : ${emp.position}
  Salary   : $${emp.salary.toLocaleString()}`);
  });
  console.log(`\nTotal employees: ${employees.length}`);
  console.log('───────────────────────────────────────');

  return menu();
}

// ─────────────────────────────────────────
//  Update Employee
// ─────────────────────────────────────────

async function updateEmployee() {
  const idInput = await ask('Enter Employee ID to update: ');
  const emp = employees.find((e) => e.id === parseInt(idInput));

  if (!emp) {
    console.log('Error: Employee not found.');
    return menu();
  }

  console.log(`\nLeave a field blank to keep the current value.`);

  const name     = (await ask(`Name     [${emp.name}]: `)).trim();
  const position = (await ask(`Position [${emp.position}]: `)).trim();
  const salaryInput = await ask(`Salary   [${emp.salary}]: `);

  if (name)     emp.name     = name;
  if (position) emp.position = position;

  const salary = parseFloat(salaryInput);
  if (!isNaN(salary) && salary >= 0) emp.salary = salary;

  console.log(`\n✓ Employee "${emp.name}" updated successfully!`);
  return menu();
}

// ─────────────────────────────────────────
//  Delete Employee
// ─────────────────────────────────────────

async function deleteEmployee() {
  const idInput = await ask('Enter Employee ID to delete: ');
  const index = employees.findIndex((e) => e.id === parseInt(idInput));

  if (index === -1) {
    console.log('Error: Employee not found.');
    return menu();
  }

  const [removed] = employees.splice(index, 1);
  console.log(`\n✓ Employee "${removed.name}" deleted successfully!`);

  return menu();
}

// ─────────────────────────────────────────
//  Start
// ─────────────────────────────────────────

menu();