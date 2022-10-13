CREATE DATABASE IF NOT EXISTS zipcodb;
USE zipcodb;

DROP TABLE IF EXISTS zipco_user;

CREATE TABLE zipco_user (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) DEFAULT NULL,
  last_name  VARCHAR(255) DEFAULT NULL,
  email      VARCHAR(255) NOT NULL,
  monthly_salary      VARCHAR(255) DEFAULT NULL,
  monthly_expenses    VARCHAR(255) DEFAULT NULL,
  is_active_account  BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (email)
);

DELIMITER //
CREATE PROCEDURE create_and_return_zipco_user(IN p_first_name VARCHAR(255), IN p_last_name VARCHAR(255), 
                  IN p_email VARCHAR(255), IN p_monthly_salary VARCHAR(255), IN p_monthly_expenses VARCHAR(255))
BEGIN
  INSERT INTO zipco_user(first_name, last_name, email, monthly_salary, monthly_expenses) VALUES (p_first_name, p_last_name, p_email, p_monthly_salary, p_monthly_expenses);
  
  SET @ZIPCO_USER_ID = LAST_INSERT_ID();

  SELECT first_name,last_name,email,monthly_salary,monthly_expenses FROM zipco_user WHERE id=@ZIPCO_USER_ID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_and_return_active_account(IN p_email VARCHAR(255),IN p_is_active_account BOOLEAN)
BEGIN
  UPDATE zipco_user set is_active_account = p_is_active_account where email = p_email ;
  
  SET @ZIPCO_USER_ID = LAST_INSERT_ID();

  SELECT first_name,last_name,email,monthly_salary,monthly_expenses FROM zipco_user WHERE id=@ZIPCO_USER_ID;
END //
DELIMITER ;
