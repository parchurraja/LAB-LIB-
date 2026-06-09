import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bookAPI, categoryAPI } from '../services/api';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import { motion } from 'framer-motion';
import { Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
    
    if (categoryId) {
      fetchBooksByCategory(categoryId);
      categoryAPI.getAllCategories().then(res => {
        const cat = res.data.find(c => c.id.toString() === categoryId);
        if (cat) setCategoryName(cat.name);
      }).catch(console.error);
    } else {
      setCategoryName('');
      fetchBooks();
    }
  }, [categoryId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        const runSearch = async () => {
          try {
            setLoading(true);
            const res = await bookAPI.searchBooks(searchQuery);
            setBooks(res.data);
            setCurrentPage(1);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        runSearch();
      } else if (!categoryId) {
        fetchBooks();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, categoryId]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await bookAPI.getAllBooks();
      setBooks(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksByCategory = async (id) => {
    try {
      setLoading(true);
      const res = await bookAPI.getBooksByCategory(id);
      setBooks(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return fetchBooks();
    
    // Maintain search history (max 5)
    const newHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    try {
      setLoading(true);
      const res = await bookAPI.searchBooks(searchQuery);
      setBooks(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyHistorySearch = (query) => {
    setSearchQuery(query);
    // Let the form submission or a manual trigger handle the actual search
    // Since we're just clicking it, let's trigger it directly
    const runSearch = async () => {
      try {
        setLoading(true);
        const res = await bookAPI.searchBooks(query);
        setBooks(res.data);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    runSearch();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* Decorative Glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '50vh', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '40vw', height: '40vh', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }}></div>

      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}
        >
          {categoryId ? (categoryName ? `Category: ${categoryName}` : 'Category Books') : 'LAB LIB'}
        </motion.h1>
        
        {!categoryId && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}
          >
            The <strong>Laboratory of Literature</strong>. Where code meets narrative, data transforms into discovery, and every book is an experiment in imagination.
          </motion.p>
        )}
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: categoryId ? '0 auto 1rem' : '0 auto 1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '3rem', borderRadius: '2rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ borderRadius: '2rem' }}>Search</button>
        </form>

        {searchHistory.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Clock size={16} color="var(--text-secondary)" />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Recent:</span>
            {searchHistory.map((query, idx) => (
              <button 
                key={idx} 
                onClick={() => applyHistorySearch(query)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}
              >
                {query}
              </button>
            ))}
            <button 
              onClick={clearHistory}
              style={{ background: 'transparent', border: 'none', padding: '0.25rem 0.75rem', fontSize: '0.8rem', color: 'var(--danger)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear
            </button>
          </div>
        )}
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>{categoryId ? 'Results' : 'Featured Books'}</h2>
          <span style={{ color: 'var(--text-secondary)' }}>Showing {books.length} books</span>
        </div>

        {loading ? (
          <div className="books-grid">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>No books found.</div>
        ) : (
          <>
            <div className="books-grid">
              {currentBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, padding: '0.5rem 1rem' }}
                >
                  <ChevronLeft size={20} /> Prev
                </button>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[...Array(totalPages)].map((_, i) => {
                    // Show max 5 pages around current
                    if (i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)) {
                      return (
                        <button 
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          style={{
                            width: '40px', height: '40px', borderRadius: '0.5rem',
                            background: currentPage === i + 1 ? 'var(--primary)' : 'var(--surface)',
                            color: currentPage === i + 1 ? 'white' : 'var(--text-primary)',
                            border: '1px solid var(--border)',
                            fontWeight: 'bold'
                          }}
                        >
                          {i + 1}
                        </button>
                      );
                    } else if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                      return <span key={i} style={{ display: 'flex', alignItems: 'center' }}>...</span>;
                    }
                    return null;
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, padding: '0.5rem 1rem' }}
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
