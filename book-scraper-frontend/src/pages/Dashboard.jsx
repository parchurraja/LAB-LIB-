import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const Dashboard = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      userAPI.getWishlist().then(res => setWishlistCount(res.data.length)).catch(console.error);
      userAPI.getCart().then(res => setCartCount(res.data.length)).catch(console.error);
    }
  }, [user]);

  if (!user) return <div style={{ textAlign: 'center', padding: '4rem' }}>Please log in to view your dashboard.</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Welcome, {user.username}!</h2>
      <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Profile Information</h3>
        <p><strong style={{ color: 'var(--text-secondary)' }}>Email:</strong> {user.email}</p>
        <p><strong style={{ color: 'var(--text-secondary)' }}>Role:</strong> {user.role || 'USER'}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Your Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{wishlistCount}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Books in Wishlist</div>
            </div>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{cartCount}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Books in Cart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
