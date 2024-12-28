// "use client";
// import { useState } from "react";

// import "./register.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     studentId: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     department: "",
//     batch: "",
//     hall: "",
//     mobile: "", // New mobile number field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Add basic validation
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/api/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Registration successful:", result);
//         alert("Registration successful!");
//       } else {
//         const error = await response.json();
//         console.error("Registration failed:", error);
//         alert(`Registration failed: ${error.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1>Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Full Name</label>
//           <br />
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

        // <div className="form-group">
        //   <label htmlFor="studentId">Student ID</label>
        //   <br />
        //   <input
        //     type="text"
        //     id="studentId"
        //     name="studentId"
        //     placeholder="Enter your student ID"
        //     value={formData.studentId}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="email">Email Address</label>
        //   <br />
        //   <input
        //     type="email"
        //     id="email"
        //     name="email"
        //     placeholder="Enter your email"
        //     value={formData.email}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="mobile">Mobile Number</label>
        //   <br />
        //   <input
        //     type="text"
        //     id="mobile"
        //     name="mobile"
        //     placeholder="Enter your mobile number"
        //     value={formData.mobile}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="password">Password</label>
        //   <br />
        //   <input
        //     type="password"
        //     id="password"
        //     name="password"
        //     placeholder="Enter your password"
        //     value={formData.password}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="confirmPassword">Confirm Password</label>
        //   <br />
        //   <input
        //     type="password"
        //     id="confirmPassword"
        //     name="confirmPassword"
        //     placeholder="Confirm your password"
        //     value={formData.confirmPassword}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="department">Department</label>
        //   <br />
        //   <input
        //     type="text"
        //     id="department"
        //     name="department"
        //     placeholder="Enter your department"
        //     value={formData.department}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="batch">Batch</label>
        //   <br />
        //   <input
        //     type="text"
        //     id="batch"
        //     name="batch"
        //     placeholder="Enter your batch"
        //     value={formData.batch}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

        // <div className="form-group">
        //   <label htmlFor="hall">Hall</label>
        //   <br />
        //   <input
        //     type="text"
        //     id="hall"
        //     name="hall"
        //     placeholder="Enter your hall"
        //     value={formData.hall}
        //     onChange={handleChange}
        //     required
        //   />
        // </div>

//         <div className="form-group">
//           <button type="submit">Sign Up</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;

"use client";
import { useState } from "react";
import "./register.css";

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
    mobile: "", // Mobile number field
    profileImage: null, // Profile image field
  });

  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL for the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create a FormData object to send the image and other data
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

      if(response.status == 202){
        console.log("Image Not Found");
        alert("Image Not Found");
      }
      else if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        alert("Registration successful!");
      } else {
        const error = await response.json();
        console.error("Registration failed:", error);
        alert(`Registration failed: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        {/* Other input fields */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <br />
          <input
            type="text"
            id="studentId"
            name="studentId"
            placeholder="Enter your student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <br />
          <input
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
          <label htmlFor="mobile">Mobile Number</label>
          <br />
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <br />
          <input
            type="text"
            id="department"
            name="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <br />
          <input
            type="text"
            id="batch"
            name="batch"
            placeholder="Enter your batch"
            value={formData.batch}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hall">Hall</label>
          <br />
          <input
            type="text"
            id="hall"
            name="hall"
            placeholder="Enter your hall"
            value={formData.hall}
            onChange={handleChange}
            required
          />
        </div>
        

        {/* Image Upload Field */}
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <br />
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
