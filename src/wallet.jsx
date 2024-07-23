
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';

const BalancePage = () => {
  const [balance, setBalance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      });
  };

  const handleSendMoney = () => {
    const addressToUse = manualAddress || selectedAddress;
    axios.post('https://api.example.com/send', {
      address: addressToUse,
      amount: parseFloat(amount)
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setSuccessMessage('Money sent successfully');
        setBalance(prevBalance => prevBalance - parseFloat(amount));
        setAmount('');
        setSelectedAddress('');
        setManualAddress('');
      }
    })
    .catch(error => {
      console.error('Error sending money:', error);
    });
  };

  return (
    <div className="container">
      <header>
        <Header />
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
            <p>5000</p>
          )}

          <div className="address-search">
            <h2>Search Addresses</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for an address"
            />
            <button onClick={handleSearch}>Search</button>
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
            <button 
              onClick={handleSendMoney} 
              disabled={!manualAddress && !selectedAddress || !amount}
            >
              Send
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
