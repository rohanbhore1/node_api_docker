const QUERY = {
  SELECT_USER_TO_CREATE_ACCOUNT: 'SELECT email,monthly_salary,monthly_expenses,is_active_account FROM zipco_user WHERE email= ?',
  SELECT_ALL_ACCOUNTS: 'SELECT first_name,last_name,email,monthly_salary,monthly_expenses FROM zipco_user WHERE is_active_account = true',
  CREATE_ACCOUNT_PROCEDURE: 'CALL create_and_return_active_account(?, ?)'
};

export default QUERY;