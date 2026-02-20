import React from 'react';
import DashboardShell from '../components/layout/DashboardShell';

const CoachDashboard = () => (
  <DashboardShell title="Coach Dashboard" subtitle="Review requests, accept jobs, and deliver files.">
    <div className="col-lg-7"><div className="card card-body"><h2 className="h5">Incoming Requests</h2><ul><li>Software Engineer CV refresh</li><li>Marketing lead cover letter</li></ul></div></div>
    <div className="col-lg-5"><div className="card card-body"><h2 className="h5">Profile Snapshot</h2><p>Expertise: CV, LinkedIn</p><p>Average rating: 4.9</p></div></div>
  </DashboardShell>
);

export default CoachDashboard;
