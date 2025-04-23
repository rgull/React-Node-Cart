

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/Context";
import { useNavigate, Link } from "react-router-dom";
import mobile from "../assets/banner/mobile.webp";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartStatus, setCartStatus] = useState({});
  
  const { user, token } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-product");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      setCartStatus((prev) => ({ ...prev, [productId]: 'loading' }));

      const response = await axios.post(
        'http://localhost:3000/api/addtocart',
        { productId: productId, quantity: 1 },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartStatus((prev) => ({ ...prev, [productId]: 'success' }));

        setTimeout(() => {
          setCartStatus((prev) => ({ ...prev, [productId]: null }));
        }, 2000);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setCartStatus((prev) => ({ ...prev, [productId]: 'error' }));

      setTimeout(() => {
        setCartStatus((prev) => ({ ...prev, [productId]: null }));
      }, 2000);
    }
  };

  const getButtonContent = (productId) => {
    switch (cartStatus[productId]) {
      case 'loading':
        return 'Adding...';
      case 'success':
        return 'Added ✓';
      case 'error':
        return 'Failed ✗';
      default:
        return 'Add to Cart';
    }
  };

  if (loading) return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div
                className="card shadow-lg border-0"
                style={{
                  width: '20rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <img
                  src={mobile}
                  alt="Product"
                  style={{
                    objectFit: 'contain', 
                    height: '200px',
                    padding: '10px',
                    borderRadius: '8px',
                  }}
                />
                <div className="card-body text-center p-4" style={{ flex: 1 }}>
                  <h5 className="card-title" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {product.ProductName}
                  </h5>
                  <p className="card-text" style={{ fontSize: '0.95rem', color: '#666' }}>
                    {product.description}
                  </p>
                  <p className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                    ${product.price.toFixed(2)}
                  </p>
                  <div>
                    {/* Link to navigate to the product view */}
                    <Link to={`/product/${product._id}`} className="btn btn-info w-100 mb-2">
                      View Product
                    </Link>
                    <button
                      className={`btn btn-primary w-100 ${cartStatus[product._id] === 'loading' ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(product._id)}
                      disabled={cartStatus[product._id] === 'loading'}
                    >
                      {getButtonContent(product._id)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </div>
  );
}

export default Product;
