import { useState } from 'react';
import styles from '../header/Header.module.scss';
// import CartModal from '../cart/CartIcon';
// import { useStore } from '../../store/StoreUtils'; 
import NavLinks from '../nav/NavList';
import HamburgerMenu from './HamburgerMenu';
// import CartIcon from '../cart/CartIcon';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    // const { cart } = useStore();
    // const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
    const hiddenPaths = ['/', '/about', '/order-status'];
    const showCartIcon = !hiddenPaths.includes(location.pathname);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const openCartModal = () => {
    //     setIsCartModalOpen(true);
    // };

    // const closeCartModal = () => {
    //     setIsCartModalOpen(false);
    // };

    return (
        <header className={styles.header}>
            <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <NavLinks isMenuOpen={isMenuOpen} />
            {showCartIcon && (
                {/* <CartIcon totalItemsInCart={totalItemsInCart} openCartModal={openCartModal} /> */}
            )}
            {/* {isCartModalOpen && <CartModal onClose={closeCartModal} />} */}
        </header>
    );
}

export default Header;