import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, { ProductDocument, ProductInput } from '../model/products';

export const createProduct = async (input: ProductInput) => {
  try {
    const result = await ProductModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
};

export const findAllProducts = async (Model: any, page: any, limit: any) => {
  const docs = await Model.find()
    .limit(limit * 1)
    .skip((Number(page) - 1) * limit)
    .then((result: any) => result)
    .catch((error: any) => error);
  return docs;
};

export const findProduct = async (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
  try {
    const result = await ProductModel.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
};

export const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions,
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

export const deleteProduct = (query: FilterQuery<ProductDocument>) => {
  return ProductModel.deleteOne(query);
};

export const calculateChange = (balance: number, coins: number[]) => {
  const changeCoins: number[] = [];
  for (let coin of coins) {
    while (balance >= coin) {
      changeCoins.push(coin);
      balance -= coin;
    }
  }
  return changeCoins;
};
