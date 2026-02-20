import React from 'react';

const DashboardShell = ({ title, subtitle, children }) => (
  <section className="container py-4">
    <div className="mb-4">
      <h1 className="h3 fw-bold">{title}</h1>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </div>
    <div className="row g-3">{children}</div>
  </section>
);

export default DashboardShell;
