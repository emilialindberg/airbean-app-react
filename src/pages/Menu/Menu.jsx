import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import Header from '../../components/header/Header';
// import { useContext } from 'react';
// import { CartProvider } from '../Cart/CartContext';  
import { FaPlus } from 'react-icons/fa'; // Importerar plus-ikonen (npm install react-icons --save)

const URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans/'; // Definierar URL:en som en konstant

async function getMenu(setMenuItems, setLoading, setError) { // Funktion för att hämta menyn
    console.log("getMenu called"); // Kontrollerar att funktionen anropas
    setLoading(true); // Sätter loading-state till true
    setError(null);    // Återställer error-state

    try {
        const response = await fetch(URL); // Gör anropet till API:et
        console.dir(response); // Kollar statuskoden

        if (!response.ok) { // Kontrollerar om svaret är ok (statuskod 200-299)
            throw new Error(`HTTP error! status: ${response.status}`); // Kastar ett fel om det inte är ok
        }
        const data = await response.json(); // Konverterar svaret till JSON
        console.log("Menu data (JSON):", data); // Kollar den konverterade datan

        if (data.success && Array.isArray(data.menu)) { // Kontrollera formatet
            setMenuItems(data.menu); // Extrahera och använd data.menu
        } else {
            console.error("Invalid data format from API:", data);
            setError(new Error("Invalid data format from API"));
        }
        
    } catch (error) {
        console.error("Error fetching menu:", error); // Mer specifik felmeddelande
        setError(error); // Sättr error-state om något går fel
    } finally {
        setLoading(false); // Sätter loading-state till false oavsett om det gick bra eller inte
    }
}

function Menu() {
    console.log("Menu component is rendering");
    const [menuItems, setMenuItems] = useState([]); // Lagra menyn här
    const [loading, setLoading] = useState(true); // Håll koll på om datan laddas
    const [error, setError] = useState(null); // Hantera eventuella fel
    // const { addToCart, cartItems } = useContext(CartContext); // Hämta cartItems från context

    useEffect(() => {
        getMenu(setMenuItems, setLoading, setError); // Anropa funktionen för att hämta menyn
    }, []); // Tom array som dependency gör att anropet endast sker en gång
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
                    {menuItems?.length > 0 ? ( // Kontrollerar om menuItems finns och har data
                        menuItems.map(item => (
                            <li key={item.id}>
                                <div className={styles.addButton}>
                                    <button onClick={() => addToCart(item)}>
                                        <FaPlus />
                                    </button>
                                </div>
                                {/* Visa räknaren bredvid varukorgsikonen */}
                                {/* <div className={styles.cartIcon}>  */}
                                    {/* <Link to="/cart"> */}
                                        {/* <FaShoppingCart /> */}
                                        {/* <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span> */}
                                    {/* </Link> */}
                                {/* </div> */}
                                <h3 className={styles.coffeeName}>{item.title}</h3>
                                <h3 className={styles.coffeePrice}>{item.price} kr</h3>
                                <p>{item.desc}</p>
                            </li>
                        ))
                    ) : (
                        <p>Inga kaffealternativ tillgängliga ännu.</p> // Visar ett meddelande om menyn är tom
                    )}
                </section>
            </main>
            <footer></footer>
        </div>
    );
}

export default Menu;