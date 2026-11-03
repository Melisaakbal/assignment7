import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const Placeholder = ({ title }) => <h2>{title}</h2>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<Placeholder title="Product List" />} />
          <Route path=":id" element={<Placeholder title="Product Detail" />} />
        </Route>
        <Route path="cart" element={<Placeholder title="Cart" />} />
        <Route path="login" element={<Placeholder title="Login" />} />
        <Route path="*" element={<Placeholder title="404 Not Found" />} />
      </Route>
    </Routes>
  );
}
