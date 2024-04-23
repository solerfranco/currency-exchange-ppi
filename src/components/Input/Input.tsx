import React, { useRef } from 'react';
import styles from "./Input.module.scss";

interface InputProps {
    validation: RegExp;
    disabled: boolean;
    label: string;
    content: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
    const { validation, disabled, label, content, placeholder, name, value, onChange } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        // Check if inputRef is defined and then focus on it
        inputRef.current && inputRef.current.focus();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (!validation.test(value) && value != "") {
            return;
        }

        onChange(event);
    };

    return (
        <div className={styles.input_wrapper}>
            <label className={styles.input_wrapper__label}>{label}</label>
            <div className={styles.input_container}>
                <div onClick={handleClick} className={styles.input}>
                    {content &&
                        <div className={styles.input_container__decoration}>
                            {content}
                        </div>
                    }

                    <input
                        disabled={disabled}
                        ref={inputRef}
                        placeholder={placeholder}
                        name={name}
                        onChange={handleChange}
                        value={value}
                    />

                </div>
            </div>
        </div>
    );
};

export default Input;