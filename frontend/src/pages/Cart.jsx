import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateQuantity, removeFromCart, clearCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Address fields
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    street: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const [paymentType, setPaymentType] = useState("razorpay"); // "razorpay" or "mock"

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOrderSubmission = async (paymentId) => {
    try {
      const orderProducts = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          products: orderProducts,
          address: {
            fullName: address.fullName,
            street: address.street,
            city: address.city,
            postalCode: Number(address.postalCode),
            country: address.country,
          },
          totalAmount,
          paymentId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      alert("Order placed successfully!");
      dispatch(clearCart());
      navigate("/profile");
    } catch (err) {
      alert(err.message || "Something went wrong while placing order");
      console.error(err);
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to check out.");
      navigate("/login");
      return;
    }

    if (
      !address.fullName ||
      !address.street ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      alert("Please fill out all address details.");
      return;
    }

    setLoading(true);

    if (paymentType === "mock") {
      // Mock Payment Flow
      setTimeout(async () => {
        const mockPaymentId = `pay_mock_${Math.random().toString(36).substring(2, 11)}`;
        await handleOrderSubmission(mockPaymentId);
        setLoading(false);
      }, 1000);
    } else {
      // Razorpay Payment Flow
      try {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Razorpay SDK failed to load. Please try again or use the Mock Payment option.");
          setLoading(false);
          return;
        }

        // Create transaction order on backend
        const orderRes = await fetch("/api/payment/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        });

        const rzpOrder = await orderRes.json();
        if (!orderRes.ok) {
          throw new Error(rzpOrder.message || "Failed to create Razorpay transaction");
        }

        // Setup Razorpay checkout options
        const options = {
          key: "rzp_test_SykYxmX9Gz5MlQ", // Razorpay Key ID
          amount: rzpOrder.amount,
          currency: "INR",
          name: "SwiftCart",
          description: "Payment for order on SwiftCart",
          order_id: rzpOrder.id,
          handler: async function (response) {
            // Verify payment on backend
            try {
              const verifyRes = await fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();

              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.message || "Payment verification failed");
              }

              // Create customer order in SwiftCart Database
              await handleOrderSubmission(response.razorpay_payment_id);
            } catch (err) {
              alert(err.message || "Payment verification failed.");
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#00ff66",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } catch (err) {
        alert(err.message || "Error with Razorpay Checkout. Try fallback option.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <p>Go to the shop and add some items to begin.</p>
            <Link to="/shop" className="shop-btn">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left: Cart Items */}
            <div className="cart-items-panel">
              <div className="panel-header">
                <h2>Shopping Cart ({cartItems.length})</h2>
              </div>
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-img-container">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">₹{Number(item.price).toFixed(2)}</p>
                      {item.stock <= 5 && item.stock > 0 && (
                        <span className="low-stock-badge">Only {item.stock} left!</span>
                      )}
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))
                          }
                          disabled={item.stock && item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item-btn"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary and Checkout Form */}
            <div className="cart-summary-panel">
              <div className="panel-header">
                <h2>Order Summary</h2>
              </div>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: "#00ff66" }}>FREE</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {!checkoutMode ? (
                <button
                  className="checkout-btn"
                  onClick={() => {
                    if (!user) {
                      alert("Please login to proceed to checkout");
                      navigate("/login");
                    } else {
                      setCheckoutMode(true);
                    }
                  }}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                  <h3>Shipping Details</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Receiver's Full Name"
                      value={address.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group row-group">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={address.city}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={address.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={address.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <h3>Payment Method</h3>
                  <div className="payment-selectors">
                    <label className={`payment-label ${paymentType === "razorpay" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="paymentType"
                        value="razorpay"
                        checked={paymentType === "razorpay"}
                        onChange={() => setPaymentType("razorpay")}
                      />
                      <span>💳 Razorpay Gateway</span>
                    </label>

                    <label className={`payment-label ${paymentType === "mock" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="paymentType"
                        value="mock"
                        checked={paymentType === "mock"}
                        onChange={() => setPaymentType("mock")}
                      />
                      <span>📦 Mock checkout / Pay on Delivery</span>
                    </label>
                  </div>

                  <div className="checkout-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => setCheckoutMode(false)}
                      disabled={loading}
                    >
                      Back
                    </button>
                    <button type="submit" className="pay-btn" disabled={loading}>
                      {loading ? "Processing..." : paymentType === "razorpay" ? "Pay with Razorpay" : "Place Order"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
