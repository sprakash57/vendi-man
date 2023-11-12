import { ProductTableProps } from '@/types';
import s from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products }: { products: ProductTableProps[] }) => {
  const navigate = useNavigate();

  return (
    <table className={s.table}>
      <thead>
        <tr className={s.table__header}>
          <th>Name</th>
          <th>Amount available</th>
          <th>Cost</th>
          <th>Seller</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr className={s.table__row} key={product.productId} onClick={() => navigate(`/products/${product.productId}`)}>
            <td>{product.productName}</td>
            <td>{product.amountAvailable}</td>
            <td>{product.cost}</td>
            <td>{product.user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
