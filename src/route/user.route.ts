import express from 'express';
import { getZipUserByEmail,getZipAllUsers,createZipUser } from '../controller/user.controller';

const router = express.Router();

router.route('/')
  .get(getZipAllUsers)
  .post(createZipUser);

router.route('/:email')
  .get(getZipUserByEmail)
// router.get('/data/:email',getZipUserByEmail)
// router.get('/api/admin/polls',RouterController.isNewAuthenticated,RouterController.checkPermission('Admin.Manage.Survey'),RouterController.getParentUser,RouterController.companyUsers,PollController.list);

export default router;
