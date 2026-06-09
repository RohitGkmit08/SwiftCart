import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 SwiftCart. All rights reserver</p>
        <ul className="footer-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/policy">Private Policy</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
