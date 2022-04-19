import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import "./App.css";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import UpdateProfile from "./components/users/UpdateProfile";
import UpdatePassword from "./components/users/UpdatePassword";
import ForgotPassword from "./components/users/ForgotPassword";
import NewPassword from "./components/users/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Home from "./components/Home";
import ProductDetails from "./components/products/ProductDetails";
import { loadUser } from "./actions/usersActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/me"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/password/forgot" element={<ForgotPassword />} exact />
            <Route
              path="/password/reset/:token"
              element={<NewPassword />}
              exact
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
