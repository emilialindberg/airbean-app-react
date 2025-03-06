import { createBrowserRouter } from 'react-router-dom'; 
import App from './App.jsx'
import Error from './Error.jsx';
import About from './pages/about/About.jsx';
import OrderStatus from './pages/order/OrderStatus.jsx';
import Menu from './pages/menu/Menu.jsx';

const router = createBrowserRouter([
    {
        index: true,
        path: '/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: 'menu',
        element: <Menu />
    },
    {
        path: 'about',
        element: <About />
    },
    {
        path: 'order-status',
        element: <OrderStatus />
    }
]);

console.log("Router configuration:", router.routes); 

export default router;