import { useStore } from 'react-router-dom';


function Cart()  {
    const { cart, addQuantity, subractQuantity, sendOrder } = useStore(); 

    return(
    <div>
        <section>
            <h3>
                Din beställning
            </h3>
            <hgroup>
                <h5></h5>
                <h5></h5>
            </hgroup>
            <div>
                <button className={styles.addBtn} onClick={() => addQuantity(cartItem.item.id)}>
                    <AiOutlinePlus/>
                </button> 
                <p></p>
                <button className={styles.subtractBtn} onClick={() => subtractQuantity(cartItem.item.id)}>
                    <AiOutlineMinus/>
                </button>
            </div>
            <hgroup>
                <h4></h4>
                <h4></h4>
            </hgroup>
            <button></button>

        </section>  
    </div>
    );
}

export default Cart;
