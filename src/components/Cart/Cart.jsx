import { useNavigate } from 'react-router-dom'; 
import { useStore } from 'react-router-dom';
import styles from './Cart.module.scss';
import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';


function Cart()  {
    const { cart, addQuantity, subtractQuantity, sendOrder } = useStore(); 

    return(
        <div className={styles.cartItem}> 
            <section className={styles.bubble}>
                <h3>Din beställning</h3>

                {cart.length === 0 ? (
                    <p>Varukorgen är tom.</p>
                ) : (
                    cart.map((cartItem => ( 
                        <div className={styles.cartItem} key={cartItem.item.id}>
                            <h5>{cartItem.item.title}</h5>
                            <div className={styles.quantityHolders}>
                                <button className={styles.addBtn} onClick={() => addQuantity(cartItem.item.id)}>
                                    <AiOutlinePlus /> 
                                </button>
                                <p>{cartItem.quantity}</p>
                                <button className={styles.subtractBtn} onClick={() => subtractQuantity(cartItem.item.id)}>
                                    <AiOutlineMinus />
                                </button>
                            </div>
                            <p>{cartItem.item.price} kr</p>
                        </div>
                    ))
                ))}

                <div className={styles.totalLine}>
                    <hgroup>
                        <h4>Total</h4>
                        <h4>{total} kr</h4>
                    </hgroup>
                    <p>inkl moms + drönarleverans</p>
                </div>

                <button className={styles.payBtn} onClick={() => {
                    if (cart.length > 0) {
                        sendOrder(cart); 
                        navigate("/order");
                    } else {
                        alert("Din varukorg är tom!"); 
                    }
                }}>
                    Take my money!
                </button>
            </section>
        </div>
    );
}

export default Cart;
