import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { useStore } from '../../store/StoreUtils'; 
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import CartActions from './CartActions';
import { sendOrder } from '../../components/api/Api';
import Button from '../button/Button';
import { MdClose } from "react-icons/md";

function Cart() {
    const { cart, addQuantity, subtractQuantity, clearCart } = useStore();
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
                const orderConfirmation = await sendOrder(cart); // Anropar för att skicka beställningen.
                setLoading(false);
                if(orderConfirmation){
                    clearCart();
                    localStorage.setItem('activeOrder', JSON.stringify(orderConfirmation));
                    navigate('/order-status', { state: { orderConfirmation } }); // Tar emot ett orderConfirmation objekt som bekräftar ordern. Om ordern är bekräftad, navigerar till '/order-status' sidan, och skickar orderinformationen som state.
                    console.log('Orderconfirmation: '+ orderConfirmation);
                } else {
                    setError('Ett fel uppstod vid beställningen. Försök igen senare.');
                }
            } catch (err) {
                setError('Ett fel uppstod vid beställningen. Försök igen senare.');
                console.error('Fel vid beställning:', err);
                setLoading(false);      // Sätter loading till false när betalningsprocessen är klar.
            }
        } else {
            error('Din varukorg är tom!'); 
        }
    };

    return (
        <div className={styles.cart}>
            <div className={styles.closeBtn}>
                <Button className={styles.closeButton} onClick={() => navigate('/menu')}><MdClose /></Button>
            </div>
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
