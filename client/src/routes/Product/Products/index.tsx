import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './index.module.scss';
import useProducts from '@/hooks/useProducts';
import Spinner from '@/components/Spinner';

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
      return (
        <ul>
          {products.data.map(product => (
            <Link key={product.productId} to={`/products/${product.productId}`}>
              <li>
                {product.productName} {product.cost} Available: {product.amountAvailable}
              </li>
            </Link>
          ))}
        </ul>
      );
    }
  };

  return (
    <section>
      <div>
        <h1>Products</h1>
        <button>Add New</button>
      </div>
      {renderBody()}
      <div>
        <button onClick={handleNavigation} disabled={page <= 1}>
          Prev
        </button>
        <button onClick={handleNavigation} disabled={(products?.productsCount || 0) <= page * 10}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
