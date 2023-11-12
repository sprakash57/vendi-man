import React, { useState } from 'react';
import s from './index.module.scss';
import useProducts from '@/hooks/useProducts';
import Spinner from '@/components/Spinner';
import ProductTable from './ProductTable';
import { useNavigate } from 'react-router-dom';
import Toggle from '@/components/Toggle';
import { useAuthContext } from '@/contexts/auth';

const Products = () => {
  const [page, setPage] = useState(1);
  const [userProducts, setUserProducts] = useState(false);
  const { user } = useAuthContext();
  const { products, loading, error } = useProducts(page);
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = (e.target as HTMLButtonElement).textContent?.toLowerCase();
    setPage(page + (direction === 'next' ? 1 : -1));
  };

  const handleToggle = () => {
    setUserProducts(!userProducts);
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className={s.loader}>
          <Spinner />
        </div>
      );
    }

    if (error || !products.length) {
      return <div className={s.error}>{error?.message}</div>;
    }

    if (products) {
      const tableData = products
        .map(product => ({
          productId: product.productId,
          productName: product.productName,
          amountAvailable: product.amountAvailable,
          cost: product.cost,
          user: { username: product.user?.username || '--', _id: product.user?._id || '' },
        }))
        .filter(product => !userProducts || product.user._id === user?._id);
      return <ProductTable products={tableData} />;
    }
  };

  return (
    <section className={s.products}>
      <h1>Products</h1>
      <div className={s.products__actions}>
        <button onClick={() => navigate('/products/create')} data-variant='primary'>
          Add New
        </button>
        <Toggle label='Your products' onToggle={handleToggle} />
      </div>
      {renderBody()}
      <div className={s.products__action}>
        <button onClick={handleNavigation} disabled={page <= 1} data-variant='primary'>
          Prev
        </button>
        <button onClick={handleNavigation} disabled={(products.length || 0) <= page * 10} data-variant='primary'>
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
