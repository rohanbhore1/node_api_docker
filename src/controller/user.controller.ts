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
    console.log("monthly_expenses",monthly_expenses)
    if(!first_name || !last_name || !email || !monthly_salary || !monthly_expenses){
         res.status(HttpStatus.BAD_REQUEST.code)
      .send({ message: `some params are missing`});
      return
    }
    const userDetails = [
      first_name,last_name,email,monthly_salary,monthly_expenses
    ]
    database.query(QUERY.CREATE_USER_PROCEDURE, userDetails, (error, results) => {
      if (!results) {
        logger.error(error);
        return res.status(HttpStatus.DUPLICATE_CONTENT.code)
          .send({message: 'user exist'});
      }else{
        const  user = results[0][0]
        return res.status(HttpStatus.OK.code).json({ message:'user created',user })
      }
    })
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
        return res.status(HttpStatus.NOT_FOUND.code)
          .send({ status: false, error: error, message: 'No user Found' });
      }else{
        return res.status(HttpStatus.OK.code).json({ users })
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
    if(!userEmail){
      res.status(HttpStatus.BAD_REQUEST.code)
      .send({ message: `email id is required`});
      return
    }
    database.query(QUERY.SELECT_USER, [userEmail], (error, results) => {
    if (!results[0]) {
      return res.status(HttpStatus.NOT_FOUND.code)
      .send({ status: false, message: `user with ${userEmail} was not found`});
      }else{
        const  user = results[0]
        return res.status(HttpStatus.OK.code).json({ user })
      }
    })
  } catch (error) {
    throw error;
  }
};

export default HttpStatus;


