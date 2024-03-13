const mysql = require("mysql2/promise");

class Database {
    constructor(host, user, password,) {

        this.config =
        {
            host: host,
            user: user,
            password: password,
            database: 'employee_tracker_db'
        };
    };
    async init() {
        this.connection = await mysql.createConnection(this.config)
        return

    };
    async viewDpmnts() {
        try {
            let data = await this.connection.query('SELECT * FROM department')
            return data;
        } catch (err) {
            console.log(err)
        }

    };

    async viewRoles() {
        try {
            let data = await this.connection.query(
                `SELECT role.id, role.title, role.salary, department.name AS department_name 
                FROM role
                    JOIN department
                    ON role.department_id = department.id`)
            return data;
        } catch (err) {
            console.log(err)
        }
    };

    async viewEmployees() {
        try {
            let data = await this.connection.query(
                `SELECT employees.id, employees.first_name, employees.last_name, role.title as role_title,department.name as department, concat(managers.first_name, ' ', managers.last_name) as manager
            from employee employees
                left join employee managers
                    on managers.id = employees.manager_id
                left join role
                    on employees.role_id = role.id
                left join department
                    on role.department_id = department.id`)
            return data
        } catch (err) {
            console.log(err)
        }
    };

    async addDpmnt(name) {
        try {
            let query = await this.connection.query(
                `INSERT INTO department (name)
                VALUES ('${name}')`);

            return query;
        } catch (err) {
            console.log(err)
        }
    };

    async addRole(title, salary, department_id) {
        try {
            let query = await this.connection.query(
                `INSERT INTO role (title,salary,department_id)
                VALUES ('${title}', '${salary}', ${department_id})`)

            return query;
        } catch (err) {
            console.log(err)
        }
    };

    async addEmployee(first_name, last_name, role_id, manager_id) {
        try {
            let query = await this.connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id)
            VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`)

            return query;
        } catch (err) {
            console.log(err)
        }
    };

    async updateEmployeeRole(employee_id, role_id) {
        try {
            let query = await this.connection.query(
                `UPDATE employee
                SET role_id = ${role_id}
                WHERE employee.id = ${employee_id}`)
            return query;
        } catch (err) {
            console.log(err)
        }
    };
};

module.exports = Database;