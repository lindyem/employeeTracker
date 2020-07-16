INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Engineering");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales person", 45000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 3);
 

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriguez", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Warren", "Buffet", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bill", "Gates", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Wozniak", 5, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Balmer", 5, 5);


