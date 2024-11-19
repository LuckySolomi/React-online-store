import React, { useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../FormProvider/FormProvider"
import styles from "./ContactInformation.module.css";

function ContactInformation() {
  const { formData, setFormData } = useFormContext()

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\+?\d{10,15}$/.test(phone);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contactInfo.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.contactInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.contactInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.contactInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.contactInfo.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.contactInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      navigate("/shipment");
    }
  };

  return (
    <div>
      <Breadcrumbs
        disabled={
          !formData.contactInfo.firstName.trim() ||
          !formData.contactInfo.lastName.trim() ||
          !validateEmail(formData.contactInfo.email) ||
          !validatePhone(formData.contactInfo.phone)
        }
      />

      <h1> Contact information</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.contactForm}>
          <label>
            First name*
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
              onChange={handleChange}
              value={formData.contactInfo.firstName}
              className={errors.firstName ? styles.errorBorder : ""}
            />
            {errors.firstName && (
              <p className={styles.errorMessage}>{errors.firstName}</p>
            )}
          </label>
          <label>
            Last name*
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              required
              onChange={handleChange}
              value={formData.contactInfo.lastName}
              className={errors.lastName ? styles.errorBorder : ""}
            />
            {errors.lastName && (
              <p className={styles.errorMessage}>{errors.lastName}</p>
            )}
          </label>
          <label>
            Email*
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              value={formData.contactInfo.email}
              className={errors.email ? styles.errorBorder : ""}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </label>
          <label>
            Phone*
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              required
              onChange={handleChange}
              value={formData.contactInfo.phone}
              className={errors.phone ? styles.errorBorder : ""}
            />
            {errors.phone && (
              <p className={styles.errorMessage}>{errors.phone}</p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className={`${styles.stepBtn} ${
            Object.keys(errors).length > 0 ? styles.disabledButton : ""
          }`}
        >
          Next step
        </button>
      </form>
    </div>
  );
}

export default ContactInformation;
