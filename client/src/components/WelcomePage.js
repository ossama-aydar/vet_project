import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function WelcomePage() {
  return (
    <div className="welcome-background">
      <div className="welcome-content">
        <h1>Welcome to VetCare 360</h1>
        <p>Your trusted partner in pet health and care.</p>
        <Link to="/veterinarians" className="welcome-btn">See Our Veterinarians</Link>
      </div>
    </div>
  );
}

export default WelcomePage;
