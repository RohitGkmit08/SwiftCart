#  SwiftCart

SwiftCart is a premium full-stack e-commerce web application featuring a robust Node.js/Express backend API, MongoDB database, integrated payments via Razorpay, media storage with Cloudinary, and a React + Vite frontend workspace.

---

##  Key Features

*   ** Secure Authentication:
    *   JWT-based authentication with protected routes and role-based access control (`user` vs. `admin`).
    *   Automatic OTP verification via email SMTP for newly registered users.
    *   Password hashing using `bcryptjs`.
*   ** Product Management:
    *   Full CRUD API for products (Admin only for creation, update, and deletion).
    *   Media upload pipeline integrating `multer` and `Cloudinary` for product images.
    *   Detailed catalog filtering by category, pricing, stock levels, and ratings.
*   ** Payment Gateway Integration:
    *   Full Razorpay integration.
    *   Secure order creation and robust SHA-256 signature verification.
*   ** Order Management & Workflow:
    *   Create orders with secure items checkout.
    *   Track historical orders per-user.
    *   Admin controls to update order delivery status (`pending` -> `shipped` -> `delivered`).
*   ** Admin Analytics & Dashboard:
    *   Aggregated metrics for total users, orders count, product catalog size, and gross cumulative revenue.
*   ** Pre-Populated Database Seeder:
    *   One-click database initialization to set up default products, standard user accounts, and admin logins.

---

## Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, CSS3 | Single Page Application framework and modern builder |
| **Backend** | Node.js, Express.js | Core API and routing server |
| **Database** | MongoDB, Mongoose | NoSQL database & ODM wrapper |
| **Payments** | Razorpay SDK | Payment gateway & signature validation |
| **Storage** | Cloudinary, Multer | Image uploads and content delivery network |
| **Mail** | Nodemailer | SMTP client for registration OTP notifications |

---

## Project Directory Structure

```text
SwiftCart/
├── backend/
│   ├── config/           # DB & Cloudinary initializations
│   ├── controller/       # Business logic controllers
│   ├── middleware/       # JWT auth & Admin role verification
│   ├── model/            # Mongoose Schemas (User, Product, Order)
│   ├── routes/           # Express router endpoints
│   ├── utils/            # Shared helper functions (sendEmail)
│   ├── .env.example      # Example environment configuration
│   ├── seed.js           # DB seeding script
│   └── index.js          # Server entry point
├── frontend/
│   ├── public/           # Static public assets
│   ├── src/              # React source files (Components, Pages)
│   ├── vite.config.js    # Vite configuration
│   └── package.json
└── README.md
```

---

## API Endpoints Reference

### User & Authentication (`/api/auth`)
*   `POST /api/auth/register` — Registers a user, generates a random OTP, and sends it via email.
*   `POST /api/auth/verify` — Verifies the registration OTP to activate the user account.
*   `POST /api/auth/login` — Authenticates credentials and returns a JWT token.
*   `GET /api/auth/users` — Fetches a list of all users (*Admin only*).

### Product Catalog (`/api/products`)
*   `GET /api/products` — Retrieve all products.
*   `GET /api/products/:id` — Retrieve details of a single product.
*   `POST /api/products` — Add a new product with an uploaded image (*Admin only, multipart/form-data*).
*   `PUT /api/products/:id` — Edit an existing product's details and/or image (*Admin only, multipart/form-data*).
*   `DELETE /api/products/:id` — Remove a product from the database (*Admin only*).

### Order Management (`/api/orders`)
*   `POST /api/orders` — Create a new customer order (*Authenticated only*).
*   `GET /api/orders/myorders` — Retrieve order history for the logged-in customer (*Authenticated only*).
*   `GET /api/orders/:id` — Retrieve details of a specific order (*Owner or Admin only*).
*   `GET /api/orders` — List all customer orders in the system (*Admin only*).
*   `PUT /api/orders/:id/status` — Update order shipping status (*Admin only*).

### Razorpay Payments (`/api/payment`)
*   `POST /api/payment/order` — Create a new Razorpay transaction order (requires `amount` in INR).
*   `POST /api/payment/verify` — Validate Razorpay transaction signature (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`).

### Analytics (`/api/analytics`)
*   `GET /api/analytics` — Fetch e-commerce dashboard stats: total users, orders, products, and revenue (*Admin only*).

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)

---

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables:
    *   Duplicate `.env.example` to `.env`
        ```bash
        cp .env.example .env
        ```
    *   Populate it with your credentials (MongoDB Connection URI, JWT Secret, Cloudinary API credentials, Razorpay API credentials, and Gmail SMTP credentials).
4.  **Seed the Database** (Loads default products, users, and admin configurations):
    ```bash
    npm run seed
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:8000` (or the `PORT` specified in your `.env` file).

---

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development workspace:
    ```bash
    npm run dev
    ```

---

## Sample Login Accounts (Seeded Data)

After running `npm run seed`, you can log in to the backend using these default accounts:

### Administrator Account
*   **Email:** `admin@swiftcart.com`
*   **Password:** `adminpassword`
*   **Role:** `admin`

### Customer Account
*   **Email:** `john@swiftcart.com`
*   **Password:** `userpassword`
*   **Role:** `user`

