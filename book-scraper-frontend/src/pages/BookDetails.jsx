import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookAPI, userAPI } from '../services/api';
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react';
import { useToast } from '../components/ToastContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await bookAPI.getBookById(id);
        setBook(res.data);
      } catch (error) {
        console.error(error);
        // Fallback dummy data
        setBook({
          id,
          title: 'Sample Book Title',
          description: 'This is a detailed description of the book scraped from the source website. It contains information about the plot, characters, and overall themes.',
          price: '19.99',
          imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
          rating: 'Four',
          availability: 'In stock (20 available)'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleToggleWishlist = async () => {
    try {
      await userAPI.toggleWishlist(book.id);
      showToast('Wishlist toggled successfully!');
    } catch (error) {
      if (error.response?.status === 403) showToast('Please log in first to add to wishlist.', 'error');
      else showToast('Failed to toggle wishlist.', 'error');
    }
  };

  const handleToggleCart = async () => {
    try {
      await userAPI.toggleCart(book.id);
      showToast('Cart toggled successfully!');
    } catch (error) {
      if (error.response?.status === 403) showToast('Please log in first to add to cart.', 'error');
      else showToast('Failed to toggle cart.', 'error');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading book details...</div>;
  if (!book) return <div style={{ textAlign: 'center', padding: '4rem' }}>Book not found.</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', transition: 'color 0.2s' }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div className="glass" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', padding: '3rem', borderRadius: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
          <img src={book.imageUrl} alt={book.title} style={{ maxWidth: '100%', objectFit: 'contain', maxHeight: '400px' }} />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{book.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>${book.price}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
              <Star size={20} fill="currentColor" />
              <span style={{ color: 'var(--text-secondary)' }}>{book.rating || 'No rating'}</span>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', borderRadius: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>
              {book.availability}
            </span>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            {book.description || 'No description available for this book.'}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleToggleCart} className="btn btn-primary" style={{ flex: 1, gap: '0.5rem' }}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button onClick={handleToggleWishlist} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
              <Heart size={20} /> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
