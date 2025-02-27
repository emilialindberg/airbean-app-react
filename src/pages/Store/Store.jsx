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

    const sendOrder = async (cartItems) => {
        const URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans/order';
        const orderArray = cartItems.map(item => ({
            name: item.item.title,
            price: item.item.price
        }));

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    details: {
                        order: orderArray
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Order skickad:", responseData);

            const total = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
            const newOrderConfirmation = {
            orderNumber: Math.floor(Math.random() * 100000),
            orderDate: new Date().toLocaleDateString(),
            items: cartItems,
            total: total,
        };

            console.log("Orderbekräftelse:", newOrderConfirmation);
            setCart([]);
        
            return newOrderConfirmation; 
        } catch (error) {
            console.error("Fel vid skickande av order:", error);
        }
    };

        const clearCart = () => {
            setCart([]);
        };
            return (
        <StoreContext.Provider value={{ cart, addToCart, addQuantity, subtractQuantity, sendOrder, clearCart }}>
            {children}
        </StoreContext.Provider>
    );
};

    StoreProvider.propTypes = {
        children: PropTypes.node.isRequired, 
    };




export default StoreContext;