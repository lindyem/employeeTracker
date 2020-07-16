const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB",
});

//FUNCTION TO MAKE IT PRINT IN CONSOLE
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");

  handleQuerySelect();
});

async function handleQuerySelect() {
  const userSelectInput = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?.",
      name: "choice",
      choices: [
        "1. View All Employees",
        "2. View All Departments",
        "3. View All Roles",
        "4. Add Employee",
        "5. Add Department",
        "6. Add Role",
        "7. Update Employee Role",
      ],
    },
  ]);

  switch (userSelectInput.choice.charAt(0)) {
    case "1":
      getAllEmployees();
      break;
    case "2":
      getAllDepartments();
      break;
    case "3":
      getAllRoles();
      break;
    case "4":
      addEmployee();
      break;
    case "5":
      addDepartment();
      break;
    case "6":
      addRole();
      break;
    case "7":
      updateEmployeeRole();
      break;
    default:
      break;
  }
}

function getAllEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    connection.end();
  });
}
function getAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    connection.end();
  });
}

function getAllRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    connection.end();
  });
}

async function addEmployee() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter employee first name",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter employee last name",
      name: "last_name",
    },
    {
      type: "input",
      message: "Enter employee role id",
      name: "role_id",
    },
    {
      type: "input",
      message:
        "Enter employee manager id (Leave null if employee does not have a manager)",
      name: "manager_id",
    },
  ]);
  connection.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [
      userInput.first_name,
      userInput.last_name,
      userInput.role_id,
      userInput.manager_id || null,
    ],
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("Employee added!");
      connection.end();
    }
  );
}

async function addDepartment() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter department name",
      name: "department_name",
    },
  ]);
  connection.query(
    "INSERT INTO department (name) VALUES (?)",
    [userInput.department_name],
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("Department added!");
      connection.end();
    }
  );
}

async function addRole() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter role title",
      name: "title",
    },
    {
      type: "input",
      message: "Enter role salary",
      name: "salary",
    },
    {
      type: "input",
      message: "Enter role department id",
      name: "department_id",
    },
  ]);
  connection.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [userInput.title, userInput.salary, userInput.department_id],
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("Role added!");
      connection.end();
    }
  );
}

async function updateEmployeeRole() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee id you wish to update",
      name: "employee_id",
    },
    {
      type: "input",
      message: "Enter new role id",
      name: "role_id",
    },
  ]);
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        role_id: userInput.role_id,
      },
      {
        id: userInput.employee_id,
      },
    ],
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("Employee role updated!");
      connection.end();
    }
  );
}
