"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", { // Changed to /api/login
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        console.log("Logged in user:", data);

        localStorage.setItem("token",data.token)

        console.log(data)

        if (data.admin === "Admin") {
          router.push("/admin");
        } 
        else if (data.admin === "Member Only") {
          router.push("/user");
        } 
        else {
          router.push("/moderator");
        }
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
