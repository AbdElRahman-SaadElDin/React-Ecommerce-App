import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage from "./Layout/LayoutPage";
import HomePage from "./pages/homepage/HomePage";
import DetailsPage from "./pages/detailspage/DetailsPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CartPage from "./pages/cart/CartPage";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./pages/notfound/NotFound";
import WishlistPage from "./pages/wishlist/WishlistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "details/:id",
        element: <DetailsPage />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
