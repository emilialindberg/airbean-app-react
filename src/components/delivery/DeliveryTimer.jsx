import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function DeliveryTimer({ minutes }) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatMinutes = (time) => {
        return Math.ceil(time / 60);
    };

    return (
        <div>
            {timeLeft > 0 ? (
                <h4> {formatMinutes(timeLeft)} minuter </h4>
            ) : (
                <h4>Levererad!</h4>
            )}
        </div>
    );
}

DeliveryTimer.propTypes = {
    minutes: PropTypes.number.isRequired,
};

export default DeliveryTimer;