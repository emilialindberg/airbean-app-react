import { Link, useLocation } from "react-router-dom";
import styles from '../header/Header.module.scss';
import PropTypes from 'prop-types';


function Navlinks({ isMenuOpen }) {
    const location = useLocation();
    console.log("Current location:", location.pathname);
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/menu" className={StyleSheet.link}>Meny</Link>
                </li>
                <li>
                    <Link to="/about" className={StyleSheet.link}>Vårt Kaffe</Link>
                </li>
                <li>
                    <Link to="/order-status" className={StyleSheet.link}>OrderStatus</Link>  
                </li>
            </ul>
        </nav>
    );
}

NavLinks.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
};

export default Navlinks;