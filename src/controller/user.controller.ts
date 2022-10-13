import database from '../config/mysql.config';
import { Response, Request, NextFunction } from "express";
import logger from '../util/logger';
import QUERY from '../query/user.query';
import {HttpStatus} from '../config/const'

// add(create) user details
export const createZipUser = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    const {first_name,last_name,email,monthly_salary,monthly_expenses} = req.body
    const userDetails = [
      first_name,last_name,email,monthly_salary,monthly_expenses
    ]
    database.query(QUERY.CREATE_USER_PROCEDURE, userDetails, (error, results) => {
      if (!results) {
        logger.error(error);
        res.status(HttpStatus.DUPLICATE_CONTENT.code)
          .send({ status: false,message: 'user exist'});
      }else{
        const  user = results[0][0]
        res.status(HttpStatus.OK.code).json({ message:'user created',user })
      }
    })
    // const users: ZipUser[] = [];
  } catch (error) {
    throw error;
  }
};

// get user details for all user
export const getZipAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    database.query(QUERY.SELECT_USERS, (error, users) => {
      if (!users) {
        res.status(HttpStatus.NOT_FOUND.code)
          .send({ status: false, error: error, message: 'No user Found' });
      }else{
        res.status(HttpStatus.OK.code).json({ users })
      }
    })
  } catch (error) {
    throw error;
  }
};

// get user details using email id 
export const getZipUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    const userEmail = String(req.query.email).trim().replace(/['"]+/g, '')
    database.query(QUERY.SELECT_USER, [userEmail], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code)
      .send({ status: false, message: `user with ${userEmail} was not found`});
      }else{
        const  user = results[0]
        res.status(HttpStatus.OK.code).json({ user })
      }
    })
  } catch (error) {
    throw error;
  }
};

export default HttpStatus;


