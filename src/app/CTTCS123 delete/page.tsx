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
    section:'',
    chess_club_cttcs: true,
  });

  const [tournamentTimings, setTournamentTimings] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms and conditions

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
      section:'',
      chess_club_cttcs: true,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://backend-chess-tau.vercel.app/form_chess_club_bp_submit', formData);
      window.location.href = 'https://www.clover.com/pay-widgets/6b5f5975-26f0-444a-8c49-f076c51e4120';

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
        <img src="/images/CTTCSLOGO.png" alt="Chess Tournament Logo" className="tournament-logo" />
        </div>
        <h1>Checkmate Challenge</h1>
        <div className="tournament-header1">
        
        <p><strong>Event Timing:</strong> 01-November-2025;  10 am onwards</p>
        <p><strong>Format:</strong> 5 Round Swiss ; G15 [Each player gets 15 mins to play]; Casual (Non-USCF Rated)</p>
        <p><strong>Event Address:</strong> 2451 Frazer Rd, Newark, DE 19702</p>
        <p><strong>Contact us:</strong> (302) 838-8850 or connect@chesschamps.us</p>
        <p><strong>Round Timings:</strong> 10:30 am - 11:15 am - 12:00 pm - 1:00 pm - 1:45 pm </p>
        <p><strong>Award Ceremony:</strong> 2:30 PM</p>
        <p><strong>Registrtaion:</strong> $25 till October 15th; $30 thereafter; onsite registration $45</p>
        
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
          <label htmlFor="parent_first_name">Parent Name <span className="required">*</span> </label>
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
        <div className="form-group">
            <label htmlFor="section">Section <span className="required">*</span></label>
            <select
              id="section"
              required
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">-- Select a Section --</option>
              <option value="K-1st">K-1st</option>
              <option value="2nd-4th">2nd - 4th</option>
              <option value="5th-8th">5th - 8th</option>
              <option value="9th-12th">9th - 12th</option>
            </select>
          </div>


        {/* <div className="form-group"> */}
  <label>
    <input
      type="checkbox"
      checked={termsAccepted}
      onChange={handleTermsChange}
    />  I accept the{' '}
    <a
      href="/terms-and-conditions"
      style={{ color: 'blue', textDecoration: 'underline' }}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Recommended for security with target="_blank"
    >
      terms and conditions
    </a>
  </label>
{/* </div> */}

        <div className="button-group">
          <button
            type="button"
            className="back-button"
            onClick={() => (window.location.href = 'https://www.chesschamps.us/events')}
          >
            Back
          </button>
          <button type="submit" className="submit-button" disabled={!termsAccepted}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;