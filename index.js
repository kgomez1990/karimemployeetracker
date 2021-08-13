const table = require('console.table');
const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'giants_db'
    },
    console.log(`Connected to the giants_db database.`)
);

starterPrompt()
function starterPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Update Employee",
                "Add Employee",
                "Add Role",
                "Add Department"
            ]
        }
    ]).then(function (data) {
        switch (data.choice) {
            case "View All Departments":
                viewAllDepartments()
                break;
            case "View All Roles":
                viewAllRoles()
                break;
            case "View All Employees":
                viewAllEmployees()
                break;
            case "Update":
                updateAllEmployees()
                break;
            case "Add Employee":
                viewAddEmployee()
                break;
            case "Add Role":
                viewAllRoles()
                break;
            case "Add Department":
                addDepartments()
                break;
        }
    })
}

function viewAllDepartments() {

    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        starterPrompt();
    });
}

function viewAllRoles() {

    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        starterPrompt();
    });
}


function viewAllEmployees() {

    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        starterPrompt();
    });
}



