CREATE DATABASE myg;

USE myg;

CREATE TABLE Users (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
    Plan VARCHAR(255),
    Start_Date DATE,
    End_Date DATE,
    Completed_Workouts INT,
    Type INT
);

INSERT INTO users (id, name, email, password, plan, start_date, end_date, completed_Workouts, type)
 VALUES (1, 'admin', 'none', '$2a$10$dRsvxB/THcpcQ6FHe6yjyeV9pfd.ML2UuUIL51WGdJ90mMCQSv1jW', 'none', 'none', 'none', 0, 2);


