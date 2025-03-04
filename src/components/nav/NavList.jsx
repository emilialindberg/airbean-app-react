import PropTypes from 'prop-types';
import styles from '../header/Header.module.scss';
import { Link, useLocation } from 'react-router-dom';    // Importerar Link för att skapa interna länkar

function NavLinks({ isMenuOpen }) {
    const location = useLocation();
    console.log("Current location:", location.pathname);
    return (
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
    );
}

NavLinks.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
};

export default NavLinks;