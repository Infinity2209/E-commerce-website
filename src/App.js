import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Listing from './components/Listing';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { jwtDecode } from 'jwt-decode';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem('token');
        }
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Listing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
