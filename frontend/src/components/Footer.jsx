import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3 style={{ color: "orange", marginBottom: "10px" }}>
          SwiftCart
        </h3>
      </div>

      <div className="footer-content">
        <ul className="footer-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/return">Return Policy</Link></li>
          <li><Link to="/disclaimer">Disclaimer</Link></li>
        </ul>

        <p>
          &copy; {new Date().getFullYear()} SwiftCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;