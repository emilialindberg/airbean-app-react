import styles from '../header/Header.module.scss';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

function CartIcon({ totalItemsInCart, openCartModal }) {
    return (
        <div className={styles.cartIcon} onClick={openCartModal}>
            <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
                <FaShoppingCart />
            </IconContext.Provider>
        <span className={styles.total}>{totalItemsInCart}</span>
        </div>
    );
}

CartIcon.propTypes = {
    totalItemsInCart: PropTypes.number.isRequired,
    openCartModal: PropTypes.func.isRequired, 
};

export default CartIcon;