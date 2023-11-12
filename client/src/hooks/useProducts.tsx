import { ProductResponse } from '@/types';
import { useState, useEffect } from 'react';
import useAxios from './useAxios';

const useProducts = (page: number) => {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { api } = useAxios();

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
  }, [page, api]);

  return { products: products?.data || [], loading, error };
};

export default useProducts;
