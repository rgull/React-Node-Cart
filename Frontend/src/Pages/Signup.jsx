import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function SignupPage() {

  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);

      console.log("Signup successful:", response.data);

    
  if(response.data?.message === "User Created Successfully") { 
    alert(response.data?.message); 
    navigate("/"); 
  }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded bg-white shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              name
            </label>
            <input
              type="text"
              className="form-control p-2"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control p-2"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control p-2"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control p-2"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
