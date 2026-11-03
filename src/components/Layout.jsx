import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <footer style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <p>Assignment 7 - Web Programming</p>
      </footer>
    </div>
  );
}
