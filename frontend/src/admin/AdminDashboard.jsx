import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchAnalytics();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="admin-loading">
        <h2>Loading analytics stats...</h2>
      </div>
    );
  }

  const metricCards = [
    {
      title: "Gross Revenue",
      value: `₹${Number(stats.totalRevenue).toLocaleString()}`,
      icon: "💰",
      description: "Total earnings from completed orders",
      colorClass: "card-revenue",
    },
    {
      title: "Completed Orders",
      value: stats.totalOrders,
      icon: "📦",
      description: "Total transactions placed by customers",
      colorClass: "card-orders",
    },
    {
      title: "Product Catalog",
      value: stats.totalProducts,
      icon: "🏷️",
      description: "Active items in product inventory",
      colorClass: "card-products",
    },
    {
      title: "Registered Users",
      value: stats.totalUsers,
      icon: "👥",
      description: "Registered customers (excluding admins)",
      colorClass: "card-users",
    },
  ];

  return (
    <div className="dashboard-view">
      {/* Metric Cards Grid */}
      <div className="stats-grid">
        {metricCards.map((card, idx) => (
          <div key={idx} className={`stat-card ${card.colorClass}`}>
            <div className="stat-header">
              <span className="stat-title">{card.title}</span>
              <span className="stat-icon">{card.icon}</span>
            </div>
            <div className="stat-value">{card.value}</div>
            <p className="stat-desc">{card.description}</p>
            <div className="stat-glow"></div>
          </div>
        ))}
      </div>

      {/* Quick Summary Section */}
      <div className="dashboard-insights">
        <div className="insight-panel">
          <h3>🚀 Welcome to SwiftCart Control Center</h3>
          <p>
            From this panel, you can monitor sales statistics, update order delivery statuses,
            register new products with Cloudinary image uploading, and view customer registrations.
          </p>
          <div className="shortcut-buttons">
            <a href="/admin/products" className="shortcut-btn">Manage Products</a>
            <a href="/admin/orders" className="shortcut-btn">Review Orders</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
