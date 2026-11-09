import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.js';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" style={{ color: '#0066cc', fontWeight: 'bold' }}>
          Explore Products &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Shopping Cart</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {items.map((item) => (
          <div 
            key={item.id} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ddd', padding: '1rem', borderRadius: '6px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={item.thumbnail} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                <p style={{ margin: 0, color: '#666' }}>${item.price} each</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <button 
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  style={{ padding: '0.2rem 0.5rem' }}
                >
                  -
                </button>
                <span style={{ margin: '0 0.5rem', fontWeight: 'bold' }}>{item.quantity}</span>
                <button 
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '0.2rem 0.5rem' }}
                >
                  +
                </button>
              </div>

              <span style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button 
                onClick={() => removeItem(item.id)}
                style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
        <button 
          onClick={clear}
          style={{ backgroundColor: '#888', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          Clear Cart
        </button>

        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}
