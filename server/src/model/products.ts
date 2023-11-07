import mongoose from 'mongoose';
import { UserDocument } from './users';
import crypto from 'crypto';

const uniqueString = crypto.randomBytes(10).toString('hex');

export interface ProductInput {
  user: UserDocument['_id'];
  productName: string;
  cost: number;
  amountAvailable: number;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `${uniqueString}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productName: { type: String, required: true },
    cost: { type: Number, required: true },
    amountAvailable: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
