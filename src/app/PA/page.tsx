'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './payment.scss';

const Payment = () => {
  const [formData, setFormData] = useState({
    parent_first_name: "",
    parent_last_name: "",
    child_first_name: "",
    child_last_name: "",
    phone: '',
    email: '',
    chess_club_pennsylvania: true,
  });

  const [tournamentTimings, setTournamentTimings] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

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

  const closePopup = () => {
    setShowThankYouPopup(false);
    setFormData({
      parent_first_name: "",
      parent_last_name: "",
      child_first_name: "",
      child_last_name: "",
      phone: '',
      email: '',
      chess_club_pennsylvania: true,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://backend-chess-tau.vercel.app/form_chess_club_bp_submit', formData);
      setShowThankYouPopup(true);
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {loading && (
        <div className="loading-overlay">
          <img src="/images/loading.gif" alt="Loading..." />
        </div>
      )}

      {showThankYouPopup && (
        <div className="thank-you-popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>Your registration has been submitted successfully.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="tournament-header">
        <img src="/images/logo.png" alt="Chess Tournament Logo" className="tournament-logo" />
        <h1>Chess Club Registration</h1>
        <p><strong>Club Dates:</strong> 24-Feb-2025, 3-Mar-2025, 10-Mar-2025, 17-Mar-2025</p>
        <p><strong>Club Timings:</strong> 7:00 P.M – 9:00 P.M</p>
        <p><strong>Location:</strong> 576 Concord Road, Glen Mills, PA 19342</p>
        <p><strong>Registration Fees:</strong> $10 for 4 weeks</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="child_first_name">Player Name <span className="required">*</span></label>
          <div className="name-fields">
            <input
              type="text"
              id="child_first_name"
              placeholder="First Name"
              required
              value={formData.child_first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              id="child_last_name"
              placeholder="Last Name"
              value={formData.child_last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="parent_first_name">Parent Name (for minors)</label>
          <div className="name-fields">
            <input 
              type="text" 
              id="parent_first_name" 
              placeholder="First Name" 
              value={formData.parent_first_name}
              onChange={handleChange}
            />
            <input 
              type="text" 
              id="parent_last_name" 
              placeholder="Last Name" 
              value={formData.parent_last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number <span className="required">*</span></label>
          <input 
            type="tel" 
            id="phone" 
            required 
            value={formData.phone}
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

        <div className="button-group">
          <button
            type="button"
            className="back-button"
            onClick={() => (window.location.href = 'https://www.chesschamps.us/events')}
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
