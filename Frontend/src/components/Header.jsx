import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../context/Context";
import { useContext } from "react";

export default function Header() {
  const { user, token } = useContext(UserContext); 
  const navigate = useNavigate();
  const cartCount = user?.products?.length || 0; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">MyShop</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/#">Home</Link>
            </li>
            <li className="nav-item"><a className="nav-link" href="/products">Products</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
          </ul>

          {/* Centered Search Bar */}
          <form className="d-flex mx-auto mt-3 w-50">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-light" type="submit">🔍</button>
          </form>

          <div className="ms-3 d-flex align-items-center">
            {/* Login Button */}
            {!token && (
              <Link to="/login" className="btn btn-light me-3">Login</Link>
            )}

            {/* Cart Icon (Only visible if token exists) */}
            {token && (
              <Link to="/get-cart" className="ms-3 position-relative">
                <FaShoppingCart size={24} color="white" />
                {cartCount >= 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
