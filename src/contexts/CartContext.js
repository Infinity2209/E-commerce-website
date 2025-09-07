import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    // Calculate cart count from items (number of unique items, not total quantity)
    const cartCount = cart.items.filter(i => i.item !== null).length;

    // Fetch cart data
    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCart(res.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Update cart state
    const updateCart = (newCart) => {
        setCart(newCart);
    };

    // Add item to cart
    const addToCart = async (itemId, quantity = 1) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`,
                { itemId, quantity },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            setCart(res.data);
            return res.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    // Update item quantity in cart
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update`,
                { itemId, quantity },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            setCart(res.data);
            return res.data;
        } catch (error) {
            console.error('Error updating quantity:', error);
            throw error;
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/remove`,
                { itemId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );
            setCart(res.data);
            return res.data;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    };

    // Clear cart
    const clearCart = () => {
        setCart({ items: [] });
    };

    // Load cart on mount if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
    }, [fetchCart]);

    const value = {
        cart,
        cartCount,
        loading,
        fetchCart,
        updateCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
