import React, { useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../FormProvider/FormProvider"
import styles from "./ShipmentInformation.module.css";

function ShipmentInformation() {
  const { formData, setFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateZipCode = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shipmentInfo.address.trim()) {
      newErrors.address = "Please enter a valid address.";
    }
    if (!formData.shipmentInfo.city.trim()) {
      newErrors.city = "Please enter a valid city.";
    }
    if (!formData.shipmentInfo.country.trim()) {
      newErrors.country = "Country is required.";
    }
    if (!formData.shipmentInfo.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required.";
    } else if (!validateZipCode(formData.shipmentInfo.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      shipmentInfo: {
        ...prev.shipmentInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/order", { state: formData.shipmentInfo  });
    }
  };

  return (
    <div>
      <Breadcrumbs />
      <h1> Shipment information</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.shipmentForm}>
          <div>
            <label>
              Address (No P. O. Boxes)*
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                required
                value={formData.shipmentInfo.address}
                onChange={handleChange}

                className={errors.address ? styles.errorBorder : ""}
              />
              {errors.address && (
                <p className={styles.errorMessage}>{errors.address}</p>
              )}
            </label>
            <label>
              Apartment, suite etc. (optional)
              <input
                type="text"
                name="apartment"
                placeholder="Enter your apartment information"
                value={formData.shipmentInfo.apartment}
                onChange={handleChange}
              />
            </label>
            <label>
              City*
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                required
                value={formData.shipmentInfo.city}
                onChange={handleChange}
                className={errors.city ? styles.errorBorder : ""}
              />
              {errors.city && (
                <p className={styles.errorMessage}>{errors.city}</p>
              )}
            </label>
          </div>
          <div className={styles.countryInfoContainer}>
            <label>
              Country/Region*
              <input
                type="text"
                name="country"
                placeholder="Select your country/region"
                required
                value={formData.shipmentInfo.country}
                onChange={handleChange}
                className={errors.country ? styles.errorBorder : ""}
              />
              {errors.country && (
                <p className={styles.errorMessage}>{errors.country}</p>
              )}
            </label>

            <label>
              State*
              <input
                type="text"
                name="state"
                placeholder="Select your state"
                required
                value={formData.shipmentInfo.state}
              />
            </label>

            <label>
              ZIP code*
              <input
                type="text"
                name="zipCode"
                placeholder="Enter your ZIP code(55555-4444)"
                required
                value={formData.shipmentInfo.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? styles.errorBorder : ""}
              />
              {errors.zipCode && (
                <p className={styles.errorMessage}>{errors.zipCode}</p>
              )}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.stepBtn} ${
            Object.keys(errors).length > 0 ? styles.disabledButton : ""
          }`}
        >
          Submit order
        </button>
      </form>
    </div>
  );
}

export default ShipmentInformation;
