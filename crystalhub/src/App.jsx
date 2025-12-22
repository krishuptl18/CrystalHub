import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Service from "./Pages/Service";
import AdminRoute from "./routes/AdminRoute";
import adminRoutes from "./Adminpanel/Adminroutes";
import CategoryProducts from "./Pages/CategoryProducts";
import Checkout from "./Pages/Checkout";
import MyOrders from "./Pages/MyOrders";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service" element={<Service />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
           <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/Payment" element={<Payment />} />
                 <Route path="/order-success" element={<OrderSuccess />} />
      
        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              {adminRoutes.element}
            </AdminRoute>
          }
        >
          {adminRoutes.children.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
