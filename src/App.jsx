import React, { useEffect, useState } from 'react';
import logo from "./assets/Crypto Currency 3D Animated Icon.gif";
import axios from 'axios';

const App = () => {
  const [exchangeRate, setExchangeRate] = useState({});
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/cfb49d3dcdd896bd71d05cab/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then(response => {
        console.log(response.data);
        setExchangeRate(response.data.rates);
      })
      .catch(err => {
        console.error('Error fetching exchange rates:', err);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setResult(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'amount':
        if (value >= 0) setAmount(Number(value)); // Prevent negative input
        break;

      case 'fromCurrency':
        setFromCurrency(value);
        break;

      case 'toCurrency':
        setToCurrency(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className='card'>
      <img src={logo} width='60' alt='Logo' />
      <h1 className='text-6xl'>Currency Converter</h1>

      <div className="currency_exchange">
        {/* Input container 1 */}
        <div className="input_container">
          <label className="input_label">Amount</label>
          <input
            type="number"
            name="amount"
            className="input_field"
            value={amount}
            onChange={handleChange}
          />
        </div>

        {/* Input container 2 */}
        <div className="input_container">
          <label className="input_label">From Currency</label>
          <select
            name="fromCurrency"
            className="input_field"
            value={fromCurrency}
            onChange={handleChange}
          >
            {exchangeRate && Object.keys(exchangeRate).length > 0 ? (
              Object.keys(exchangeRate).map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        {/* Input container 3 */}
        <div className="input_container">
          <label className="input_label">To Currency</label>
          <select
            name="toCurrency"
            className="input_field"
            value={toCurrency}
            onChange={handleChange}
          >
            {exchangeRate && Object.keys(exchangeRate).length > 0 ? (
              Object.keys(exchangeRate).map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
      </div>

      <div className="output">
        <h2>
          Converted Amount: <b>{result ? `${result} ${toCurrency}` : "N/A"}</b>
        </h2>
      </div>
    </div>
  );
};

export default App;
