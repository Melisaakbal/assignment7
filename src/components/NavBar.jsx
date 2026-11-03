import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
      <NavLink to="/products" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Products</NavLink>
      <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Cart</NavLink>
      <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Login</NavLink>
    </nav>
  );
}
