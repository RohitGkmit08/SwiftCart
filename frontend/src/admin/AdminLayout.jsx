import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }
    // If the path is exactly /admin, redirect to /admin/dashboard
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  }, [user, location, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-unauthorized">
        <div className="unauthorized-card">
          <h2>🛡️ Access Denied</h2>
          <p>You do not have administrative privileges to access this area.</p>
          <Link to="/" className="home-btn">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const navLinks = [
    { path: "/admin/dashboard", label: "📊 Dashboard" },
    { path: "/admin/products", label: "📦 Products" },
    { path: "/admin/orders", label: "📋 Orders" },
    { path: "/admin/users", label: "👥 Users" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h3>SwiftCart Admin</h3>
        </div>
        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="back-to-shop-btn">
            ← Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-title-section">
            <h2>
              {location.pathname.includes("dashboard") && "Dashboard"}
              {location.pathname.includes("products") && "Product Management"}
              {location.pathname.includes("orders") && "Order Management"}
              {location.pathname.includes("users") && "User Registry"}
            </h2>
          </div>
          <div className="admin-user-info">
            <span>Hi, {user.name}</span>
            <span className="badge">Admin</span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
