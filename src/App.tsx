import styles from "./App.module.scss"
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import Navbar from '@/components/Navbar/Navbar'
import IconButton from "@/components/IconButton/IconButton"
import Footer from '@/components/Footer/Footer'
import CurrencySwapIcon from "@/assets/currency-swap.svg"
import { MappedCurrencyData, useGetCurrencies, useGetRates } from "./hooks/currencies"
import { useEffect, useState } from "react"

function App() {
  const [amount, setAmount] = useState<string>("1");
  const [amountDisplay, setAmountDisplay] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");
  const [result, setResult] = useState(1);
  const [currencyArray, setCurrencyArray] = useState<MappedCurrencyData[]>([]);

  const { rates, isLoading } = useGetRates(baseCurrency);
  const { currencies, mappedCurrencies } = useGetCurrencies();

  useEffect(() => {
    setAmountDisplay(amount != "" ? parseFloat(amount) : 0);
  }, [amount])

  useEffect(() => {
    const ratesToArray = Object.keys(rates)
    const filteredCurrencies = Object.values(mappedCurrencies || {}).filter(currency => ratesToArray.includes(currency.value));
    setCurrencyArray(filteredCurrencies as MappedCurrencyData[]);
  }, [rates])

  useEffect(() => {
    updateResult();
  }, [targetCurrency, amountDisplay, rates])


  const updateResult = () => {
    const selectedRate = rates?.[targetCurrency];
    setResult(selectedRate * amountDisplay);
  }

  const swapCurrencies = () => {
    const newBase = targetCurrency;
    const newTarget = baseCurrency;
    setBaseCurrency(newBase);
    setTargetCurrency(newTarget);
  }

  return (
    <>
      <Navbar alt='Currency exchange' />
      <main className={styles.main}>
        <h1 className={styles.headline}>{amountDisplay} {baseCurrency} to {targetCurrency} - Convert {currencies?.[baseCurrency].name} to {currencies?.[targetCurrency].name}</h1>
        <section className={`${styles.card} ${styles.section_container}`}>
          {isLoading &&
            <div className={styles.loadingContainer}>
              <span className={styles.loadingIndicator}></span>
            </div>
          }
          <div className={styles.fields}>
            <Input
              validation={/^[0-9.]+$/g}
              disabled={isLoading}
              label='Amount'
              content='$'
              placeholder='0'
              name='numero'
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <Select
              disabled={isLoading}
              options={currencyArray}
              value={baseCurrency}
              onChange={e => setBaseCurrency(e.target.value)}
              label='From'
            />
            <IconButton
              disabled={isLoading}
              onClick={swapCurrencies}
            >
              <img src={CurrencySwapIcon} alt="Currency swap icon." />
            </IconButton>
            <Select
              disabled={isLoading}
              options={currencyArray}
              value={targetCurrency}
              onChange={e => setTargetCurrency(e.target.value)}
              label='To'
            />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.results}>
              <h2 className={styles.conversion_value}>
                {amountDisplay} {currencies?.[baseCurrency].name} =<br /> {!isLoading ? result : '-'} {currencies?.[targetCurrency].name}
              </h2>
              <h3 className={styles.conversion_value_inverted}>
                1 {targetCurrency} = {!isLoading ? 1 / rates[targetCurrency] : '-'} {baseCurrency}
              </h3>
            </div>
            <div className={styles.info}>
              <div className={styles.info__card}>
                <span>We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.</span>
              </div>
              {currencies != null &&
                <Footer
                  className={styles.info__footer}
                  baseCurrency={mappedCurrencies?.[baseCurrency]}
                  targetCurrency={mappedCurrencies?.[targetCurrency]}
                />
              }
            </div>
          </div>
        </section>
        {currencies != null &&
          <Footer
            className={styles.info__footer__responsive}
            baseCurrency={mappedCurrencies?.[baseCurrency]}
            targetCurrency={mappedCurrencies?.[targetCurrency]}
          />
        }
      </main>
    </>
  )
}

export default App
