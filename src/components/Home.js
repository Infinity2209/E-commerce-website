import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchFeaturedItems();
        // Auto-slide carousel
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const fetchFeaturedItems = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/items?limit=8');
            setFeaturedItems(res.data.items || res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const heroSlides = [
        {
            title: "Summer Sale",
            subtitle: "Up to 70% Off",
            description: "Discover amazing deals on fashion, electronics, and more",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            cta: "Shop Sale"
        },
        {
            title: "New Arrivals",
            subtitle: "Fresh & Trendy",
            description: "Explore the latest collection from top brands",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
            cta: "Explore Now"
        },
        {
            title: "Premium Quality",
            subtitle: "Trusted Brands",
            description: "Shop with confidence from verified sellers",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            cta: "Shop Premium"
        }
    ];

    const categories = [
        { name: 'Electronics', icon: 'bi-laptop', color: '#667eea', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Fashion', icon: 'bi-bag', color: '#f093fb', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Home & Garden', icon: 'bi-house', color: '#4facfe', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Sports', icon: 'bi-trophy', color: '#43e97b', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Books', icon: 'bi-book', color: '#fa709a', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Beauty', icon: 'bi-heart', color: '#fee140', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ];

    return (
        <div>
            <style jsx>{`
                .hero-carousel {
                    height: 70vh;
                    min-height: 500px;
                    position: relative;
                    overflow: hidden;
                }
                .hero-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .hero-slide.active {
                    opacity: 1;
                }
                .hero-overlay {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.6));
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                .category-card {
                    transition: all 0.3s ease;
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                    cursor: pointer;
                }
                .category-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }
                .category-overlay {
                    background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
                    transition: background 0.3s ease;
                }
                .category-card:hover .category-overlay {
                    background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
                }
                .featured-card {
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                }
                .featured-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
                }
                .featured-image {
                    height: 250px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                .featured-card:hover .featured-image {
                    transform: scale(1.1);
                }
                .price-tag {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                .section-title {
                    position: relative;
                    display: inline-block;
                    margin-bottom: 3rem;
                }
                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 2px;
                }
                .stats-counter {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }
                .stats-counter:hover {
                    transform: translateY(-5px);
                }
                .floating-shapes {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }
                .shape {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    animation: float 6s ease-in-out infinite;
                }
                .shape:nth-child(1) { top: 20%; left: 10%; width: 60px; height: 60px; animation-delay: 0s; }
                .shape:nth-child(2) { top: 60%; right: 15%; width: 80px; height: 80px; animation-delay: 2s; }
                .shape:nth-child(3) { bottom: 20%; left: 20%; width: 40px; height: 40px; animation-delay: 4s; }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .carousel-indicators {
                    bottom: 20px;
                }
                .carousel-indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.5);
                    border: none;
                    margin: 0 5px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                .carousel-indicator.active {
                    background: white;
                }
            `}</style>

            {/* Hero Carousel Section */}
            <div className="hero-carousel">
                {heroSlides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="hero-overlay">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="text-white">
                                            <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInUp">
                                                {slide.title}
                                            </h1>
                                            <h2 className="display-5 mb-3 animate__animated animate__fadeInUp animate__delay-1s" 
                                                style={{ color: '#ffd700' }}>
                                                {slide.subtitle}
                                            </h2>
                                            <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-2s">
                                                {slide.description}
                                            </p>
                                            <Link 
                                                to="/login" 
                                                className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold animate__animated animate__fadeInUp animate__delay-3s"
                                                style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                                            >
                                                {slide.cta} <i className="bi bi-arrow-right ms-2"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-shapes">
                            <div className="shape"></div>
                            <div className="shape"></div>
                            <div className="shape"></div>
                        </div>
                    </div>
                ))}
                
                {/* Carousel Indicators */}
                <div className="carousel-indicators d-flex justify-content-center">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <div className="stats-counter">
                                <i className="bi bi-truck display-4 text-primary mb-3"></i>
                                <h3 className="fw-bold">Free Shipping</h3>
                                <p className="text-muted mb-0">On orders over $50</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="stats-counter">
                                <i className="bi bi-arrow-clockwise display-4 text-success mb-3"></i>
                                <h3 className="fw-bold">Easy Returns</h3>
                                <p className="text-muted mb-0">30-day return policy</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="stats-counter">
                                <i className="bi bi-shield-check display-4 text-warning mb-3"></i>
                                <h3 className="fw-bold">Secure Payment</h3>
                                <p className="text-muted mb-0">SSL encrypted checkout</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="stats-counter">
                                <i className="bi bi-headset display-4 text-info mb-3"></i>
                                <h3 className="fw-bold">24/7 Support</h3>
                                <p className="text-muted mb-0">Always here to help</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="container my-5 py-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold section-title">Shop by Category</h2>
                    <p className="lead text-muted">Explore our wide range of product categories</p>
                </div>
                
                <div className="row g-4">
                    {categories.map((category, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <Link to="/login" className="text-decoration-none">
                                <div className="card category-card h-100" style={{ minHeight: '200px' }}>
                                    <div 
                                        className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-white position-relative"
                                        style={{ 
                                            backgroundImage: `url(${category.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <div className="category-overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                        <div className="position-relative text-center">
                                            <i className={`${category.icon} display-1 mb-3`}></i>
                                            <h4 className="fw-bold">{category.name}</h4>
                                            <p className="mb-0">Discover amazing deals</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products Section */}
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-white section-title">Featured Products</h2>
                        <p className="lead text-white-50">Handpicked products just for you</p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row max-w-[100%]">
                            {featuredItems.slice(0, 8).map((item, index) => (
                                <div key={item._id || index} className="col-xs-8 col-sm-6 col-md-4 col-lg-3 p-2">
                                    <div className="card featured-card">
                                        <div className="position-relative overflow-hidden h-100">
                                            <img
                                                src={item.image || `https://via.placeholder.com/300x250/cccccc/000000?text=Product+${index + 1}`}
                                                className="card-img-top featured-image"
                                                alt={item.name || `Product ${index + 1}`}
                                            />
                                            <div className="position-absolute top-0 end-0 m-3">
                                                <span className="badge bg-danger">Hot</span>
                                            </div>
                                        </div>
                                        <div className="card-body d-flex flex-column p-4">
                                            <h5 className="card-title fw-bold mb-2">
                                                {item.name || `Amazing Product ${index + 1}`}
                                            </h5>
                                            <p className="card-text text-muted small mb-3 flex-grow-1">
                                                {item.description || "Premium quality product with amazing features and great value for money."}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="price-tag">
                                                    ${item.price || (Math.random() * 100 + 10).toFixed(2)}
                                                </span>
                                                <Link 
                                                    to="/login" 
                                                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="text-center mt-5">
                        <Link 
                            to="/login" 
                            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold"
                            style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                        >
                            View All Products <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="py-5" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h3 className="display-5 fw-bold text-white mb-3">
                                Stay Updated!
                            </h3>
                            <p className="text-white-50 lead">
                                Subscribe to our newsletter and get 20% off your first order
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex gap-2">
                                <input 
                                    type="email" 
                                    className="form-control form-control-lg rounded-pill px-4" 
                                    placeholder="Enter your email address"
                                />
                                <button className="btn btn-light btn-lg px-4 rounded-pill fw-semibold">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;