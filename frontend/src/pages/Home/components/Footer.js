import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-2" style={{ fontSize: '0.9rem' }}>Categories</h5>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              <li>Graphics & Design</li>
              <li>Digital Marketing</li>
              <li>Writing & Translation</li>
              <li>Career Coaching</li>
              <li>Website development</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-2" style={{ fontSize: '0.9rem' }}>Support</h5>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              <li>Help & Support</li>
              <li>Selling</li>
              <li>Buying</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-2" style={{ fontSize: '0.9rem' }}>About</h5>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              <li>Careers</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-2 border-top border-light mt-3" style={{ fontSize: '0.8rem' }}>
          <small>&copy; {new Date().getFullYear()} ELITE WRITING SERVVICES. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;