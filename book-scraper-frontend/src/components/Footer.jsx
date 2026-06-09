import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} BookVerse AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
