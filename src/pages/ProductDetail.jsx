import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore.js';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [addedNotice, setAddedNotice] = useState(false);

  const fetchProductCallback = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const { data: product, loading, error } = useFetch(fetchProductCallback, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2000);
    }
  };

  if (loading) return <div>Loading product details...</div>;

  if (error) {
    return (
      <div style={{ color: 'red', padding: '1rem' }}>
        <h3>Product Not Found</h3>
        <p>The product with ID "{id}" could not be retrieved.</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <button onClick={() => navigate('/products')} style={{ marginBottom: '1rem' }}>
        &larr; Back to Products
      </button>

      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
      />
      <h2>{product.title}</h2>
      <p style={{ color: '#666', fontWeight: 'bold' }}>Category: {product.category}</p>
      <p>{product.description}</p>
      <h3 style={{ color: '#2a6400' }}>Price: ${product.price}</h3>

      <button 
        onClick={handleAddToCart}
        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add to Cart
      </button>

      {addedNotice && (
        <span style={{ marginLeft: '1rem', color: 'green', fontWeight: 'bold' }}>
          Added to cart!
        </span>
      )}
    </div>
  );
}
