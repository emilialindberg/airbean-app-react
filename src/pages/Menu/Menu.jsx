import { useState, useEffect } from 'react';
import styles from './Menu.module.scss';
import Header from '../Header/Header'; 
import { FaPlus } from 'react-icons/fa';
import { useStore } from '../Store/StoreUtils';


const URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans/';

async function getMenu(setMenuItems, setLoading, setError) { 
    setLoading(true);
    setError(null);     

    try {
        const response = await fetch(URL);  

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  
        }
        const data = await response.json();  
        

        if (data.success && Array.isArray(data.menu)) {  
            setMenuItems(data.menu); 
        } else {
            setError(new Error("Invalid data format from API"));
        }
        
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
}

function Menu() {
    const [menuItems, setMenuItems] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const { addToCart } = useStore();

    const [cartItems, setCartItems] = useState([]); 


    const handleAddToCart = (item) => {
        addToCart(item); 

        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    useEffect(() => {
        getMenu(setMenuItems, setLoading, setError); 
    }, []); 
    console.log("getMenu called");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.menuContainer}>
            <header>
                <Header />
            </header>
            <main>
                <h1>Meny</h1>
                <section className={styles.menuList}>
                    {menuItems?.length > 0 ? (  
                        menuItems.map(item => (
                            <li key={item.id}>
                                <div className={styles.addButton}>
                                    <button onClick={() => handleAddToCart(item)}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <h3 className={styles.coffeeName}>{item.title}</h3>
                                <h3 className={styles.coffeePrice}>{item.price} kr</h3>
                                <p>{item.desc}</p>
                            </li>
                        ))
                    ) : (
                        <p>Inga kaffealternativ tillgängliga ännu.</p>  
                    )}
                </section>
            </main>
            <footer></footer>
        </div>
    );
}

export default Menu;