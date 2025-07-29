import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearProducts = () => {
    setProducts([]);
    setError('');
  };

  return (
    <div className="App">
      <h1>Product Gallery</h1>

      <div className="button-group">
        <button onClick={fetchProducts}>Load Products</button>
        <button onClick={clearProducts} disabled={products.length === 0}>Clear Products</button>
      </div>

      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))
        ) : !loading && !error ? (
          <p className="empty">No products available</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
