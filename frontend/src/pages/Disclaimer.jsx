
const Disclaimer = () => {
  return (
    <div className="policy-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .policy-page {
          background-color: #0a0a0a;
          color: #e5e5e5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 80vh;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .policy-card {
          background-color: #121212;
          border: 1px solid #1a3a22;
          border-radius: 16px;
          padding: 40px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }

        .policy-title {
          font-size: 2.5rem;
          color: #00ff66;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -0.5px;
          text-align: center;
          border-bottom: 1px solid #222222;
          padding-bottom: 20px;
        }

        .policy-section {
          margin-bottom: 25px;
        }

        .policy-subtitle {
          font-size: 1.3rem;
          color: #00ff66;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .policy-text {
          font-size: 1rem;
          color: #b3b3b3;
          line-height: 1.7;
          margin-bottom: 15px;
        }
      `}</style>

      <div className="policy-card">
        <h1 className="policy-title">Disclaimer</h1>

        <div className="policy-section">
          <h2 className="policy-subtitle">1. General Information</h2>
          <p className="policy-text">
            All the information on this website (SwiftCart) is published in good faith and for general information purpose only. SwiftCart does not make any warranties about the completeness, reliability, and accuracy of this information.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">2. Liability Limitation</h2>
          <p className="policy-text">
            Any action you take upon the information you find on this website is strictly at your own risk. SwiftCart will not be liable for any losses and/or damages in connection with the use of our website.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">3. External Links</h2>
          <p className="policy-text">
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">4. Consent</h2>
          <p className="policy-text">
            By using our website, you hereby consent to our disclaimer and agree to its terms. Any updates, amendments, or changes to this document will be prominently posted here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;