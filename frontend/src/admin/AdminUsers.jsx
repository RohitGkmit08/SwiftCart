import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="admin-users-view">
      {loading ? (
        <div className="admin-loading">Retrieving user registry...</div>
      ) : users.length === 0 ? (
        <div className="admin-empty">No users found.</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Access Role</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="id-cell">{u._id}</td>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role === "admin" ? "role-admin" : "role-user"}`}>
                      {u.role === "admin" ? "🛡️ Admin" : "👤 User"}
                    </span>
                  </td>
                  <td>
                    <span className={`verify-badge ${u.verified ? "verified" : "unverified"}`}>
                      {u.verified ? "✓ Verified" : "✕ Unverified"}
                    </span>
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

export default AdminUsers;
