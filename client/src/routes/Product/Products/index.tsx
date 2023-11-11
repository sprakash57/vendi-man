import React, { useState } from 'react';
import s from './index.module.scss';
import useProducts from '@/hooks/useProducts';
import Spinner from '@/components/Spinner';
import ProductTable from './ProductTable';
import { ProductTableProps } from '@/types';

const Products = () => {
  const [page, setPage] = useState(1);
  const { products, loading, error } = useProducts(page);

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

    if (error || !products?.data.length) {
      return <div className={s.error}>{error?.message}</div>;
    }

    if (products?.data) {
      const tableData: ProductTableProps[] = products.data.map(product => ({
        productId: product.productId,
        productName: product.productName,
        amountAvailable: product.amountAvailable,
        cost: product.cost,
        updatedAt: new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(
          new Date(product.updatedAt),
        ),
      }));
      return <ProductTable products={tableData} />;
    }
  };

  return (
    <section className={s.products}>
      <h1>Products</h1>
      {renderBody()}
      <div className={s.products__action}>
        <button onClick={handleNavigation} disabled={page <= 1} data-variant='primary'>
          Prev
        </button>
        <button onClick={handleNavigation} disabled={(products?.productsCount || 0) <= page * 10} data-variant='primary'>
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
