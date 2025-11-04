import React from 'react';
import { Link } from 'react-router-dom';
import useProductsApi from '../../../hooks/useProductsApi';

const ProductsPage: React.FC = () => {
  const { products, loading, error, page, totalPages, goToNextPage, goToPreviousPage } = useProductsApi();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
        gap: '20px',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1560px',
        margin: '0 auto'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: 'white'
          }}>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', margin: '0 auto 10px auto' }} />
            <h3 style={{ fontSize: '1em', marginBottom: '5px' }}>
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                {product.title}
              </Link>
            </h3>
            <p style={{ fontWeight: 'bold', color: '#333' }}>${product.price.toFixed(2)}</p>
            {/* Optionally display more details or a link to a product detail page */}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={goToPreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ProductsPage;
