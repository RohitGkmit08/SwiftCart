# SwiftCart

A full-stack e-commerce platform with a customer-facing storefront and a complete administrative dashboard, built on the MERN stack with integrated payments, media storage, and email verification.

---

## Key Features

### Client and Shopping Experience
- **Dynamic Product Catalog** — Browse the catalog with robust search, filtering by category and stock levels, and multiple page layouts.
- **Redux Cart State** — Cart state is managed globally using Redux Toolkit and persists automatically in local storage.
- **Details Page** — Interactive views of product reviews, descriptions, and available inventory count.
- **User Profile** — Custom user dashboard to view profile details and check order history with shipping updates.

### Transaction Pipeline
- **Razorpay Payment Integration** — Secure client-side checkouts communicating with standard APIs.
- **Signature Verification** — Server verifies the `razorpay_signature` using SHA-256 HMAC for bulletproof transaction security.
- **Stock Checking & Deductions** — Checks inventory levels during checkout and updates product stock on successful checkout.

### Security and User Control
- **JWT Authentication** — Secure endpoints with JSON Web Tokens stored and managed via local storage.
- **One-Time Passcode (OTP)** — Verifies newly registered accounts via Nodemailer SMTP email verification before activation.
- **Password Hashing** — Secure storage of customer credentials using `bcryptjs`.
- **RBAC (Role-Based Access Control)** — Enforces access bounds for `admin` operations versus standard `user` routes.

### Administrative Interface
- **Interactive Dashboard** — Track operational health metrics including Total Users, Order Volumes, Catalog Items, and Gross Cumulative Revenue.
- **Product Management** — Full CRUD capabilities supporting media file uploads via `multer` directly to Cloudinary.
- **Orders Control** — Management of incoming shipments, tracking fulfillment status (`pending` → `shipped` → `delivered`).
- **User Management** — Overview of active system accounts and permissions.

---

## Technology Stack

| Layer | Component / Library | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Interactive user interface rendering |
| | React Router Dom (v7) | Declarative client routing and route guards |
| | Redux Toolkit (v2) | Global cart management and local storage persistence |
| | CSS3 | Custom modular styles for maximum control |
| | Vite (v8) | Next-gen builder and proxy-backed hot reload server |
| **Backend** | Express (v5) | Routing engine and API middleware layer |
| | Node.js | Server runtime |
| **Database** | MongoDB & Mongoose | Document DB database schema structures |
| **Payments** | Razorpay SDK | Transactions and signature checks |
| **Storage** | Cloudinary CDN | Cloud media image storage |
| | Multer | Multipart/form-data processor for file uploads |
| **Mailing** | Nodemailer | SMTP client engine for registration verification codes |

---

## Project Directory Structure

```text
SwiftCart/
├── backend/               # Backend codebase
│   ├── config/            # Infrastructure connections
│   │   ├── db.js          # MongoDB database connector
│   │   └── cloudinary.js  # Cloudinary SDK configurations
│   ├── controller/        # Logic handlers
│   │   ├── analyticsController.js # Admin KPI computations
│   │   ├── orderController.js     # Checkout, order lookup, status update
│   │   ├── paymentController.js   # Razorpay order generation & signature verification
│   │   ├── productController.js   # CRUD handlers for products
│   │   └── userController.js      # Auth, OTP generation/verification
│   ├── middleware/        # Express authorization filters
│   │   ├── authMiddleware.js      # JWT token validation
│   │   └── adminMiddleware.js     # Checks for 'admin' role privileges
│   ├── model/             # Mongoose schemas
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/            # Express endpoint mappings
│   │   ├── analytics.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   ├── product.routes.js
│   │   └── user.routes.js
│   ├── utils/              # Helper utilities
│   │   └── sendEmail.js   # Nodemailer SMTP transporter
│   ├── .env.example       # Example server configuration
│   ├── index.js           # Server root & configuration loader
│   └── seed.js             # Initial database seeder
└── frontend/               # Frontend codebase
    ├── public/             # Static assets
    ├── src/                # React + Vite source tree
    │   ├── admin/          # Admin components and pages
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminLayout.jsx
    │   │   ├── AdminOrders.jsx
    │   │   ├── AdminProducts.jsx
    │   │   └── AdminUsers.jsx
    │   ├── components/     # Reusable UI elements (Navbar, Footer, ProductCard)
    │   ├── context/        # Auth state provider (AuthContext)
    │   ├── pages/           # Public/Customer pages (Home, Shop, Cart, Profile, etc.)
    │   ├── redux/           # Global store & Cart slice config
    │   └── styles/          # Global and view-specific stylesheets
    ├── index.html           # HTML entry point
    └── vite.config.js       # Vite dev proxy configuration
```
