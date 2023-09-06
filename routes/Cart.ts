import express from 'express';

import { CartItem } from '../controllers/Cart';


import passport from 'passport';

const router = express.Router();

router.route('/addtocart').post(passport.authenticate('jwt',{session:false}),CartItem);

export default router;