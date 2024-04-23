import React, { useEffect, useState } from 'react';
import { MappedCurrencyData } from '@/hooks/currencies';

interface FooterProps {
    baseCurrency: MappedCurrencyData;
    targetCurrency: MappedCurrencyData;
    className: string;
}

const Footer: React.FC<FooterProps> = (props) => {
    const { baseCurrency, targetCurrency, className } = props
    const [currentDate, setCurrentDate] = useState("");

    const baseUrl = "https://www.xe.com/currency/";

    const createCurrencyURL = (value: string, name: string) => {
        return (`${baseUrl}${value}-${name.replace(/\s/g, "-")}`).toLowerCase();
    }

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
            hour12: false,
            timeZone: 'UTC'
        });
        setCurrentDate(formattedDate);
    }, [baseCurrency, targetCurrency])

    return (
        <div className={className}>
            <span>
                <a target="_blank" href={createCurrencyURL(baseCurrency.value, baseCurrency.name)}>{baseCurrency.name}</a>
                {' to '}
                <a target="_blank" href={createCurrencyURL(targetCurrency.value, targetCurrency.name)}>{targetCurrency.name}</a>
                {' conversion — Last updated'} {currentDate}.
            </span>
        </div>
    );
}

export default Footer;