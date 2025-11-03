import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface ApiResponse {
  // The Fake Store API directly returns an array of products, not an object with 'info' and 'results'.
  // So, no 'info' or 'results' fields are needed here.
  products: Product[]; // This is a conceptual field, the actual API returns Product[] directly
}

const useProductsApi = (initialPage: number = 1, limit: number = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // The Fake Store API doesn't have direct pagination parameters like 'page' and 'limit' that work together.
        // It has '_limit' for total items, but no 'page' for pagination.
        // For simplicity, we'll fetch all products and then slice them for client-side pagination.
        // A real-world scenario would use a backend that supports proper pagination.

        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();

        setTotalProducts(data.length);
        const calculatedTotalPages = Math.ceil(data.length / limit);
        setTotalPages(calculatedTotalPages);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setProducts(data.slice(startIndex, endIndex));

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const goToNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return { products, loading, error, page, totalPages, goToNextPage, goToPreviousPage };
};

export default useProductsApi;
