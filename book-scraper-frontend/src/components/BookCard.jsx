import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass" 
      style={{ borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ padding: '1rem', background: 'var(--surface)', display: 'flex', justifyContent: 'center' }}>
        <img 
          src={book.imageUrl} 
          alt={book.title} 
          style={{ height: '200px', objectFit: 'contain', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} 
        />
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {book.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
          <Star size={16} fill="currentColor" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{book.rating || 'No rating'}</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>${book.price}</span>
          <Link to={`/book/${book.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
