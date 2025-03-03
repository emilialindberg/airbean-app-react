import Proptypes from 'prop-types';
import styles from './HamburgerMeny.module.scss';

function HamburgerMenu({ isMenuOpen, toggleMenu }) {
    return (
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`}></div>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`}></div>
            <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`}></div>
        </div>
    );
}

HamburgerMeny.propTypes = {
    isMenuOpen: Proptypes.bool.isRequired,
    toggleMenu: Proptypes.func.isRequired,
};

export default HamburgerMenu;