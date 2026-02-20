import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-light py-4 mt-5">
    <div className="container d-flex flex-column flex-md-row justify-content-between">
      <p className="mb-1 mb-md-0">© {new Date().getFullYear()} Elite Writing Services</p>
      <div className="d-flex gap-3">
        <span>support@elitewriting.com</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  </footer>
);

export default Footer;
