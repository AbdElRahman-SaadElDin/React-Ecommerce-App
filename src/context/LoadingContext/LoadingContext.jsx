import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  let activeRequests = 0;

  const showLoader = () => {
    activeRequests++;
    setLoading(true);
  };

  const hideLoader = () => {
    activeRequests--;
    if (activeRequests <= 0) {
      setLoading(false);
      activeRequests = 0;
    }
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};
