
import Dashboard from "./Adminpages/Dashboard";
import AddProduct from "./Adminpages/AddProduct";
import ProductList from "./Adminpages/ProductList";
import AdminLayout from "./AdminLayout/AdminLayout";

const adminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "add-product",
            element: <AddProduct />
        },
        {
            path: "products",
            element: <ProductList />
        }
    ]
};

export default adminRoutes;