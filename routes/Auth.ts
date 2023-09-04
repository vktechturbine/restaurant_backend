import express from 'express';

import { userRegister } from '../controllers/Auth';

const router = express.Router();

router.route('/register').post(userRegister);
export default router;