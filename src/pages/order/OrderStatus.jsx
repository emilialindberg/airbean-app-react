import styles from '../order/OrderStatus.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/button/Button';

function OrderStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderConfirmation = location.state?.orderConfirmation;
    

    useEffect(() => {
        if (!orderConfirmation) {
            navigate('/');
        }
    }, [orderConfirmation, navigate]);

    console.log("Order Confirmation in OrderStatus:", orderConfirmation);

    if (!orderConfirmation) {
        return null;
    }

    const handleAccept = () => {
        navigate('/');
    };

    return (
        <section className={styles.order}>
            <h3>Tack för din beställning!</h3>
            <p>Ordernummer: {orderConfirmation.orderNumber}</p>
            <p>Orderdatum: {orderConfirmation.orderDate}</p>
            <h4>Beställda varor:</h4>
            <ul>
                {orderConfirmation.items.map((item) => (
                    <li key={item.item.id}>
                        {item.item.title} - {item.quantity} st - {item.item.price} kr
                    </li>
                ))}
            </ul>
            <p>Total: {orderConfirmation.total} kr</p>
            <Button onClick={handleAccept}>Ok, Cool!</Button>
        </section>
    );
}

export default OrderStatus;