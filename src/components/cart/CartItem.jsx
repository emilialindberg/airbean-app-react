import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styles from './Cart.module.scss';
import PropTypes from 'prop-types';
import Button from '../button/Button';

function CartItem({ cartItem, addQuantity, subtractQuantity }) {
    return (
        <div className={styles.cartItem} key={cartItem.item.id}>
            <h5>{cartItem.item.title}</h5>
            <div className={styles.quantityHolders}>
                <Button className={styles.addBtn} onClick={() => addQuantity(cartItem.item.id)}>
                    <AiOutlinePlus />
                </Button>
                <p>{cartItem.quantity}</p>
                <Button className={styles.subtractBtn} onClick={() => subtractQuantity(cartItem.item.id)}>
                    <AiOutlineMinus />
                </Button>
            </div>
            <p>{cartItem.item.price} kr</p>
        </div>
    );
}

CartItem.propTypes = {
    cartItem: PropTypes.shape({
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    addQuantity: PropTypes.func.isRequired,
    subtractQuantity: PropTypes.func.isRequired,
};

export default CartItem;