'use client'
import React from 'react';
import axios from 'axios';
import './payment.scss';

const Payment = () => {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    window.location.href = 'https://buy.stripe.com/3cs4jw8xYePG6Qg9AA'; // Redirect to Stripe payment page
  };

  return (
    <div className="payment-container">
      <div className="tournament-header">
        <img src="/images/logo.png" alt="Chess Tournament Logo" className="tournament-logo" />
        <h1>Kids Chess Tournament: Registration</h1>
        <p>Tournament Timing: August 3rd, 2024 @ 2 pm onwards</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerFirstName">Player Name <span className="required">*</span></label>
          <div className="name-fields">
            <input type="text" id="playerFirstName" placeholder="First Name" required />
            <input type="text" id="playerLastName" placeholder="Last Name" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="parentFirstName">Parent Name <span className="required">*</span></label>
          <div className="name-fields">
            <input type="text" id="parentFirstName" placeholder="First Name" required />
            <input type="text" id="parentLastName" placeholder="Last Name" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
          <input type="tel" id="phoneNumber" placeholder="(000) 000-0000" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail <span className="required">*</span></label>
          <input type="email" id="email" placeholder="example@yahoo.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section <span className="required">*</span></label>
          <select id="section" required>
            <option value="">Please Select</option>
            <option value="grade1">Championship (K-2; 3rd Grade; 4th Grade; 5th Grade) - $20.00</option>
            <option value="grade2">Open - $20.00</option>          
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Payment;
