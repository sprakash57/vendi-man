import { ProductResponse } from '@/types';
import { api } from '@/utils/api';
import { useState, useEffect } from 'react';

const useProducts = (page: number) => {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api(`/products?page=${page}&limit=10`);
        setProducts(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, loading, error };
};

export default useProducts;
