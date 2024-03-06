const mysql2 = require("mysql2");

class Database {
    constructor(host, user, password,) {

        this.connection = mysql2.createConnection(
            {
                host: host,
                // MySQL username,
                user: user,
                // MySQL password
                password: password,
                database: 'employee_tracker_db'
            })
    };

    async viewDpmnts() {
        this.connection.query('SELECT * FROM department', function (err, results) {
            if (err) { console.log(err) };
            return results;
        })
    };

    async viewRoles() {
        this.connection.query(
            `SELECT role.id, role.title, role.salary, department.name AS department_name 
            FROM role
                JOIN department
                ON role.department_id = department.id`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };

    async viewEmployees() {
        this.connection.query(
            `SELECT employees.id, employees.first_name, employees.last_name, role.title as role_title,department.name as department, concat(managers.first_name, ' ', managers.last_name) as manager
            from employee employees
                left join employee managers
                    on managers.id = employees.manager_id
                left join role
                    on employees.role_id = role.id
                left join department
                    on role.department_id = department.id`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };

    async addDpmnt(name) {
        this.connection.query(
            `INSERT INTO department 
                VALUES (${name})`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };

    async addRole(title, salary, department_id) {
        this.connection.query(
            `INSERT INTO role (title,salary,department_id)
                VALUES (${title}, ${salary}, ${department_id})`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };

    async addEmployee(first_name, last_name, role_id, manager_id){
        this.connection.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id)
            VALUES (${first_name}, ${last_name}, ${role_id}, ${manager_id}),`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };
    
    async updateEmployeeRole(employee_id, role_id) {
        this.connection.query(
            `UPDATE employee
                SET role = ${role_id}}
                WHERE employee id = ${employee_id}`,
            function (err, results) {
                if (err) { console.log(err) };
                return results;
            })
    };
};