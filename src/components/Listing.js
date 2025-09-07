import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../contexts/CartContext';

const Listing = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const { cart, addToCart: contextAddToCart } = useCart();

    const fetchItems = React.useCallback(async () => {
        setLoading(true);
        try {
            const params = { ...filters, search, page, limit: 12, sortBy };
            const query = new URLSearchParams(params).toString();
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items?${query}`, { headers });
            if (res.data && res.data.items) {
                setItems(res.data.items);
                setTotalPages(res.data.totalPages || 1);
            } else {
                setItems([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error(error);
            setItems([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [filters, search, page, sortBy]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        fetchItems();
    }, [filters, search, page, sortBy, navigate, fetchItems]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ category: '', minPrice: '', maxPrice: '' });
        setSearch('');
        setPage(1);
    };

    const handleAddToCart = async (itemId) => {
        try {
            await contextAddToCart(itemId);
            // Use react-toastify for success notification
            toast.success('Added to cart successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            // Use react-toastify for error notification
            toast.error('Failed to add to cart', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    // Check if item is in cart
    const isInCart = (itemId) => {
        return cart.items.some(cartItem => cartItem.item && cartItem.item._id === itemId);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Jewelry'];

    return (
        <div className="min-vh-100">
            <style>{`
                .product-card {
                    transition: all 0.3s ease;
                    border: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }
                .product-image {
                    height: 250px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                @media (max-width: 768px) {
                    .product-image {
                        height: 200px;
                    }
                }
                .product-card:hover .product-image {
                    transform: scale(1.05);
                }
                .filter-sidebar {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    padding: 1.5rem;
                }
                .search-bar {
                    border-radius: 25px;
                    border: 2px solid #e9ecef;
                    padding: 12px 20px;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }
                .search-bar:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                }
                .btn-filter {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border: none;
                    border-radius: 25px;
                    padding: 8px 20px;
                    color: white;
                    transition: all 0.3s ease;
                }
                .btn-filter:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }
                .price-badge {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                .loading-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .view-toggle {
                    background: white;
                    border: 1px solid #dee2e6;
                    padding: 8px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .view-toggle.active {
                    background: #667eea;
                    color: white;
                    border-color: #667eea;
                }
                .breadcrumb-modern {
                    background: white;
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
            `}</style>

            <div className="p-3">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center bg-white p-4 rounded-3 shadow-sm">
                            <div className="mb-3 mb-lg-0">
                                <h1 className="display-6 fw-bold text-dark mb-1">
                                    <i className="bi bi-grid-3x3-gap me-2 text-primary"></i>
                                    Our Products
                                </h1>
                                <p className="text-muted mb-0">Discover amazing products at great prices</p>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="form-control search-bar ps-5"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Filters Sidebar */}
                    <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-lg-block d-none'}`}>
                        <div className="filter-sidebar sticky-top" style={{ top: '2rem' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0 fw-bold">
                                    <i className="bi bi-funnel me-2"></i>Filters
                                </h5>
                                <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark">Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark">Price Range</label>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <input
                                            type="number"
                                            name="minPrice"
                                            placeholder="Min"
                                            className="form-control"
                                            value={filters.minPrice}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            placeholder="Max"
                                            className="form-control"
                                            value={filters.maxPrice}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark">Sort By</label>
                                <select
                                    className="form-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Name</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-lg-9">
                        {/* Results Header */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm">
                            <div className="mb-2 mb-md-0">
                                <span className="text-muted">
                                    Showing {items.length} products
                                    {search && <span> for "<strong>{search}</strong>"</span>}
                                </span>
                            </div>
                            
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-outline-primary d-lg-none mb-2 mb-md-0 me-2" onClick={() => setShowFilters(!showFilters)}>
                                    <i className="bi bi-funnel"></i> Filters
                                </button>
                                <span className="text-muted small me-2">View:</span>
                                <button
                                    className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <i className="bi bi-grid-3x3-gap"></i>
                                </button>
                                <button
                                    className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <i className="bi bi-list"></i>
                                </button>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-5">
                                <div className="loading-spinner me-2"></div>
                                <span className="text-muted">Loading products...</span>
                            </div>
                        )}

                        {/* Products Grid */}
                        {!loading && (
                            items.length > 0 ? (
                                <div className={`row ${viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3' : 'row-cols-1'} g-4`}>
                                    {items.map(item => (
                                        <div key={item._id} className="col">
                                            <div className="card product-card h-100 border-0">
                                                <div className="position-relative overflow-hidden">
                                                    <img
                                                        src={item.image || 'https://via.placeholder.com/300x250/cccccc/000000?text=No+Image'}
                                                        className="card-img-top product-image"
                                                        alt={item.name}
                                                    />
                                                    <div className="position-absolute top-0 end-0 m-3">
                                                        <button className="btn btn-light btn-sm rounded-circle shadow-sm">
                                                            <i className="bi bi-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-body d-flex flex-column p-4">
                                                    <div className="mb-2">
                                                        <span className="badge bg-light text-dark small">{item.category || 'General'}</span>
                                                    </div>
                                                    <h5 className="card-title fw-bold text-dark mb-2">{item.name}</h5>
                                                    <p className="card-text text-muted small mb-3 flex-grow-1">
                                                        {item.description?.length > 100
                                                            ? `${item.description.substring(0, 100)}...`
                                                            : item.description
                                                        }
                                                    </p>
                                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                                                        <span className="price-badge mb-2 mb-sm-0">${item.price}</span>
                                                        <button
                                                            className="btn btn-primary btn-sm px-4 rounded-pill"
                                                            onClick={() => {
                                                                if (isInCart(item._id)) {
                                                                    navigate('/cart');
                                                                } else {
                                                                    handleAddToCart(item._id);
                                                                }
                                                            }}
                                                        >
                                                            <i className="bi bi-cart-plus me-1"></i>
                                                            {isInCart(item._id) ? 'Go to Cart' : 'Add to Cart'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-search display-1 text-muted mb-3"></i>
                                    <h4 className="text-muted">No products found</h4>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={clearFilters}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <nav className="mt-5">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link border-0 shadow-sm"
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                        >
                                            <i className="bi bi-chevron-left"></i>
                                        </button>
                                    </li>
                                    
                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <li key={i} className={`page-item ${page === pageNum ? 'active' : ''}`}>
                                                <button 
                                                    className="page-link border-0 shadow-sm"
                                                    onClick={() => handlePageChange(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            </li>
                                        );
                                    })}
                                    
                                    {totalPages > 5 && (
                                        <>
                                            <li className="page-item disabled">
                                                <span className="page-link border-0">...</span>
                                            </li>
                                            <li className={`page-item ${page === totalPages ? 'active' : ''}`}>
                                                <button 
                                                    className="page-link border-0 shadow-sm"
                                                    onClick={() => handlePageChange(totalPages)}
                                                >
                                                    {totalPages}
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    
                                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link border-0 shadow-sm"
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                        >
                                            <i className="bi bi-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                                
                                <div className="text-center text-muted small">
                                    Page {page} of {totalPages}
                                </div>
                            </nav>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Container - This is where the notifications will appear */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Listing;