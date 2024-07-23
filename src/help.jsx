import React from 'react';

import Header from "./header";
const HelpCenter = () => {
  return (
    <div className="help-center">
       <header>
        <Header />
      </header>
      <header className="help-header">
        <h1>Help Center</h1>
        <p>Find answers to your questions and get help with our services.</p>
      </header>
      <main className="help-content">
        <section className="help-category">
          <h2>Popular Topics</h2>
          <ul>
            <li><a href="#account">Account Management</a></li>
            <li><a href="#payments">Payments and Transfers</a></li>
            <li><a href="#security">Security and Privacy</a></li>
            <li><a href="#technical">Technical Support</a></li>
          </ul>
        </section>
        <section className="help-articles">
          <h2>Recent Articles</h2>
          <article>
            <h3><a href="#how-to-reset-password">How to Reset Your Password</a></h3>
            <p>Learn how to reset your password if you've forgotten it or need to change it for security reasons.</p>
          </article>
          <article>
            <h3><a href="#troubleshooting-payments">Troubleshooting Payment Issues</a></h3>
            <p>Find solutions to common payment issues and learn how to resolve them.</p>
          </article>
          <article>
            <h3><a href="#securing-your-account">Securing Your Account</a></h3>
            <p>Tips and best practices for keeping your account secure and protected from unauthorized access.</p>
          </article>
        </section>
      </main>
      <footer className="help-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HelpCenter;
