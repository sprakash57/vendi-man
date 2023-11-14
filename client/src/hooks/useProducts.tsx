import { ProductResponse } from '@/types';
import { useState, useEffect } from 'react';
import useAxios, { AxiosResponse } from './useAxios';

const useProducts = (page: number) => {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data }: AxiosResponse<ProductResponse> = await api(`/products?page=${page}&limit=10`);
        setProducts(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, api]);

  return {
    products: products?.data || [],
    loading,
    error,
    totalPages: products?.totalPages || 0,
    productsCount: products?.productsCount || 0,
  };
};

export default useProducts;
