import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./AdminSidebar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <div className="admin-sidebar d-flex flex-column">
            <h3 className="sidebar-title text-center">CrystalZone</h3>

            <div className="sidebar-links flex-grow-1">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active-link" : "sidebar-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/add-product"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active-link" : "sidebar-link"
                    }
                >
                    Add Product
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active-link" : "sidebar-link"
                    }
                >
                    Products
                </NavLink>
            </div>

            <div className="sidebar-logout mt-auto">
                <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AdminSidebar;