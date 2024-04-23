import React from 'react';
import styles from "./Navbar.module.scss";

interface NavbarProps {
    alt: string
}

const Navbar: React.FC<NavbarProps> = (props) => {
    return (
        //Instead of a usual text tag an img tag will allow the use of a logo
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="#"><img src="logo.png" alt={props.alt} /></a>
            </div>
        </header>
    );
};

export default Navbar;