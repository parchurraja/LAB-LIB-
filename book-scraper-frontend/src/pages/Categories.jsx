import React, { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getAllCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error);
        // Fallback dummy data
        setCategories([
          { id: 1, name: 'Fiction' },
          { id: 2, name: 'Science Fiction' },
          { id: 3, name: 'Mystery' },
          { id: 4, name: 'Non-Fiction' },
          { id: 5, name: 'Romance' },
          { id: 6, name: 'Thriller' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Browse by Category</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading categories...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={`/?category=${category.id}`} 
                className="glass" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '2rem', 
                  borderRadius: '1rem', 
                  textAlign: 'center', 
                  fontWeight: 500, 
                  fontSize: '1.2rem',
                  transition: 'transform 0.2s, background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = ''}
              >
                {category.name}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
