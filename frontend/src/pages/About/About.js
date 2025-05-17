import React from 'react';
import Header from '../../shared/header/Header';
import Footer from '../Home/components/Footer';

const About = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="text-center text-white py-5" style={{
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead">Empowering Your Career Journey Through Professional Writing</p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Elite Writing Services" 
                className="img-fluid rounded shadow" 
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Who We Are</h2>
              <p className="lead">
                Elite Writing Services is a professional freelance platform offering expert CV writing, 
                LinkedIn profile optimization, and cover letter crafting. Our mission is to empower 
                individuals with compelling personal branding tools that make an impact.
              </p>
              <p>
                With years of industry experience, our team of seasoned writers helps job seekers and professionals 
                unlock new opportunities by presenting their skills, experiences, and achievements in the best light.
              </p>
              <a href="/contact" className="btn btn-primary mt-3">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Expertise</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-4 text-center border-0 rounded h-100 shadow-sm">
                <i className="fas fa-file-alt text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h4>CV Writing</h4>
                <p>Tailored, ATS-friendly CVs that highlight your strengths and align with industry standards.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 text-center border-0 rounded h-100 shadow-sm">
                <i className="fab fa-linkedin text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h4>LinkedIn Optimization</h4>
                <p>Professional profile revamps that increase visibility and attract recruiters.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 text-center border-0 rounded h-100 shadow-sm">
                <i className="fas fa-envelope-open-text text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h4>Cover Letters</h4>
                <p>Persuasive cover letters crafted to match specific job applications and industries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Ready to Elevate Your Career?</h2>
          <p className="lead mb-4">Let Elite Writing Services craft your success story.</p>
          <a href="/contact" className="btn btn-light btn-lg">Contact Us</a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
