import { useContext, useEffect } from "react";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { user, setUser, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!user || !user.products || user.products.length === 0) {
    return <h2 className="text-center mt-4">Your cart is empty.</h2>;
  }

  const updateQuantity = (productId, change) => {
    const updatedProducts = user.products.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setUser({ ...user, products: updatedProducts });
  };

  const removeItem = (productId) => {
    const updatedProducts = user.products.filter(
      (item) => item.productId._id !== productId
    );
    setUser({ ...user, products: updatedProducts });
  };

  const totalQuantity = user.products.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = user.products.reduce(
    (total, item) => {
      // Ensure productId and price exist
      if (item.productId && item.productId.price) {
        return total + item.productId.price * item.quantity;
      }
      return total;
    },
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8 col-md-7 col-12">
          {user.products.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm p-3">
              <div className="row g-3 align-items-center">
                {/* Product Image (optional) */}
                <div className="col-md-3 col-4">
                  <img 
                    src={item.productId?.image || "https://via.placeholder.com/100"} 
                    alt={item.productId?.name || "Product Name"} 
                    className="img-fluid rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="col-md-4 col-8">
                  <h5>{item.productId?.name || "Product Name"}</h5>
                  <p className="text-muted">{item.productId?.category || "Category"}</p>
                  <p className="text-danger fs-5">₹{item.productId?.price ? item.productId.price.toFixed(2) : "N/A"}</p>
                </div>

                {/* Quantity Controls */}
                <div className="col-md-3 col-12 text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.productId._id, -1)}>
                      −
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.productId._id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="col-md-2 col-12 text-center">
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.productId._id)}>
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="col-lg-4 col-md-5 col-12">
          <div className="card p-3 shadow">
            <h4 className="text-center bg-danger text-white p-2">Summary</h4>
            <div className="d-flex justify-content-between">
              <p><strong>Quantity:</strong></p>
              <p>{totalQuantity}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p><strong>Total Price:</strong></p>
              <p className="text-danger fs-5">₹{totalPrice.toFixed(2)}</p>
            </div>
            <button className="btn btn-primary w-100 mt-2">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
