'use client'
import React, { useEffect, useState } from 'react';
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
    signupDate: new Date().toISOString()
  });
  
  const [tournamentTimings, setTournamentTimings] = useState<string>('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchTournamentTimings = async () => {
      try {
        const response = await axios.get('https://payment-form-backend.vercel.app/tournament-timings');
        setTournamentTimings(response.data);
      } catch (error) {
        console.error('Error fetching tournament timings:', error);
      }
    };

    fetchTournamentTimings();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on submit
  
    try {
      await axios.post('https://payment-form-backend.vercel.app/signup', formData);
  
      const emailData = {
        email: formData.email,
        subject: `Thank You for Registering! Tournament Details for ${tournamentTimings}`,
        body: `
          Dear ${formData.playerFirstName} ${formData.playerLastName},
  
          Thank you for registering in our Casual Chess Tournament.
  
          Tournament Timing: ${tournamentTimings}
  
          We look forward to seeing you there!
  
          Best regards,
          The Chess Tournament Team
        `
      };
  
      await axios.post('https://payment-form-backend.vercel.app/send-email', emailData);
  
      window.location.href = 'https://buy.stripe.com/3cs4jw8xYePG6Qg9AA';
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  return (
    <div className="payment-container">
      {loading && (
        <div className="loading-overlay">
          <img src="/images/loading.gif" alt="Loading..." />
        </div>
      )}

      <div className="tournament-header">
        <img src="/images/logo.png" alt="Chess Tournament Logo" className="tournament-logo" />
        <h1>Chess Club Registration</h1>
        <p>Club Timing: {tournamentTimings || 'Loading...'}</p>
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
          <label htmlFor="parentFirstName">Parent Name (for minors)</label>
          <div className="name-fields">
            <input 
              type="text" 
              id="parentFirstName" 
              placeholder="First Name" 
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
            placeholder="example@gmail.com" 
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
            <option value="K – 2 - ($20)">K – 2 - ($20)</option>
            <option value="3rd – 5th grade - ($20)">3rd – 5th grade - ($20)</option>
            <option value="6th – 8th grade - ($20)">6th – 8th grade - ($20)</option>
            <option value="9th – 12th grade - ($20)">9th – 12th grade - ($20)</option>
            <option value="Open - ($20)">Open - ($20)</option>
          </select>
  </div>
  <div className="button-group">
  <button
      type="button"
      className="back-button"
      onClick={() => (window.location.href = 'https://www.chesschamps.us/')}
    >
      Back
    </button>
    <button type="submit" className="submit-button">
      Submit
    </button>
   
    </div>
</form>

    </div>
  );
};

export default Payment;
