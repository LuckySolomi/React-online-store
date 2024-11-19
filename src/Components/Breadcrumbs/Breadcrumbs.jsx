import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs({ disabled }) {
  const location = useLocation();

  const handleLinkClick = (event, stepDisabled) => {
    if (stepDisabled) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.breadcrumbsContainer}>
      <Link
        to="/cart"
        className={`${styles.breadcrumbStep} ${
          location.pathname === "/cart" ? styles.currentStepColor : ""
        }`}
        onClick={(event) => handleLinkClick(event, false)}
      >
        Cart
      </Link>
      <span className={styles.separator}>&gt;</span>
      <Link
        to="/contact"
        className={`${styles.breadcrumbStep} ${
          location.pathname === "/contact" ? styles.currentStepColor : ""
        }`}
        onClick={(event) => handleLinkClick(event, disabled)}
      >
        Contact information
      </Link>
      <span className={styles.separator}>&gt;</span>
      <Link
        to="/shipment"
        className={`${styles.breadcrumbStep} ${
          location.pathname === "/shipment" ? styles.currentStepColor : ""
        }`}
        onClick={(event) => handleLinkClick(event, disabled)}
      >
        Shipment information
      </Link>
    </div>
  );
}

export default Breadcrumbs;
