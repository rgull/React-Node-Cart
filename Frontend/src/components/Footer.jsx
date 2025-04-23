import React from "react";


function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* Left Section - Brand */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">MyShop</h5>
            <p>Best place for quality products.</p>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Right Section - Social Media */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Follow Us</h5>
            <a href="https://facebook.com" className="text-light me-3 fs-5"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" className="text-light me-3 fs-5"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" className="text-light me-3 fs-5"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-3">
          <p className="mb-0">© 2025 MyShop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
