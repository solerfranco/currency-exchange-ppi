import React from 'react';
import styles from "./Select.module.scss";

interface SelectProps {
    disabled: boolean;
    value: string;
    label: string;
    options: { name: string, value: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = (props) => {
    const { disabled, options, label, value, onChange } = props;

    return (
        <div className={styles.container} >
            <label className={styles.label}>{label}</label>
            <select disabled={disabled} value={value} onChange={onChange} className={styles.select}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    );
};

export default Select;