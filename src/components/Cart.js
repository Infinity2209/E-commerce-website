import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, fetchCart } = useCart();
    const [updating, setUpdating] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [navigate, fetchCart]);

    const handleUpdateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;

        setUpdating(prev => ({ ...prev, [itemId]: true }));

        try {
            await updateQuantity(itemId, quantity);
            // No need for success message for quantity updates
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity');
        } finally {
            // Always reset the updating state
            setUpdating(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const handleRemoveFromCart = async (itemId) => {
        setUpdating(prev => ({ ...prev, [itemId]: true }));

        try {
            await removeFromCart(itemId);
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Failed to remove from cart');
        } finally {
            // Always reset the updating state
            setUpdating(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const calculateSubtotal = () => {
        return cart?.items?.reduce((acc, item) => {
            const price = item?.item?.price;
            const quantity = item?.quantity;
            if (typeof price === 'number' && typeof quantity === 'number') {
                return acc + price * quantity;
            }
            return acc;
        }, 0) || 0;
    };

    const calculateTaxes = () => {
        return calculateSubtotal() * 0.1;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTaxes();
    };

    const handleContinueShopping = () => {
        navigate('/products');
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '3px solid #e5e7eb',
                    borderTop: '3px solid #2563eb',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
            </div>
        );
    }

    return (
        <>
            {/* Keep all your existing styles */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .hover-shadow:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transform: translateY(-1px);
                }
                .transition-all {
                    transition: all 0.2s ease;
                }
                .btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                }
                .btn-primary {
                    background-color: #2563eb;
                    color: white;
                }
                .btn-primary:hover:not(:disabled) {
                    background-color: #1d4ed8;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                }
                .btn-danger {
                    background-color: #dc2626;
                    color: white;
                }
                .btn-danger:hover:not(:disabled) {
                    background-color: #b91c1c;
                }
                .btn-secondary {
                    background-color: #f3f4f6;
                    color: #374151;
                }
                .btn-secondary:hover:not(:disabled) {
                    background-color: #e5e7eb;
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .input-number {
                    width: 60px;
                    text-align: center;
                    border: 1px solid #d1d5db;
                    border-left: none;
                    border-right: none;
                    padding: 8px 4px;
                    background: white;
                    outline: none;
                }
                .input-number:focus {
                    border-color: #2563eb;
                }
                .quantity-btn {
                    background: white;
                    border: 1px solid #d1d5db;
                    padding: 8px 12px;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    outline: none;
                }
                .quantity-btn:hover:not(:disabled) {
                    background-color: #f3f4f6;
                }
                .quantity-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .quantity-btn:first-of-type {
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                }
                .quantity-btn:last-of-type {
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;
                }
                .card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 16px;
                    background: linear-gradient(135deg, #ecfdf5 0%, #dbeafe 100%);
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #374151;
                    width: 100%;
                    box-sizing: border-box;
                }
                .pulse {
                    animation: pulse 2s infinite;
                }
                .promo-card {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    border: 1px solid #e5e7eb;
                    margin-top: 16px;
                }
                .promo-input {
                    flex: 1;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    padding: 8px 12px;
                    font-size: 14px;
                    outline: none;
                }
                .promo-input:focus {
                    border-color: #2563eb;
                }
                .link-button {
                    background: none;
                    border: none;
                    color: #2563eb;
                    font-weight: 500;
                    cursor: pointer;
                    fontSize: 16px;
                    padding: 0;
                    text-decoration: none;
                }
                .link-button:hover {
                    color: #1d4ed8;
                }
                .spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #dc2626;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
            `}</style>

            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '2000px', margin: '0 auto', padding: '32px 16px' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '32px' }}>
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: '#111827',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            margin: 0
                        }}>
                            <span style={{ fontSize: '32px', color: '#2563eb' }}>🛍️</span>
                            Shopping Cart
                        </h1>
                        <p style={{ color: '#6b7280', marginTop: '8px', margin: '8px 0 0 0' }}>
                            {cart?.items?.length || 0} {(cart?.items?.length || 0) === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>

                    {(cart?.items?.length || 0) === 0 ? (
                        <div style={{ textAlign: 'center', padding: '64px 0' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛍️</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                                Your cart is empty
                            </h3>
                            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                                Add some items to get started!
                            </p>
                            <button
                                onClick={handleContinueShopping}
                                className="btn btn-primary"
                                style={{ padding: '12px 24px', fontSize: '16px' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr',
                            gap: '32px'
                        }}>
                            {/* Cart Items */}
                            <div>
                                <div className="card" style={{ padding: '24px' }}>
                                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                                        Cart Items
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        {cart?.items?.filter(item => item.item).map((item, index) => {
                                            const itemId = item?.item?._id;
                                            const isUpdating = updating[itemId];

                                            return (
                                                <div
                                                    key={itemId || `item-${index}`}
                                                    className="transition-all hover-shadow"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: window.innerWidth > 640 ? 'row' : 'column',
                                                        alignItems: window.innerWidth > 640 ? 'center' : 'flex-start',
                                                        gap: '16px',
                                                        padding: '16px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #e5e7eb',
                                                        backgroundColor: isUpdating ? '#f9fafb' : 'white',
                                                        opacity: isUpdating ? 0.7 : 1,
                                                        pointerEvents: isUpdating ? 'none' : 'auto'
                                                    }}
                                                >
                                                    {/* Product Image Placeholder */}
                                                    <div style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
                                                        borderRadius: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #e5e7eb',
                                                        flexShrink: 0
                                                    }}>
                                                        <span style={{ fontSize: '32px' }}>📦</span>
                                                    </div>

                                                    {/* Product Info */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                                                            {item.item?.name || 'Unknown Item'}
                                                        </h3>
                                                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                                                            SKU: {itemId ? itemId.slice(-8).toUpperCase() : 'N/A'}
                                                        </p>
                                                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#2563eb', margin: '0 0 4px 0' }}>
                                                            ${(item.item?.price && item.quantity) ? (item.item.price * item.quantity).toFixed(2) : '0.00'}
                                                        </p>
                                                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                                            ${item.item?.price ? item.item.price.toFixed(2) : '0.00'} each
                                                        </p>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <button
                                                                onClick={() => {
                                                                    const newQuantity = (item?.quantity || 1) - 1;
                                                                    if (newQuantity >= 1 && itemId) {
                                                                        handleUpdateQuantity(itemId, newQuantity);
                                                                    }
                                                                }}
                                                                disabled={isUpdating || (item?.quantity || 1) <= 1 || !itemId}
                                                                className="quantity-btn"
                                                            >
                                                                −
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={item?.quantity || 1}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    if (value >= 1 && itemId && !isNaN(value)) {
                                                                        handleUpdateQuantity(itemId, value);
                                                                    }
                                                                }}
                                                                disabled={isUpdating || !itemId}
                                                                className="input-number"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newQuantity = (item?.quantity || 1) + 1;
                                                                    if (itemId) {
                                                                        handleUpdateQuantity(itemId, newQuantity);
                                                                    }
                                                                }}
                                                                disabled={isUpdating || !itemId}
                                                                className="quantity-btn"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => itemId && handleRemoveFromCart(itemId)}
                                                            disabled={isUpdating || !itemId}
                                                            className="btn btn-danger"
                                                            style={{ padding: '8px' }}
                                                        >
                                                            {isUpdating ? (
                                                                <div className="spinner"></div>
                                                            ) : (
                                                                '🗑️'
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Continue Shopping */}
                                <div style={{ marginTop: '24px' }}>
                                    <button
                                        onClick={handleContinueShopping}
                                        className="link-button"
                                    >
                                        ← Continue Shopping
                                    </button>
                                </div>
                            </div>

                            {/* Order Summary - Keep all existing code */}
                            <div>
                                <div className="card" style={{ padding: '24px', position: 'sticky', top: '24px' }}>
                                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                                        Order Summary
                                    </h2>

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#6b7280' }}>
                                            <span>Subtotal ({cart?.items?.length || 0} items)</span>
                                            <span>${calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#6b7280' }}>
                                            <span>Taxes (10%)</span>
                                            <span>${calculateTaxes().toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#6b7280' }}>
                                            <span>Shipping</span>
                                            <span style={{ color: '#059669', fontWeight: '500' }}>Free</span>
                                        </div>
                                        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                                            <span>Total</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="btn btn-primary"
                                        style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
                                    >
                                        💳 Proceed to Checkout
                                    </button>

                                    <div style={{ marginTop: '16px', textAlign: 'center', marginBottom: '16px' }}>
                                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                            Free shipping on orders over $50
                                        </p>
                                    </div>
                                    {/* Security Badge */}
                                    <div className="badge">
                                        <div
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#10b981',
                                                borderRadius: '50%'
                                            }}
                                            className="pulse"
                                        ></div>
                                        <span>Secure checkout with SSL encryption</span>
                                    </div>
                                </div>


                                {/* Promo Code */}
                                <div className="promo-card">
                                    <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                                        Have a promo code?
                                    </h3>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            className="promo-input"
                                        />
                                        <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;