import { body, param } from 'express-validator';

const productNameValidator = body('productName', 'Product Name is required').notEmpty();
const costValidator = body('cost', 'Cost is required').isNumeric();
const amountAvailableValidator = body('amountAvailable', 'Amount available is required').isNumeric();
const productIdParamValidator = param('productId', 'productId is required').notEmpty();

export const productValidator = [productNameValidator, costValidator, amountAvailableValidator];

export const updateProductValidator = [
  productNameValidator,
  costValidator,
  amountAvailableValidator,
  productIdParamValidator,
];

export const getProductValidator = [productIdParamValidator];

export const buyProductValidator = [
  productIdParamValidator,
  body('quantityToBeBought', 'Quantity of product to be bought is required').isNumeric().isInt({ gt: 0 }),
];
