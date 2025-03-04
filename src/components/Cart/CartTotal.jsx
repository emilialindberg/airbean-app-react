import PropTypes from 'prop-types';
import styles from './Cart.module.scss';

function CartTotal({ total }) {
    return (
        <div className={styles.hGroup}>
            <hgroup className={styles.totalLine}>
                <h4>Total</h4>
                <h4>{total} kr</h4>
            </hgroup>
            <p>inkl moms + drönarleverans</p>
        </div>
    );
}

CartTotal.propTypes = {
    total: PropTypes.number.isRequired,
};

export default CartTotal;