'use client'
import React, { useState } from 'react';
import axios from 'axios';
import './payment.scss';

const Payment = () => {
  const [formData, setFormData] = useState({
    playerFirstName: '',
    playerLastName: '',
    parentFirstName: '',
    parentLastName: '',
    phoneNumber: '',
    email: '',
    section: '',
    signupDate: new Date().toISOString() // Initialize with the current date and time
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post('https://payment-form-backend.vercel.app/signup', formData);
      // Redirect to Stripe payment page
      window.location.href = 'https://buy.stripe.com/3cs4jw8xYePG6Qg9AA';
    } catch (error) {
      console.error('Error during API call:', error);
    }
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
            <input 
              type="text" 
              id="playerFirstName" 
              placeholder="First Name" 
              required 
              value={formData.playerFirstName}
              onChange={handleChange}
            />
            <input 
              type="text" 
              id="playerLastName" 
              placeholder="Last Name" 
              value={formData.playerLastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="parentFirstName">Parent Name <span className="required">*</span></label>
          <div className="name-fields">
            <input 
              type="text" 
              id="parentFirstName" 
              placeholder="First Name" 
              required 
              value={formData.parentFirstName}
              onChange={handleChange}
            />
            <input 
              type="text" 
              id="parentLastName" 
              placeholder="Last Name" 
              value={formData.parentLastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
          <input 
            type="tel" 
            id="phoneNumber" 
            placeholder="(000) 000-0000" 
            required 
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail <span className="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            placeholder="example@yahoo.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section <span className="required">*</span></label>
          <select 
            id="section" 
            required 
            value={formData.section}
            onChange={handleChange}
          >
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
