import styles from './Order.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import droneImage from '../../img/drone.svg';
import DeliveryTimer from '../../components/delivery/DeliveryTimer';

function OrderStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderConfirmation = location.state?.orderConfirmation;
    const [activeOrder, setActiveOrder] = useState(null);

    useEffect(() => {
        const storedOrder = localStorage.getItem('activeOrder');
        const parsedOrder = storedOrder ? JSON.parse(storedOrder) : null;
    
        if (parsedOrder) {
            if (JSON.stringify(parsedOrder) !== JSON.stringify(activeOrder)) {
                setActiveOrder(parsedOrder);
            }
        } else if (orderConfirmation && JSON.stringify(orderConfirmation) !== JSON.stringify(activeOrder)) {
            setActiveOrder(orderConfirmation);
        }
        console.log("Order Confirmation in OrderStatus:", activeOrder);
        console.log(Date.now());
    }, [orderConfirmation, activeOrder]);

    const handleAccept = () => {
        console.log('butoon clicked');
        navigate('/');
    };

    if (!activeOrder) {
        return (
            <section className={styles.order}>
                <h3>Ingen order hittad</h3>
                <p>Du har inga aktiva beställningar. Vänligen gör en beställning för att se din orderstatus.</p>
                <Button onClick={() => navigate('/menu')}>Gå till Meny</Button>
            </section>
        );
    }

    return (
        <section className= {styles.order} >
            <p>Ordernummer: {activeOrder.orderNumber}</p>
            <img src={droneImage} alt="Drone picture" />
            <h3> Din beställning är på väg!</h3> 
            <DeliveryTimer minutes={(activeOrder.leverans - Date.now()) / 60000} />
            <Button onClick={handleAccept}> Ok, Cool! </Button>
        </section>
    );
}

export default OrderStatus;