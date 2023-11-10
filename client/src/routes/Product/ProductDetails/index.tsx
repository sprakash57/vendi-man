import { ProductDetailsResponse } from '@/types';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface NewProduct {
  productName: string;
  cost: number;
  amountAvailable: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [editing, setEditing] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    productName: '',
    cost: 0,
    amountAvailable: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async () => {
    await api.delete(`/products/${id}`);
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
    <section>
      <div>
        <button onClick={() => setEditing(!editing)}>{editing ? 'Save' : 'Edit'}</button>
        {editing && <button onClick={() => setEditing(false)}>Cancel</button>}
        <button onClick={handleDelete}>Delete</button>
      </div>
      {editing ? (
        <>
          <input name='productName' type='text' value={newProduct.productName} onChange={handleChange} />
          <input name='cost' type='text' value={newProduct.cost} onChange={handleChange} />
          <input name='amountAvailable' type='text' value={newProduct.amountAvailable} onChange={handleChange} />
        </>
      ) : (
        <>
          <h1>{product.data.productName}</h1>
          <p>{product.data.cost}</p>
          <p>{product.data.amountAvailable}</p>
        </>
      )}
    </section>
  );
};

export default ProductDetails;
