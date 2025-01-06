import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useFormContext } from "../FormProvider/FormProvider";
import { Link } from "react-router-dom";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./Order.module.css";

function Order() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const { cartItems, setCartItems } = useContext(CartContext);
  const { formData, setFormData } = useFormContext();
  const { shipmentInfo, contactInfo } = formData;

  const handleContinueShopping = () => {
    setFormData({
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      shipmentInfo: {
        address: "",
        apartment: "",
        city: "",
        country: "",
        zipCode: "",
      },
    });

    setCartItems([]);
  };

  return (
    <div>
      <div className={styles.textBlock}>
        <img src="./img/done.png" alt="done" className={styles.doneIcon} />
        <h1>Thank you for your order!</h1>
        <p className={styles.textDetails}>
          The order confirmation email with details of your order and a link to
          track its progress has been sent to your email address.
        </p>
        <h2>Your order # is 000000003 - PENDING</h2>
        <p className={styles.todayData}>Order Date: {formattedDate}</p>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoBlock}>
          <div className={styles.title}>
            <img className={styles.miniIcon} src="./img/user.svg" alt="user" />
            <h2>Contact information</h2>
          </div>
          <p>
            {contactInfo?.firstName || "Name not provided"}{" "}
            <span>{contactInfo?.lastName}</span>
          </p>
          <p>{contactInfo?.email || "Email not provided"}</p>
          <p>{contactInfo?.phone || "Phone not provided"}</p>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.title}>
            <img
              className={styles.miniIcon}
              src="./img/truck.svg"
              alt="truck"
            />
            <h2>Shipment information</h2>
          </div>
          <p>
            {shipmentInfo?.address || "Address not provided"},{" "}
            {shipmentInfo?.apartment || ""}
          </p>
          <p>
            {shipmentInfo?.state || "State not provided"},{" "}
            {shipmentInfo?.city || "City not provided"},{" "}
            {shipmentInfo?.zipCode || "ZIP code not provided"}
          </p>
          <p>{shipmentInfo?.country || "Country not provided"}</p>
        </div>
      </div>
      <div className={styles.orderList}>
        <div className={styles.title}>
          <img className={styles.miniIcon} src="./img/info.svg" alt="info" />
          <h2>Order summary</h2>
        </div>
        <div className={styles.orders}>
          {cartItems.map((cartItem, index) => (
            <OrderCard
              key={index}
              product={cartItem.item}
              quantity={cartItem.quantity}
            />
          ))}
        </div>

        <div className={styles.priceContainer}>
          <p>
            Subtotal:{" "}
            <span>
              $
              {cartItems
                .reduce(
                  (sum, cartItem) =>
                    sum + cartItem.item.price * cartItem.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </p>
          <p>
            Shipping & Handling: <span>$0.00</span>
          </p>
          <p>
            Tax: <span>$0.00</span>
          </p>
          <h2>
            Grand Total:{" "}
            <span>
              $
              {cartItems
                .reduce(
                  (sum, cartItem) =>
                    sum + cartItem.item.price * cartItem.quantity,
                  0
                )
                .toFixed(2)}
            </span>{" "}
          </h2>
        </div>
      </div>
      <Link to="/" className={styles.noUnderline}>
        <button className={styles.stepBtn} onClick={handleContinueShopping}>
          Continue shopping
        </button>
      </Link>
    </div>
  );
}

export default Order;
