import { useState } from 'react';
import styles from './Header.module.scss'; 

function Header() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isCartModalOpen, setIsCartModalOpen ] = useState(false);
    const { cart } = useStore();
    const totalitems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const hiddenPaths = ['/about', '/order-status'];
    const showCartIcon = !hiddenPaths.includes(Location().pathname);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };
    

    return (
        <header className={styles.header}>
            <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <NavLinks isMenuOpen={isMenuOpen} />
            {showCartIcon && (
                <CartIcon totalItemsInCart={totalItemsInCart} openCartModal={openCartModal} />
            )}
            {/* <isCartModalOpen && <CartModal onClose={closeCartModal} />} */}
        </header>
    );
}

export default Header;