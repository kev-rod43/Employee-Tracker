DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
    id INT SET PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT SET PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2),
    department_id INT FOREIGN KEY REFERENCES department(id), 
);

CREATE TABLE employee(
    id INT SET PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT FOREIGN KEY REFERENCES role(id),
    manager_id INT FOREIGN KEY REFERENCES employee(id),
);
