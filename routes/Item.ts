import express from 'express';
import { addProduct } from '../controllers/Item';


const router = express.Router();

router.route('/addProduct').post(addProduct);


export default router;