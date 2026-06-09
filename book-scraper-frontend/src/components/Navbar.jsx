import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, ShoppingCart, Heart, Sun, Moon } from 'lucide-react';

const Navbar = ({ isAuthenticated, setIsAuthenticated, theme, setTheme }) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="glass" style={{ padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen color="var(--primary)" />
          LAB <span style={{ color: 'var(--primary)' }}>LIB</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/categories" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Categories</Link>
          {isAuthenticated ? (
            <>
              <Link to="/wishlist"><Heart size={20} /></Link>
              <Link to="/cart"><ShoppingCart size={20} /></Link>
              <Link to="/dashboard"><User size={20} /></Link>
              <button onClick={handleLogout} style={{ color: 'var(--text-primary)' }}><LogOut size={20} /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
