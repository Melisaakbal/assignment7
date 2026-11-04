import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const fetchProductsCallback = useCallback((signal) => fetchProducts(signal), []);
  const { data, loading, error } = useFetch(fetchProductsCallback, []);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value) {
        prev.set('q', value);
      } else {
        prev.delete('q');
      }
      return prev;
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value) {
        prev.set('category', value);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  const products = data?.products || [];

  // Categorileri dinamik olarak ürünlerden türetiyoruz
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filtrelenmiş listeyi render sırasında derive ediyoruz (State'te TUTMUYORUZ)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSearch = searchQuery 
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2>Product Catalogue</h2>

      {/* Filtreleme Alanı */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '0.5rem', width: '250px' }}
        />

        <select 
          value={categoryFilter} 
          onChange={handleCategoryChange}
          style={{ padding: '0.5rem' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
