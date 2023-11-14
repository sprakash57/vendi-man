import React, { useState } from 'react';
import s from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import ProductForm from '../ProductForm';
import { useToastContext } from '@/contexts/toast';
import useAxios from '@/hooks/useAxios';

const AddProduct = () => {
  const { showToast } = useToastContext();
  const { api, apiErrorHandler } = useAxios();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    cost: 0,
    amountAvailable: 0,
  });

  const handleAddProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/products', product);
      navigate(`/products/${data.data.productId}`);
      showToast([{ message: 'Product added successfully', mode: 'success' }]);
    } catch (e: unknown) {
      apiErrorHandler(e);
    }
  };

  return (
    <form className={s.form} onSubmit={handleAddProduct}>
      <h3>Add product</h3>
      <div className={s.form__fields}>
        <ProductForm product={product} setProduct={setProduct} />
        <hr className={s.divider} />
        <div className={s.form__actions}>
          <button type='submit' data-variant='primary'>
            Add
          </button>
          <Link to='/'>Go Back</Link>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
