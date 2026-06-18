import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to load orders");
      }
      const data = await res.json();
      // Sort: newest orders first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update order status");
      }

      alert(`Order status updated to ${newStatus}!`);
      fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to update status");
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

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
    <div className="admin-orders-view">
      {loading ? (
        <div className="admin-loading">Loading order book...</div>
      ) : orders.length === 0 ? (
        <div className="admin-empty">No orders found in the database.</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Details</th>
                <th>Items Ordered</th>
                <th>Total Revenue</th>
                <th>Date</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="id-cell">{order._id}</td>
                  <td>
                    <div className="customer-info-cell">
                      <strong>{order.user?.name || "Deleted User"}</strong>
                      <span>{order.user?.email || "N/A"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="order-items-cell">
                      {order.products?.map((item, idx) => (
                        <div key={idx} className="item-detail-row">
                          {item.productId ? item.productId.name : "Product Removed"} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="price-cell">₹{Number(order.totalAmount).toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-selector"
                      value={order.status || "pending"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
