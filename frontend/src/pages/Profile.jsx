import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load orders");
        }
        const data = await res.json();
        // Sort orders so the newest are first
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(data);
      } catch (err) {
        console.error("Error fetching my orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "shipped":
        return "status-shipped";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* User Card */}
        <div className="profile-card">
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
          <div className="role-tag">{user.role === "admin" ? "🛡️ Administrator" : "🛒 SwiftCart Member"}</div>
          {user.role === "admin" && (
            <Link to="/admin" className="admin-portal-btn">
              Go to Admin Dashboard
            </Link>
          )}
        </div>

        {/* Orders History Panel */}
        <div className="orders-panel">
          <h2>Your Orders</h2>

          {loading ? (
            <div className="orders-loading">Loading order history...</div>
          ) : orders.length === 0 ? (
            <div className="orders-empty">
              <p>You haven't placed any orders yet.</p>
              <Link to="/shop" className="shop-link">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div>
                      <span className="order-id-label">ORDER ID:</span>
                      <span className="order-id-val">{order._id}</span>
                    </div>
                    <div>
                      <span className="order-date-label">DATE:</span>
                      <span className="order-date-val">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status || "pending"}
                    </span>
                  </div>

                  <div className="order-body">
                    {/* Products Grid */}
                    <div className="order-products">
                      {order.products.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <div className="item-img-container">
                            <img
                              src={item.productId?.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100"}
                              alt={item.productId?.name || "Product"}
                            />
                          </div>
                          <div className="item-meta">
                            <h4>{item.productId?.name || "Product Removed"}</h4>
                            <p className="price-qty">
                              ₹{Number(item.price).toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Summary info */}
                    <div className="order-meta-info">
                      <div className="shipping-info">
                        <h5>Delivery Address</h5>
                        <p>{order.address?.fullName}</p>
                        <p>{order.address?.street}</p>
                        <p>
                          {order.address?.city} - {order.address?.postalCode}
                        </p>
                        <p>{order.address?.country}</p>
                      </div>
                      <div className="payment-info">
                        <h5>Payment</h5>
                        <p className="payment-id">ID: {order.paymentId || "N/A"}</p>
                        <div className="total-amount">
                          Total Paid: <span>₹{Number(order.totalAmount).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
