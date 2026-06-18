import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Filter by Category
    if (category !== "All") {
      updated = updated.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Search text
    if (search.trim() !== "") {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "priceLow") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      updated.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updated);
  }, [search, category, sortBy, products]);

  const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Fitness"];

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Product Catalog</h1>
        <p>Explore our premium collection of handpicked items</p>
      </div>

      <div className="shop-controls">
        <div className="control-group search-group">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="control-group filter-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} Category
              </option>
            ))}
          </select>
        </div>

        <div className="control-group sort-group">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort: Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Popularity: Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="shop-loading">
          <h2>Loading catalog...</h2>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="shop-empty">
          <h3>No products match your criteria.</h3>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSortBy("default");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="shop-card-wrapper">
              <ProductCard product={product} />
              <button
                className="shop-add-to-cart-btn"
                onClick={() => {
                  dispatch(addToCart(product));
                  alert(`${product.name} added to cart!`);
                }}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "🛒 Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
