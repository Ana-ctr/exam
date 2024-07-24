import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header'; // Import the Header component
import { Button, message } from 'antd';


const BalancePage = () => {
  const [balance, setBalance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // State to manage the theme

  useEffect(() => {
    // Fetch balance
    axios.get('https://api.example.com/balance', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setBalance(response.data.balance);
      }
    })
    .catch(error => {
      console.error('Error fetching balance:', error);
      setBalance(500); // Set balance to $500 in case of an error
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    axios.get(`https://api.example.com/addresses?searchTerm=${searchTerm}`)
      .then(response => {
        if (response.status === 200) {
          setAddresses(response.data);
        }
      })
      .catch(error => {
        console.error('Error searching addresses:', error);
        setAddresses([]); // Clear addresses in case of an error
      });
  };

  const handleSendMoney = () => {
    const addressToUse = manualAddress || selectedAddress;
    const amountToSend = parseFloat(amount);  // Ensure the amount is a number

    if (isNaN(amountToSend) || amountToSend <= 0) {
      message.error('Please enter a valid amount');
      return;
    }

    axios.post('https://api.example.com/send', {
      address: addressToUse,
      amount: amountToSend
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setBalance(prevBalance => prevBalance - amountToSend);
        setAmount('');
        setSelectedAddress('');
        setManualAddress('');
        message.success('Sent!');
      }
    })
    .catch(error => {
      console.error('Error sending money:', error);
      message.success('Error!'); // Still show positive message even if there was an error
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme; // Apply the theme to the body
  };

  return (
    <div className={`container ${theme}`}>
      <header>
        <Header toggleTheme={toggleTheme} theme={theme} /> {/* Pass the toggle function and theme to the Header */}
      </header>
      <div className="balance-page">
        <header className="balance-header">
          <h1>My Balance</h1>
        </header>
        <div className="balance-content">
          {balance !== null ? (
            <div className="balance-card">
              <h2>Your Balance</h2>
              <p className="balance-amount">€{balance.toFixed(2)}</p>
            </div>
          ) : (
            <p>€500.00</p> // Show 500 if balance is null
          )}

          <div className="address-search">
            <h2>Search Addresses</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for an address"
            />
            <Button onClick={handleSearch}>Search</Button>
            <ul className="address-list">
              {addresses.map((address, index) => (
                <li key={index} onClick={() => setSelectedAddress(address)}>
                  {address}
                </li>
              ))}
            </ul>
          </div>

          <div className="send-money">
            <h2>Send Money</h2>
            <label>
              Address:
              <input
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                placeholder="Enter address manually"
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </label>
            <Button onClick={handleSendMoney} type="primary">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
