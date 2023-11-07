import { Router } from 'express';
import { buyerVerification, sellerVerification, userVerification } from '../middleware/users';
import { validate } from '../utils/validateRequest';
import { buyProductValidator, getProductValidator, productValidator, updateProductValidator } from '../middleware/products';
import {
  buyProductController,
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from '../controller/products';

const router = Router();

router.post('/', [userVerification, ...validate(productValidator), sellerVerification], createProductController);

router.get('/:productId', validate(getProductValidator), getProductController);

router.put('/:productId', [userVerification, ...validate(updateProductValidator)], updateProductController);

router.delete('/:productId', [userVerification, ...validate(getProductValidator)], deleteProductController);

router.get('/', getAllProductsController);

router.post(
  '/:productId/buy',
  [userVerification, ...validate(buyProductValidator), buyerVerification],
  buyProductController,
);

export default router;
