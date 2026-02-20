import React from 'react';

const CoachesPage = () => (
  <div className="container py-4">
    <h1 className="h4 fw-bold">Professional Coaches</h1>
    <div className="row g-3 mt-1">
      {[1, 2, 3].map((item) => (
        <div className="col-md-4" key={item}>
          <div className="card card-body h-100">
            <h2 className="h6">Coach {item}</h2>
            <p className="text-muted">CV / Cover Letter / LinkedIn</p>
            <button className="btn btn-outline-primary btn-sm">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CoachesPage;
