import PropTypes from 'prop-types';
import styles from './Header.module.scss';

function HamburgerMenu({ isMenuOpen, toggleMenu }) {
    return (
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`}></div>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`}></div>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`}></div>
        </div>
    );
}

HamburgerMenu.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;