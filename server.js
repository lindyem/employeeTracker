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
      getAlbumData();
      break;
    case "6":
      getAlbumData();
      break;
    case "7":
      getAlbumData();
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
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [userInput.first_name, userInput.last_name, userInput.role_id, userInput.manager_id],
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log(res);
      connection.end();
    }
  );
}

//A query which returns all data for songs sung by a specific song
async function getSong() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter song name",
      name: "song",
    },
  ]);
  connection.query(
    "SELECT * FROM top5000 WHERE ?",
    {
      song: userInput.song,
    },
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log(res);
      connection.end();
    }
  );
}

//A query which returns all data for an artist on both tables
async function getAlbumData() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "Enter Artist name",
      name: "album",
    },
  ]);
  connection.query(
    "SELECT top5000.artist, top5000.year, topalbums.album, top5000.song FROM top5000 INNER JOIN topalbums ON (top5000.artist = topalbums.artist AND top5000.year = topalbums.year) WHERE top5000.artist = ?;",
    {
      song: userInput.album,
    },
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log(res);
      connection.end();
    }
  );
}
