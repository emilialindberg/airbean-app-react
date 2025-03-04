const API_BASE_URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans';

export async function getMenu() {
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

export async function placeOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Eller returnera relevant data från svaret
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
}