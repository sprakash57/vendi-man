import React, { useState } from 'react';
import useProducts from '@/hooks/useProducts';
import Spinner from '@/components/Spinner';
import ProductTable from '@/routes/Product/Products/ProductTable';
import { useNavigate } from 'react-router-dom';
import NoResult from '@/components/NoResult';
import s from './index.module.scss';
import { useAuthContext } from '@/contexts/auth';

const Products = () => {
  const { user } = useAuthContext();
  const [page, setPage] = useState(1);
  const { products, loading, error, productsCount } = useProducts(page);
  const navigate = useNavigate();

  const isUserSeller = user?.role === 'seller';

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = (e.target as HTMLButtonElement).textContent?.toLowerCase();
    setPage(page + (direction === 'next' ? 1 : -1));
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
      return <NoResult message={error?.message || 'No Products found'} description='Check back later' />;
    }

    if (products) {
      const tableData = products.map(product => ({
        productId: product.productId,
        productName: product.productName,
        amountAvailable: product.amountAvailable,
        cost: product.cost,
        user: { username: product.user?.username || '--', _id: product.user?._id || '' },
      }));
      return <ProductTable products={tableData} />;
    }
  };

  return (
    <section className={s.products}>
      <h1>Products</h1>
      {isUserSeller && (
        <div className={s.products__actions}>
          <button onClick={() => navigate('/products/create')} data-variant='primary'>
            Add New
          </button>
        </div>
      )}
      {renderBody()}
      <div className={s.products__actions}>
        <button onClick={handleNavigation} disabled={page <= 1} data-variant='primary'>
          Prev
        </button>
        <button onClick={handleNavigation} disabled={productsCount <= page * 10} data-variant='primary'>
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
