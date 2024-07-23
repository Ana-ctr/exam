
import React, { useState } from 'react';
import Header from "./header";


function Main() {
  const [balance, setBalance] = useState(1000); // Example balance

  const handleSendMoney = () => {
    // Handle send money action here
    alert("Send Money button clicked!");
  };

  const handleSearchAddresses = () => {
    // Handle search addresses action here
    alert("Search Addresses button clicked!");
  };

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      
      <main className="App-main">
        <h2>Welcome to Money Payment Site</h2>
        <p>Send and receive money with ease and security.</p>

        

        <section className="App-features">
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>Our platform is user-friendly and easy to navigate.</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>We prioritize your security with state-of-the-art encryption.</p>
          </div>
          <div className="feature">
            <h3>Fast</h3>
            <p>Transfer money quickly to anyone, anywhere.</p>
          </div>
        </section>
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2024 Simple Payment Site. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
