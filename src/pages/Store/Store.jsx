import PropTypes from 'prop-types'; // Används för att definiera typer för props, vilket hjälper till att fånga fel tidigt i utvecklingen.
import { useState, createContext } from 'react';    // createContext: En React-funktion som skapar ett Context-objekt, vilket möjliggör delning av tillstånd mellan komponenter utan att manuellt skicka props genom komponentträdet.


const StoreContext = createContext(); // Skapar ett nytt Context-objekt. Detta objekt kommer att användas för att tillhandahålla och konsumera varukorgstillståndet.

export const StoreProvider = ({ children }) => {    // En funktionell React-komponent som fungerar som en Provider för StoreContext. children: En prop som representerar de komponenter som kommer att omslutas av StoreProvider. Dessa komponenter kommer att ha tillgång till varukorgstillståndet.

    const [cart, setCart] = useState([]);   //  Använder useState för att skapa ett tillståndsvärde cart (varukorgen) och en funktion setCart för att uppdatera det. cart är initialt en tom array.

    const addToCart = (item) => {   //En funktion som lägger till en vara (item) i varukorgen.
        const existingItem = cart.find(cartItem => cartItem.item.id === item.id); 

        if (existingItem) {     // Kontrollerar om varan redan finns i varukorgen.
            setCart(cart.map(cartItem =>    // Uppdaterar varukorgen genom att öka kvantiteten för den befintliga varan.
                cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {    //  Lägger till varan i varukorgen med en kvantitet på 1.
            setCart([...cart, { item, quantity: 1 }]); // Lägg till item-objektet och kvantitet
        }
    };

    const addQuantity = (id) => {   // Ökar kvantiteten för en vara i varukorgen baserat på dess id.
        setCart(cart.map(cartItem =>
            cartItem.item.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
    };

    const subtractQuantity = (id) => {      // Minskar kvantiteten för en vara i varukorgen baserat på dess id. Math.max(1, ...) säkerställer att kvantiteten inte går under 1.
        setCart(cart.map(cartItem =>
            cartItem.item.id === id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem
        ));
    };

    const sendOrder = (cart) => {
        // En funktion som simulerar att skicka en order till en server. Den loggar varukorgen till konsolen.
        console.log("Skickar order:", cart);
    };


    return (
        <StoreContext.Provider value={{ cart, addToCart, addQuantity, subtractQuantity, sendOrder }}>
            {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired, // children är en React-nod och är obligatorisk
};




export default StoreContext;