# SwiftCart

SwiftCart is a premium, enterprise-ready full-stack e-commerce web application featuring a robust **Node.js/Express** backend API, a flexible **MongoDB** database, integrated payments via **Razorpay**, media storage with **Cloudinary**, and a sleek **React + Redux + Vite** frontend interface.

---

## Architecture Overview

SwiftCart follows a decoupled, client-server architecture model. The client layer communicates with the server via standard HTTP REST endpoints, utilizing JWT tokens for stateful authentication.

```

---

## Key Features

### Client and Shopping Experience
* **Dynamic Product Catalog**: Browse catalog with robust search, filtering options by category, stock levels, and page layouts.
* **Redux Cart State**: Cart state is managed globally using **Redux Toolkit** and persists automatically in local storage.
* **Details Page**: Interactive views of product reviews, description, and available inventory count.
* **User Profile**: Custom user dashboard to view profile details and check order history with shipping updates.

### Transaction Pipeline
* **Razorpay Payment Integration**: Secure client-side checkouts communicating with standard APIs.
* **Signature Verification**: Server verifies the `razorpay_signature` using SHA-256 HMAC for bulletproof transaction security.
* **Stock Checking & Deductions**: Checks inventory levels during checkout and updates product stock on successful checkout.

### Security and User Control
* **JWT Authentication**: Secure endpoints with JSON Web Tokens stored and managed via local storage.
* **One-Time Passcode (OTP)**: Verifies newly registered accounts via nodemailer SMTP email verification before activation.
* **Password Hashing**: Secure storage of customer credentials using `bcryptjs`.
* **RBAC (Role-Based Access Control)**: Enforces access bounds for `admin` operations versus standard `user` routes.

### Administrative Interface
* **Interactive Dashboard**: Track operational health metrics including **Total Users**, **Order Volumes**, **Catalog Items**, and **Gross Cumulative Revenue**.
* **Product Management**: Full CRUD capabilities supporting media file uploads via `multer` directly to Cloudinary.
* **Orders Control**: Management of incoming shipments, tracking fulfillment status (`pending` ➔ `shipped` ➔ `delivered`).
* **User Management**: Overview of active system accounts and permissions.

---

## Technology Stack

| Layer | Component / Library | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Interactive user interface rendering |
| | React Router Dom (v7) | Declared client routing and route guards |
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
│   ├── utils/             # Helper utilities
│   │   └── sendEmail.js   # Nodemailer SMTP transporter
│   ├── .env.example       # Example server configuration
│   ├── index.js           # Server root & configuration loader
│   └── seed.js            # Initial database seeder
└── frontend/              # Frontend codebase
    ├── public/            # Static assets
    ├── src/               # React + Vite source tree
    │   ├── admin/         # Admin components and pages
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminLayout.jsx
    │   │   ├── AdminOrders.jsx
    │   │   ├── AdminProducts.jsx
    │   │   └── AdminUsers.jsx
    │   ├── components/    # Reusable UI elements (Navbar, Footer, ProductCard)
    │   ├── context/       # Auth state provider (AuthContext)
    │   ├── pages/         # Public/Customer pages (Home, Shop, Cart, Profile, etc.)
    │   ├── redux/         # Global store & Cart slice config
    │   └── styles/        # Global and view-specific stylesheets
    ├── index.html         # HTML entry point
    └── vite.config.js     # Vite dev proxy configuration
```

---

## API Endpoints Reference

### Authentication and Users (`/api/auth`)
| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register account; dispatches OTP via SMTP |
| `POST` | `/api/auth/verify` | Public | Verify OTP code to activate the account |
| `POST` | `/api/auth/login` | Public | Verify credentials and return JWT & user details |
| `GET` | `/api/auth/users` | Admin | Get listing of all registered users |

### Product Inventory (`/api/products`)
| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Fetch all products in the catalog |
| `GET` | `/api/products/:id` | Public | Retrieve product detail specifications |
| `POST` | `/api/products` | Admin | Create product (multipart/form-data upload) |
| `PUT` | `/api/products/:id` | Admin | Update product (multipart/form-data upload) |
| `DELETE` | `/api/products/:id` | Admin | Delete product from database |

### Order Management (`/api/orders`)
| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | User / Admin | Register new successful purchase order |
| `GET` | `/api/orders/myorders`| User | Retrieve customer's transaction history |
| `GET` | `/api/orders/:id` | Owner / Admin | Retrieve full parameters of a specific order |
| `GET` | `/api/orders` | Admin | Fetch all orders globally |
| `PUT` | `/api/orders/:id/status`| Admin | Progress order status (`pending` ➔ `shipped` ➔ `delivered`) |

### Payments (`/api/payment`)
| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payment/order` | User | Create a Razorpay payment order (amount in paise) |
| `POST` | `/api/payment/verify`| User | HMAC-SHA256 signature verification of checkout data |

### Administrative Statistics (`/api/analytics`)
| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics` | Admin | Aggregate dashboard KPIs |

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/) (Local server or Atlas Cloud Cluster)

---

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Prepare the environment settings:
   Create a `.env` file in the `backend/` directory by copying the template file:
   ```bash
   cp .env.example .env
   ```
   Provide values for the following environment parameters:
   ```env
   PORT = 8000
   MONGO_URI = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret_key

   # SMTP Setup (for OTP dispatch)
   EMAIL_USER = your_smtp_email_address
   EMAIL_PASS = your_smtp_email_app_password

   # Cloudinary Media credentials
   CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
   CLOUDINARY_API_KEY = your_cloudinary_api_key
   CLOUDINARY_API_SECRET = your_cloudinary_api_secret

   # Razorpay API Credentials
   RAZORPAY_KEY_ID = your_razorpay_key_id
   RAZORPAY_KEY_SECRET = your_razorpay_key_secret
   ```

4. **Seed Database collections** (loads default catalogs, standard client profiles, and admin authorization logins):
   ```bash
   npm run seed
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```
   The backend will start and listen on `http://localhost:8000` (or your defined `PORT`).

---

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development application:
   ```bash
   npm run dev
   ```
   Vite runs a local proxy (configured in [vite.config.js](file:///Users/rohitsinha/Desktop/SwiftCart/frontend/vite.config.js)) forwarding all `/api` calls to `http://localhost:8000`. No client-side environment configurations are required.
   
4. Open your browser and navigate to the address displayed in the console (usually `http://localhost:5173`).

---

## Seed Profiles (Testing Accounts)

After seeding the database (`npm run seed`), you can log in using these preset credentials:

### Administrator Account
* **Email:** `admin@swiftcart.com`
* **Password:** `adminpassword`
* **Privileges:** Full dashboard views, stock additions, order status transitions.

### Customer Account
* **Email:** `john@swiftcart.com`
* **Password:** `userpassword`
* **Privileges:** Add to cart, place orders, view order history.

---

## Testing

The backend includes test configurations with Jest and Supertest. To execute test scripts (if implemented), run:
```bash
npm run test
```
