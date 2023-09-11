import express from 'express';
import { addProduct, showItem } from '../controllers/Item';


const router = express.Router();

router.route('/addProduct').post(addProduct);
router.route('/fetchItems').get(showItem);


export default router;