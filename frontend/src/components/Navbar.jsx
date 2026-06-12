import { Link, useNavigate } from "react-router-dom"
import "../styles/navbar.css"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {

  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login")
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to = "/">SwiftCart</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {user ? (
          <>
          <li><Link to='/profile'>Hi, {user.name}</Link></li>
          {user.role === 'admin' && <li><Link to='/admin'>Admin</Link></li>}
          <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : 
          (
            <li><Link to="/login">Login</Link></li>
          )
        }

      </ul>
    </nav>
  )
}
export default Navbar
