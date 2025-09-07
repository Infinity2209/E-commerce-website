import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = ({ user, onLogout }) => {
    const { cartCount, fetchCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user, fetchCart]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/');
    };

    const isHome = location.pathname === '/';

    return (
        <>
            {/* Bootstrap Icons CDN - Add this if icons aren't working */}
            <link 
                rel="stylesheet" 
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
            />
            
            <nav className="navbar navbar-expand navbar-dark" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="container-fluid px-3">
                    <Link className="navbar-brand fw-bold fs-4 text-white" to={user ? "/" : "/"}>
                        <i className="bi bi-shop me-2"></i>E-Commerce
                    </Link>

                    <div className="navbar-collapse" id="navbarNav">
                        {user ? (
                            <ul className="navbar-nav ms-auto align-items-lg-center">
                                {isHome && (
                                    <li className="nav-item dropdown me-3">
                                        <button
                                            className="nav-link dropdown-toggle text-white btn btn-link"
                                            type="button"
                                            id="navbarDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                                        >
                                            <i className="bi bi-grid3x3-gap me-1"></i>Categories
                                        </button>
                                        <ul className="dropdown-menu shadow-sm" aria-labelledby="navbarDropdown">
                                            <li>
                                                <button type="button" className="dropdown-item" onClick={(e) => { e.preventDefault(); }}>
                                                    <i className="bi bi-laptop me-2"></i>Electronics
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="dropdown-item" onClick={(e) => { e.preventDefault(); }}>
                                                    <i className="bi bi-handbag me-2"></i>Clothing
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="dropdown-item" onClick={(e) => { e.preventDefault(); }}>
                                                    <i className="bi bi-book me-2"></i>Books
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                
                                <li className="nav-item ">
                                    <Link className="nav-link text-white position-relative" to="/cart">
                                        <i className="bi bi-cart3 me-1"></i>Cart
                                        {cartCount > 0 && (
                                            <span className="badge bg-warning text-dark ms-1 position-relative">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                
                                <li className="nav-item dropdown">
                                    <button
                                        className="nav-link dropdown-toggle text-white btn btn-link"
                                        type="button"
                                        id="profileDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                                    >
                                        <i className="bi bi-person-circle me-1"></i>
                                    </button>
                                    <ul className="dropdown-menu shadow-sm profile" aria-labelledby="profileDropdown">
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => { e.preventDefault(); }}>
                                                <i className="bi bi-person me-2"></i>My Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => { e.preventDefault(); }}>
                                                <i className="bi bi-bag me-2"></i>My Orders
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ms-auto align-items-lg-center">
                                <li className="nav-item me-2">
                                    <Link className="btn btn-outline-light me-2" to="/login">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="btn btn-light text-primary fw-semibold" to="/signup">
                                        <i className="bi bi-person-plus me-1"></i>Sign Up
                                    </Link>
                                </li> */}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            <style>{`
                .navbar-nav .dropdown-menu {
                    border: none;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    margin-top: 0.5rem;
                }

                .dropdown-item:hover {
                    background-color: #f8f9fa;
                    transform: translateX(5px);
                    transition: all 0.2s ease;
                }

                .navbar-toggler:focus {
                    box-shadow: none;
                }

                @media (max-width: 991.98px) {
                    .navbar-nav {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        padding: 1rem;
                        margin-top: 1rem;
                    }

                    .nav-item {
                        margin-bottom: 0.5rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;