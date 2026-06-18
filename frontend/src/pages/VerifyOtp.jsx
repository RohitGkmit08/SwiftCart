import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setMessage("Invalid access. Please register first.");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email is missing. Cannot verify OTP.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      alert("Email verified successfully!");
      login(data); // Log the user in with the verified session data
      navigate("/");
    } catch (err) {
      alert(err.message || "Invalid OTP or verification error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Verify Account</h2>
        {message ? (
          <p style={{ color: "#ff4d4f", textAlign: "center", marginBottom: "20px" }}>{message}</p>
        ) : (
          <p style={{ color: "#888888", textAlign: "center", marginBottom: "20px", fontSize: "0.95rem" }}>
            An OTP has been sent to <strong>{email}</strong>. 
            <br />
            <span style={{ fontSize: "0.85rem", color: "#00ff66" }}>
              (In development, check the backend server console for the OTP)
            </span>
          </p>
        )}

        <input
          type="text"
          placeholder="Enter 6-Digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
          disabled={!email}
        />

        <button type="submit" disabled={loading || !email}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p>
          Didn't receive it? Go back to <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
