const inquirer = require('inquirer');
const Database = require("./utilities/Database.js");
let db = new Database("localhost", "root", "Potato");
//object holding all questions for prompt
let questions = {
  mainMenu: {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
  },

  addEmployee: [
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's role?",
      choices: () => {
        let formattedChoices = db.viewRoles().then(roles => roles[0].map(role => { return { name: role.title, value: role.id, } }))
        return formattedChoices
      }
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employee's manager?",
      choices: () => {
        let formattedChoices = db.viewEmployees()
          .then(employees => employees[0].map(employee => { return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id, } }))
          .then((choices) => {
            choices.unshift({ name: "None", value: "null" })
            return choices
          })
        return formattedChoices
      }
    }
  ],

  updateEmployeeRole: [
    {
      type: "list",
      name: "employee_id",
      message: "Which employee would you like to update?",
      choices: () => {
        let formattedChoices = db.viewEmployees().then(employees => employees[0].map(employee => { return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id, } }))
        return formattedChoices;
      }
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's new role?",
      choices: () => {
        let formattedChoices = db.viewRoles().then(roles => roles[0].map(role => { return { name: role.title, value: role.id, } }))
        return formattedChoices
      }
    }
  ],

  addRole: [
    {
      type: "input",
      name: "title",
      message: "What is the role's name?"
    },
    {
      type: "input",
      name: "salary",
      validate: (input) => {
        let validFloatRegex = /^[0-9]*\.[0-9]{2}$/;
        if (validFloatRegex.test(input)) {
          return true;
        } else {
          return "Salary must be a number with 2 decimal points"
        }
      },
      message: "What is the role's salary?"
    },
    {
      type: "list",
      name: "department_id",
      message: "What department does the new role belong in?",
      choices: () => {
        let formattedChoices = db.viewDpmnts().then(dpmnts => dpmnts[0].map(dpmnt => { return { name: dpmnt.name, value: dpmnt.id, } }))
        return formattedChoices
      }
    }
  ],

  addDpmnt: {
    type: "input",
    name: "dpmntName",
    message: "What is the department's name?"
  },
};
//CLI object that handles all user input throught inquirer
let CLI = {
  mainMenu: async () => {
    inquirer
      .prompt(questions.mainMenu)
      .then((answers) => {
        switch (answers.task) {
          case 'View All Employees':
            db.viewEmployees()
              .then((employees => console.table(employees[0])))
              .then(CLI.moreToDo)
            break;

          case 'Add Employee':
            inquirer.prompt(questions.addEmployee)
              .then(answers => db.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id))
              .then(CLI.moreToDo)
            break;

          case 'Update Employee Role':
            inquirer.prompt(questions.updateEmployeeRole)
              .then(answers => db.updateEmployeeRole(answers.employee_id, answers.role_id))
              .then(CLI.moreToDo)
            break;

          case 'View All Roles':
            db.viewRoles().then((roles => console.table(roles[0])))
            .then(CLI.moreToDo)
            break;

          case 'Add Role':
            inquirer.prompt(questions.addRole)
              .then(answers => db.addRole(answers.title, answers.salary, answers.department_id))
              .then(CLI.moreToDo)
            break;

          case 'View All Departments':
            db.viewDpmnts()
              .then((dpmnts => console.table(dpmnts[0])))
              .then(CLI.moreToDo)
            break;

          case 'Add Department':
            inquirer.prompt(questions.addDpmnt)
              .then(answers => db.addDpmnt(answers.dpmntName))
              .then(CLI.moreToDo)
            break;

          case 'Exit':
            CLI.close()
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  },

  close: async () => inquirer.prompt().ui.close(),

  moreToDo: async () => {
    inquirer.prompt({ type: "confirm", name: "moreToDo", message: "Is there more you would like to do?" })
      .then((answers) => { answers.moreToDo ? CLI.mainMenu() : CLI.close() })
  },
}

//initialize the db connection, then begin bring up the CLI
db.init().then(CLI.mainMenu())