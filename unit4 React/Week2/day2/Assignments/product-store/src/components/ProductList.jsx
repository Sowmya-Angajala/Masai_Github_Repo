import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('https://dummyjson.com/products');
      setProducts(res.data.products);
      setFiltered(res.data.products);
      const uniqueCategories = [...new Set(res.data.products.map(p => p.category))];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === 'All') {
      setFiltered(products);
    } else {
      const filteredData = products.filter(p => p.category === category);
      setFiltered(filteredData);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    let sortedData = [...filtered];
    if (order === 'low') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (order === 'high') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setFiltered(sortedData);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Product Store</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Category: </label>
        <select onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <label style={{ marginLeft: '1rem' }}>Sort by Price: </label>
        <select onChange={(e) => handleSort(e.target.value)} value={sortOrder}>
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {filtered.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h4>{product.title}</h4>
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
