import { ProductFormFields, ProductDetailsResponse } from '@/types';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';
import ProductForm from '@/routes/Product/ProductForm';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [editing, setEditing] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormFields>({
    productName: '',
    cost: 0,
    amountAvailable: 0,
  });
  const { user } = useAuthContext();

  const isProductOwner = product?.data.user === user?._id;

  const handleDelete = async () => {
    await api.delete(`/products/${id}`);
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).textContent === 'Edit') {
      setEditing(true);
    } else {
      await api.put(`/products/${id}`, newProduct);
      setEditing(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api<ProductDetailsResponse>(`/products/${id}`);
      setProduct(data);
      setNewProduct({
        productName: data.data.productName,
        cost: data.data.cost,
        amountAvailable: data.data.amountAvailable,
      });
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className={s.details}>
      <div className={s.details__actions}>
        <Link to='/'>Back</Link>
        <div>
          {isProductOwner && (
            <>
              <button onClick={handleEdit} data-variant='primary'>
                {editing ? 'Save' : 'Edit'}
              </button>
              {editing && (
                <button onClick={() => setEditing(false)} data-variant='secondary'>
                  Cancel
                </button>
              )}
              <button onClick={handleDelete} data-variant='danger'>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      {editing ? (
        <ProductForm product={newProduct} setProduct={setNewProduct} />
      ) : (
        <div>
          <h1 className={s.details__name}>{product.data.productName}</h1>
          <p>Amount Available: {product.data.amountAvailable}</p>
          <p>Cost: {product.data.cost}</p>
          <div className={s.details__date}>
            <small>
              Added on:{' '}
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
                new Date(product.data.createdAt),
              )}
            </small>
            <small>
              Last updated:{' '}
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
                new Date(product.data.updatedAt),
              )}
            </small>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
