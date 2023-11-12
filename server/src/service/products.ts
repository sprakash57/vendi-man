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

export const findAllProducts = async (page: number, limit: number) => {
  try {
    const products = await ProductModel.find({}, {}, { skip: (page - 1) * limit, limit }).populate(
      'user',
      '-password -__v -createdAt -updatedAt',
    );
    return products;
  } catch (error) {
    throw error;
  }
};

export const findProduct = async (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
  try {
    const result = await ProductModel.findOne(query, {}, options).populate('user', '-password -__v -createdAt -updatedAt');
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
  const sortedCoins = coins.sort((a, b) => b - a);
  for (let coin of sortedCoins) {
    while (balance >= coin) {
      changeCoins.push(coin);
      balance -= coin;
    }
  }
  return changeCoins;
};
