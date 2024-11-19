import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./Components/App/App";
import { CartProvider } from "./Components/CartContext/CartContext";
import { FormProvider } from "./Components/FormProvider/FormProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
