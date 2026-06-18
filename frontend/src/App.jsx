import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Disclaimer from "./pages/Disclaimer"
import ReturnPolicy from "./pages/ReturnPolicy"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"

// New page imports
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import VerifyOtp from "./pages/VerifyOtp"

// Admin page imports
import AdminLayout from "./admin/AdminLayout"
import AdminDashboard from "./admin/AdminDashboard"
import AdminProducts from "./admin/AdminProducts"
import AdminOrders from "./admin/AdminOrders"
import AdminUsers from "./admin/AdminUsers"

// Global styles
import "./styles/global.css"

const App = () => {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/about" element = {<About />}/>
        <Route path="/disclaimer" element = {<Disclaimer />}/>
        <Route path="/return" element = {<ReturnPolicy />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        
        {/* Shopping and Customer routes */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Administrative routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App