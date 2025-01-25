"use client";

import { useState } from "react";
import Link from "next/link";
import "./register.css";
import Header from "../header";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    batch: "",
    hall: "",
    mobile: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [isProcessing, setIsProcessing] = useState(false); // For button animation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Start processing animation

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsProcessing(false);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        body: data,
      });

      if (response.status === 202) {
        alert("Image Not Found");
      } else if (response.ok) {
        alert("Registration successful!");
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false); // Stop processing animation
    }
  };

  return (
    <div className="main-sign-up">
      <Header/>
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">Signup</h1>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Student ID */}
          <div className="form-group">
            <label className="form-label" htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              className="form-input"
              placeholder="Enter your student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="form-input"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label className="form-label" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-input"
              placeholder="Enter your department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          {/* Batch */}
          <div className="form-group">
            <label className="form-label" htmlFor="batch">Batch</label>
            <input
              type="text"
              id="batch"
              name="batch"
              className="form-input"
              placeholder="Enter your batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </div>

          {/* Hall */}
          <div className="form-group">
            <label className="form-label" htmlFor="hall">Hall</label>
            <input
              type="text"
              id="hall"
              name="hall"
              className="form-input"
              placeholder="Enter your hall"
              value={formData.hall}
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Image */}
          <div className="form-group">
            <label className="form-label" htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="form-input"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
            </div>
          )}

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              className={`form-submit-button ${isProcessing ? "processing" : ""}`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
