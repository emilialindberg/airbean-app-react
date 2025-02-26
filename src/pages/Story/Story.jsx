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
        } else {    //  Lägger till varan i varukorgen med en kvantitet på 1.
            setCart([...cart, { item, quantity: 1 }]); // Lägg till item-objektet och kvantitet
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

    const sendOrder = (cart) => 
        console.log("Skickar order:", cart);
    };

        return (
        <StoreContext.Provider value={{ cart, addToCart, addQuantity, subtractQuantity, sendOrder }}>
            {children}
        </StoreContext.Provider>
            );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default StoreContext;
