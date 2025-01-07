import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import Card from "../Card/Card";
import Cart from "../Cart/Cart";
import ContactInformation from "../ContactInformation/ContactInformation";
import ShipmentInformation from "../ShipmentInformation/ShipmentInformation";
import Order from "../Order/Order";
import { CartContext } from "../CartContext/CartContext";
import styles from "./App.module.css";

function App() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddProduct = (product) => {
    addToCart(product);
    setIsCartDisplayed(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.App}>
      <header
        className={`${styles.mainHeader} ${scrolled ? styles.scrolled : ""}`}
      >
        <Link to="/">
          {" "}
          <img src="./img/Logo.svg" alt="logo" />
        </Link>

        <button className={styles.headerBtn} onClick={handleGoToCart}>
          <img
            className={styles.headerBtnCartIcon}
            src="./img/cart-icon.svg"
            alt="Cart-icon"
          />
          <p>Cart</p>

          <p
            className={styles.headerBtnAmount}
            style={{ display: isCartDisplayed ? "flex" : "none" }}
          >
            {cartItems.length}
          </p>
        </button>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {products.map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddProduct(product)}
                  />
                ))}
              </>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="contact" element={<ContactInformation />} />
          <Route path="shipment" element={<ShipmentInformation />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
