import React, { useState } from "react";
import styles from "./PatientEditProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //  required CSS

function PatientEditProfile() {
  const [patientData, setPatientData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const calculatedAge = calculateAge(value);
      setPatientData({ ...patientData, dob: value, age: calculatedAge });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (patientData.password !== patientData.confirmPassword) {
      setError("Passwords do not match...!!!");
      return;
    }

    setError("");

    // Show animated toast
    toast.success("Profile Created Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark", // "light" | "colored"
    });

    // Optional: Clear the form after success
    setPatientData({
      firstname: "",
      lastname: "",
      dob: "",
      age: "",
      gender: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={styles.patientPage}>
      {/* Toast Container */}
      <ToastContainer />

      {/* Left: Form Section */}
      <div className={styles.formSection}>
        <h2>Edit Patient Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* name fields */}
          <div className={styles.rowTwo}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={patientData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={patientData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          {/* dob */}
          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={patientData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* gender */}
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <div className={styles.genderGroup}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={patientData.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={patientData.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={patientData.gender === "Other"}
                  onChange={handleChange}
                />{" "}
                Other
              </label>
            </div>
          </div>

          {/* address */}
          <textarea
            name="address"
            placeholder="Enter Address"
            value={patientData.address}
            onChange={handleChange}
            rows="3"
          ></textarea>

          {/* password */}
          <div className={styles.password}>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={patientData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={patientData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.eyeIcon}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {/* error */}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.button}>
            Save Changes
          </button>
        </form>
      </div>

      {/* Right: Live Preview Section */}
      <div className={styles.previewSection}>
        <div className={styles.previewCard}>
          <p>
            <strong>Name:</strong> {patientData.firstname}{" "}
            {patientData.lastname}
          </p>
          <p>
            <strong>DOB:</strong> {patientData.dob}
          </p>
          <p>
            <strong>Age:</strong> {patientData.age}
          </p>
          <p>
            <strong>Gender:</strong> {patientData.gender}
          </p>
          <p>
            <strong>Address:</strong> {patientData.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientEditProfile;
