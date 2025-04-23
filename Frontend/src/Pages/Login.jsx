import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  
  const navigate= useNavigate() 


  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await axios.post("http://localhost:3000/api/login", formData, {
          withCredentials: true // Enable cookies
      });

      console.log("Login successful:", response.data);
      if(response.data.message==="Login successfully"){
     
      alert("Login successful!")
      navigate("/")
      ;}
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded bg-white shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
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
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control p-2"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
          <p className="text-center mt-3">
            Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
