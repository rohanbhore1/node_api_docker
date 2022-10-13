import database from '../config/mysql.config';
import { Response, Request } from "express";
import logger from '../util/logger';
import QUERY from '../query/account.query';
import {HttpStatus} from '../config/const'

//get all user who has active account
export const getAccountHolderUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`${req.method} ${req.originalUrl}, fetching active account users`);
    database.query(QUERY.SELECT_ALL_ACCOUNTS, (error, users) => {
      if (!users) {
        logger.error(`${req.method} ${req.originalUrl},${error} => Active account users not found`);
        res.status(HttpStatus.NOT_FOUND.code)
          .send({ status: false, message: 'Users not found with active account' });
      }else{
        logger.info(`${req.method} ${req.originalUrl},${users} fetched account holder users`);
        res.status(HttpStatus.OK.code).json({ users })
      }
    })
  } catch (error) {
    throw error;
  }
};

//create an account for user with email id
export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`${req.method} ${req.originalUrl}, creating account`);
    const userEmail = req.body.email
    if(!userEmail){
      res.status(HttpStatus.BAD_REQUEST.code)
      .send({ message: `email id is required`});
      return
    }
    //fetching the user details
  database.query(QUERY.SELECT_USER_TO_CREATE_ACCOUNT, [userEmail], (error, results) => {
    if (!results[0]) {
      logger.error(`${req.method} ${req.originalUrl},user by ${userEmail} was not found`);
      return res.status(HttpStatus.NOT_FOUND.code)
      .send({ message: `user by ${userEmail} was not found`});
      }else{
        const  {monthly_salary,monthly_expenses,is_active_account} = results[0]
        // eligibility check for having the account 
        const shouldCreateAccount = (Number((Number(monthly_salary) - Number(monthly_expenses)).toFixed(2))) >= 1000
        // if account is already exist
        if (is_active_account) {
          logger.error(`${req.method} ${req.originalUrl}, account already exist`);
          return res.status(HttpStatus.DUPLICATE_CONTENT.code).json({ message:`account already exist for ${userEmail}` })
        }
        else if (!shouldCreateAccount) {
          logger.error(`${req.method} ${req.originalUrl}, 'Not eligible create account'`);
          return res.status(HttpStatus.PRECONDITION_FAIL.code)
            .send({ message: 'Not eligible to create account'});
        }else{
          // if account created successfully 
          database.query(QUERY.CREATE_ACCOUNT_PROCEDURE, [userEmail,shouldCreateAccount], (error, results) => {
            const  user = results[0][0]
            logger.info(`${req.method} ${req.originalUrl}, account created for ${userEmail}`);
            return res.status(HttpStatus.OK.code).json({ message:`account created for ${userEmail}`,user })
        })
        }
      }
    })
    
  } catch (error) {
    throw error;
  }
};
export default HttpStatus;


