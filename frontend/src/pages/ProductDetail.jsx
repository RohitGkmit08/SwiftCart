import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    throw new Error("Product not found");
                }
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleCart = () => {
        if (product) {
            dispatch(addToCart(product));
            alert(`${product.name} added to cart!`);
        }
    };

    if (loading) {
        return (
            <div style={{
                backgroundColor: "#0a0a0a",
                color: "#e5e5e5",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textAlign: "center",
                padding: "100px 20px",
                minHeight: "80vh"
            }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{
                backgroundColor: "#0a0a0a",
                color: "#e5e5e5",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textAlign: "center",
                padding: "100px 20px",
                minHeight: "80vh"
            }}>
                <h2>Product Not Found</h2>
                <Link to="/" style={{ color: "#00ff66", textDecoration: "none", fontWeight: "bold" }}>
                    Back to Shop
                </Link>
            </div>
        );
    }

    const roundedRating = Math.round(product.rating || 0);
    const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);

    return (
        <div style={{
            backgroundColor: "#0a0a0a",
            color: "#e5e5e5",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: "40px 20px",
            minHeight: "80vh"
        }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <Link to="/" style={{
                    color: "#888888",
                    textDecoration: "none",
                    fontSize: "1rem",
                    display: "inline-block",
                    marginBottom: "20px"
                }}>
                    ← Back to Shop
                </Link>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "40px"
                }}>
                    {/* Left: Product Image */}
                    <div style={{
                        flex: "1 1 400px",
                        backgroundColor: "#121212",
                        border: "1px solid #2d2d2d",
                        borderRadius: "12px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "400px"
                    }}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: "8px"
                            }}
                        />
                    </div>

                    <div style={{
                        flex: "1 1 400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <span style={{
                            color: "#00ff66",
                            fontSize: "0.9rem",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            letterSpacing: "1px"
                        }}>
                            {product.category}
                        </span>

                        <h1 style={{
                            fontSize: "2.2rem",
                            color: "#ffffff",
                            margin: "10px 0",
                            lineHeight: "1.3"
                        }}>
                            {product.name}
                        </h1>

                        <div style={{ marginBottom: "15px" }}>
                            <span style={{ color: "#00ff66", fontSize: "1.2rem", marginRight: "10px" }}>
                                {stars}
                            </span>
                            <span style={{ color: "#888888" }}>
                                ({product.numReviews} reviews)
                            </span>
                        </div>

                        <h2 style={{
                            color: "#00ff66",
                            fontSize: "2rem",
                            margin: "10px 0"
                        }}>
                            ₹{Number(product.price).toFixed(2)}
                        </h2>

                        <p style={{
                            color: product.stock > 0 ? "#00ff66" : "#ff4d4f",
                            fontWeight: "bold",
                            margin: "10px 0 20px 0"
                        }}>
                            {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✕ Out of Stock"}
                        </p>

                        <div style={{
                            borderTop: "1px solid #2d2d2d",
                            borderBottom: "1px solid #2d2d2d",
                            padding: "20px 0",
                            marginBottom: "25px"
                        }}>
                            <h3 style={{ color: "#ffffff", margin: "0 0 10px 0" }}>Description</h3>
                            <p style={{ color: "#b3b3b3", lineHeight: "1.6", margin: 0 }}>
                                {product.description}
                            </p>
                        </div>

                        <button
                            onClick={handleCart}
                            disabled={product.stock <= 0}
                            style={{
                                backgroundColor: product.stock > 0 ? "#00ff66" : "#333",
                                color: product.stock > 0 ? "#000" : "#777",
                                border: "none",
                                borderRadius: "8px",
                                padding: "14px",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                cursor: product.stock > 0 ? "pointer" : "not-allowed",
                                width: "100%",
                                maxWidth: "300px"
                            }}
                        >
                            🛒 {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;