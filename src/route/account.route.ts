import express from 'express';
import { getAccountHolderUsers,createAccount } from '../controller/account.controller';

const router = express.Router();

router.route('/')
  .get(getAccountHolderUsers)
  .post(createAccount)


export default router;
