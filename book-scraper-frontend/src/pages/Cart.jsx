import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { userAPI } from '../services/api';
import { useToast } from '../components/ToastContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await userAPI.getCart();
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (id) => {
    try {
      await userAPI.toggleCart(id);
      setCartItems(prev => prev.filter(book => book.id !== id));
      showToast('Removed from cart');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading cart...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ShoppingCart color="var(--primary)" /> Your Cart
      </h1>
      
      {cartItems.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '1rem' }}>
          <ShoppingCart size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added any books to your cart yet.</p>
          <Link to="/" className="btn btn-primary">Start Browsing</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map(book => (
              <div key={book.id} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', borderRadius: '1rem' }}>
                <img src={book.imageUrl} alt={book.title} style={{ width: '80px', height: '100px', objectFit: 'contain', background: 'white', borderRadius: '0.5rem', padding: '0.25rem' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{book.title}</h3>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${book.price}</span>
                </div>
                <button onClick={() => removeCartItem(book.id)} style={{ color: 'var(--danger)', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Items ({cartItems.length})</span>
              <span>${totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${totalPrice}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
