import mongoose from 'mongoose';
import { UserDocument } from './users';
import crypto from 'crypto';

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
    productId: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productName: { type: String, required: true },
    cost: { type: Number, required: true },
    amountAvailable: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  if (!this.productId) {
    this.productId = crypto.randomBytes(6).toString('hex');
  }
  next();
});

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
