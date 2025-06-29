import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container text-white py-4 px-3">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left Side */}
        <div className="mb-3 mb-md-0">
          <span className="fs-6"> Developed by <strong>Akash Shaikh</strong></span>
        </div>

        {/* Right Side: Social Links */}
        <div className="d-flex gap-3">
          <a href="https://m.facebook.com/akash.shaikh.56884761/" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/akash.17122002?utm_source=qr&igsh=MWk2bnlyODE4anZrNA==" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/akash-shaikh-9131a6258/" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/Akash6127" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Custom Styling */}
      <style>{`
        .footer-container {
          width: 100%;
          background: linear-gradient(to right, #232526, #414345);
        }

        .footer-icon {
          color: white;
          font-size: 1.2rem;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .footer-icon:hover {
          color: #fcb69f;
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
