import PropTypes from 'prop-types';
import { useState, createContext } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.item.id === item.id);

        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCart([...cart, { item, quantity: 1 }]);
        }
    };

    const addQuantity = (id) => {
        setCart(cart.map(cartItem =>
            cartItem.item.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
    };

    const subtractQuantity = (id) => {
        setCart(cart.map(cartItem =>
            cartItem.item.id === id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <StoreContext.Provider value={{ cart, addToCart, addQuantity, subtractQuantity, clearCart }}>
            {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { StoreContext };