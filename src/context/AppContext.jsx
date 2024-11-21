import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [values, setValues] = useState({
    adsoyad: "",
    yas: "",
    ogretmenAdi: "",
    tarih: "",
  });

  const updateValues = (newValues) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };

  return (
    <AppContext.Provider value={{ values, updateValues }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
