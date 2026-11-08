import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');
  const { user, logoutUser } = useAuth();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem', 
      borderBottom: '1px solid #ccc',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>Home</NavLink>
        <NavLink to="/products" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>Products</NavLink>
        <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>Cart</NavLink>

        {user ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: '1rem' }}>
            <span>Hello, <strong>{user.username}</strong></span>
            <button onClick={logoutUser} style={{ padding: '0.2rem 0.5rem', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'inherit' })}>Login</NavLink>
        )}
      </div>

      <button onClick={toggleTheme} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </nav>
  );
}
