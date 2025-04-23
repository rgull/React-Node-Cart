import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import mobile from "../assets/banner/mobile.webp";
function Productview() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
          console.log("API Response:", response.data);
          setProduct(response.data.product);
          setLoading(false); 
        } catch (err) {
          setError("Product not found");
          setLoading(false); 
        }
      };

    fetchProduct();
  }, [productId]); 

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>; 
  }

  if (error) {
    return <p className="text-center mt-4">{error}</p>; 
  }

  if (!product) {
    return <p className="text-center mt-4">Product not found</p>; 
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={mobile || 'https://via.placeholder.com/400'}
            alt={product.ProductName || 'Product image'}
            className="img-fluid"
            style={{ objectFit: 'contain', height: '400px' }}
          />
        </div>
        <div className="col-md-6">
          <h3>{product.ProductName || 'Product Name'}</h3>
          <div className="rating mb-3">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`fa fa-star ${index < product.rating ? 'checked' : ''}`}
              />
            ))}
          </div>
          <p className="price">
            ₹{product.price || 'N/A'} <span className="old-price">₹{product.oldPrice || 'N/A'}</span>
          </p>
          <p className="description">{product.description || 'No description available'}</p>

          <button
            className="btn btn-primary w-100"
            onClick={() => {
           
            }}
          >
            Buy Now
          </button>
          <button
            className="btn btn-secondary w-100 mt-2"
            onClick={() => {
              
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productview;
