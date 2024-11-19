import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
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

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
