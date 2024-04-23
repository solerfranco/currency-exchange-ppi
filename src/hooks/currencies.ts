import * as currenciesService from "@/services/currencies";
import { useEffect, useState } from "react";

export interface MappedCurrencyData {
  value: string;
  name: string;
  symbol: string;
}

interface MappedCurrency {
  [key : string] : MappedCurrencyData;
}

interface CurrencyData {

  [key : string] : {name: string, symbol: string};
}

const mapCurrencies = (currencyList : CurrencyData) => {
  const mappedData = Object.entries(currencyList).reduce((acc : MappedCurrency, [key, value]) => {
    acc[key] = { value: key, name: value.name, symbol: value.symbol };
    return acc;
  }, {});
  return mappedData as MappedCurrency;
}

export const useGetCurrencies = () => {
  const [mappedCurrencies, setMappedCurrencies] = useState<MappedCurrency>({});
  const [currencies, setCurrencies] = useState<CurrencyData>();

  useEffect(() => {
    currenciesService.getCurrencies().then(( data ) => {
      setCurrencies(data);
      const mappedCurrencies = mapCurrencies(data);
      setMappedCurrencies(mappedCurrencies);
    });
  }, []);

  return { mappedCurrencies, currencies };
};

interface Rate {
  [key : string] : number;
}

export const useGetRates = (baseCurrency : string) => {
  const [rates, setRates] = useState<Rate>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    currenciesService.getRatesWithBase(baseCurrency).then(({ rates }) => {
      setRates(rates);
      setIsLoading(false);
    });
  }, [baseCurrency]);

  return { rates, isLoading };
};