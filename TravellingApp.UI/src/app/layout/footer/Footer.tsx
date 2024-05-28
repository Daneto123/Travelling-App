import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="columns-container">
        <div className="column">
          <h3>Plan a trip</h3>
          <a href="#">City Break</a>
          <a href="#">Hotel</a>
          <a href="#">Rent a car</a>
          <a href="#">Offers</a>
          <a href="#">Parking</a>
          <a href="#">Experiences</a>
          <a href="#">Sport events</a>
        </div>
        <div className="column">
          <h3>Learn more</h3>
          <a href="#">Promotion</a>
          <a href="#">Baggage information</a>
          <a href="#">FAQ - Tourist guide</a>
          <a href="#">Travel rules</a>
        </div>
        <div className="column">
          <h3>For Travel App</h3>
          <a href="#">About us</a>
          <a href="#">Travel blog</a>
          <a href="#">Careers</a>
          <a href="#">Partnership programme</a>
          <a href="#">General terms</a>
          <a href="#">Manage reservations</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="footer-content">
        <p>© 2024 Krisito Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
