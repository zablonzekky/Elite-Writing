import React from "react";
import { NavLink } from "react-router-dom";
import Header from '../../shared/header/Header';
import Footer from '../Home/components/Footer';

const services = [
  {
    title: "CV Writing & Revamp",
    icon: "📝",
    description: "Make your CV recruiter-ready with modern design and compelling language.",
    features: [
      "ATS-optimized formatting",
      "Personalized, results-driven content",
      "Clean, professional layouts"
    ]
  },
  {
    title: "LinkedIn Profile Optimization",
    icon: "🔗",
    description: "We turn your LinkedIn into a powerful career magnet.",
    features: [
      "Strategic headline & summary",
      "Keyword-rich profile",
      "More visibility & connections"
    ]
  },
  {
    title: "Cover Letter Writing",
    icon: "📬",
    description: "Personalized cover letters that capture attention.",
    features: [
      "Tailored to job and industry",
      "Engaging, authentic voice",
      "Professional structure"
    ]
  }
];

const Services = () => {
  return (
    <>
      <Header />

      <section className="bg-light py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-5">Our Services</h1>
          <div className="row">
            {services.map((service, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="text-center mb-3" style={{ fontSize: '2.5rem' }}>
                      {service.icon}
                    </div>
                    <h4 className="card-title text-center">{service.title}</h4>
                    <p className="card-text text-center">{service.description}</p>
                    <ul className="list-unstyled mt-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="mb-2">✅ {feature}</li>
                      ))}
                    </ul>
                    <div className="text-center mt-4">
                      <NavLink 
                        to="/contact" 
                        className="btn btn-primary"
                        state={{ selectedService: service.title }}
                      >
                        BOOK NOW
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <NavLink to="/contact" className="btn btn-primary btn-lg">
              Request a Free CV Review
            </NavLink>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;