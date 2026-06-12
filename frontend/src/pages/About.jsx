
const About = () => {
  return (
    <div className="about-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .about-page {
          background-color: #0a0a0a;
          color: #e5e5e5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 80vh;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about-card {
          background-color: #121212;
          border: 1px solid #1a3a22; /* Dark green border */
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
        }

        .about-title {
          font-size: 2.5rem;
          color: #00ff66; /* Neon green */
          font-weight: 700;
          margin-bottom: 15px;
          letter-spacing: -0.5px;
        }

        .about-subtitle {
          font-size: 1.1rem;
          color: #888888;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .profile-section {
          border-top: 1px solid #222222;
          padding-top: 30px;
          margin-top: 10px;
        }

        .profile-name {
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .profile-role {
          font-size: 1rem;
          color: #00ff66;
          margin-bottom: 25px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .links-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }

        .social-link {
          display: inline-block;
          width: 80%;
          padding: 12px 24px;
          color: #000000;
          background-color: #00ff66;
          text-decoration: none;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
          border: 1px solid #00ff66;
        }

        .social-link:hover {
          background-color: transparent;
          color: #00ff66;
          box-shadow: 0 0 15px rgba(0, 255, 102, 0.4);
        }

        .social-link.github {
          background-color: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        .social-link.github:hover {
          background-color: transparent;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="about-card">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Welcome to SwiftCart, where premium design meets seamless e-commerce. Built with a passion for high-performance web applications and beautiful user experiences.
        </p>

        <div className="profile-section">
          <h2 className="profile-name">Rohit Sinha</h2>
          <p className="profile-role">Developer</p>
          
          <div className="links-container">
            <a 
              href="https://www.linkedin.com/in/rohit-sinha-ba7298238/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              Connect on LinkedIn
            </a>
            <a 
              href="https://github.com/RohitGkmit08" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link github"
            >
              Follow on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;