const axios = require('axios');

async function testWishlist() {
  try {
    // 1. Register
    const email = 'test' + Date.now() + '@example.com';
    await axios.post('http://localhost:8082/api/auth/register', {
      username: email,
      email: email,
      password: 'password'
    });
    
    // 2. Login
    const loginRes = await axios.post('http://localhost:8082/api/auth/login', {
      username: email,
      password: 'password'
    });
    const token = loginRes.data.token;
    console.log('Got token:', token);
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // 3. Get first book ID
    const booksRes = await axios.get('http://localhost:8082/api/books');
    const firstBook = booksRes.data.content[0];
    console.log('Adding book to wishlist:', firstBook.id);
    
    // 4. Add to wishlist
    const toggleRes = await axios.post(`http://localhost:8082/api/users/wishlist/${firstBook.id}`, {}, config);
    console.log('Toggle response:', toggleRes.data);
    
    // 5. Get wishlist
    const wishlistRes = await axios.get('http://localhost:8082/api/users/wishlist', config);
    console.log('Wishlist length:', wishlistRes.data.length);
    console.log('Wishlist data:', wishlistRes.data);
    
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testWishlist();
