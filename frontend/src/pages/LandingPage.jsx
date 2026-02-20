import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <>
    <section className="bg-primary text-white py-5">
      <div className="container py-4">
        <h1 className="display-5 fw-bold">Professional CV writing made easy</h1>
        <p className="lead col-lg-8">Connect with expert coaches to transform your CV, cover letter, and LinkedIn profile.</p>
        <div className="d-flex gap-2">
          <Link to="/register" className="btn btn-light btn-lg">Get Started</Link>
          <Link to="/coaches" className="btn btn-outline-light btn-lg">Find a Coach</Link>
        </div>
      </div>
    </section>

    <section className="container py-5">
      <h2 className="h4 fw-bold mb-4">Services Offered</h2>
      <div className="row g-3">
        {['CV Writing', 'Cover Letter', 'LinkedIn Optimization'].map((service) => (
          <div className="col-md-4" key={service}>
            <div className="card h-100 shadow-sm"><div className="card-body"><h3 className="h5">{service}</h3><p className="text-muted">Delivered by vetted career coaches.</p></div></div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-light py-5">
      <div className="container">
        <h2 className="h4 fw-bold mb-4">How It Works</h2>
        <div className="row g-3">
          {['Submit your request', 'Choose your coach', 'Get polished documents'].map((step, i) => (
            <div className="col-md-4" key={step}><div className="p-3 border rounded bg-white"><strong>Step {i + 1}</strong><p className="mb-0">{step}</p></div></div>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-5" id="pricing">
      <h2 className="h4 fw-bold mb-4">Pricing Plans</h2>
      <div className="row g-3">
        {[
          { plan: 'Starter', price: '$49', feature: 'CV review + recommendations' },
          { plan: 'Pro', price: '$99', feature: 'CV rewrite + cover letter' },
          { plan: 'Executive', price: '$149', feature: 'CV + cover letter + LinkedIn' }
        ].map((p) => (
          <div className="col-md-4" key={p.plan}><div className="card h-100 shadow-sm"><div className="card-body"><h3 className="h5">{p.plan}</h3><p className="display-6">{p.price}</p><p className="text-muted">{p.feature}</p></div></div></div>
        ))}
      </div>
    </section>

    <section className="container pb-5">
      <h2 className="h4 fw-bold mb-4">Testimonials</h2>
      <div className="row g-3">
        {['“Got interview calls in 2 weeks.”', '“Coach was fast and professional.”', '“My LinkedIn finally looks top-tier.”'].map((quote) => (
          <div className="col-md-4" key={quote}><div className="border rounded p-3 h-100">{quote}</div></div>
        ))}
      </div>
    </section>

    <section className="bg-dark text-white py-5 text-center">
      <div className="container">
        <h2 className="fw-bold">Ready to land your next opportunity?</h2>
        <Link to="/register" className="btn btn-primary btn-lg mt-3">Upload your CV today</Link>
      </div>
    </section>
  </>
);

export default LandingPage;
