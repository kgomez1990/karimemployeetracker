const table = require('console.table');
const mysql = require('mysql2');

const inquirer = require('inquirer');

let newRoles = []
let newManager = []
var employees = []
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'giants_db'
    },
    console.log(`Connected to the giants_db database.`)
);

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
            case "Update Employee":
                updateEmployees()
                break;
            case "Add Employee":
                AddEmployee()
                break;
            case "Add Role":
                addRoles()
                break;
            case "Add Department":
                addDepartment()
                break;
        }
    })
}


function chooseRole() {
    db.query('Select title From role', function (err, res) {
        for (let i = 0; i < res.length; i++) {
            newRoles.push(res[i].title)
        }
    })
    return newRoles
}

function chooseManager() {
    db.query('Select first_name, last_name From employee where manager_id is NULL', function (err, res) {
        for (let i = 0; i < res.length; i++) {
            newManager.push(res[i].first_name)
        }
    })
    return newManager
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


function addDepartment() {

    inquirer
        .prompt([
            {
                name: 'department',
                type: 'input',
                message: 'Please enter new Department name: ',
            },
        ])
        .then(function (data) {
            db.query('insert INTO department SET ?', {
                name: data.department,
            }, function (err) {
                console.table(data)
                starterPrompt();
            })
        }
        )
}


function addRoles() {
    inquirer
        .prompt([
            {
                name: 'selectedTitle',
                type: 'input',
                message: "Please enter the role you'll like to add: "
            },
            {
                name: 'selectedSalary',
                type: 'input',
                message: "What is the Salary of this role?: "
            },
        ])
        .then(function (data) {
            db.query('insert role INTO SET ?', {
                title: data.selectedTitle,
                salary: data.selectedSalary
            }, function (err) {
                console.table(data)
                starterPrompt();
            })
        }
        )
}

function AddEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'New Employee first name: ',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'New Employee Last Name: ',
                choices: chooseRole()
            },
            {
                name: 'contact',
                type: 'list',
                message: 'Who is the manager?',
                choices: chooseManager()
            },
        ])
        .then(function (data) {
            var roleId = chooseRole().indexOf(data.role) + 1
            var managerId = chooseManager().indexOf(data.choice) + 1

            db.query('Insert into employee ?', {
                first_name: data.first_name,
                last_name: data.last_name,
                manager_Id: managerId,
                role_id: roleId
            }, function (err) {
                console.table(data)
                starterPrompt();
            })
        })
}


function updateEmployees() {
    db.query("SELECT * from employee JOIN role on employee.role_id = role.id;", function (err, res) {
        inquirer
            .prompt([
                {
                    name: 'UpdatedId',
                    type: 'list',
                    message: "Please choose an employee you'd like to update",
                    choices: function () {

                        for (var i = 0; i < res.length; i++) {
                            employees.push(res[i].last_name)
                        }
                        return employees;
                    },
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Please choose the New Role: ',
                    choices: chooseRole()
                },
            ]).then(function (data) {
                var roleId = chooseRole().indexOf(data.role) + 1;
                db.query('UPDATE employee SET Where ?', {
                    id: data.UpdateId,
                    role_id: data.roleId
                }, function (err) {
                    console.log(data)
                    starterPrompt();
                })
            })

    })
}

starterPrompt();
