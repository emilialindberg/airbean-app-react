import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { useStore } from '../../store/StoreUtils'; 
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import CartActions from './CartActions';

function Cart() {
    const { cart, addQuantity, subtractQuantity, sendOrder, clearCart } = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const total = cart.reduce((accumulator, cartItem) => accumulator + cartItem.item.price * cartItem.quantity, 0);

    const handlePay = async () => {     {/*En asynkron funktion som hanterar betalningsprocessen.*/}
         if (cart.length > 0) {      {/* Kontrollerar om varukorgen inte är tom. */}
            setLoading(true);
            setError(null);
            try {
                console.log("Cart Items:", cart);
                const orderConfirmation = await sendOrder(cart); // Anropar för att skicka beställningen.
                setLoading(false);
                if(orderConfirmation){
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
            error('Din varukorg är tom!');      // Om varukorgen är tom, sätter ett felmeddelande.
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



// import { useNavigate } from 'react-router-dom'; // Används för att navigera mellan olika sidor i applikationen.
// import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
// import PropTypes from 'prop-types';
// import styles from './Cart.module.scss';
// import { useState } from 'react';
// import { useStore } from '../../pages/store/StoreUtils';

// function Cart() {
//     const { cart, addQuantity, subtractQuantity, sendOrder, clearCart } = useStore();   // Hämtar varukorgens innehåll och funktioner från useStore hooken.
//     const navigate = useNavigate();     // Initierar navigationsfunktionen.
//     const [loading, setLoading] = useState(false);  //  Tillstånd för att visa en laddningsindikator under betalningsprocessen.
//     const [error, setError] = useState(null);   // Tillstånd för att visa felmeddelanden.
//     const total = cart.reduce((accumulator, cartItem) => accumulator + cartItem.item.price * cartItem.quantity, 0); // Beräknar det totala priset för varukorgen.

//     const handlePay = async () => {     {/*En asynkron funktion som hanterar betalningsprocessen.*/}
//         if (cart.length > 0) {      {/* Kontrollerar om varukorgen inte är tom. */}
//             setLoading(true);
//             setError(null);
//             try {
//                 console.log("Cart Items:", cart);
//                 const orderConfirmation = await sendOrder(cart); // Anropar för att skicka beställningen.
//                 setLoading(false);
//                 if(orderConfirmation){
//                     navigate('/order-status', { state: { orderConfirmation } }); // Tar emot ett orderConfirmation objekt som bekräftar ordern. Om ordern är bekräftad, navigerar till '/order-status' sidan, och skickar orderinformationen som state.
//                     console.log('Orderconfirmation: '+ orderConfirmation);
//                 } else {
//                     setError('Ett fel uppstod vid beställningen. Försök igen senare.');
//                 }
//             } catch (err) {
//                 setError('Ett fel uppstod vid beställningen. Försök igen senare.');
//                 console.error('Fel vid beställning:', err);
//                 setLoading(false);      // Sätter loading till false när betalningsprocessen är klar.
//             }
//         } else {
//             error('Din varukorg är tom!');      // Om varukorgen är tom, sätter ett felmeddelande.
//         }
//     };

//     return (
//         <div className={styles.cart}>
//             <section className={styles.bubble}>     {/* Innehåller varukorgens innehåll. */}
//                 <h3>Din beställning</h3>

//                 {/* Om varukorgen är tom, visas "Varukorgen är tom.". */}
//                 {cart.length === 0 ? <pre>Varukorgen är tom.</pre> : (      
//                     <>
//                         {/* Om varukorgen inte är tom, itererar komponenten genom cart arrayen och visar varje varukorgsobjekt. */}
//                         {cart.map((cartItem) => (
//                             <div className={styles.cartItem} key={cartItem.item.id}>
//                                 <h5>{cartItem.item.title}</h5>
//                                 <div className={styles.quantityHolders}>
//                                     <button className={styles.addBtn} onClick={() => addQuantity(cartItem.item.id)}>
//                                         <AiOutlinePlus />
//                                     </button>
//                                     <p>{cartItem.quantity}</p>
//                                     <button className={styles.subtractBtn} onClick={() => subtractQuantity(cartItem.item.id)}>
//                                         <AiOutlineMinus />
//                                     </button>
//                                 </div>
//                                 <p>{cartItem.item.price} kr</p>
//                             </div>
//                         ))}
//                     </>
//                 )}
//                 <div className={styles.hGroup}>
//                     <hgroup className={styles.totalLine}>
//                         <h4>Total</h4>
//                         <h4>{total} kr</h4>
//                     </hgroup>
//                     <p>inkl moms + drönarleverans</p>
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <button className={styles.payBtn} onClick={handlePay} disabled={loading}>
//                     {loading ? 'Behandlar...' : 'Betala!'}
//                 </button>
//                 <button onClick={clearCart}>Töm varukorgen</button>
//             </section>
//         </div>
//     );
// }

// Cart.propTypes = {
//     onClose: PropTypes.func.isRequired,
// };


// export default Cart;