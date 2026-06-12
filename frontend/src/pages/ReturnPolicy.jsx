
const ReturnPolicy = () => {
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

        .policy-list {
          list-style-type: none;
          padding-left: 0;
          margin-bottom: 15px;
        }

        .policy-list-item {
          font-size: 1rem;
          color: #b3b3b3;
          line-height: 1.7;
          margin-bottom: 8px;
          position: relative;
          padding-left: 20px;
        }

        .policy-list-item::before {
          content: "•";
          color: #00ff66;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
          position: absolute;
          left: 20px;
        }
      `}</style>

      <div className="policy-card">
        <h1 className="policy-title">Return Policy</h1>
        
        <div className="policy-section">
          <h2 className="policy-subtitle">1. Returns & Exchanges</h2>
          <p className="policy-text">
            We want you to be completely satisfied with your purchase from SwiftCart. If you are not entirely happy, you can return or exchange your item within <strong>30 days</strong> of receiving your order.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">2. Eligibility Criteria</h2>
          <p className="policy-text">
            To be eligible for a return or exchange, please ensure that:
          </p>
          <ul className="policy-list">
            <li className="policy-list-item">The item is in its original packaging, unused, and in the same condition as received.</li>
            <li className="policy-list-item">All tags, manuals, and accessories are intact and included.</li>
            <li className="policy-list-item">You provide the receipt or proof of purchase.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">3. Non-Returnable Items</h2>
          <p className="policy-text">
            Certain items are not eligible for returns or refunds due to hygiene and safety reasons, including:
          </p>
          <ul className="policy-list">
            <li className="policy-list-item">Personal care and hygiene items.</li>
            <li className="policy-list-item">Downloadable software products and digital gift cards.</li>
            <li className="policy-list-item">Items on final sale or clearance.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-subtitle">4. Refund Process</h2>
          <p className="policy-text">
            Once we receive and inspect your returned item, we will send you an email confirmation. If approved, your refund will be processed and automatically applied to your original method of payment within <strong>5 to 7 business days</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;