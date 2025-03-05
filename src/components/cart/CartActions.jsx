import PropTypes from 'prop-types';
import styles from './Cart.module.scss';
import Button from '../button/Button';

function CartActions({ handlePay, clearCart, loading, error }) {
    return (
        <div>
            <Button onClick={clearCart}>Töm varukorgen</Button> <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button className={styles.payBtn}
            onClick={handlePay}
            disabled={loading}
            >
                {loading ? 'Behandlar...' : 'Betala'}
            </Button>
            
        </div>
    );
}

CartActions.propTypes = {
    handlePay: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default CartActions;