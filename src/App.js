import React, { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState({
    eurToUsd: 1.05,
    usdToInr: 80.5,
    audToUsd: 0.67
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedExchangeRates = { ...exchangeRates };
      Object.keys(updatedExchangeRates).forEach((key) => {
        const currentRate = updatedExchangeRates[key];
        const minRate = currentRate * 0.97; // 3% decrease
        const maxRate = currentRate * 1.03; // 3% increase
        const newRate = Math.random() * (maxRate - minRate) + minRate;
        updatedExchangeRates[key] = parseFloat(newRate.toFixed(2));
      });
      setExchangeRates(updatedExchangeRates);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sourceCurrency || !targetCurrency || !amount) {
      alert("Please fill in all the fields.");
      return;
    }

    if (isNaN(amount)) {
      alert("Amount should be a valid number.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0) {
      alert("Amount should be a positive number.");
      return;
    }

    let calculatedAmount = parsedAmount;

    if (sourceCurrency === "eur" && targetCurrency === "usr") {
      calculatedAmount = parsedAmount / exchangeRates.eurToUsd;
    } else if (sourceCurrency === "usr" && targetCurrency === "eur") {
      calculatedAmount = parsedAmount * exchangeRates.eurToUsd;
    } else if (sourceCurrency === "ind" && targetCurrency === "usr") {
      calculatedAmount = parsedAmount / exchangeRates.usdToInr;
    } else if (sourceCurrency === "usr" && targetCurrency === "ind") {
      calculatedAmount = parsedAmount * exchangeRates.usdToInr;
    } else if (sourceCurrency === "aud" && targetCurrency === "usr") {
      calculatedAmount = parsedAmount / exchangeRates.audToUsd;
    } else if (sourceCurrency === "usr" && targetCurrency === "aud") {
      calculatedAmount = parsedAmount * exchangeRates.audToUsd;
    }

    setConvertedAmount(calculatedAmount.toFixed(2));
  };

  const handleSourceCurrency = (event) => {
    setSourceCurrency(event.target.value);
  };

  const handleTargetCurrency = (event) => {
    setTargetCurrency(event.target.value);
  };

  return (
    <div>
      <div id="app">
        <div id="market">
          <h1>Markets</h1>
          <table>
            <tbody>
              <tr>
                <td>EUR/USD</td>
                <td>{exchangeRates.eurToUsd}</td>
              </tr>
              <tr>
                <td>USD/INR</td>
                <td>{exchangeRates.usdToInr}</td>
              </tr>
              <tr>
                <td>AUD/USD</td>
                <td>{exchangeRates.audToUsd}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
          <p>Currency Converter</p>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Source currency</label>
              <br />
              <select
                name="currency"
                id="sourceCurrency"
                value={sourceCurrency}
                onChange={handleSourceCurrency}
              >
                <option value="">Select source Currency</option>
                <option value="eur">EUR</option>
                <option value="ind">INR</option>
                <option value="usr">USD</option>
                <option value="aud">AUD</option>
              </select>
            </div>
            <div className="item">
              <label>Target currency</label>
              <br />
              <select
                name="currency"
                id="targetCurrency"
                value={targetCurrency}
                onChange={handleTargetCurrency}
              >
                <option value="">Select target Currency</option>
                <option value="eur">EUR</option>
                <option value="ind">INR</option>
                <option value="usr">USD</option>
                <option value="aud">AUD</option>
              </select>
            </div>
            <div className="item">
              <label>Amount</label>
              <br />
              <input
                type="number"
                name="name"
                value={amount}
                onChange={handleChange}
              />
            </div>
            <div className="result">
              Estimated converted amount:   <span className="converted-amount">{convertedAmount}</span>
            </div>
            <div className="submit">
              <button type="submit">Exchange</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
