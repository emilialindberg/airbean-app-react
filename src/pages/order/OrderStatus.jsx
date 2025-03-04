import styles from './Order.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/button/Button';
import droneImage from '../../img/drone.svg';

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
            <p>Ordernummer: {orderConfirmation.orderNumber}</p>
            <img src={droneImage} alt="Drone picture" />
            
            {/* <p>Orderdatum: {orderConfirmation.orderDate}</p> */}
            <h3>Din beställning är på väg!</h3>
            <ul>
                {/* {orderConfirmation.items.map((item) => (
                    <li key={item.item.id}>
                        {item.item.title} - {item.quantity} st - {item.item.price} kr
                    </li>
                ))} */}
            </ul>
            {/* <p>Total: {orderConfirmation.total} kr</p> */}
            <Button onClick={handleAccept}>Ok, Cool!</Button>
        </section>
    );
}

export default OrderStatus;