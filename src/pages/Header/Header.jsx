import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss'; 
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log("Header component is rendering"); // Check if Header renders
    const location = useLocation();
    console.log("Current location:", location.pathname);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const hiddenPaths = ['/', '/about', '/order-status']; // Lägg till de sidor du vill exkludera
    const showCartIcon = !hiddenPaths.includes(location.pathname);
    console.log("Show cart icon:", showCartIcon);

    return (
        <header className={styles.header}>
            <div className={styles.hamburgerMenu} onClick={toggleMenu}>
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`}></div>
                <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`}></div>
            </div>

            <nav className={isMenuOpen ? styles.open : styles.closed}>
                <ul>
                    <li>
                        <Link to="/menu" className={styles.link}>Meny</Link>
                    </li>
                    <li>
                        <Link to="/about" className={styles.link}>Vårt kaffe</Link>
                    </li>
                    <li>
                        <Link to="/order-status" className={styles.link}>OrderStatus</Link>
                    </li>
                </ul>
            </nav>
            
            {showCartIcon && (  // Visar varukorgsikonen endast om showCartIcon är true
                <div className={styles.cartIcon}>
                    <Link to="/cart"> 
                        <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
                            <FaShoppingCart />
                        </IconContext.Provider> 
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;