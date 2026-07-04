CREATE DATABASE AuthenticationSystem;
USE AuthenticationSystem ;

CREATE TABLE Users
(
	ID INT PRIMARY KEY auto_increment,
    Name VARCHAR(100),
    Email VARCHAR(100),
    PasswordHash VARCHAR(150),
    CreatedAt DATETIME Default Now()
);


SELECT * FROM Users;
DELETE FROM USERS WHERE ID = 6;


UPDATE Users
SET Email = 'example@email.com'
WHERE ID = 2;

SELECT * FROM Users;

CREATE TABLE PasswordResetOTPs (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) NOT NULL,
  OTP VARCHAR(6) NOT NULL,
  ExpiresAt DATETIME NOT NULL
);

SELECT * FROM PasswordResetOTPs