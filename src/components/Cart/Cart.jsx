import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../cart/Cart.module.scss';
import { useStore } from '../../store/StoreUtils'; 
import CartItem from '../cart/CartItem'; 
import CartTotal from './CartTotal';
import CartActions from './CartActions';

function Cart() {
    const { cart, addQuantity, subtractQuantity, sendOrder, clearCart } = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const total = cart.reduce((accumulator, cartItem) => accumulator + cartItem.item.price * cartItem.quantity, 0);

    const handlePay = async () => { 
        if (cart.length > 0) {  
            setLoading(true);
            setError(null);
            try {
                console.log("Cart Items:", cart);
                const orderConfirmation = await sendOrder(cart);
                setLoading(false);
                if(orderConfirmation){
                    navigate('/order-status', { state: { orderConfirmation } }); 
                    console.log('Orderconfirmation: '+ orderConfirmation);
                } else {
                    setError('Ett fel uppstod vid beställningen. Försök igen senare.');
                }
            } catch (err) {
                setError('Ett fel uppstod vid beställningen. Försök igen senare.');
                console.error('Fel vid beställning:', err);
                setLoading(false);   
            }
        } else {
            error('Din varukorg är tom!');
        }
    };



    return (
        <div className={styles.cart}>
            <section className={styles.bubble}>
                <h3>Din beställning</h3>
                {cart.length === 0 ? <pre>Varukorgen är tom.</pre> : (
                    <>
                        {cart.map((cartItem) => (
                            <CartItem
                                key={cartItem.item.id}
                                cartItem={cartItem}
                                addQuantity={addQuantity}
                                subtractQuantity={subtractQuantity}
                            />
                        ))}
                        <CartTotal total={total} />
                        <CartActions handlePay={handlePay} clearCart={clearCart} loading={loading} error={error} />
                    </>
                )}
            </section>
        </div>
    );
}

export default Cart;