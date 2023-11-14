import { ProductFormFields, ProductDetailsResponse } from '@/types';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';
import ProductForm from '@/routes/Product/ProductForm';
import useAxios from '@/hooks/useAxios';
import Spinner from '@/components/Spinner';
import { formatDate } from '@/helpers/utils';
import useFetchProfile from '@/hooks/useFetchProfile';
import { useToastContext } from '@/contexts/toast';
import { useModalContext } from '@/contexts/modals';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { api, apiErrorHandler } = useAxios();
  const { user } = useAuthContext();
  const { fetchProfile } = useFetchProfile();
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const { openModal } = useModalContext();

  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [editing, setEditing] = useState(false);
  const [buying, setBuying] = useState(false);
  const [quantity, setQuantity] = useState<string | number>(0);
  const [newProduct, setNewProduct] = useState<ProductFormFields>({ productName: '', cost: 0, amountAvailable: 0 });

  const isProductOwner = useMemo(() => product?.data.user?._id === user?._id, [product, user]);
  const isUserBuyer = useMemo(() => user?.role === 'buyer', [user]);

  const handleQuantityToBuy = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseFloat(e.target.value));
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await api.delete(`/products/${id}`);
      showToast([{ message: 'Product deleted successfully', mode: 'success' }]);
      navigate('/');
    } catch (error) {
      apiErrorHandler(error);
    }
  }, [api, id, apiErrorHandler, showToast, navigate]);

  const handleDelete = useCallback(() => {
    openModal(true, {
      title: 'Are you sure? This action cannot be undone.',
      confirmAction: handleConfirmDelete,
    });
  }, [openModal, handleConfirmDelete]);

  const fetchProductDetails = useCallback(async () => {
    const { data } = await api<ProductDetailsResponse>(`/products/${id}`);
    setProduct(data);
    setNewProduct({
      productName: data.data.productName,
      cost: data.data.cost,
      amountAvailable: data.data.amountAvailable,
    });
  }, [api, id]);

  const handleEdit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if ((e.target as HTMLButtonElement).textContent === 'Edit') {
        setEditing(true);
      } else {
        try {
          const { data } = await api.put<ProductDetailsResponse>(`/products/${id}`, newProduct);
          setProduct(data);
          setEditing(false);
          showToast([{ message: 'Product updated successfully', mode: 'success' }]);
        } catch (error) {
          apiErrorHandler(error);
        }
      }
    },
    [api, apiErrorHandler, id, newProduct, showToast],
  );

  const handleBuy = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if ((e.target as HTMLButtonElement).textContent === 'Buy') {
        setBuying(true);
      } else {
        try {
          await api.post(`/products/${id}/buy`, { quantityToBeBought: quantity });
          await fetchProductDetails();
          await fetchProfile();
          setBuying(false);
          showToast([{ message: 'Product bought successfully', mode: 'success' }]);
        } catch (error) {
          apiErrorHandler(error);
        }
      }
    },
    [api, apiErrorHandler, id, quantity, fetchProductDetails, fetchProfile, showToast],
  );

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const renderActions = useMemo(() => {
    return (
      <div className={s.details__actions}>
        {isUserBuyer && (
          <>
            <button onClick={handleBuy} data-variant='primary'>
              {buying ? 'Confirm' : 'Buy'}
            </button>
            {buying && (
              <button onClick={() => setBuying(false)} data-variant='secondary'>
                Cancel
              </button>
            )}
          </>
        )}
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
    );
  }, [buying, handleBuy, handleDelete, handleEdit, isProductOwner, isUserBuyer, editing]);

  const renderDetails = useMemo(() => {
    if (!product) return <Spinner />;
    return (
      <div>
        <h1 className={s.details__name}>{product.data.productName}</h1>
        <p>Amount Available: {product.data.amountAvailable}</p>
        <p>
          Cost: <strong>€{product.data.cost}</strong>
        </p>
        <div className={s.details__date}>
          <small>Added on: {formatDate(new Date(product.data.createdAt))}</small>
          <small>Last updated: {formatDate(new Date(product.data.updatedAt))}</small>
        </div>
      </div>
    );
  }, [product]);

  return (
    <section className={s.details}>
      <div className={s.details__actions}>
        <Link to='/'>Back</Link>
      </div>
      {editing ? <ProductForm product={newProduct} setProduct={setNewProduct} /> : renderDetails}
      {buying && (
        <div>
          <hr />
          <label className={s.details__field} htmlFor='deposit'>
            Enter quantity to buy: <input id='deposit' type='number' value={quantity} onChange={handleQuantityToBuy} />
          </label>
        </div>
      )}
      {renderActions}
    </section>
  );
};

export default memo(ProductDetails);
