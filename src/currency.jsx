import Header from "./header";
import React, { useState, useEffect } from 'react';


// Static exchange rates for demonstration
const EXCHANGE_RATES = {
  USD: { EUR: 0.91, SOM: 570 },
  EUR: { USD: 1.10, SOM: 625 },
  SOM: { USD: 0.0018, EUR: 0.0016 }
};

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    // Convert currency based on exchange rates
    const rate = EXCHANGE_RATES[fromCurrency][toCurrency];
    setConvertedAmount(amount * rate);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="container">
    <header>
        <Header />
      </header>
    <div className="currency-converter mt-5">
      
      <h2>Currency Converter</h2>
      <div className="converter-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="SOM">SOM</option>
        </select>
        <span> to </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="SOM">SOM</option>
        </select>
        <h3>
          Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
        </h3>
      </div>
    </div>
    </div>
  );
};

export default Currency;
