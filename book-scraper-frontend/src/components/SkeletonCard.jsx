import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="glass" style={{ borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ padding: '1rem', background: 'var(--surface-hover)', height: '232px', width: '100%' }}
      />
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          style={{ height: '1.25rem', background: 'var(--surface-hover)', borderRadius: '0.25rem', width: '80%' }}
        />
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
          style={{ height: '1rem', background: 'var(--surface-hover)', borderRadius: '0.25rem', width: '40%', marginBottom: '1rem' }}
        />
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            style={{ height: '1.5rem', background: 'var(--surface-hover)', borderRadius: '0.25rem', width: '30%' }}
          />
          <motion.div 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            style={{ height: '2rem', background: 'var(--surface-hover)', borderRadius: '0.5rem', width: '30%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
