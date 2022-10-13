const QUERY = {
  SELECT_USERS: 'SELECT first_name,last_name,email,monthly_salary,monthly_expenses FROM zipco_user ORDER BY created_at DESC LIMIT 100',
  SELECT_USER: 'SELECT first_name,last_name,email,monthly_salary,monthly_expenses FROM zipco_user WHERE email= ?',
  CREATE_USER_PROCEDURE: 'CALL create_and_return_zipco_user(?, ?, ?, ?, ?)',
};

export default QUERY;