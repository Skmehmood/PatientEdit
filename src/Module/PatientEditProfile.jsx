import React, { useState } from "react";
import styles from "./PatientEditProfile.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  return (
    <div className={styles.patientPage}>
      {/* Left: Form Section */}
      <div className={styles.formSection}>
        <h2>Edit Patient Profile</h2>
        <form>
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

          <textarea
            name="address"
            placeholder="Enter Address"
            value={patientData.address}
            onChange={handleChange}
            rows="3"
          ></textarea>

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
              {/* <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span> */}
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
              {/* <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span> */}
            </div>
          </div>

          <button type="submit" className={styles.button}>Save Changes</button>
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
