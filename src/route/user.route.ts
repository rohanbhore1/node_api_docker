import express from 'express';
import { getZipUserByEmail,getZipAllUsers,createZipUser } from '../controller/user.controller';

const router = express.Router();

router.route('/')
  .get(getZipAllUsers)
  .post(createZipUser);

router.route('/email/:email?')
  .get(getZipUserByEmail)
export default router;
