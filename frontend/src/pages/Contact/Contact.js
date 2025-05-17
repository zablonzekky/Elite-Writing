import React from 'react';
import Header from '../../shared/header/Header';
import Footer from '../Home/components/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center py-4">
          <h1 className="display-5 fw-bold">Get in Touch</h1>
          <p className="lead">We'd love to hear from you! Reach out for inquiries, collaborations, or support.</p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h3 className="mb-4 fw-bold">Contact Information</h3>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="text-primary me-3 fs-4" />
                  <div>
                    <h5 className="mb-0 fw-bold">Email</h5>
                    <a href="mailto:support@elitewritingservices.com" className="text-decoration-none">support@elitewritingservices.com</a>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaPhone className="text-primary me-3 fs-4" />
                  <div>
                    <h5 className="mb-0 fw-bold">Phone</h5>
                    <a href="tel:+254712345678" className="text-decoration-none">+254 712 345 678</a>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaMapMarkerAlt className="text-primary me-3 fs-4" />
                  <div>
                    <h5 className="mb-0 fw-bold">Location</h5>
                    <p className="mb-0">Bungoma, Kenya</p>
                  </div>
                </li>
              </ul>

              <div className="mt-4">
                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div className="d-flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/rachael-wabwoba-526a30237/"
                    className="text-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="https://twitter.com/ewwabwoba"
                    className="text-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className="text-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://wa.me/254746902227"
                    className="text-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h3 className="mb-4 fw-bold">Send Us a Message</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" placeholder="Subject" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Embed (Optional) */}
      <div className="container mb-5">
        <div className="card border-0 shadow-sm overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.742345845874!2d34.56012361475391!3d0.5699999999999318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzQnMTEuOSJTIDM0wrAzMyczOC4xIkU!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
