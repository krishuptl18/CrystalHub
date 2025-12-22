import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <>
            <AdminSidebar />

            <div className="admin-main-content">
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;