const API_BASE_URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans';

async function getMenu() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.menu)) {
            return data.menu;
        } else {
            console.error("Invalid data format from API:", data);
            throw new Error("Invalid data format from API");
        }
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
}

async function sendOrder(cartItems) {
    const URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans/order';
    const orderArray = cartItems.map(item => ({
        name: item.item.title,
        price: item.item.price
    }));

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                details: {
                    order: orderArray
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Order skickad:", responseData);

        const total = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
        const newOrderConfirmation = {
        orderNumber:responseData.orderNr,
        leverans: responseData.eta,
        orderDate: new Date().toLocaleDateString(),
        items: cartItems,
        total: total,
    };

        console.log("Orderbekräftelse:", newOrderConfirmation);

        return newOrderConfirmation;
    } catch (error) {
        console.error("Fel vid skickande av order:", error);
    }
}

export { getMenu, sendOrder }