import React from 'react';
import { ProductFormFields } from '@/types';
import s from './index.module.scss';

interface Props {
  product: ProductFormFields;
  setProduct: React.Dispatch<React.SetStateAction<ProductFormFields>>;
}

const ProductForm = ({ product, setProduct }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <label htmlFor='productName' className={s.field}>
        Name
        <input
          id='productName'
          placeholder='Name'
          type='text'
          name='productName'
          value={product.productName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='amountAvailable' className={s.field}>
        Amount available
        <input
          id='amountAvailable'
          placeholder='Quantity'
          type='number'
          name='amountAvailable'
          value={product.amountAvailable}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='cost' className={s.field}>
        Cost
        <input id='cost' placeholder='Cost' type='number' name='cost' value={product.cost} onChange={handleChange} />
      </label>
    </>
  );
};

export default ProductForm;
