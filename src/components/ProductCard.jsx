import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '0.5rem' }} 
        />
        <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.category}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>
      </div>
      <Link to={`/products/${product.id}`} style={{ marginTop: '1rem', textDecoration: 'none', color: '#0066cc' }}>
        View Details &rarr;
      </Link>
    </div>
  );
}
