import { Request, Response } from 'express';
import {
  calculateChange,
  createProduct,
  deleteProduct,
  findAllProducts,
  findAndUpdateProduct,
  findProduct,
} from '../service/products';
import { Messages, VALID_COINS } from '../constants';
import { findAndUpdateUser, findUser } from '../service/users';
import ProductModel from '../model/products';

export const createProductController = async (req: Request, res: Response) => {
  try {
    const sellerId = res.locals.user._id;
    const product = await createProduct({ ...req.body, user: sellerId });
    return res.status(201).json({ status: 'success', message: Messages.SUCCESS, data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const sellerId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).json({ status: 'error', message: Messages.NO_PRODUCT });
    }
    // Stop user from updating product that does not belong to them
    if (String(product.user._id) !== sellerId) {
      return res.status(404).json({ status: 'error', message: Messages.NO_OWNER });
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });
    return res.status(201).json({ status: 'success', message: Messages.SUCCESS, data: updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const getProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
      return res.status(404).json({ status: 'error', message: Messages.NO_PRODUCT });
    }
    return res.json({ status: 'success', message: Messages.SUCCESS, data: product });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const sellerId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).json({ status: 'error', message: Messages.NO_PRODUCT });
    }
    // Stop user from updating product that does not belong to them
    if (String(product.user._id) !== sellerId) {
      return res.status(404).json({ status: 'error', message: Messages.NO_OWNER });
    }

    await deleteProduct({ productId });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};

export const buyProductController = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const user = await findUser({ _id: userId });
  if (user) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).json({ status: 'error', message: Messages.NO_PRODUCT });
    }

    if (user.deposit == 0) {
      return res.status(400).json({ status: 'error', message: Messages.INSUFFICIENT_DEPOSIT });
    }

    if (product.amountAvailable == 0) {
      return res.status(400).json({ status: 'error', message: Messages.UNAVAILABLE_PRODUCT });
    }

    if (!(product.amountAvailable >= req.body?.quantityToBeBought)) {
      return res.status(400).json({ status: 'error', message: Messages.INVALID_PRODUCT_QUANTITY });
    }

    const totalSpent = product.cost * req.body?.quantityToBeBought;

    if (!(Number(user.deposit) >= totalSpent)) {
      return res.status(400).json({ status: 'error', message: Messages.INSUFFICIENT_DEPOSIT });
    }

    const balance = user?.deposit ? Number(user.deposit) - totalSpent : 0;

    await findAndUpdateUser({ _id: userId }, { deposit: balance }, { new: false });

    await findAndUpdateProduct(
      { productId },
      { amountAvailable: product.amountAvailable - req.body?.quantityToBeBought },
      { new: true },
    );

    return res.status(201).json({
      status: 'success',
      message: Messages.SUCCESS,
      data: {
        totalSpent,
        change: calculateChange(balance, VALID_COINS),
      },
    });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await findAllProducts(Number(page), Number(limit));
    const count = await ProductModel.countDocuments();

    return res.json({
      status: 200,
      message: 'success',
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      productsCount: count,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: Messages.STATUS_500 });
  }
};
