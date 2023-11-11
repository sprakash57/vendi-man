import { ProductTableProps } from '@/types';
import s from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '@/components/Toggle';

const ProductTable = ({ products }: { products: ProductTableProps[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={s.products__actions}>
        <button onClick={() => navigate('/products/create')} data-variant='primary'>
          Add New
        </button>
        <Toggle label='Your products' onToggle={bo => console.log(bo)} />
      </div>
      <div className={s.table}>
        <div className={s.table__header}>
          <div>Name</div>
          <div>Amount available</div>
          <div>Cost</div>
          <div>Last updated</div>
        </div>
        {products.map(product => (
          <Link key={product.productId} to={`/products/${product.productId}`} className={s.table__row}>
            {Object.keys(product)
              .filter(key => ['productName', 'amountAvailable', 'cost', 'updatedAt'].includes(key))
              .map(key => (
                <p key={key} className={s.table__cell}>
                  {product[key as keyof ProductTableProps]}
                </p>
              ))}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductTable;
