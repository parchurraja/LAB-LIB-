import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { userAPI } from '../services/api';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await userAPI.getWishlist();
      setWishlistItems(res.data);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (id) => {
    try {
      await userAPI.toggleWishlist(id);
      setWishlistItems(prev => prev.filter(book => book.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading wishlist...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Heart color="var(--primary)" /> Your Wishlist
      </h1>
      
      {wishlistItems.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '1rem' }}>
          <Heart size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your wishlist is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added any books to your wishlist yet.</p>
          <Link to="/" className="btn btn-primary">Start Browsing</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {wishlistItems.map(book => (
            <div key={book.id} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', borderRadius: '1rem' }}>
              <img src={book.imageUrl} alt={book.title} style={{ width: '80px', height: '100px', objectFit: 'contain', background: 'white', borderRadius: '0.5rem', padding: '0.25rem' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{book.title}</h3>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${book.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to={`/book/${book.id}`} className="btn btn-secondary">View</Link>
                <button onClick={() => removeBookmark(book.id)} style={{ color: 'var(--danger)', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
