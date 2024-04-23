import React, { ReactNode } from 'react';
import styles from "./IconButton.module.scss";

interface IconButtonProps {
    disabled: boolean;
    children: ReactNode;
    onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    const { disabled, onClick, children } = props;

    return (
        <button disabled={disabled} onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
};

export default IconButton;