import AdminLayout from "./AdminLayout/AdminLayout";
import AddProduct from "./Adminpages/Addproduct";
import Dashboard from "./Adminpages/Dashboard";
import ProductList from "./Adminpages/ProductList";

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