import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export default function NavBar({ darkMode, toggleTheme }) {
  const { user, logoutUser } = useAuth();
  const cartItems = useCartStore((state) => state.items);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav 
      style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        padding: '1rem 2rem', 
        backgroundColor: darkMode ? '#1e293b' : '#333333', 
        color: '#ffffff', 
        alignItems: 'center' 
      }}
    >
      <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <Link to="/products" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Products</Link>
      <Link to="/cart" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
        Cart ({totalItemsCount})
      </Link>
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            padding: '0.4rem 0.8rem', 
            cursor: 'pointer', 
            borderRadius: '4px', 
            border: 'none', 
            backgroundColor: darkMode ? '#3b82f6' : '#e2e8f0', 
            color: darkMode ? '#ffffff' : '#0f172a',
            fontWeight: '600'
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Hello, {user.username || user.email}</span>
            <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
