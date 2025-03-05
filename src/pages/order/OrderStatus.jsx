import styles from './Order.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/button/Button';
import droneImage from '../../img/drone.svg';
import DeliveryTimer from '../../components/delivery/DeliveryTimer';

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
        <section className= {styles.order} >
            <p> Ordernummer: {orderConfirmation.orderNumber} </p>
            <img src={droneImage} alt="Drone picture" />
            <h3> Din beställning är på väg!</h3> 
            <DeliveryTimer minutes= {orderConfirmation.leverans} />
            <Button onClick={handleAccept}> Ok, Cool! </Button>
        </section>
    );
}

export default OrderStatus;