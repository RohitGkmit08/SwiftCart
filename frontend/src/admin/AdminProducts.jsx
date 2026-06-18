import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding new product
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Electronics", "Fashion", "Home & Kitchen", "Fitness"];

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Failed to load products");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "Electronics",
      stock: "",
    });
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
    });
    setImageFile(null);
    setImagePreview(product.imageUrl);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("price", formData.price);
      uploadData.append("description", formData.description);
      uploadData.append("category", formData.category);
      uploadData.append("stock", formData.stock);

      if (imageFile) {
        uploadData.append("image", imageFile);
      } else if (!editingProduct) {
        alert("Product image is required for new products.");
        setSubmitting(false);
        return;
      }

      let url = "/api/products";
      let method = "POST";

      if (editingProduct) {
        url = `/api/products/${editingProduct._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: uploadData, // Browser sets multipart/form-data boundary automatically
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to save product");
      }

      alert(editingProduct ? "Product updated successfully!" : "Product created successfully!");
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || "Something went wrong saving product");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to delete product");
      }

      alert("Product removed successfully!");
      fetchProducts();
    } catch (err) {
      alert(err.message || "Something went wrong while deleting");
      console.error(err);
    }
  };

  return (
    <div className="admin-products-view">
      <div className="actions-header">
        <button className="add-product-btn" onClick={openAddModal}>
          ➕ Add New Product
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading catalog...</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="table-img-container">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                  </td>
                  <td className="product-name-cell">{product.name}</td>
                  <td>{product.category}</td>
                  <td className="price-cell">₹{Number(product.price).toFixed(2)}</td>
                  <td>
                    <span className={product.stock <= 5 ? "stock-low" : "stock-normal"}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => openEditModal(product)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? "✏️ Edit Product" : "➕ Add Product"}</h3>
              <button className="close-modal-btn" onClick={() => setModalOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {imagePreview && (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
