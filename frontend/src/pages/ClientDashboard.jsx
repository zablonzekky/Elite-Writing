import React from 'react';
import DashboardShell from '../components/layout/DashboardShell';

const ClientDashboard = () => (
  <DashboardShell title="Client Dashboard" subtitle="Track orders, upload CV files, and message your coach.">
    <div className="col-lg-8"><div className="card card-body h-100"><h2 className="h5">Active Orders</h2><p className="text-muted">Pending → In Progress → Completed</p><ul><li>CV Rewrite - In Progress</li><li>Cover Letter - Pending</li></ul></div></div>
    <div className="col-lg-4"><div className="card card-body h-100"><h2 className="h5">Quick Actions</h2><button className="btn btn-outline-primary mb-2">Upload CV</button><button className="btn btn-outline-secondary">Open Messages</button></div></div>
  </DashboardShell>
);

export default ClientDashboard;
