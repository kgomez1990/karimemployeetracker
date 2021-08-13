

INSERT INTO department (id, name)
VALUES (01, "Players"),
       (02, "Accounting"),
       (03, "Strength and Conditioning"),
       (04, "Nutrition"),
       (05, "Coaching");

INSERT INTO role (id, position, salary, department)
VALUES (10, "Quarterback", 1000.00, 01),
       (23, "Running Back", 800.00, 01),
       (100, "A/R Specialist", 70.00, 02),
       (200, "Lead Nutrionist", 50.00, 04),
       (300, "Offensive Coordinator", 500.00, 05),
       (400, "Head Trainer", 35.00, 03),
       (88, "Wide Receiver", 900.00, 01);


INSERT INTO employee (id, firstName, lastName, role_id, manager)
VALUES (1000,"Eli", "Manning", 10, 01),
       (2000,"Tiki", "Barber", 23, 01),
       (3000, "Mike", "Trainy", 400, 03),
       (4000, "Tommy", "Counter", 100, 02),
       (5000, "Johnnie", "Nutriter", 200, 04);