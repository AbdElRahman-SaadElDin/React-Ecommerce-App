import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext/CartContext.jsx";
import { AuthProvider } from "./context/UserContext/UserContext.jsx";
import { LoadingProvider } from "./context/LoadingContext/LoadingContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </Provider>
  </StrictMode>
);
