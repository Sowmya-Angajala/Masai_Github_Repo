import React, { useState } from "react";
import "./App.css";

// ProductCard Component
function ProductCard({ name, price, image, discount }) {
  return (
    <div className="product-card">
      {discount && (
        <div className="discount-badge">{discount}% OFF</div>
      )}
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
    </div>
  );
}

// Main App Component
function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    discount: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.image.includes("http"))
      newErrors.image = "Image must be a valid URL (starting with http).";
    if (
      formData.discount &&
      (isNaN(formData.discount) ||
        formData.discount < 0 ||
        formData.discount > 100)
    )
      newErrors.discount = "Discount must be between 0 and 100.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setProducts([...products, { ...formData }]);
      setFormData({ name: "", price: "", image: "", discount: "" });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <span className="error">{errors.image}</span>}

        <input
          name="discount"
          placeholder="Discount % (Optional)"
          value={formData.discount}
          onChange={handleChange}
        />
        {errors.discount && <span className="error">{errors.discount}</span>}

        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <div className="product-grid">
        {products.map((p, index) => (
          <ProductCard
            key={index}
            name={p.name}
            price={p.price}
            image={p.image}
            discount={p.discount}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
