INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"); 

INSERT INTO role (title,salary,department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3),
       ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4);
       
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Olivia", "Carter", 1, null),
       ("Kevin", "Rodriguez", 2, 1),
       ("Elijah", "Morgan" ,3 , null),
       ("Ava", "Reynolds", 4, 3),
       ("Liam", "Donovan",5 , null),
       ("Sophia", "Hayes",6 , 5),
       ("Jackson", "Patel",7 , null),
       ("Emma", "Wallace",8 , 7);


       