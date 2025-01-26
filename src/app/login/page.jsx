"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.css";
import Header from "../header";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        console.log("Logged in user:", data);

        localStorage.setItem("token", data.token);

        if (data.admin === "Admin") {
          router.push("/admin");
        } else if (data.admin === "Member Only") {
          router.push("/user");
        } else {
          router.push("/moderator");
        }
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-login">
      <Header/>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="icon email-icon">📧</span>
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
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="icon password-icon">🔒</span>
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
          </div>
          <div className="form-group">
            <button
              className="form-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <span className="loader">.0.</span> : "Login"}
            </button>
          </div>
        </form>
      </div>
      {/* Additional Information Section */}
      <div className="main-extra-info">
        <h2 className="extra-header">Welcome to CUET Club Management</h2>
        <p className="extra-para">Here, you can join, manage, and explore various clubs tailored to your interests. Connect with like-minded individuals and grow your network!</p>
        <ul className="extra-ul">
          <li className="extra-li">✔ Stay updated with club announcements.</li>
          <li>✔ Participate in exciting events and activities.</li>
          <li>✔ Collaborate with other members and moderators.</li>
        </ul>
      </div>
    </div>
  );
  
};

export default Login;
