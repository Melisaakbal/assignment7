import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

const Placeholder = ({ title }) => <h2>{title}</h2>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="cart" element={<Placeholder title="Cart" />} />
        <Route path="login" element={<Placeholder title="Login" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
